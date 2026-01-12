import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Lightbulb } from "lucide-react";

export default function MissionVision() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/20">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-background border-none shadow-sm h-full">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 mb-4">
                <Target className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl font-bold">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To empower farmers and equipment owners by providing easy access
                to shared agricultural resources and trustworthy market data
                that support better decisions and sustainable growth.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-background border-none shadow-sm h-full">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 mb-4">
                <Lightbulb className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl font-bold">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We envision an agricultural ecosystem where access to equipment
                is no longer a barrier, data drives smarter decisions, and
                collaboration strengthens rural economies.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
