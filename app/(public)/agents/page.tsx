import { Metadata } from "next";
import { AgentsHero } from "@/components/marketing/agents/AgentsHero";
import { TheTwoJobs } from "@/components/marketing/agents/TheTwoJobs";
import { GettingStarted } from "@/components/marketing/agents/GettingStarted";
import { getAgentAction } from "@/components/marketing/agents/agent-app";
import { ClosingBand } from "@/components/marketing/ClosingBand";

export const metadata: Metadata = {
  title: "Become an Agent",
  description:
    "Collect market prices for Farmgreene in your own area. We're not onboarding agents yet — join the waitlist and we'll open your area first.",
};

export default function AgentsPage() {
  const action = getAgentAction();

  return (
    <div className="bg-field">
      <AgentsHero />
      <TheTwoJobs />
      <GettingStarted />
      <ClosingBand
        title="Be the reason"
        accent="the numbers are real"
        lede={
          action.waitlist
            ? "One person can't walk every market. Tell us where you are, and yours could be the area we open next."
            : "Apply with an agent account and we'll review it before activating you."
        }
        image="/images/stakeholder-agent.jpg"
        primary={{ href: action.href, label: action.label }}
        secondary={{ href: "/marketplace", label: "See the marketplace" }}
      />
    </div>
  );
}
