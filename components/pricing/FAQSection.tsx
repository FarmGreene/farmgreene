import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Can I upgrade or downgrade anytime?",
    a: "Yes, plans are flexible and can be changed as your needs evolve. Changes take effect at the start of the next billing cycle.",
  },
  {
    q: "What happens if I reach my AI report limit?",
    a: "You can either upgrade your plan for a higher limit or wait until your monthly usage resets. We'll notify you when you're getting close.",
  },
  {
    q: "Is this financial or trading advice?",
    a: "No. Farmgreene provides data and analytical tools to support informed decision-making. We do not offer financial advice.",
  },
  {
    q: "Do you offer educational discounts?",
    a: "Yes! Contact our sales team with your institution details for special pricing.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-20">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <h2 className="text-2xl font-bold tracking-tight mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-medium text-lg border-b-0">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
