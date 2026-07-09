"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Clock3, Search, Star } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { CourseThumbnail } from "@/components/course-thumbnail";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { courseCatalog, getCourseStats, getLastWatched, type Course } from "@/lib/course-catalog";
import { cn } from "@/lib/utils";

const tabs = ["My Courses", "Explore"] as const;
type Tab = (typeof tabs)[number];

export function CoursesLibrary() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("My Courses");
  const [purchasedIds, setPurchasedIds] = useState(() => new Set(courseCatalog.filter((course) => course.purchased).map((course) => course.id)));

  const courses = useMemo(() => courseCatalog.map((course) => ({ ...course, purchased: purchasedIds.has(course.id) })), [purchasedIds]);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return courses.filter((course) => {
      const subjects = course.subjects.map((subject) => subject.title).join(" ");
      const searchable = [course.title, course.faculty, course.category, course.access, subjects].join(" ").toLowerCase();
      return !search || searchable.includes(search);
    });
  }, [courses, query]);

  const purchased = filtered.filter((course) => course.purchased);
  const available = filtered.filter((course) => !course.purchased);
  const visibleCourses = activeTab === "My Courses" ? purchased : available;
  const buyCourse = (id: string) => setPurchasedIds((current) => new Set([...current, id]));

  return (
    <AppShell>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Courses</h1>
        <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted">
          Continue an enrolled course or find a new one when you need it.
        </p>
      </header>

      <section className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between" aria-label="Course controls">
        <div className="flex gap-1 rounded-2xl border border-line bg-white p-1 shadow-card" role="tablist" aria-label="Course sections">
          {tabs.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "focus-ring rounded-xl px-4 py-2 text-sm font-semibold transition-colors",
                activeTab === tab ? "bg-blue-50 text-brand" : "text-muted hover:bg-slate-50 hover:text-ink",
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <label className="relative block w-full lg:max-w-md">
          <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search courses"
            className="focus-ring h-11 w-full rounded-xl border border-line bg-white pl-11 pr-4 text-sm shadow-card outline-none placeholder:text-slate-400"
          />
        </label>
      </section>

      <section aria-labelledby="courses-section-title">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="section-kicker mb-1">{activeTab === "My Courses" ? "Learning library" : "Available courses"}</p>
            <h2 id="courses-section-title" className="section-title">{activeTab}</h2>
          </div>
          <span className="text-xs font-medium text-muted">{visibleCourses.length} courses</span>
        </div>

        {visibleCourses.length > 0 ? (
          <motion.div layout className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleCourses.map((course) => activeTab === "My Courses"
              ? <PurchasedCourseCard key={course.id} course={course} />
              : <ExploreCourseCard key={course.id} course={course} onBuy={() => buyCourse(course.id)} />)}
          </motion.div>
        ) : (
          <EmptyCourses mode={activeTab} query={query} />
        )}
      </section>
    </AppShell>
  );
}

function PurchasedCourseCard({ course }: { course: Course }) {
  const stats = getCourseStats(course);
  const last = getLastWatched(course);

  return (
    <Link href={`/course/${course.id}`} className="group block h-full focus-ring rounded-2xl">
      <motion.article layout className="card flex min-h-[420px] cursor-pointer flex-col p-4 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lift">
        <CourseThumbnail subject={course.thumbnailSubject} tone={course.tone} />
        <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap gap-1.5">
              <Badge>{course.category}</Badge>
              <Badge tone={course.progress === 100 ? "green" : "slate"}>{course.progress === 100 ? "Completed" : "Active"}</Badge>
            </div>
            <h3 className="text-base font-semibold leading-6 text-ink">{course.title}</h3>
            <p className="mt-1 text-sm text-muted">{course.faculty}</p>
          </div>
          <span className="shrink-0 rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">{stats.lecturesCount} lectures</span>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex justify-between text-xs">
            <span className="font-semibold text-slate-700">{course.progress}% complete</span>
            <span className="text-muted">{stats.remainingLectures} left</span>
          </div>
          <Progress value={course.progress} />
        </div>

        <div className="mt-4 rounded-xl border border-line bg-slate-50 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-[.1em] text-muted">Last watched</p>
          <p className="mt-1 truncate text-sm font-semibold text-ink">{last.lecture?.title}</p>
          <p className="mt-1 truncate text-xs text-muted">{last.chapter?.title} • {last.timestamp}</p>
        </div>

        <span className="mt-auto inline-flex h-10 w-full items-center justify-center rounded-xl bg-brand px-4 text-sm font-semibold text-white shadow-sm transition-all duration-200 group-hover:bg-blue-700">
          Start Learning
        </span>
        </div>
      </motion.article>
    </Link>
  );
}

function ExploreCourseCard({ course, onBuy }: { course: Course; onBuy: () => void }) {
  return (
    <motion.article layout className="card flex min-h-[400px] flex-col p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift">
      <CourseThumbnail subject={course.thumbnailSubject} tone={course.tone} />
      <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap gap-1.5">
            <Badge>{course.category}</Badge>
            <Badge tone={course.access === "Free" ? "green" : "slate"}>{course.access}</Badge>
          </div>
          <h3 className="text-base font-semibold leading-6 text-ink">{course.title}</h3>
          <p className="mt-1 text-sm text-muted">{course.faculty}</p>
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
          <Star size={13} className="text-amber-500" fill="currentColor" />
          {course.rating}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 text-sm">
        <span className="flex items-center gap-2 text-muted"><Clock3 size={15} />{course.duration}</span>
        <span className="font-semibold text-ink">{course.price === 0 ? "Free" : `Rs. ${course.price.toLocaleString("en-IN")}`}</span>
      </div>

      <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
        <Link href={`/course/${course.id}`}>
          <Button className="w-full" size="sm" variant="outline">Details</Button>
        </Link>
        <Button size="sm" onClick={onBuy}>{course.price === 0 ? "Enroll" : "Buy"}</Button>
      </div>
      </div>
    </motion.article>
  );
}

function EmptyCourses({ mode, query }: { mode: Tab; query: string }) {
  return (
    <div className="card grid min-h-56 place-items-center p-8 text-center">
      <div>
        <span className="mx-auto grid size-12 place-items-center rounded-xl bg-slate-100 text-muted"><CheckCircle2 size={20} /></span>
        <h3 className="mt-4 text-sm font-semibold text-ink">No courses found</h3>
        <p className="mt-1 max-w-sm text-sm leading-6 text-muted">
          {query ? `No ${mode.toLowerCase()} match your search.` : "There are no courses in this section yet."}
        </p>
      </div>
    </div>
  );
}
