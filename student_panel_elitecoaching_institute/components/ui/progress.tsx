import { cn } from "@/lib/utils";

export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-slate-100", className)} aria-label={`${value}% complete`}>
      <div className="h-full rounded-full bg-brand transition-all duration-500" style={{ width: `${value}%` }} />
    </div>
  );
}
