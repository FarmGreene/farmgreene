import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does it take to get a response?",
    answer: "We usually respond within 24 hours on business days.",
  },
  {
    question: "Can I request a demo of Market Intelligence features?",
    answer:
      "Yes. Simply choose “Sales & Pricing” in the contact form, and our sales team will arrange a demo for you.",
  },
  {
    question: "Do you support field agents directly?",
    answer:
      "Yes. Farmgreene has dedicated tools and workflows designed specifically for agents to manage their operations.",
  },
  {
    question: "Is Farmgreene available outside Nigeria?",
    answer:
      "Expansion is currently planned. Please reach out to us for regional partnership opportunities.",
  },
];

export default function ContactFAQ() {
  return (
    <section className="py-16 md:py-24 bg-slate-50/50 dark:bg-slate-900/20">
      <div className="container px-4 md:px-6 mx-auto max-w-3xl">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Quick answers to common questions before you reach out.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-slate-200 dark:border-slate-800"
            >
              <AccordionTrigger className="text-left font-medium hover:text-[#049878]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
