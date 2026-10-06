/**
 * Generates the dotted world-map assets used by src/components/WorldMap.astro.
 *
 *   node scripts/generate-world-map.mjs
 *
 * Outputs:
 *   public/images/world-dots.svg   – land dots (static, cached by the browser)
 *   src/data/world-dots.json       – India dots, viewBox and the ordered list of
 *                                    destination countries (with map positions)
 *                                    that the trade-lane animation cycles through
 *
 * Country outlines come from @svg-maps/world (CC BY 4.0 — attribution is shown
 * in the site footer). Outlines are rasterised with sharp and sampled on a
 * staggered grid to produce the dot pattern.
 */
import sharp from 'sharp';
import fs from 'node:fs';
import world from '@svg-maps/world';

const W = 1010;
const H = 666;
const SCALE = 2;
const STEP = 6.4; // dot spacing in viewBox units
const CROP = 0.985; // trim the empty strip below Cape Horn (the dataset has no Antarctica)

async function raster(filter) {
  const paths = world.locations
    .filter(filter)
    .map((l) => `<path d="${l.path}" fill="#000"/>`)
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W * SCALE}" height="${H * SCALE}"><rect width="100%" height="100%" fill="#fff"/>${paths}</svg>`;
  const { data, info } = await sharp(Buffer.from(svg)).greyscale().raw().toBuffer({ resolveWithObject: true });
  return (x, y) => {
    const px = Math.round(x * SCALE);
    const py = Math.round(y * SCALE);
    if (px < 0 || py < 0 || px >= info.width || py >= info.height) return false;
    return data[py * info.width + px] < 128;
  };
}

const land = await raster(() => true);
const india = await raster((l) => l.id === 'in');

const landDots = [];
const indiaDots = [];
for (let y = STEP / 2; y < H * CROP; y += STEP) {
  const offset = (Math.round(y / STEP) % 2) * (STEP / 2);
  for (let x = STEP / 2 + offset; x < W; x += STEP) {
    const p = [+x.toFixed(1), +y.toFixed(1)];
    if (india(x, y)) indiaDots.push(p);
    else if (land(x, y)) landDots.push(p);
  }
}

const toPath = (dots) => dots.map(([x, y]) => `M${x} ${y}h.01`).join('');
const viewBox = `0 0 ${W} ${Math.round(H * CROP)}`;

/* --------------------------------------------------------------------------
 * Destination countries for the animated trade lanes.
 *
 * Ordered as one continuous sweep from India: west through the Middle East,
 * Africa and Europe, across the Americas, then back via Oceania, East and
 * South-East Asia to India's neighbours — so the lanes appear to travel
 * around the world one country after another.
 *
 * Deliberately NOT included (sanctioned, embargoed or trade-restricted
 * destinations, or active conflict zones): Iran, Russia, Belarus, North Korea,
 * Syria, Cuba, Venezuela, Myanmar, Afghanistan, Pakistan, Sudan, Libya,
 * Yemen, Somalia, Ukraine. Adjust the list below if this changes.
 * -------------------------------------------------------------------------- */
const DESTINATIONS = [
  // Middle East
  'ae', 'om', 'qa', 'bh', 'kw', 'sa', 'iq', 'jo', 'il', 'tr',
  // Africa
  'eg', 'et', 'dj', 'ke', 'tz', 'mz', 'mu', 'za', 'ng', 'gh', 'ci', 'sn', 'ma', 'dz', 'tn',
  // Europe
  'gr', 'it', 'es', 'pt', 'fr', 'be', 'nl', 'de', 'ch', 'at', 'cz', 'pl', 'hu', 'ro',
  'dk', 'se', 'no', 'fi', 'gb', 'ie',
  // Americas
  'ca', 'us', 'mx', 'pa', 'co', 'ec', 'pe', 'br', 'ar', 'cl',
  // Oceania & East Asia
  'nz', 'au', 'jp', 'kr', 'tw', 'hk', 'cn',
  // South-East Asia
  'ph', 'vn', 'kh', 'th', 'my', 'sg', 'id',
  // Central & South Asia
  'kz', 'uz', 'bd', 'np', 'bt', 'lk', 'mv',
];

/**
 * Centroid of a country's largest land polygon (so the US lands on the
 * mainland rather than between Alaska and Hawaii, France on France rather
 * than near its overseas territories, etc.). @svg-maps/world paths only use
 * relative `m`, implicit relative line-to and `z`.
 */
function mainlandCentroid(d) {
  const tokens = d.trim().split(/[\s,]+/);
  const polys = [];
  let cur = null;
  let x = 0;
  let y = 0;
  let startX = 0;
  let startY = 0;
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t === 'm' || t === 'M') {
      const abs = t === 'M';
      const dx = +tokens[++i];
      const dy = +tokens[++i];
      if (abs) { x = dx; y = dy; } else { x += dx; y += dy; }
      startX = x;
      startY = y;
      cur = [[x, y]];
      polys.push(cur);
    } else if (t === 'z' || t === 'Z') {
      x = startX;
      y = startY;
      cur = null;
    } else {
      const dx = +t;
      const dy = +tokens[++i];
      x += dx;
      y += dy;
      if (!cur) { cur = [[x, y]]; polys.push(cur); } else cur.push([x, y]);
    }
  }
  let best = null;
  for (const p of polys) {
    let a = 0;
    let cx = 0;
    let cy = 0;
    for (let i = 0; i < p.length; i++) {
      const [x0, y0] = p[i];
      const [x1, y1] = p[(i + 1) % p.length];
      const f = x0 * y1 - x1 * y0;
      a += f;
      cx += (x0 + x1) * f;
      cy += (y0 + y1) * f;
    }
    a /= 2;
    const area = Math.abs(a);
    if (!best || area > best.area) {
      best = a === 0 ? { area, x: p[0][0], y: p[0][1] } : { area, x: cx / (6 * a), y: cy / (6 * a) };
    }
  }
  return best;
}

const byId = new Map(world.locations.map((l) => [l.id, l]));
const destinations = DESTINATIONS.map((id) => {
  const loc = byId.get(id);
  if (!loc) throw new Error(`Unknown country id "${id}" in DESTINATIONS`);
  const c = mainlandCentroid(loc.path);
  return { id, name: loc.name, x: +c.x.toFixed(1), y: +c.y.toFixed(1) };
});

fs.writeFileSync(
  'public/images/world-dots.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" preserveAspectRatio="xMidYMid meet"><path d="${toPath(landDots)}" fill="none" stroke="#7FB3C8" stroke-opacity=".38" stroke-width="2.6" stroke-linecap="round"/></svg>`,
);
fs.writeFileSync(
  'src/data/world-dots.json',
  JSON.stringify({ viewBox, india: toPath(indiaDots), indiaCount: indiaDots.length, destinations }),
);

console.log(
  `world-dots.svg: ${landDots.length} land dots · world-dots.json: ${indiaDots.length} India dots · ${destinations.length} destinations`,
);
