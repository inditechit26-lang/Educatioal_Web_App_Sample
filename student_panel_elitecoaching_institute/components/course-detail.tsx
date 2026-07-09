"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, Atom, BookOpenCheck, CalendarDays, Check, CheckCircle2, ChevronLeft,
  Clock3, Download, Dna, FileDown, FileText, FlaskConical, Lock, Play, Search,
  Timer, Trophy, Upload,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getCourse, getCourseStats, getLastWatched, type Chapter, type Course, type Subject } from "@/lib/course-catalog";
import { cn } from "@/lib/utils";

const workspaceTabs = ["Overview", "Classes", "Tests", "Study Material", "Assignments"] as const;
type WorkspaceTab = (typeof workspaceTabs)[number];

export function CourseDetail({ courseId = "physics" }: { courseId?: string }) {
  const course = getCourse(courseId);
  const stats = getCourseStats(course);
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("Classes");

  return (
    <AppShell>
      <header className="mb-4 border-b border-line pb-5">
        <Link href="/courses" className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink">
          <ChevronLeft size={17} />
          Back to Courses
        </Link>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-ink">{course.title}</h1>
            <p className="mt-2 text-sm text-muted">
              {course.subjects.map((subject) => subject.title).join(", ")} • {stats.lecturesCount} Lectures • Progress {course.progress}%
            </p>
          </div>
          <Badge tone={course.purchased ? "green" : "amber"}>{course.purchased ? "Enrolled" : course.access}</Badge>
        </div>
      </header>

      <nav className="sticky top-[72px] z-20 -mx-4 border-b border-line bg-canvas/95 px-4 backdrop-blur-sm sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8" aria-label="Course workspace tabs">
        <div className="flex overflow-x-auto">
          {workspaceTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "shrink-0 border-b-2 px-1 py-3.5 text-sm font-semibold transition-colors sm:mr-8",
                activeTab === tab ? "border-brand text-brand" : "border-transparent text-muted hover:text-ink",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }} className="mt-6">
          {activeTab === "Overview" && <OverviewTab course={course} onNavigate={setActiveTab} />}
          {activeTab === "Classes" && <ClassesTab course={course} />}
          {activeTab === "Tests" && <TestsTab course={course} />}
          {activeTab === "Study Material" && <StudyMaterialTab course={course} />}
          {activeTab === "Assignments" && <AssignmentsTab />}
        </motion.div>
      </AnimatePresence>
    </AppShell>
  );
}

function OverviewTab({ course, onNavigate }: { course: Course; onNavigate: (tab: WorkspaceTab) => void }) {
  const stats = getCourseStats(course);
  const last = getLastWatched(course);
  const overview = getOverviewStats(course);
  const meta = getCourseMeta(course);
  const upcoming = [
    { title: "Electrostatics live problem solving", type: "Live Class", date: "10 Jul 2026", time: "10:00 AM", status: "Upcoming", tab: "Classes" as WorkspaceTab },
    { title: "Chapter test: Electric Charges", type: "Test", date: "12 Jul 2026", time: "06:00 PM", status: "Scheduled", tab: "Tests" as WorkspaceTab },
    { title: "Gauss Law Practice Set", type: "Assignment", date: "11 Jul 2026", time: "11:59 PM", status: "Pending", tab: "Assignments" as WorkspaceTab },
    { title: "Applications of Gauss's Law", type: "New Lecture", date: "09 Jul 2026", time: "04:30 PM", status: "Uploaded", tab: "Classes" as WorkspaceTab },
  ];

  return (
    <div className="space-y-5">
      <section className="card p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="section-kicker mb-2">Course overview</p>
            <h2 className="text-xl font-semibold tracking-tight text-ink">{course.title}</h2>
            <p className="mt-2 text-sm text-muted">{course.category} • {course.faculty} • {course.progress === 100 ? "Completed" : "Active"}</p>
          </div>
          <Badge tone={course.progress === 100 ? "green" : "blue"}>{course.progress === 100 ? "Completed" : "Active"}</Badge>
        </div>
      </section>

      <section className="card p-5">
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="rounded-2xl border border-line bg-slate-50 p-5">
            <p className="section-kicker mb-3">Course progress</p>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-semibold tracking-tight text-ink">{course.progress}%</span>
              <span className="pb-1 text-sm text-muted">complete</span>
            </div>
            <Progress value={course.progress} className="mt-5 h-2.5" />
            <Link href={`/learn/${course.id}/${last.lecture?.id ?? "lecture-8"}`} className="mt-5 block">
              <Button className="w-full">Continue Learning</Button>
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <SummaryItem label="Completed Subjects" value={`${overview.completedSubjects}/${stats.subjectsCount}`} />
            <SummaryItem label="Completed Chapters" value={`${overview.completedChapters}/${stats.chaptersCount}`} />
            <SummaryItem label="Completed Lectures" value={`${stats.completedLectures}/${stats.lecturesCount}`} />
            <SummaryItem label="Pending Lectures" value={stats.remainingLectures.toString()} />
            <SummaryItem label="Watch Time" value={overview.watchTime} />
            <SummaryItem label="Time Remaining" value={overview.remainingTime} />
            <SummaryItem label="Last Studied" value={overview.lastStudiedDate} />
            <SummaryItem label="Current Chapter" value={last.chapter?.title ?? "Not started"} />
            <SummaryItem label="Current Lecture" value={last.lecture?.title ?? "Not started"} />
          </div>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-2">
        <section className="card p-5">
          <SectionTitle eyebrow="Course details" title="Batch and enrollment" />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Detail label="Course Duration" value={course.duration} />
            <Detail label="Batch Start Date" value={meta.batchStart} />
            <Detail label="Batch End Date" value={meta.batchEnd} />
            <Detail label="Batch Valid Till" value={meta.validTill} />
            <Detail label="Enrollment Date" value={meta.enrollmentDate} />
            <Detail label="Course Language" value={meta.language} />
            <Detail label="Course Type" value={meta.type} />
            <Detail label="Faculty Name" value={course.faculty} />
            <Detail label="Total Subjects" value={stats.subjectsCount.toString()} />
            <Detail label="Total Chapters" value={stats.chaptersCount.toString()} />
            <Detail label="Total Lectures" value={stats.lecturesCount.toString()} />
            <Detail label="Course Status" value={course.progress === 100 ? "Completed" : "Active"} />
          </div>
        </section>

        <section className="card p-5">
          <SectionTitle eyebrow="Learning progress" title="Current learning state" />
          <div className="mt-4 space-y-3">
            <ProgressRow label="Completed Lectures" value={`${stats.completedLectures}`} icon={<CheckCircle2 size={16} />} />
            <ProgressRow label="Pending Lectures" value={`${stats.remainingLectures}`} icon={<Clock3 size={16} />} />
            <ProgressRow label="Completed Chapters" value={`${overview.completedChapters}`} icon={<BookOpenCheck size={16} />} />
            <ProgressRow label="Pending Chapters" value={`${overview.pendingChapters}`} icon={<FileText size={16} />} />
            <ProgressRow label="Completed Subjects" value={`${overview.completedSubjects}`} icon={<Trophy size={16} />} />
            <ProgressRow label="Current Subject" value={last.subject?.title ?? "Not started"} icon={<Atom size={16} />} />
            <ProgressRow label="Current Chapter" value={last.chapter?.title ?? "Not started"} icon={<BookOpenCheck size={16} />} />
            <ProgressRow label="Current Lecture" value={last.lecture?.title ?? "Not started"} icon={<Play size={16} />} />
            <ProgressRow label="Learning Streak" value="7 days" icon={<CalendarDays size={16} />} />
            <ProgressRow label="Attendance" value="92%" icon={<CheckCircle2 size={16} />} />
          </div>
        </section>
      </div>

      <section className="card p-5">
        <SectionTitle eyebrow="Upcoming activities" title="What needs attention" />
        <div className="mt-4 grid gap-3 xl:grid-cols-2">
          {upcoming.map((item) => (
            <article key={item.title} className="rounded-2xl border border-line bg-white p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge tone={item.status === "Pending" ? "amber" : "slate"}>{item.type}</Badge>
                  <h3 className="mt-3 text-sm font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1 text-xs text-muted">{item.date} • {item.time} • {item.status}</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => onNavigate(item.tab)}>Open</Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="card p-5">
        <SectionTitle eyebrow="Quick actions" title="Go directly to the next task" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <Link href={`/learn/${course.id}/${last.lecture?.id ?? "lecture-8"}`}>
            <Button className="w-full">Continue Learning</Button>
          </Link>
          <Button className="w-full" variant="outline" onClick={() => onNavigate("Classes")}>Open Classes</Button>
          <Button className="w-full" variant="outline" onClick={() => onNavigate("Tests")}>Open Tests</Button>
          <Button className="w-full" variant="outline" onClick={() => onNavigate("Study Material")}>Open Study Material</Button>
          <Button className="w-full" variant="outline" onClick={() => onNavigate("Assignments")}>Open Assignments</Button>
        </div>
      </section>

      <section className="card p-5">
        <SectionTitle eyebrow="Course statistics" title="Compact course numbers" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <CompactStat label="Total Subjects" value={stats.subjectsCount} icon={<Atom size={16} />} />
          <CompactStat label="Total Chapters" value={stats.chaptersCount} icon={<BookOpenCheck size={16} />} />
          <CompactStat label="Total Lectures" value={stats.lecturesCount} icon={<Play size={16} />} />
          <CompactStat label="Completed Lectures" value={stats.completedLectures} icon={<CheckCircle2 size={16} />} />
          <CompactStat label="Pending Lectures" value={stats.remainingLectures} icon={<Clock3 size={16} />} />
          <CompactStat label="Downloaded Notes" value={18} icon={<FileDown size={16} />} />
          <CompactStat label="Assignments Submitted" value={7} icon={<Upload size={16} />} />
          <CompactStat label="Tests Attempted" value={5} icon={<Timer size={16} />} />
          <CompactStat label="Certificates Earned" value={1} icon={<Trophy size={16} />} />
        </div>
      </section>

      <section className="card p-5">
        <SectionTitle eyebrow="Recent activity" title="Latest learning actions" />
        <div className="mt-4 divide-y divide-line rounded-2xl border border-line">
          <Activity label="Recently Watched Lecture" value={last.lecture?.title ?? "Not started"} meta={`${last.timestamp} • ${overview.lastStudiedDate}`} />
          <Activity label="Recently Downloaded Notes" value="Gauss Law Formula Summary" meta="08 Jul 2026 • PDF" />
          <Activity label="Last Assignment Submitted" value="Chemical Bonding Worksheet" meta="08 Jul 2026 • Submitted" />
          <Activity label="Last Test Attempted" value="Cell Biology Practice Test" meta="06 Jul 2026 • Result available" />
        </div>
      </section>
    </div>
  );
}

function LegacyOverviewTab({ course }: { course: Course }) {
  const stats = getCourseStats(course);
  const last = getLastWatched(course);

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section className="card p-5">
        <p className="section-kicker mb-2">Course information</p>
        <h2 className="section-title">{course.title}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">{course.description}</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Info label="Faculty" value={course.faculty} />
          <Info label="Total Subjects" value={stats.subjectsCount.toString()} />
          <Info label="Total Chapters" value={stats.chaptersCount.toString()} />
          <Info label="Total Lectures" value={stats.lecturesCount.toString()} />
        </div>

        <div className="mt-5">
          <div className="mb-2 flex justify-between text-sm">
            <span className="font-medium text-slate-700">Overall progress</span>
            <span className="text-muted">{course.progress}%</span>
          </div>
          <Progress value={course.progress} />
        </div>
      </section>

      <aside className="space-y-5">
        <section className="card p-5">
          <p className="section-kicker mb-2">Last watched lecture</p>
          <h2 className="text-base font-semibold text-ink">{last.lecture?.title}</h2>
          <p className="mt-1 text-sm text-muted">{last.subject?.title} • {last.chapter?.title}</p>
          <p className="mt-3 text-xs text-muted">Resume from {last.timestamp}</p>
        </section>

        <Link href={`/learn/${course.id}/${last.lecture?.id ?? "lecture-8"}`} className="card block p-5 transition-all hover:-translate-y-0.5 hover:shadow-lift">
          <p className="section-kicker mb-2">Continue from last lecture</p>
          <h2 className="text-base font-semibold text-ink">{last.chapter?.title}</h2>
          <p className="mt-1 text-sm text-muted">{last.lecture?.title}</p>
          <span className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-xl bg-brand px-4 text-sm font-semibold text-white">
            Continue Learning
          </span>
        </Link>
      </aside>
    </div>
  );
}

function ClassesTab({ course }: { course: Course }) {
  const last = getLastWatched(course);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const selectedSubject = selectedSubjectId ? course.subjects.find((subject) => subject.id === selectedSubjectId) : undefined;
  const selectedChapter = selectedSubject && selectedChapterId ? selectedSubject.chapters.find((chapter) => chapter.id === selectedChapterId) : undefined;

  if (selectedSubject && selectedChapter) {
    return (
      <ChapterWorkspaceView
        course={course}
        subject={selectedSubject}
        chapter={selectedChapter}
        currentLectureId={last.lecture?.id}
        onBack={() => setSelectedChapterId(null)}
      />
    );
  }

  if (selectedSubject) {
    return (
      <SubjectChaptersView
        subject={selectedSubject}
        onBack={() => setSelectedSubjectId(null)}
        onOpenChapter={(chapterId) => setSelectedChapterId(chapterId)}
      />
    );
  }

  return (
    <section aria-labelledby="classes-title">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-kicker mb-1">Classes</p>
          <h2 id="classes-title" className="section-title">Choose a subject</h2>
        </div>
        <p className="text-sm text-muted">{course.subjects.length} subjects available</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {course.subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            lastStudied={last.subject?.id === subject.id ? last.chapter?.title ?? "Recently studied" : getSubjectLastStudied(subject)}
            onOpen={() => setSelectedSubjectId(subject.id)}
          />
        ))}
      </div>
    </section>
  );
}

function SubjectCard({ subject, lastStudied, onOpen }: { subject: Subject; lastStudied: string; onOpen: () => void }) {
  const stats = getSubjectStats(subject);
  const Icon = getSubjectIcon(subject.title);

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18 }}
      className="card group flex min-h-[260px] flex-col p-5 text-left transition-all duration-200 hover:shadow-lift focus-ring"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-brand">
          <Icon size={22} strokeWidth={1.8} />
        </span>
        <ArrowRight size={18} className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-brand" />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-ink">{subject.title}</h3>
      <p className="mt-1 text-sm text-muted">{stats.chapters} chapters • {stats.lectures} lectures</p>

      <div className="mt-5">
        <div className="mb-2 flex justify-between text-xs">
          <span className="font-semibold text-slate-700">Completion</span>
          <span className="text-muted">{subject.progress}%</span>
        </div>
        <Progress value={subject.progress} />
      </div>

      <div className="mt-5 rounded-xl border border-line bg-slate-50 p-3">
        <p className="text-[11px] font-semibold uppercase tracking-[.1em] text-muted">Last studied</p>
        <p className="mt-1 truncate text-sm font-medium text-ink">{lastStudied}</p>
      </div>

      <span className="mt-auto inline-flex h-10 w-full items-center justify-center rounded-xl bg-brand px-4 text-sm font-semibold text-white transition-colors group-hover:bg-blue-700">
        Continue
      </span>
    </motion.button>
  );
}

function SubjectChaptersView({ subject, onBack, onOpenChapter }: { subject: Subject; onBack: () => void; onOpenChapter: (chapterId: string) => void }) {
  const stats = getSubjectStats(subject);

  return (
    <section aria-labelledby="subject-title">
      <button type="button" onClick={onBack} className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink">
        <ChevronLeft size={17} />
        Back to Classes
      </button>

      <header className="mb-5 border-b border-line pb-5">
        <p className="section-kicker mb-1">Subject</p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="subject-title" className="text-2xl font-semibold tracking-tight text-ink">{subject.title}</h2>
            <p className="mt-2 text-sm text-muted">{stats.chapters} Chapters • {stats.lectures} Lectures • {subject.progress}% Completed</p>
          </div>
        </div>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {subject.chapters.map((chapter, index) => (
          <ChapterCard key={chapter.id} chapter={chapter} number={index + 1} onOpen={() => onOpenChapter(chapter.id)} />
        ))}
      </div>
    </section>
  );
}

function ChapterCard({ chapter, number, onOpen }: { chapter: Chapter; number: number; onOpen: () => void }) {
  const completedLectures = chapter.lectures.filter((lectureItem) => lectureItem.completed).length;

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18 }}
      className="card group flex min-h-[240px] flex-col p-5 text-left transition-all duration-200 hover:shadow-lift focus-ring"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-muted">Chapter {number}</span>
        <ArrowRight size={18} className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-brand" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-ink">{chapter.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{chapter.lectures.length} lectures • {completedLectures} completed</p>
      <p className="mt-1 text-sm text-muted">Estimated duration: {chapter.duration}</p>
      <div className="mt-5">
        <div className="mb-2 flex justify-between text-xs">
          <span className="font-semibold text-slate-700">Progress</span>
          <span className="text-muted">{chapter.progress}%</span>
        </div>
        <Progress value={chapter.progress} />
      </div>
      <span className="mt-auto inline-flex h-10 w-full items-center justify-center rounded-xl border border-line bg-white px-4 text-sm font-semibold text-ink transition-colors group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-brand">
        Continue
      </span>
    </motion.button>
  );
}

function LectureListView({ course, subject, chapter, currentLectureId, onBack }: { course: Course; subject: Subject; chapter: Chapter; currentLectureId?: string; onBack: () => void }) {
  const completedLectures = chapter.lectures.filter((lectureItem) => lectureItem.completed).length;

  return (
    <section aria-labelledby="lecture-list-title">
      <button type="button" onClick={onBack} className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink">
        <ChevronLeft size={17} />
        Back to {subject.title}
      </button>

      <header className="mb-5 border-b border-line pb-5">
        <p className="section-kicker mb-1">{subject.title}</p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="lecture-list-title" className="text-2xl font-semibold tracking-tight text-ink">{chapter.title}</h2>
            <p className="mt-2 text-sm text-muted">{chapter.lectures.length} Lectures • {completedLectures} Completed • {chapter.duration}</p>
          </div>
          <Badge tone={chapter.progress === 100 ? "green" : "blue"}>{chapter.progress}% Completed</Badge>
        </div>
      </header>

      <div className="space-y-3">
        {chapter.lectures.map((lectureItem) => {
          const current = lectureItem.id === currentLectureId;
          return (
            <article
              key={lectureItem.id}
              className={cn(
                "card grid gap-3 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift lg:grid-cols-[72px_minmax(0,1fr)_110px_130px_96px_140px] lg:items-center",
                current && "border-blue-200 bg-blue-50/70",
                lectureItem.locked && "opacity-65",
              )}
            >
              <div className="flex items-center gap-3 lg:block">
                <span className={cn("grid size-10 place-items-center rounded-xl text-sm font-semibold", lectureItem.completed ? "bg-green-50 text-green-600" : current ? "bg-brand text-white" : "bg-slate-100 text-muted")}>
                  {lectureItem.completed ? <Check size={17} /> : lectureItem.locked ? <Lock size={16} /> : lectureItem.number}
                </span>
                <span className="text-sm font-semibold text-muted lg:mt-2 lg:block">L{lectureItem.number}</span>
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-ink">{lectureItem.title}</h3>
                <p className="mt-1 text-xs text-muted">{chapter.title}</p>
              </div>

              <p className="text-sm text-muted">{lectureItem.duration}</p>

              <div>
                <div className="mb-1 flex justify-between text-xs text-muted">
                  <span>Progress</span>
                  <span>{lectureItem.progress}%</span>
                </div>
                <Progress value={lectureItem.progress} className="h-1.5" />
              </div>

              <div>
                {lectureItem.completed ? <Badge tone="green">Completed</Badge> : current ? <Badge>Current</Badge> : lectureItem.locked ? <Badge tone="slate">Locked</Badge> : <Badge tone="slate">Not started</Badge>}
              </div>

              <div className="flex items-center gap-1 lg:justify-end">
                {lectureItem.resources.length > 0 && <Button variant="ghost" size="icon" title="PDF notes"><FileText size={17} /></Button>}
                {lectureItem.resources.length > 1 && <Button variant="ghost" size="icon" title="Download"><Download size={17} /></Button>}
                {lectureItem.locked ? (
                  <Button size="sm" variant="outline" disabled><Lock size={15} />Locked</Button>
                ) : (
                  <Link href={`/learn/${course.id}/${lectureItem.id}`}>
                    <Button size="sm"><Play size={15} fill="currentColor" />Play</Button>
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function TestsTab({ course }: { course: Course }) {
  const tests = [
    { subject: course.subjects[0]?.title ?? "Physics", name: "Electrostatics Chapter Test", date: "12 July", duration: "60 min", marks: 120 },
    { subject: course.subjects[1]?.title ?? "Chemistry", name: "Chemical Bonding Quiz", date: "14 July", duration: "45 min", marks: 80 },
    { subject: course.subjects[2]?.title ?? "Biology", name: "Cell Biology Practice Test", date: "16 July", duration: "50 min", marks: 100 },
  ];

  return (
    <div className="space-y-3">
      {tests.map((test) => (
        <article key={test.name} className="card grid gap-3 p-4 md:grid-cols-[minmax(0,1fr)_120px_100px_80px_120px] md:items-center">
          <div>
            <h3 className="text-sm font-semibold text-ink">{test.name}</h3>
            <p className="mt-1 text-xs text-muted">{test.subject}</p>
          </div>
          <p className="text-sm text-muted">{test.date}</p>
          <p className="text-sm text-muted">{test.duration}</p>
          <p className="text-sm font-semibold text-ink">{test.marks}</p>
          <Button size="sm">Attempt</Button>
        </article>
      ))}
    </div>
  );
}

function StudyMaterialTab({ course }: { course: Course }) {
  return (
    <section>
      <label className="relative mb-4 block max-w-md">
        <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input className="focus-ring h-10 w-full rounded-xl border border-line bg-white pl-10 pr-3 text-sm outline-none" placeholder="Search study material" />
      </label>
      <div className="space-y-3">
        {course.subjects.map((subject) => (
          <section key={subject.id} className="card p-4">
            <h2 className="text-sm font-semibold text-ink">{subject.title}</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {["PDF Notes", "Formula Sheets", "Practice Sheets", "Previous Papers"].map((item) => (
                <button key={item} className="flex items-center justify-between rounded-xl border border-line px-3 py-3 text-left text-sm text-slate-700 transition-colors hover:border-blue-200 hover:bg-blue-50/40">
                  <span className="flex items-center gap-2"><FileText size={16} className="text-brand" />{item}</span>
                  <Download size={15} className="text-muted" />
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

function AssignmentsTab() {
  const assignments = [
    { status: "Pending", title: "Gauss Law Practice Set", due: "11 July", marks: "-", submission: "Not submitted" },
    { status: "Completed", title: "Chemical Bonding Worksheet", due: "08 July", marks: "18/20", submission: "Submitted" },
    { status: "Completed", title: "Cell Structure Diagrams", due: "05 July", marks: "19/20", submission: "Checked" },
  ];

  return (
    <div className="space-y-3">
      {assignments.map((assignment) => (
        <article key={assignment.title} className="card grid gap-3 p-4 md:grid-cols-[minmax(0,1fr)_100px_90px_130px_150px] md:items-center">
          <div>
            <Badge tone={assignment.status === "Pending" ? "amber" : "green"}>{assignment.status}</Badge>
            <h3 className="mt-2 text-sm font-semibold text-ink">{assignment.title}</h3>
          </div>
          <p className="text-sm text-muted">Due {assignment.due}</p>
          <p className="text-sm font-semibold text-ink">{assignment.marks}</p>
          <p className="text-sm text-muted">{assignment.submission}</p>
          <Button size="sm" variant={assignment.status === "Pending" ? "default" : "outline"}>
            {assignment.status === "Pending" && <Upload size={15} />}
            {assignment.status === "Pending" ? "Upload Assignment" : "View Submission"}
          </Button>
        </article>
      ))}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <p className="text-xs font-medium text-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold text-ink">{value}</p>
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="section-kicker mb-1">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <p className="text-xs font-medium text-muted">{label}</p>
      <p className="mt-1 truncate text-sm font-semibold text-ink">{value}</p>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-white px-3 py-2.5">
      <span className="text-xs font-medium text-muted">{label}</span>
      <span className="text-right text-sm font-semibold text-ink">{value}</span>
    </div>
  );
}

function ProgressRow({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-white px-3 py-2.5">
      <span className="flex min-w-0 items-center gap-2 text-sm text-slate-600">
        <span className="text-brand">{icon}</span>
        <span className="truncate">{label}</span>
      </span>
      <span className="max-w-[52%] truncate text-right text-sm font-semibold text-ink">{value}</span>
    </div>
  );
}

function CompactStat({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-4">
      <span className="grid size-9 place-items-center rounded-xl bg-blue-50 text-brand">{icon}</span>
      <p className="mt-3 text-xl font-semibold text-ink">{value}</p>
      <p className="mt-1 text-xs text-muted">{label}</p>
    </div>
  );
}

function Activity({ label, value, meta }: { label: string; value: string; meta: string }) {
  return (
    <div className="grid gap-1 px-4 py-3 sm:grid-cols-[220px_minmax(0,1fr)_180px] sm:items-center">
      <p className="text-xs font-semibold uppercase tracking-[.08em] text-muted">{label}</p>
      <p className="truncate text-sm font-semibold text-ink">{value}</p>
      <p className="text-sm text-muted sm:text-right">{meta}</p>
    </div>
  );
}

function getOverviewStats(course: Course) {
  const stats = getCourseStats(course);
  const completedChapters = course.subjects.reduce((total, subject) => total + subject.chapters.filter((chapter) => chapter.progress === 100).length, 0);
  const completedSubjects = course.subjects.filter((subject) => subject.progress === 100).length;
  return {
    completedChapters,
    pendingChapters: Math.max(stats.chaptersCount - completedChapters, 0),
    completedSubjects,
    watchTime: "86h 20m",
    remainingTime: "56h 10m",
    lastStudiedDate: "09 Jul 2026",
  };
}

function getCourseMeta(course: Course) {
  return {
    batchStart: course.category === "NEET" ? "01 Apr 2026" : "15 Apr 2026",
    batchEnd: course.category === "NEET" ? "31 Mar 2027" : "31 Jan 2027",
    validTill: course.category === "NEET" ? "30 Apr 2027" : "28 Feb 2027",
    enrollmentDate: "15 Mar 2026",
    language: "English + Hindi",
    type: course.access === "Premium" ? "Premium Recorded + Live" : "Free Recorded",
  };
}

function getSubjectStats(subject: Subject) {
  const chapters = subject.chapters.length;
  const lectures = subject.chapters.reduce((total, chapter) => total + chapter.lectures.length, 0);
  const completed = subject.chapters.reduce((total, chapter) => total + chapter.lectures.filter((lectureItem) => lectureItem.completed).length, 0);
  return { chapters, lectures, completed };
}

function getSubjectLastStudied(subject: Subject) {
  const inProgress = subject.chapters.flatMap((chapter) => chapter.lectures.map((lectureItem) => ({ chapter, lectureItem }))).find(({ lectureItem }) => lectureItem.progress > 0 && !lectureItem.completed);
  if (inProgress) return inProgress.chapter.title;
  return subject.progress > 0 ? "Recently studied" : "Not started";
}

function getSubjectIcon(subjectName: string) {
  if (subjectName.toLowerCase().includes("bio")) return Dna;
  if (subjectName.toLowerCase().includes("chem")) return FlaskConical;
  if (subjectName.toLowerCase().includes("physics")) return Atom;
  return BookOpenCheck;
}
