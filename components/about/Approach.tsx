import { ShieldCheck, Eye, Handshake, Database } from "lucide-react";

const principles = [
  {
    icon: Eye,
    title: "Transparency",
    description: "Clear communication and open processes.",
  },
  {
    icon: Handshake,
    title: "Collaboration",
    description: "Building stronger rural economies together.",
  },
  {
    icon: ShieldCheck,
    title: "Accountability",
    description: "Trust-based interactions you can rely on.",
  },
  {
    icon: Database,
    title: "Data Integrity",
    description: "Reliable market intelligence for real decisions.",
  },
];

export default function Approach() {
  return (
    <section className="py-20">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              How We Build Trust and Value
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                We believe sustainable agricultural solutions are built on
                transparency, collaboration, and accountability. Farmgreene
                prioritizes clear communication, reliable data, and user-focused
                design to create a platform that stakeholders can depend on.
              </p>
              <p>
                Our approach is guided by the needs of farmers, equipment
                owners, and agents—ensuring that the platform remains practical,
                accessible, and impactful.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {principles.map((item, i) => (
              <div
                key={i}
                className="bg-slate-50 dark:bg-slate-900 border rounded-xl p-6 hover:border-green-500/50 transition-colors"
              >
                <item.icon className="h-8 w-8 text-green-600 mb-4" />
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
