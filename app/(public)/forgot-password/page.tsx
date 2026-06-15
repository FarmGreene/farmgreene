import { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { Logo } from "@/components/layout/Logo";

export const metadata: Metadata = {
  title: "Forgot Password",
  description:
    "Reset your Farmgreene password. Enter your email and we'll send you a link to get back into your account.",
};

export default function ForgotPasswordPage() {
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
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
