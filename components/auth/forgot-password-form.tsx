"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useForgotPassword } from "@/lib/hooks/useAuth";
import { useAuthStore } from "@/lib/store/useAuthStore";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const { mutate: forgotPassword, isPending } = useForgotPassword();
  const { error, clearError } = useAuthStore();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: ForgotPasswordValues) {
    clearError();
    forgotPassword(data.email, {
      onSuccess: () => setIsSubmitted(true),
    });
  }

  if (isSubmitted) {
    return (
      <div className="mx-auto w-full max-w-[400px] space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-500">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Check Your Email
          </h1>
          <p className="text-muted-foreground max-w-[320px]">
            If an account exists with that email, we&apos;ve sent you a link to
            reset your password. It expires in 1 hour.
          </p>
        </div>

        <div className="space-y-3">
          <Button
            className="w-full h-11 font-semibold"
            variant="outline"
            onClick={() => setIsSubmitted(false)}
          >
            Try a different email
          </Button>

          <div className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-500"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[400px] space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-500">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Forgot Password?</h1>
        <p className="text-muted-foreground">
          No worries. Enter the email address associated with your account and
          we&apos;ll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
            {error}
          </div>
        )}

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
            className="h-11"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <Button
          className="w-full h-11 font-semibold"
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Send Reset Link"
          )}
        </Button>
      </form>

      <div className="text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Sign In
        </Link>
      </div>

      <div className="text-center text-xs text-muted-foreground pt-4 border-t">
        We&apos;ll send a secure link to your email. The link expires after 1
        hour for your protection.
      </div>
    </div>
  );
}
