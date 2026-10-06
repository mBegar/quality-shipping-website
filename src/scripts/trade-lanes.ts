/**
 * Animated trade lanes for WorldMap.astro.
 *
 * Draws a lane from the India hub to each destination country in turn
 * (one after another, looping), leaving a faint dot on every country already
 * connected. Runs only while the map is on screen and never when the visitor
 * prefers reduced motion — in that case the static regional lanes stay visible.
 */

interface Destination {
  id: string;
  name: string;
  x: number;
  y: number;
}

const SVG_NS = 'http://www.w3.org/2000/svg';
const DRAW_MS = 950;
const HOLD_MS = 650;
const FADE_MS = 550;

const arc = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  const lift = Math.min(120, dist * 0.28);
  return `M${a.x} ${a.y} Q${mx} ${my - lift} ${b.x} ${b.y}`;
};

const el = <K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number>) => {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  return node;
};

const wait = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));

export function startTradeLanes(root: HTMLElement) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceMotion.matches || typeof Element.prototype.animate !== 'function') return;

  const data = root.querySelector<HTMLScriptElement>('[data-destinations]');
  const live = root.querySelector<SVGGElement>('.world-map__live');
  const trail = root.querySelector<SVGGElement>('.world-map__trail');
  const labelTo = root.querySelector<HTMLElement>('[data-label-to]');
  if (!data || !live || !trail || !labelTo) return;

  let destinations: Destination[] = [];
  try {
    destinations = JSON.parse(data.textContent || '[]');
  } catch {
    return;
  }
  if (!destinations.length) return;

  const hub = { x: Number(root.dataset.hubX), y: Number(root.dataset.hubY) };
  root.classList.add('world-map--live');

  let index = 0;
  let running = false;
  let visible = false;
  const visited = new Set<string>();

  const setLabel = async (name: string) => {
    labelTo.dataset.swap = '';
    await wait(220);
    labelTo.textContent = name;
    delete labelTo.dataset.swap;
  };

  const step = async (d: Destination) => {
    const lane = el('path', { d: arc(hub, d), class: 'lane', pathLength: 1 });
    const node = el('circle', { cx: d.x, cy: d.y, r: 3, class: 'node' });
    const ring = el('circle', { cx: d.x, cy: d.y, r: 3, class: 'ring' });
    live.append(lane, node, ring);

    void setLabel(d.name);

    lane.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], {
      duration: DRAW_MS,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      fill: 'forwards',
    });
    await wait(DRAW_MS - 120);

    node.animate([{ opacity: 0, r: 1 }, { opacity: 1, r: 3 }], { duration: 300, fill: 'forwards' });
    ring.animate(
      [
        { opacity: 0.9, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(4)' },
      ],
      { duration: 900, easing: 'ease-out', fill: 'forwards' },
    );

    if (!visited.has(d.id)) {
      visited.add(d.id);
      trail.append(el('circle', { cx: d.x, cy: d.y, r: 2 }));
    }

    await wait(HOLD_MS);

    const fade = { duration: FADE_MS, easing: 'ease-in', fill: 'forwards' as const };
    lane.animate([{ opacity: 1 }, { opacity: 0 }], fade);
    node.animate([{ opacity: 1 }, { opacity: 0 }], fade);
    // Let the next lane start drawing while this one fades out.
    window.setTimeout(() => {
      lane.remove();
      node.remove();
      ring.remove();
    }, FADE_MS + 50);
  };

  const loop = async () => {
    if (running) return;
    running = true;
    while (visible && !reduceMotion.matches) {
      await step(destinations[index]);
      index = (index + 1) % destinations.length;
      await wait(120);
    }
    running = false;
  };

  const io = new IntersectionObserver(
    (entries) => {
      visible = entries.some((e) => e.isIntersecting);
      if (visible) void loop();
    },
    { threshold: 0.2 },
  );
  io.observe(root);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) visible = false;
    else if (io.takeRecords().length === 0) {
      // Re-check visibility when the tab becomes active again.
      const rect = root.getBoundingClientRect();
      visible = rect.bottom > 0 && rect.top < window.innerHeight;
      if (visible) void loop();
    }
  });

  reduceMotion.addEventListener('change', () => {
    if (reduceMotion.matches) {
      visible = false;
      root.classList.remove('world-map--live');
      live.replaceChildren();
    }
  });
}
