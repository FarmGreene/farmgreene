import { Newspaper, Bell } from "lucide-react";

export default function MarketNews() {
  return (
    <section className="py-20 bg-yellow-50/50 dark:bg-yellow-900/5">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 text-yellow-600 mb-2">
            <Newspaper className="h-6 w-6" />
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Stay Informed With Relevant Market News
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Beyond price data, Farmgreene aggregates commodity-related news and
            market signals to provide context around price movements. Users can
            stay informed about supply changes, policy updates, and broader
            market events—without information overload.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-yellow-700 bg-yellow-100/50 py-2 px-4 rounded-full inline-block">
            <Bell className="h-4 w-4" /> Higher plans unlock deeper coverage and
            AI-summarized insights.
          </div>
        </div>
      </div>
    </section>
  );
}
