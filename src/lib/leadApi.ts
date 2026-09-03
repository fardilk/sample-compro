/**
 * Everything the public lead forms need that is not a component: one endpoint,
 * one email rule, and one place that knows how the API reports field errors.
 *
 * Kept apart from the fields themselves so that file exports only components,
 * which is what Fast Refresh needs to reload a form without losing its state.
 */

// Same origin as the site, so this is a plain first-party request with no CORS
// involved.
export const LEADS_ENDPOINT = '/admin-api/api/leads';

export const WHATSAPP_NUMBER = '6281292934488';
export const WHATSAPP_DISPLAY = '0812 9293 4488';

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export type SubmitResult =
  | { ok: true }
  | { ok: false; fields: Record<string, string> }
  | { ok: false; failed: true };

/**
 * Post one lead. Field errors from the API are handed back rather than thrown,
 * because they belong next to the inputs; anything else is a failure the
 * visitor has to be told about, never swallowed.
 */
export async function submitLead(payload: Record<string, unknown>): Promise<SubmitResult> {
  try {
    const res = await fetch(LEADS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        source_path: window.location.pathname + window.location.search,
      }),
    });

    if (res.ok) return { ok: true };

    const data = await res.json().catch(() => null);
    if (res.status === 400 && data?.fields) {
      return { ok: false, fields: data.fields as Record<string, string> };
    }
    return { ok: false, failed: true };
  } catch {
    // Offline, or the API is down.
    return { ok: false, failed: true };
  }
}

/** Send the visitor to the first thing they need to correct. */
export const focusFirstError = () =>
  document.querySelector('[aria-invalid="true"]')?.scrollIntoView({ block: 'center' });
