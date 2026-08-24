"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail } from "lucide-react";
import { sendContactMessage } from "@/lib/services/contact.service";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CONTACT_EMAIL } from "./contact-details";

/**
 * Delivery is a real POST to `/app/contact`, which sends through Resend.
 *
 * Two earlier versions are worth remembering. The first ran `setTimeout(1500)`,
 * logged to the console and said "Message Sent!" — a lie. The second composed a
 * `mailto:`, which was honest but pushed the work onto the visitor and fails
 * silently on any device without a configured mail client.
 *
 * The mailto survives as the fallback: if the request fails, the composed
 * message is still offered rather than lost. Success copy only ever claims
 * what actually happened.
 */

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  reason: z.string().min(1, "Choose what this is about"),
  organisation: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const reasons = [
  "Using the platform",
  "Collecting prices for you",
  "Listing equipment",
  "Partnership",
  "Something else",
];

/** The composed message, kept for the fallback path. */
function mailtoFor(data: FormValues): string {
  const body = [
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
    data.organisation ? `Organisation: ${data.organisation}` : null,
    "",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `Farmgreene — ${data.reason}`,
  )}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [fallback, setFallback] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      reason: "",
      organisation: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: sendContactMessage,
    onSuccess: () => {
      setFallback(null);
      setSent(true);
      form.reset();
    },
    onError: () => {
      // Nothing reached us, so don't claim it did — offer the composed message
      // instead and let the visitor send it themselves.
      setFallback(mailtoFor(form.getValues()));
    },
  });

  function onSubmit(data: FormValues) {
    mutation.mutate({ ...data, website: "" });
  }

  if (sent) {
    return (
      <div className="rounded-[24px] border border-bark/10 bg-white p-8 md:p-10">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-leaf-soft">
          <Mail className="h-5 w-5 text-leaf-deep" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-[1.5rem] font-semibold leading-snug tracking-[-0.02em] text-bark">
          Message sent
        </h3>
        <p className="mt-3 text-[15px] leading-[1.65] text-bark-soft">
          It&rsquo;s with us, and a reply will come to the address you gave. No
          support queue behind this — a person reads it.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-7 inline-flex h-11 items-center rounded-full border border-bark/15 px-5 text-[15px] font-semibold text-bark transition-colors hover:bg-bark/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          Write another
        </button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 rounded-[24px] border border-bark/10 bg-white p-7 md:p-9"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[14px] font-medium text-bark">
                  Your name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="h-11 rounded-xl border-bark/15 bg-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[14px] font-medium text-bark">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="h-11 rounded-xl border-bark/15 bg-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[14px] font-medium text-bark">
                  What&rsquo;s this about
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="!h-11 rounded-xl border-bark/15 bg-field w-full">
                      <SelectValue placeholder="Choose one" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {reasons.map((reason) => (
                      <SelectItem key={reason} value={reason}>
                        {reason}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="organisation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[14px] font-medium text-bark">
                  Organisation{" "}
                  <span className="font-normal text-bark-soft">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="h-11 rounded-xl border-bark/15 bg-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[14px] font-medium text-bark">
                Message
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={6}
                  className="resize-none rounded-xl border-bark/15 bg-field"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {fallback && (
          <div
            role="alert"
            className="rounded-xl border border-[#E8C4BC] bg-[#FBE9E6] p-5"
          >
            <p className="text-[15px] font-semibold text-[#A33B28]">
              That didn&rsquo;t send
            </p>
            <p className="mt-2 text-[14px] leading-[1.6] text-[#A33B28]/85">
              Nothing reached us, so nothing has been lost — try again, or send
              it yourself and your message comes through the same way.
            </p>
            <a
              href={fallback}
              className="mt-4 inline-flex h-10 items-center gap-2 rounded-full border border-[#A33B28]/30 px-4 text-[14px] font-semibold text-[#A33B28] transition-colors hover:bg-[#A33B28]/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A33B28]"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Open it in your mail app
            </a>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-leaf px-6 text-[15px] font-semibold text-white transition-colors hover:bg-leaf-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {mutation.isPending ? "Sending…" : "Send message"}
          </button>
          <p className="text-[13px] text-bark-soft">
            Goes straight to a person, not a ticket queue.
          </p>
        </div>
      </form>
    </Form>
  );
}
