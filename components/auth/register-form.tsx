"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { AUTH_PRIMARY_BUTTON } from "./auth-styles";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useRegister } from "@/lib/hooks/useAuth";

/**
 * One screen. There used to be a role-selection step in front of this, forcing
 * a choice between "Farmer / User" and "Equipment Owner" before anyone had
 * seen the product.
 *
 * That step is gone because roles are additive — `User.roles` is an array, and
 * OWNER can be granted later from inside the app when someone actually goes to
 * list a machine. Asking up front cost a screen, split the funnel, and got the
 * common case wrong: a farmer who owns a tractor is both, and the fork made
 * them pick one.
 */
const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and privacy policy",
  }),
});

type RegisterValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { mutate: registerUser, isPending, error } = useRegister();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { agreedToTerms: false },
  });

  async function onSubmit(data: RegisterValues) {
    const nameParts = data.fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    registerUser({
      email: data.email,
      password: data.password,
      firstName,
      lastName,
      // Everyone starts here. OWNER is added the moment someone begins a
      // listing; AGENT stays admin-granted.
      roles: ["FARMER"],
    });
  }

  return (
    <div className="mx-auto w-full max-w-[500px] space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="font-display text-3xl font-semibold tracking-[-0.02em] text-bark">
          Create your account
        </h1>
        <p className="text-bark-soft">
          Free while we&rsquo;re in early access. No card needed.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              autoCapitalize="words"
              autoComplete="name"
              disabled={isPending}
              {...register("fullName")}
              className="h-11 rounded-xl border-bark/15"
            />
            {errors.fullName && (
              <p className="text-sm text-[#A33B28]">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isPending}
              {...register("email")}
              className="h-11 rounded-xl border-bark/15"
            />
            <p className="text-xs text-bark-soft">
              Use an address that works — you&rsquo;ll need it to sign in and to
              get price alerts.
            </p>
            {errors.email && (
              <p className="text-sm text-[#A33B28]">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              disabled={isPending}
              {...register("password")}
              className="h-11 rounded-xl border-bark/15"
            />
            <p className="text-xs text-bark-soft">At least 8 characters.</p>
            {errors.password && (
              <p className="text-sm text-[#A33B28]">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        {error && (
          <p role="alert" className="text-sm text-[#A33B28]">
            {error instanceof Error
              ? error.message
              : "That didn't go through. Try again."}
          </p>
        )}

        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Controller
              name="agreedToTerms"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="agreedToTerms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isPending}
                  className="mt-0.5"
                />
              )}
            />
            <Label
              htmlFor="agreedToTerms"
              className="text-xs font-normal leading-relaxed text-bark-soft"
            >
              I agree to the{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-bark"
              >
                terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-bark"
              >
                privacy policy
              </Link>
              .
            </Label>
          </div>
          {errors.agreedToTerms && (
            <p className="text-sm text-[#A33B28]">
              {errors.agreedToTerms.message}
            </p>
          )}
        </div>

        <Button
          className={AUTH_PRIMARY_BUTTON}
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Create account"
          )}
        </Button>
      </form>

      <div className="border-t pt-4 text-center text-sm text-bark-soft">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-leaf-deep underline underline-offset-4"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
