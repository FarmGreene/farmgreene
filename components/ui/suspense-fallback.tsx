import { Loader2 } from "lucide-react";

interface SuspenseFallbackProps {
  message?: string;
}

export function SuspenseFallback({
  message = "Loading…",
}: SuspenseFallbackProps) {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <Loader2 className="w-8 h-8 animate-spin" />
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}
