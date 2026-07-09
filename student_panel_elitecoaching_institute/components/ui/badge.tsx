import { cn } from "@/lib/utils";

export function Badge({ children, tone = "blue", className }: { children: React.ReactNode; tone?: "blue" | "green" | "amber" | "slate"; className?: string }) {
  const tones = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    amber: "bg-amber-50 text-amber-700",
    slate: "bg-slate-100 text-slate-600",
  };
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", tones[tone], className)}>{children}</span>;
}
