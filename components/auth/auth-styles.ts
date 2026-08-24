/**
 * Shared button styling for the auth flow.
 *
 * These five forms had drifted into three different looks: the shadcn default
 * `bg-primary` with `rounded-md`, a hardcoded `bg-[#049878]` with `rounded-md`
 * and a larger type size, and a hardcoded `bg-[#049878]` pill at the default
 * height. Signing in and signing up sit one click apart, so the difference was
 * visible in normal use.
 *
 * Kept as class constants rather than new Button variants because these are
 * specific to the auth pages, which render on the fixed-light public shell and
 * use the marketing palette. Adding variants to components/ui/button.tsx would
 * offer them to the dashboard too, where the tokens have no dark counterpart.
 */

/** The action that completes the form: sign in, create account, reset. */
export const AUTH_PRIMARY_BUTTON =
  "h-11 w-full rounded-full bg-leaf text-[15px] font-semibold text-white hover:bg-leaf-dark";

/** Bordered alternative sitting alongside the primary action. */
export const AUTH_SECONDARY_BUTTON =
  "h-11 w-full rounded-full border-bark/15 bg-transparent text-[15px] font-semibold text-bark hover:bg-bark/[0.04]";

/** Quiet tertiary action — going back a step, not a real choice. */
export const AUTH_GHOST_BUTTON =
  "h-11 w-full rounded-full text-[15px] font-medium text-bark-soft hover:bg-bark/[0.04]";
