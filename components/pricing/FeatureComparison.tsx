import { Check, Minus } from "lucide-react";

const features = [
  {
    name: "Historical Data",
    starter: "2 Years",
    insight: "10 Years",
    intelligence: "Full History",
    enterprise: "Custom",
  },
  {
    name: "Real-time Updates",
    starter: false,
    insight: true,
    intelligence: true,
    enterprise: true,
  },
  {
    name: "AI Summaries",
    starter: false,
    insight: true,
    intelligence: true,
    enterprise: true,
  },
  {
    name: "AI Reports / Mo",
    starter: "-",
    insight: "10",
    intelligence: "Unlimited",
    enterprise: "Unlimited",
  },
  {
    name: "Charting Tools",
    starter: "Basic",
    insight: "Advanced",
    intelligence: "TradingView Pro",
    enterprise: "Custom",
  },
  {
    name: "Workspaces",
    starter: "1",
    insight: "1",
    intelligence: "Shared",
    enterprise: "Unlimited",
  },
  {
    name: "Users",
    starter: "1",
    insight: "1",
    intelligence: "Up to 10",
    enterprise: "Unlimited",
  },
  {
    name: "API Access",
    starter: false,
    insight: false,
    intelligence: false,
    enterprise: true,
  },
];

export default function FeatureComparison() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/20">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold tracking-tight">
            Compare Plans at a Glance
          </h2>
          <p className="text-muted-foreground mt-2">
            Choose the plan that matches your depth of analysis.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-4 px-6 font-semibold text-muted-foreground w-1/3">
                  Feature
                </th>
                <th className="py-4 px-6 font-bold text-center">Starter</th>
                <th className="py-4 px-6 font-bold text-center text-[#049878]">
                  Insight
                </th>
                <th className="py-4 px-6 font-bold text-center">
                  Intelligence
                </th>
                <th className="py-4 px-6 font-bold text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {features.map((feature, i) => (
                <tr
                  key={i}
                  className="hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="py-4 px-6 font-medium">{feature.name}</td>
                  <td className="py-4 px-6 text-center text-sm text-muted-foreground">
                    {renderValue(feature.starter)}
                  </td>
                  <td className="py-4 px-6 text-center text-sm font-medium">
                    {renderValue(feature.insight)}
                  </td>
                  <td className="py-4 px-6 text-center text-sm text-muted-foreground">
                    {renderValue(feature.intelligence)}
                  </td>
                  <td className="py-4 px-6 text-center text-sm text-muted-foreground">
                    {renderValue(feature.enterprise)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function renderValue(val: string | boolean) {
  if (typeof val === "boolean") {
    return val ? (
      <Check className="h-5 w-5 mx-auto text-[#049878]" />
    ) : (
      <Minus className="h-4 w-4 mx-auto text-slate-300" />
    );
  }
  return val;
}
