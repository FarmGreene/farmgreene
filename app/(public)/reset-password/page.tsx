"use client";

import { useSearchParams } from "next/navigation";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { AuthPanel } from "@/components/marketing/shared/AuthPanel";
import Link from "next/link";
import { Suspense } from "react";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return (
      <div className="mx-auto w-full max-w-[400px] space-y-5 text-center">
        <h1 className="font-display text-[2rem] font-semibold leading-[1.05] tracking-[-0.03em] text-bark">
          This link doesn&rsquo;t work
        </h1>
        <p className="text-[15px] leading-[1.65] text-bark-soft">
          The reset link is invalid or has expired. Request a fresh one and
          we&rsquo;ll email it straight over.
        </p>
        <Link
          href="/forgot-password"
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-leaf px-6 text-[15px] font-semibold text-white transition-colors hover:bg-leaf-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-field"
        >
          Request a new link
        </Link>
      </div>
    );
  }

  return <ResetPasswordForm token={token} />;
}

export default function ResetPasswordPage() {
  return (
    <div className="w-full lg:grid lg:min-h-[calc(100vh-64px)] lg:grid-cols-2">
      <AuthPanel />
      <div className="flex items-center justify-center bg-field px-6 py-16">
        <Suspense
          fallback={
            <div
              className="h-8 w-8 animate-spin rounded-full border-2 border-leaf border-t-transparent"
              aria-label="Loading"
            />
          }
        >
          <ResetPasswordContent />
        </Suspense>
      </div>
    </div>
  );
}
