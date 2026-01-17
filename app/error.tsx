"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ErrorIllustration } from "@/components/ui/illustrations";
import { RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mb-8 w-full max-w-md">
        <ErrorIllustration className="h-auto w-full" />
      </div>

      <h1 className="mb-2 text-4xl font-extrabold tracking-tight lg:text-5xl text-red-900 dark:text-red-100 font-heading">
        Something went wrong!
      </h1>

      <p className="mb-8 text-lg text-muted-foreground max-w-md mx-auto">
        We encountered an unexpected error. Don't worry, nothing is lost. Please
        try refreshing the page.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={() => reset()}
          size="lg"
          className="bg-red-600 hover:bg-red-700 text-white min-w-[150px]"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
