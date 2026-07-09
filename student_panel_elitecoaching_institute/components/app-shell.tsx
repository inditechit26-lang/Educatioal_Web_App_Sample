"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Bell, BookOpen, ChartNoAxesCombined, ChevronLeft,
  FileText, GraduationCap, LayoutDashboard, LogOut, Menu,
  PanelLeftClose, PanelLeftOpen, PlaySquare, Search, TestTubeDiagonal, X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const nav = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Courses", href: "/courses", icon: BookOpen },
  { label: "Live Classes", href: "/#schedule", icon: PlaySquare },
  { label: "Tests", href: "/#tests", icon: TestTubeDiagonal },
  { label: "Study Material", href: "/learn/physics/lecture-8#resources", icon: FileText },
  { label: "Performance", href: "/#courses", icon: ChartNoAxesCombined },
];

export function AppShell({ children, back }: { children: React.ReactNode; back?: { label: string; href: string } }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [name, setName] = useState("Aarav Singh");

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("eliteCoachingCurrentUser") || "null");
      if (user?.name) setName(user.name);
    } catch { /* use the demo identity */ }
  }, []);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const initials = useMemo(() => name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase(), [name]);
  const sideWidth = collapsed ? "lg:w-[88px]" : "lg:w-[270px]";

  const sidebar = (
    <aside className={cn("fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-line bg-white transition-all duration-300", sideWidth, mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0")}>
      <div className="flex h-[72px] items-center gap-3 border-b border-line px-5">
        <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand text-white"><GraduationCap size={20} /></div>
        {!collapsed && <div className="min-w-0"><p className="truncate text-sm font-bold text-ink">EliteCoaching</p><p className="text-xs text-muted">Student workspace</p></div>}
        <button onClick={() => setMobileOpen(false)} className="ml-auto text-muted lg:hidden" aria-label="Close menu"><X size={20} /></button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Student navigation">
        <div className="space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = item.label === "Dashboard" ? pathname === "/" : item.label === "Courses" ? pathname === "/courses" || pathname.startsWith("/course/") || pathname.startsWith("/learn/") : false;
            return (
              <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)} aria-label={item.label}
                className={cn("group relative flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-muted transition-colors hover:bg-slate-50 hover:text-ink", active && "bg-blue-50 text-brand hover:bg-blue-50 hover:text-brand", collapsed && "lg:justify-center lg:px-0")}>
                <Icon size={19} strokeWidth={1.8} className="shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
                {collapsed && <span role="tooltip" className="pointer-events-none absolute left-[calc(100%+12px)] z-50 hidden whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 lg:block">{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-line p-3">
        <button onClick={() => { localStorage.removeItem("eliteCoachingCurrentUser"); window.location.href = "../auth_elitecoaching_institute/code.html?mode=login"; }} className={cn("flex h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600", collapsed && "lg:justify-center lg:px-0")}>
          <LogOut size={19} strokeWidth={1.8} />{!collapsed && "Logout"}
        </button>
        <button onClick={() => setCollapsed(!collapsed)} className="mt-1 hidden h-10 w-full items-center justify-center rounded-xl text-muted hover:bg-slate-50 lg:flex" aria-label="Toggle sidebar">
          {collapsed ? <PanelLeftOpen size={18} /> : <><PanelLeftClose size={18} /><span className="ml-2 text-xs font-medium">Collapse sidebar</span></>}
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-canvas">
      {sidebar}
      <AnimatePresence>{mobileOpen && <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-slate-900/30 lg:hidden" aria-label="Close navigation overlay" />}</AnimatePresence>

      <div className={cn("transition-[padding] duration-300", collapsed ? "lg:pl-[88px]" : "lg:pl-[270px]")}>
        <header className="sticky top-0 z-30 flex h-[72px] items-center border-b border-line bg-white/95 px-4 backdrop-blur-sm sm:px-6 xl:px-8">
          <button className="mr-3 text-muted lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
          {back && <Link href={back.href} className="mr-4 hidden items-center gap-1 text-sm font-medium text-muted hover:text-ink sm:flex"><ChevronLeft size={17} />{back.label}</Link>}
          <button onClick={() => setSearchOpen(true)} className="flex h-10 w-full max-w-[420px] items-center gap-3 rounded-xl border border-line bg-slate-50 px-3 text-left text-sm text-muted hover:border-slate-300 hover:bg-white">
            <Search size={18} /><span className="flex-1 truncate">Search courses, lectures, resources…</span><kbd className="hidden rounded border border-line bg-white px-1.5 py-0.5 text-[10px] sm:inline">⌘ K</kbd>
          </button>
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <HeaderMenu icon={<Bell size={19} />} label="Notifications" badge items={["Physics class starts in 18 min", "Assignment feedback is ready", "New notes added to Biology"]} />
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild><button className="ml-1 flex items-center gap-2 rounded-xl p-1.5 text-left hover:bg-slate-50"><span className="grid size-9 place-items-center rounded-xl bg-blue-100 text-xs font-bold text-blue-700">{initials}</span><span className="hidden xl:block"><span className="block text-sm font-semibold leading-4 text-ink">{name}</span><span className="text-xs text-muted">NEET 2026 · Batch A</span></span></button></DropdownMenu.Trigger>
              <DropdownMenu.Portal><DropdownMenu.Content align="end" className="z-[70] min-w-48 rounded-xl border border-line bg-white p-1.5 shadow-lift"><DropdownMenu.Item className="cursor-pointer rounded-lg px-3 py-2 text-sm outline-none hover:bg-slate-50">Student account</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:py-8 xl:px-8">{children}</main>
      </div>

      <AnimatePresence>{searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} />}</AnimatePresence>
    </div>
  );
}

function HeaderMenu({ icon, label, items, badge }: { icon: React.ReactNode; label: string; items: string[]; badge?: boolean }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild><Button variant="ghost" size="icon" className="relative text-muted" aria-label={label}>{icon}{badge && <span className="absolute right-2 top-2 size-2 rounded-full bg-red-500 ring-2 ring-white" />}</Button></DropdownMenu.Trigger>
      <DropdownMenu.Portal><DropdownMenu.Content align="end" className="z-[70] w-80 rounded-2xl border border-line bg-white p-2 shadow-lift"><p className="px-3 py-2 text-sm font-semibold text-ink">{label}</p>{items.map((item) => <DropdownMenu.Item key={item} className="cursor-pointer rounded-xl px-3 py-3 text-sm text-slate-600 outline-none hover:bg-slate-50">{item}</DropdownMenu.Item>)}</DropdownMenu.Content></DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function SearchDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const results = ["Physics for NEET 2026", "Gauss's law — Lecture 8", "Organic reactions worksheet", "Human Physiology notes"].filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] flex items-start justify-center bg-slate-950/25 px-4 pt-[12vh]" onMouseDown={onClose}>
      <motion.div initial={{ opacity: 0, y: -10, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }} onMouseDown={(e) => e.stopPropagation()} className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
        <div className="flex items-center gap-3 border-b border-line px-4"><Search size={20} className="text-muted" /><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="What do you want to learn?" className="h-14 flex-1 border-0 text-sm outline-none" /><button onClick={onClose} className="text-muted"><X size={19} /></button></div>
        <div className="p-2">{results.length > 0 ? results.map((result, i) => <Link key={result} href={i === 1 ? "/learn/physics/lecture-8" : i === 0 ? "/course/physics" : "/"} onClick={onClose} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-700 hover:bg-slate-50"><span className="grid size-8 place-items-center rounded-lg bg-blue-50 text-brand"><BookOpen size={16} /></span>{result}</Link>) : <div className="grid place-items-center px-6 py-10 text-center"><span className="grid size-11 place-items-center rounded-xl bg-slate-100 text-muted"><Search size={19} /></span><p className="mt-3 text-sm font-semibold text-ink">No learning content found</p><p className="mt-1 text-xs text-muted">Try a course, subject, chapter, or teacher name.</p></div>}</div>
      </motion.div>
    </motion.div>
  );
}
