"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, CalendarClock, Check, ChevronRight, CircleDot, Clock3,
  FileCheck2, Play, Radio, TimerReset,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { CourseThumbnail } from "@/components/course-thumbnail";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { courses, schedule } from "@/lib/data";

const enter = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.28, ease: "easeOut" as const },
};

export function Dashboard() {
  const [scheduleAction, setScheduleAction] = useState<Record<number, boolean>>({});
  const [testStarted, setTestStarted] = useState<string | null>(null);

  return (
    <AppShell>
      <motion.header {...enter} className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Dashboard</h1>
          <p className="mt-1 text-sm text-muted">Thursday, 9 July · Your learning plan is up to date</p>
        </div>
        <span className="hidden items-center gap-2 text-xs font-medium text-muted sm:flex">
          <span className="size-2 rounded-full bg-green-500" /> Synced just now
        </span>
      </motion.header>

      <div className="grid grid-cols-12 gap-5 xl:gap-6">
        <motion.section {...enter} transition={{ delay: 0.04 }} className="card col-span-12 overflow-hidden lg:col-span-8" aria-labelledby="continue-title">
          <div className="grid min-h-[310px] sm:grid-cols-[240px_1fr] xl:grid-cols-[280px_1fr]">
            <div className="border-b border-line p-4 sm:border-b-0 sm:border-r">
              <CourseThumbnail subject="Physics" tone="blue" large />
            </div>
            <div className="flex min-w-0 flex-col p-5 sm:p-6 xl:p-7">
              <div className="flex items-center justify-between gap-3">
                <p className="section-kicker">Continue learning</p>
                <Badge tone="slate">Lecture 8 of 50</Badge>
              </div>
              <div className="mt-5">
                <p className="text-sm font-medium text-brand">Physics for NEET 2026</p>
                <p className="mt-2 text-xs text-muted">Chapter 3 · Electric Charges and Fields</p>
                <h2 id="continue-title" className="mt-1.5 text-xl font-semibold leading-7 tracking-tight text-ink">Gauss&apos;s Law and its Applications</h2>
                <p className="mt-2 text-sm text-muted">Dr. Arjun Mehta</p>
              </div>
              <div className="mt-auto pt-6">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">68% watched</span>
                  <span className="text-muted">Paused at 24:18</span>
                </div>
                <Progress value={68} />
                <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link href="/learn/physics/lecture-8"><Button size="lg"><Play size={16} fill="currentColor" />Continue from 24:18</Button></Link>
                  <div className="flex items-center gap-2 text-xs text-muted"><Clock3 size={15} /><span><strong className="font-semibold text-slate-700">21 min</strong> remaining in this lecture</span></div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section {...enter} transition={{ delay: 0.08 }} id="schedule" className="card col-span-12 p-5 lg:col-span-4 xl:p-6" aria-labelledby="schedule-title">
          <div className="mb-5 flex items-center justify-between">
            <div><p className="section-kicker mb-1">Today</p><h2 id="schedule-title" className="section-title">Schedule</h2></div>
            <CalendarClock size={19} className="text-muted" />
          </div>
          <div>
            {schedule.map((item, index) => (
              <article key={item.subject} className="grid grid-cols-[58px_1fr] gap-3 pb-5 last:pb-0">
                <time className="pt-0.5 text-right"><span className="block text-xs font-semibold text-ink">{item.time.split(" ")[0]}</span><span className="text-[10px] text-muted">{item.time.split(" ")[1]}</span></time>
                <div className="relative border-l border-line pl-4">
                  <span className={`absolute -left-1 top-1 size-2 rounded-full ring-4 ring-white ${item.status === "live" ? "bg-green-500" : "bg-slate-300"}`} />
                  <div className="flex items-center gap-2"><span className="text-[10px] font-semibold uppercase tracking-[.1em] text-muted">{item.type}</span>{item.status === "live" && <span className="text-[10px] font-semibold text-green-600">STARTS SOON</span>}</div>
                  <h3 className="mt-1 text-sm font-semibold leading-5 text-ink">{item.subject}</h3>
                  <p className="mt-0.5 text-xs text-muted">{item.teacher}</p>
                  <Button variant={item.status === "live" ? "default" : "outline"} size="sm" className="mt-3" onClick={() => setScheduleAction((current) => ({ ...current, [index]: true }))}>
                    {scheduleAction[index] ? <><Check size={14} />Ready</> : item.action}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section {...enter} transition={{ delay: 0.12 }} id="courses" className="col-span-12" aria-labelledby="courses-title">
          <SectionHeading eyebrow="Your learning" title="Courses" action={<Link href="/courses" className="flex items-center gap-1 text-sm font-semibold text-brand hover:text-blue-700">View all <ChevronRight size={16} /></Link>} />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <article key={course.id} className="card group flex h-full flex-col p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift">
                <CourseThumbnail subject={course.subject} tone={course.tone} />
                <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
                  <h3 className="text-base font-semibold text-ink">{course.name}</h3>
                  <p className="mt-1 text-sm text-muted">{course.faculty}</p>
                  <div className="mb-2 mt-5 flex justify-between text-xs"><span className="font-semibold text-slate-700">{course.progress}% complete</span><span className="text-muted">{course.completed} / {course.completed + course.remaining} lectures</span></div>
                  <Progress value={course.progress} />
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <Link href={course.id === "physics" ? "/learn/physics/lecture-8" : "/learn/physics/lecture-8"}><Button size="sm" className="w-full">Continue <ArrowRight size={14} /></Button></Link>
                    <Link href="/course/physics"><Button variant="outline" size="sm" className="w-full">Curriculum</Button></Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section {...enter} transition={{ delay: 0.16 }} id="tests" className="col-span-12 lg:col-span-7" aria-labelledby="upcoming-tests-title">
          <SectionHeading eyebrow="Plan ahead" title="Upcoming tests" />
          <div className="card divide-y divide-line px-5">
            {[
              { subject: "Physics", title: "Electrostatics chapter test", date: "11 Jul · 4:00 PM", duration: "45 min", countdown: "1d 6h" },
              { subject: "Chemistry", title: "Organic reactions mock", date: "14 Jul · 10:00 AM", duration: "60 min", countdown: "4d 20h" },
            ].map((test) => (
              <article key={test.title} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600"><TimerReset size={18} /></span>
                <div className="min-w-0 flex-1"><p className="text-xs font-semibold text-amber-700">{test.subject}</p><h3 className="mt-0.5 truncate text-sm font-semibold text-ink">{test.title}</h3><p className="mt-1 text-xs text-muted">{test.date} · {test.duration}</p></div>
                <div className="flex items-center justify-between gap-3 sm:justify-end"><span className="text-xs text-muted">In <strong className="text-ink">{test.countdown}</strong></span><Button size="sm" variant="outline" onClick={() => setTestStarted(test.title)}>{testStarted === test.title ? <><Check size={14} />Ready</> : "Start"}</Button></div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section {...enter} transition={{ delay: 0.18 }} className="col-span-12 lg:col-span-5" aria-labelledby="recent-announcements-title">
          <SectionHeading eyebrow="Institute updates" title="Recent announcements" />
          <div className="card px-5">
            {[
              { title: "New Physics practice set added", detail: "Electrostatics · 18 questions", time: "2h ago", icon: FileCheck2 },
              { title: "Biology class timing updated", detail: "Today’s class moved to 5:30 PM", time: "Yesterday", icon: Radio },
              { title: "Organic Chemistry notes available", detail: "Module 4 · Reaction mechanisms", time: "2d ago", icon: CircleDot },
            ].map((announcement) => {
              const Icon = announcement.icon;
              return <article key={announcement.title} className="flex gap-3 border-b border-line py-4 last:border-0"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-500"><Icon size={16} /></span><div className="min-w-0 flex-1"><h3 className="text-sm font-semibold text-ink">{announcement.title}</h3><p className="mt-1 text-xs text-muted">{announcement.detail}</p></div><time className="shrink-0 text-[11px] text-slate-400">{announcement.time}</time></article>;
            })}
          </div>
        </motion.section>
      </div>
    </AppShell>
  );
}

function SectionHeading({ eyebrow, title, action }: { eyebrow: string; title: string; action?: React.ReactNode }) {
  return <div className="mb-4 flex items-end justify-between gap-4"><div><p className="section-kicker mb-1">{eyebrow}</p><h2 id={`${title.toLowerCase().replaceAll(" ", "-")}-title`} className="section-title">{title}</h2></div>{action}</div>;
}
