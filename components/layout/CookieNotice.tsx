"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

/**
 * A notice, not a consent gate — and the distinction is deliberate.
 *
 * Farmgreene sets exactly one cookie: the sign-in session in `useAuthStore`.
 * Strictly-necessary cookies don't require prior consent under the NDPA or
 * GDPR/ePrivacy, and there is no analytics, advertising or preference cookie
 * anywhere in the app. A blocking "Accept / Reject" dialog would therefore be
 * asking permission for something already permitted, and would teach people to
 * dismiss a dialog that protects nothing.
 *
 * If that ever stops being true — the moment any non-essential script is added
 * — this component needs to become a real opt-in gate: default off, nothing
 * loaded until the visitor agrees, and a way to change their mind. Read
 * `hasConsented()` before loading such a script rather than reusing the
 * dismissal flag below, which records only that the notice was read.
 */
const STORAGE_KEY = "farmgreene.cookie-notice.dismissed";

export function CookieNotice() {
  // Starts hidden and only appears after mount: localStorage isn't readable
  // during server rendering, and flashing the bar at people who already
  // dismissed it would be worse than showing it late.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // Storage blocked (private mode, strict settings). Showing the notice
      // every visit is the safe failure — never suppress it on an error.
      setVisible(true);
    }
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Can't remember the dismissal; it'll reappear next visit. Acceptable.
    }
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4 rounded-[20px] border border-bark/10 bg-white/95 p-5 shadow-[0_24px_60px_-24px_rgba(4,35,29,0.45)] backdrop-blur-sm sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        <div className="flex-1">
          <p className="font-display text-[17px] font-semibold leading-snug tracking-[-0.02em] text-bark">
            One cookie, and it only keeps you signed in
          </p>
          <p className="mt-1.5 text-[14px] leading-[1.6] text-bark-soft">
            No analytics, no advertising, no tracking of any kind. Nothing to
            opt out of — we just think you should know.{" "}
            <Link
              href="/privacy"
              className="font-medium text-leaf-deep underline decoration-1 decoration-leaf/40 underline-offset-4 transition-colors hover:decoration-leaf"
            >
              Read the policy
            </Link>
          </p>
        </div>

        <button
          type="button"
          onClick={dismiss}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-leaf px-6 text-[15px] font-semibold text-white transition-colors hover:bg-leaf-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          Got it
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

/**
 * For the future: whether the visitor has actively agreed to non-essential
 * cookies. Always false today, because nothing yet asks. Wire this to a real
 * stored choice before loading any analytics or advertising script.
 */
export function hasConsented(): boolean {
  return false;
}
