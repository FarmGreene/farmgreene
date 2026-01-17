import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NotFoundIllustration } from "@/components/ui/illustrations";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mb-8 w-full max-w-md">
        <NotFoundIllustration className="h-auto w-full" />
      </div>

      <h1 className="mb-2 text-4xl font-extrabold tracking-tight lg:text-5xl text-green-900 dark:text-green-100 font-heading">
        Page Not Found
      </h1>

      <p className="mb-8 text-lg text-muted-foreground max-w-md mx-auto">
        Looks like you've wandered off the path. The page you are looking for
        might have been moved or doesn't exist.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
          <Link href="/dashboard">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  );
}
