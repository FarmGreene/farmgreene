"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AxiosError } from "axios";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { joinWaitlist } from "@/lib/services/waitlist.service";
import { cn } from "@/lib/utils";

/**
 * The agent waitlist, posting to the waitlist module that already exists in
 * the backend — segment MARKET_AGENT, with the area recorded so we know which
 * states to open first.
 *
 * A 409 means the address is already on the list. That's a success from the
 * visitor's point of view, so it's reported as one rather than as an error.
 */
const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  area: z
    .string()
    .min(2, "Tell us the state or area you could cover")
    .max(120),
});

type Values = z.infer<typeof schema>;

export function AgentWaitlistForm({ className }: { className?: string }) {
  const [joined, setJoined] = useState<string | null>(null);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", area: "" },
  });

  const mutation = useMutation({
    mutationFn: joinWaitlist,
    onSuccess: () => {
      setJoined("You're on the list. We'll write when we open your area.");
      form.reset();
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.status === 409) {
        setJoined("You're already on the list — we haven't forgotten you.");
        form.reset();
        return;
      }
      form.setError("email", {
        message: "That didn't go through. Try again in a moment.",
      });
    },
  });

  if (joined) {
    return (
      <div
        className={cn(
          "rounded-[24px] border border-leaf/25 bg-leaf-tint p-7 md:p-9",
          className,
        )}
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-leaf text-white">
          <Check className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-[1.5rem] font-semibold leading-snug tracking-[-0.02em] text-bark">
          Noted
        </h3>
        <p className="mt-3 text-[15px] leading-[1.65] text-bark-soft">
          {joined}
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          mutation.mutate({
            email: values.email,
            area: values.area,
            segment: "MARKET_AGENT",
            source: "agents-page",
            website: "",
          }),
        )}
        className={cn(
          "space-y-5 rounded-[24px] border border-bark/10 bg-white p-7 md:p-9",
          className,
        )}
      >
        <div>
          <h3 className="font-display text-[1.5rem] font-semibold leading-snug tracking-[-0.02em] text-bark">
            Tell us your area
          </h3>
          <p className="mt-2 text-[15px] leading-[1.65] text-bark-soft">
            Two fields. When we open somewhere, we start where somebody is
            already standing.
          </p>
        </div>

        <FormField
          control={form.control}
          name="area"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[14px] font-medium text-bark">
                State or area you could cover
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g. Oyo — Bodija and Sasa markets"
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

        <button
          type="submit"
          disabled={mutation.isPending}
          className="inline-flex h-12 items-center rounded-full bg-leaf px-6 text-[15px] font-semibold text-white transition-colors hover:bg-leaf-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {mutation.isPending ? "Adding you…" : "Join the waitlist"}
        </button>
      </form>
    </Form>
  );
}
