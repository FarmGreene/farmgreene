/**
 * Where "become an agent" should send someone.
 *
 * Two states, and the env var is the switch between them:
 *
 * - Agent onboarding is NOT open. There's no budget to pay agents yet, so the
 *   action is the waitlist form further down the page, which posts to the
 *   backend's existing waitlist module as segment MARKET_AGENT. That's the
 *   state today.
 * - Agent onboarding IS open, once the separate field-agent app is deployed
 *   and NEXT_PUBLIC_AGENT_APP_URL points at it. Then the action becomes a real
 *   application and this page needs no edit.
 *
 * An earlier version hardcoded a fallback of "http://localhost:3100", which is
 * why the call-to-action was commented out rather than shipped. A later one
 * used a mailto:, which the waitlist endpoint makes unnecessary.
 */

export type AgentAction = {
  href: string;
  label: string;
  /** True while onboarding is closed, so copy can say so plainly. */
  waitlist: boolean;
};

export function getAgentAction(): AgentAction {
  const agentApp = process.env.NEXT_PUBLIC_AGENT_APP_URL;

  if (agentApp && agentApp.startsWith("http")) {
    return { href: agentApp, label: "Apply to be an agent", waitlist: false };
  }

  return { href: "#waitlist", label: "Join the waitlist", waitlist: true };
}
