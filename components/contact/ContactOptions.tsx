import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BarChart2, Handshake, Terminal } from "lucide-react";
import Link from "next/link";

const options = [
  {
    title: "General Support",
    description:
      "Need help using Farmgreene or have questions about your account?",
    icon: Users,
    cta: "Contact Support",
    href: "#form",
    variant: "default" as const,
  },
  {
    title: "Sales & Pricing",
    description:
      "Interested in Market Intelligence, AI reports, or enterprise pricing?",
    icon: BarChart2,
    cta: "Talk to Sales",
    href: "#form",
    variant: "default" as const,
  },
  {
    title: "Partnerships",
    description:
      "Want to collaborate on agricultural data, insights, or expansion?",
    icon: Handshake,
    cta: "Become a Partner",
    href: "#form",
    variant: "default" as const,
  },
  {
    title: "Technical & API",
    description: "Questions about data access, APIs, or integrations?",
    icon: Terminal,
    cta: "Technical Enquiry",
    href: "#form",
    variant: "default" as const,
  },
];

export default function ContactOptions() {
  return (
    <section className="py-12 md:py-20 -mt-8 relative z-20 container px-4 md:px-6 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {options.map((option, index) => {
          const Icon = option.icon;
          return (
            <Card
              key={index}
              className="flex flex-col h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-[#049878] dark:text-green-400 mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-bold">
                  {option.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {option.description}
                </p>
              </CardContent>
              <CardFooter className="pt-2">
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-green-200 hover:border-green-300 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/20"
                >
                  <Link href={option.href}>{option.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
