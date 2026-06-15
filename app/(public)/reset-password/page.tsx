"use client";

import { useSearchParams } from "next/navigation";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { Logo } from "@/components/layout/Logo";
import Link from "next/link";
import { Suspense } from "react";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return (
      <div className="mx-auto w-full max-w-[400px] space-y-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Invalid Link</h1>
        <p className="text-muted-foreground">
          This password reset link is invalid or has expired. Please request a
          new one.
        </p>
        <Link href="/forgot-password">
          <button className="w-full h-11 font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2">
            Request New Link
          </button>
        </Link>
      </div>
    );
  }

  return <ResetPasswordForm token={token} />;
}

export default function ResetPasswordPage() {
  return (
    <div className="w-full lg:grid lg:min-h-[calc(100vh-64px)] lg:grid-cols-2 xl:min-h-[calc(100vh-64px)]">
      <div className="hidden bg-green-900 lg:flex lg:flex-col lg:justify-between lg:p-14 lg:text-white">
        <div className="text-white">
          <Logo textSize="text-3xl" variant="white" />
        </div>
        <div className="space-y-4">
          <blockquote className="space-y-2">
            <p className="text-2xl font-medium leading-relaxed">
              &quot;Security matters. With Farmgreene, your account and data are
              always protected with industry-leading practices.&quot;
            </p>
            <footer className="text-sm text-green-200">
              — Farmgreene Security Team
            </footer>
          </blockquote>
        </div>
        <div className="text-green-200 text-sm">
          Your data, your control. <br /> We take security seriously.
        </div>
      </div>
      <div className="flex items-center justify-center py-12 px-6">
        <Suspense
          fallback={
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
          }
        >
          <ResetPasswordContent />
        </Suspense>
      </div>
    </div>
  );
}
