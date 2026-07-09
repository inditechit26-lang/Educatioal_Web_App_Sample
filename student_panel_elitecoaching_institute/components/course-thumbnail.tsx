import { Atom, Dna, FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";

const styles = {
  blue: "bg-blue-50 text-blue-700 border-blue-100",
  violet: "bg-violet-50 text-violet-700 border-violet-100",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

export function CourseThumbnail({ subject, tone = "blue", large = false }: { subject: string; tone?: string; large?: boolean }) {
  const Icon = subject === "Biology" ? Dna : subject === "Chemistry" ? FlaskConical : Atom;
  return (
    <div className={cn("relative flex overflow-hidden border", styles[tone as keyof typeof styles] || styles.blue, large ? "min-h-52 rounded-2xl p-7" : "h-36 rounded-xl p-5")}>
      <div className="relative z-10 flex flex-col justify-between"><span className="text-xs font-semibold uppercase tracking-[.16em] opacity-70">Core subject</span><div><Icon size={large ? 42 : 30} strokeWidth={1.5} /><p className={cn("mt-2 font-semibold", large ? "text-2xl" : "text-lg")}>{subject}</p></div></div>
      <Icon className="absolute -bottom-10 -right-8 opacity-[.07]" size={large ? 210 : 150} strokeWidth={1.2} />
    </div>
  );
}
