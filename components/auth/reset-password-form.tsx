"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { AUTH_PRIMARY_BUTTON } from "./auth-styles";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useResetPassword } from "@/lib/hooks/useAuth";
import { useAuthStore } from "@/lib/store/useAuthStore";

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm({ token }: { token: string }) {
  const { mutate: resetPassword, isPending } = useResetPassword();
  const { error, clearError } = useAuthStore();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  async function onSubmit(data: ResetPasswordValues) {
    clearError();
    resetPassword(
      { token, newPassword: data.newPassword },
      { onSuccess: () => setIsSubmitted(true) },
    );
  }

  if (isSubmitted) {
    return (
      <div className="mx-auto w-full max-w-[400px] space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-500">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2 className="h-8 w-8 text-[#049878]" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Password Updated
          </h1>
          <p className="text-muted-foreground max-w-[320px]">
            Your password has been successfully reset. You can now sign in with
            your new password.
          </p>
        </div>

        <Link href="/login">
          <Button className={AUTH_PRIMARY_BUTTON}>Sign In</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[400px] space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-500">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Create New Password
        </h1>
        <p className="text-muted-foreground">
          Choose a strong password that you haven&apos;t used before. Your
          password must be at least 6 characters.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            autoComplete="new-password"
            disabled={isPending}
            {...register("newPassword")}
            className="h-11"
          />
          {errors.newPassword && (
            <p className="text-sm text-red-500">{errors.newPassword.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            disabled={isPending}
            {...register("confirmPassword")}
            className="h-11"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
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
            "Reset Password"
          )}
        </Button>
      </form>

      <div className="text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#049878] hover:text-green-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Sign In
        </Link>
      </div>

      <div className="text-center text-xs text-muted-foreground pt-4 border-t">
        Your information is protected. Farmgreene uses secure authentication to
        keep your data safe.
      </div>
    </div>
  );
}
