/**
 * Enquiry form handling — email delivery without a backend.
 *
 * On submit we:
 *  1. run native constraint validation and focus the first invalid field,
 *  2. POST the fields as JSON to FormSubmit's AJAX endpoint (see
 *     `FORM_ENDPOINT` in src/data/site.ts), which relays the enquiry by email
 *     to the company inbox,
 *  3. show a success panel, or — if the request fails for any reason (network,
 *     endpoint not yet activated, rate limit) — an error panel that offers a
 *     pre-filled `mailto:` link so the visitor can still send the enquiry.
 *
 * Spam protection: a hidden honeypot field (`_honey`) that real users never
 * fill in, plus FormSubmit's own filtering. No cookies, no tracking.
 */
import { FORM_ENDPOINT } from '../data/site';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function bindEnquiryForm(formSelector: string, statusSelector: string, subject: string) {
  const form = document.querySelector<HTMLFormElement>(formSelector);
  const status = document.querySelector<HTMLElement>(statusSelector);
  if (!form || !status) return;

  const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const mailto = status.querySelector<HTMLAnchorElement>('[data-mailto]');
  const email = form.dataset.email ?? '';

  const collect = () => {
    const data = new FormData(form);
    const entries: [string, string][] = [];
    for (const [key, value] of data.entries()) {
      const v = String(value).trim();
      if (v) entries.push([key, v]);
    }
    return entries;
  };

  const buildMailto = (entries: [string, string][]) => {
    const body = `${subject} — submitted via website\n\n${entries
      .filter(([k]) => !k.startsWith('_'))
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n')}\n`;
    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const setStatus = (state: Status) => {
    status.dataset.state = state;
    status.dataset.visible = state === 'success' || state === 'error' ? 'true' : 'false';
    if (submitButton) {
      submitButton.disabled = state === 'sending';
      submitButton.setAttribute('aria-busy', String(state === 'sending'));
    }
    if (state === 'success' || state === 'error') {
      status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const onSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      form.querySelector<HTMLElement>(':invalid')?.focus();
      return;
    }

    const entries = collect();
    const payload: Record<string, string> = Object.fromEntries(entries);
    payload._subject = `${subject} — ${payload['Full Name'] ?? 'Website visitor'}`;
    payload._template = 'table';
    payload._captcha = 'false';
    // Reply-To the visitor so the team can answer directly from the inbox.
    const replyTo = payload['Business Email'];
    if (replyTo) payload._replyto = replyTo;

    setStatus('sending');

    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 15000);
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      window.clearTimeout(timeout);

      const result = (await response.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
      const ok = response.ok && (result.success === 'true' || result.success === true);
      if (!ok) throw new Error(result.message || `Request failed (${response.status})`);

      setStatus('success');
      form.reset();
    } catch {
      if (mailto) mailto.href = buildMailto(entries);
      setStatus('error');
    }
  };

  form.addEventListener('submit', onSubmit);

  // Hide the status panel again once the visitor starts a new message.
  form.addEventListener('input', () => {
    if (status.dataset.visible === 'true') setStatus('idle');
  });
}
