"use client";

import { useState, FormEvent } from "react";
import { Loader2, CheckCircle2, Sparkles } from "lucide-react";
import { apiClient } from "@/lib/api/axios";

export default function WaitlistInput() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await apiClient.post("/waitlist/join", {
        email,
        source: "hero",
      });
      setStatus("success");
      setMessage(res.data.message);
    } catch (err: unknown) {
      setStatus("error");
      if (
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response &&
        err.response.data &&
        typeof err.response.data === "object" &&
        "message" in err.response.data
      ) {
        setMessage(
          String((err.response as { data: { message: string } }).data.message),
        );
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100">
          <CheckCircle2 className="h-5 w-5 text-brand-600" />
        </div>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {message}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-4 w-4 text-brand-500" />
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
          Be the first to know when we launch
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="Enter your email"
          required
          className="flex-1 h-12 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 shadow-sm transition-all"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-12 px-6 rounded-full bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold shadow-lg shadow-brand-600/20 transition-all disabled:opacity-60 flex items-center gap-2 shrink-0"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Join Waitlist"
          )}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-sm text-red-500 animate-in fade-in duration-300">
          {message}
        </p>
      )}
    </div>
  );
}
