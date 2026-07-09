"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import * as Collapsible from "@radix-ui/react-collapsible";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bookmark, Bot, Check, ChevronDown, ChevronLeft, ChevronRight, Download, Expand,
  FileCheck2, FileText, Gauge, Keyboard, ListVideo, Lock, MessageCircle, Pause,
  PictureInPicture, Play, Plus, Send, Settings2, StickyNote, Volume2,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getLectureContext, type Chapter, type Course, type Lecture, type Subject } from "@/lib/course-catalog";
import { cn } from "@/lib/utils";

const tabs = ["Overview", "Notes", "Resources", "Assignments", "Discussion", "Downloads"] as const;
type PlayerTab = (typeof tabs)[number];

export function LectureWorkspace({ courseId = "physics", lectureId = "lecture-8" }: { courseId?: string; lectureId?: string }) {
  const context = getLectureContext(courseId, lectureId);
  const { course, subject, chapter, lecture } = context;
  const playerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(lecture?.progress ?? 0);
  const [bookmarked, setBookmarked] = useState(true);
  const [autoNext, setAutoNext] = useState(true);
  const [speed, setSpeed] = useState("1x");
  const [quality, setQuality] = useState("1080p");
  const [activeTab, setActiveTab] = useState<PlayerTab>("Overview");
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([{ time: lecture?.lastWatched ?? "24:18", text: "Mark the symmetry before choosing a Gaussian surface." }]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const flatLectures = useMemo(() => flattenLectures(course), [course]);
  const currentIndex = flatLectures.findIndex((item) => item.lecture.id === lecture?.id);
  const previous = flatLectures[currentIndex - 1];
  const next = flatLectures[currentIndex + 1];

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) await playerRef.current?.requestFullscreen();
    else await document.exitFullscreen();
  };

  const addNote = () => {
    if (!note.trim()) return;
    setNotes((items) => [...items, { time: lecture?.lastWatched ?? "24:18", text: note.trim() }]);
    setNote("");
  };

  const completeLecture = () => {
    setProgress(100);
    setPlaying(false);
  };

  return (
    <AppShell back={{ label: "Course Curriculum", href: `/course/${course.id}` }}>
      <header className="mb-5 flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="section-kicker mb-1">{course.title} / {subject?.title} / {chapter?.title}</p>
          <h1 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">Lecture {lecture?.number}: {lecture?.title}</h1>
          <p className="mt-2 text-sm text-muted">Teacher: {subject?.faculty} - Resume from {lecture?.lastWatched ?? "0:00"}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant={bookmarked ? "soft" : "outline"} size="sm" onClick={() => setBookmarked(!bookmarked)}>
            <Bookmark size={15} fill={bookmarked ? "currentColor" : "none"} />{bookmarked ? "Bookmarked" : "Bookmark"}
          </Button>
          <Button variant="outline" size="sm"><Keyboard size={15} />Shortcuts</Button>
        </div>
      </header>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_370px]">
        <section className="space-y-5">
          <div ref={playerRef} className="group relative aspect-video min-h-[260px] overflow-hidden rounded-2xl bg-[#07101f] shadow-lift">
            <div className="absolute inset-0 [background-image:radial-gradient(circle_at_30%_30%,rgba(37,99,235,.24),transparent_36%),radial-gradient(circle_at_78%_70%,rgba(14,165,233,.18),transparent_34%)]" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center text-white">
                <button onClick={() => setPlaying(!playing)} className="mx-auto grid size-16 place-items-center rounded-full bg-white text-brand shadow-2xl transition-transform hover:scale-105">
                  {playing ? <Pause size={24} fill="currentColor" /> : <Play size={24} className="ml-1" fill="currentColor" />}
                </button>
                <p className="mt-4 text-sm font-medium text-white/80">{playing ? "Playing lecture" : `Resume from ${lecture?.lastWatched ?? "0:00"}`}</p>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-16 text-white sm:px-5">
              <input aria-label="Lecture progress" type="range" min="0" max="100" value={progress} onChange={(event) => setProgress(Number(event.target.value))} className="h-1 w-full cursor-pointer" />
              <div className="mt-3 flex items-center gap-2 sm:gap-3">
                <button aria-label="Play lecture" onClick={() => setPlaying(!playing)}>{playing ? <Pause size={19} fill="currentColor" /> : <Play size={19} fill="currentColor" />}</button>
                <button aria-label="Volume" className="hidden sm:block"><Volume2 size={19} /></button>
                <span className="text-xs text-white/80">{lecture?.lastWatched ?? "0:00"} / {lecture?.videoLength}</span>
                <div className="ml-auto flex items-center gap-2 sm:gap-3">
                  <ControlSelect value={speed} options={["0.75x", "1x", "1.25x", "1.5x", "2x"]} onChange={setSpeed} icon={<Gauge size={17} />} />
                  <ControlSelect value={quality} options={["Auto", "720p", "1080p"]} onChange={setQuality} icon={<Settings2 size={17} />} />
                  <button title="Picture in picture" onClick={() => setPlaying(true)} className="hidden sm:block"><PictureInPicture size={18} /></button>
                  <button title="Fullscreen" onClick={toggleFullscreen}><Expand size={18} /></button>
                </div>
              </div>
            </div>
          </div>

          <section className="card overflow-hidden">
            <div className="flex overflow-x-auto border-b border-line px-2 sm:px-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "whitespace-nowrap border-b-2 px-3 py-4 text-xs font-semibold transition-colors sm:px-4 sm:text-sm",
                    activeTab === tab ? "border-brand text-brand" : "border-transparent text-muted hover:text-ink",
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-5 sm:p-6">
              <AnimatePresence mode="wait">
                <motion.div key={activeTab} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }}>
                  {activeTab === "Overview" && <Overview lecture={lecture} course={course} subject={subject} chapter={chapter} progress={progress} completeLecture={completeLecture} />}
                  {activeTab === "Notes" && <Notes note={note} setNote={setNote} notes={notes} addNote={addNote} currentTime={lecture?.lastWatched ?? "24:18"} />}
                  {activeTab === "Resources" && <Resources lecture={lecture} />}
                  {activeTab === "Assignments" && <Assignments lecture={lecture} />}
                  {activeTab === "Discussion" && <Discussion question={question} setQuestion={setQuestion} answer={answer} ask={() => { if (question.trim()) setAnswer("Use symmetry first: choose a closed surface where the electric field is constant or zero on each part. That makes the flux integral simple."); }} />}
                  {activeTab === "Downloads" && <Downloads lecture={lecture} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </section>
        </section>

        <aside className="card flex max-h-[calc(100vh-120px)] min-h-[520px] flex-col overflow-hidden xl:sticky xl:top-24">
          <div className="flex items-center justify-between border-b border-line p-4">
            <div>
              <p className="text-sm font-semibold text-ink">Course playlist</p>
              <p className="mt-0.5 text-xs text-muted">Subject / Chapter / Lecture</p>
            </div>
            <ListVideo size={19} className="text-muted" />
          </div>
          <Playlist course={course} currentLectureId={lecture?.id} />
          <div className="border-t border-line p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-ink">Auto next lecture</p>
                <p className="mt-0.5 text-[11px] text-muted">Unlocks the next lecture after completion</p>
              </div>
              <button onClick={() => setAutoNext(!autoNext)} className={cn("relative h-6 w-11 rounded-full transition-colors", autoNext ? "bg-brand" : "bg-slate-200")}>
                <span className={cn("absolute top-1 size-4 rounded-full bg-white shadow transition-transform", autoNext ? "left-6" : "left-1")} />
              </button>
            </div>
            <Progress value={progress} />
          </div>
        </aside>
      </div>

      <nav className="mt-6 grid gap-3 border-t border-line pt-5 sm:grid-cols-3" aria-label="Lecture navigation">
        <LectureNavItem label="Previous Lecture" item={previous} fallback="You are at the first lecture" direction="previous" />
        <Link href={`/course/${course.id}`} className="flex items-center justify-center rounded-xl border border-line bg-white px-4 py-3 text-sm font-semibold text-ink hover:bg-slate-50">Course Curriculum</Link>
        <LectureNavItem label="Next Lecture" item={next} fallback="You are at the last lecture" direction="next" />
      </nav>
    </AppShell>
  );
}

function Playlist({ course, currentLectureId }: { course: Course; currentLectureId?: string }) {
  const currentSubject = course.subjects.find((subject) => subject.chapters.some((chapter) => chapter.lectures.some((lecture) => lecture.id === currentLectureId)));
  const currentChapter = currentSubject?.chapters.find((chapter) => chapter.lectures.some((lecture) => lecture.id === currentLectureId));
  const initialSubjectId = currentSubject?.id ?? course.subjects[0]?.id;
  const initialChapterId = currentChapter?.id ?? currentSubject?.chapters[0]?.id ?? course.subjects[0]?.chapters[0]?.id;
  const [openSubjects, setOpenSubjects] = useState<string[]>(initialSubjectId ? [initialSubjectId] : []);
  const [openChapters, setOpenChapters] = useState<string[]>(initialChapterId ? [initialChapterId] : []);
  const toggle = (values: string[], setter: (next: string[]) => void, id: string) => setter(values.includes(id) ? values.filter((item) => item !== id) : [...values, id]);

  return (
    <div className="flex-1 overflow-y-auto p-2">
      {course.subjects.map((subject) => {
        const subjectOpen = openSubjects.includes(subject.id);
        return (
          <Collapsible.Root key={subject.id} open={subjectOpen} onOpenChange={() => toggle(openSubjects, setOpenSubjects, subject.id)}>
            <Collapsible.Trigger className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left hover:bg-slate-50">
              <span className="text-xs font-semibold uppercase tracking-[.12em] text-muted">{subject.title}</span>
              <ChevronDown size={15} className={cn("text-muted transition-transform", subjectOpen && "rotate-180")} />
            </Collapsible.Trigger>
            {subjectOpen && (
              <Collapsible.Content>
                <div className="space-y-1 py-1">
                  {subject.chapters.map((chapter) => {
                    const chapterOpen = openChapters.includes(chapter.id);
                    return (
                      <Collapsible.Root key={chapter.id} open={chapterOpen} onOpenChange={() => toggle(openChapters, setOpenChapters, chapter.id)}>
                        <Collapsible.Trigger className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold text-ink hover:bg-slate-50">
                          <span className="truncate">{chapter.title}</span>
                          <ChevronDown size={15} className={cn("shrink-0 text-muted transition-transform", chapterOpen && "rotate-180")} />
                        </Collapsible.Trigger>
                        {chapterOpen && (
                          <Collapsible.Content>
                            <div className="space-y-1 pb-2 pl-2">
                              {chapter.lectures.map((lectureItem) => {
                                const current = lectureItem.id === currentLectureId;
                                return (
                                  <Link
                                    key={lectureItem.id}
                                    href={lectureItem.locked ? "#" : `/learn/${course.id}/${lectureItem.id}`}
                                    className={cn("flex items-center gap-3 rounded-xl p-3 text-left transition-colors", current ? "bg-blue-50" : "hover:bg-slate-50", lectureItem.locked && "pointer-events-none opacity-60")}
                                  >
                                    <span className={cn("grid size-8 shrink-0 place-items-center rounded-lg text-xs font-semibold", lectureItem.completed ? "bg-green-50 text-green-600" : current ? "bg-brand text-white" : "bg-slate-100 text-muted")}>
                                      {lectureItem.completed ? <Check size={15} /> : lectureItem.locked ? <Lock size={14} /> : lectureItem.number}
                                    </span>
                                    <span className="min-w-0 flex-1">
                                      <span className={cn("block truncate text-xs font-medium leading-5", current ? "text-brand" : "text-ink")}>{lectureItem.title}</span>
                                      <span className="text-[11px] text-muted">{lectureItem.videoLength} - {lectureItem.progress}%</span>
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                          </Collapsible.Content>
                        )}
                      </Collapsible.Root>
                    );
                  })}
                </div>
              </Collapsible.Content>
            )}
          </Collapsible.Root>
        );
      })}
    </div>
  );
}

function Overview({ lecture, course, subject, chapter, progress, completeLecture }: { lecture?: Lecture; course: Course; subject?: Subject; chapter?: Chapter; progress: number; completeLecture: () => void }) {
  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-ink">About this lecture</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">{lecture?.description}</p>
        </div>
        <Badge tone={progress === 100 ? "green" : "blue"}>{progress === 100 ? "Completed" : `${progress}% watched`}</Badge>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <Meta label="Course" value={course.title} />
        <Meta label="Subject" value={subject?.title ?? "Subject"} />
        <Meta label="Chapter" value={chapter?.title ?? "Chapter"} />
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <Button onClick={completeLecture} variant={progress === 100 ? "outline" : "default"}>{progress === 100 ? "Marked Complete" : "Mark Complete"}</Button>
        <Button variant="outline"><Bookmark size={17} />Add bookmark</Button>
      </div>
    </div>
  );
}

function Notes({ note, setNote, notes, addNote, currentTime }: { note: string; setNote: (value: string) => void; notes: { time: string; text: string }[]; addNote: () => void; currentTime: string }) {
  return <div><h2 className="text-base font-semibold text-ink">Timestamp notes</h2><p className="mt-1 text-sm text-muted">Notes are attached to the exact point in the lecture.</p><div className="mt-4 flex gap-2"><span className="grid h-10 shrink-0 place-items-center rounded-xl bg-blue-50 px-3 text-xs font-semibold text-brand">{currentTime}</span><input value={note} onChange={(e) => setNote(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addNote()} placeholder="Add a note at this timestamp" className="focus-ring h-10 min-w-0 flex-1 rounded-xl border border-line px-3 text-sm outline-none" /><Button onClick={addNote} size="icon"><Plus size={18} /></Button></div><div className="mt-4 space-y-2">{notes.map((item) => <div key={item.time + item.text} className="flex gap-3 rounded-xl bg-slate-50 p-3"><span className="text-xs font-semibold text-brand">{item.time}</span><p className="text-sm leading-5 text-slate-600">{item.text}</p></div>)}</div></div>;
}

function Resources({ lecture }: { lecture?: Lecture }) {
  return <div className="grid gap-3 sm:grid-cols-2">{(lecture?.resources ?? []).map((resource) => <Resource key={resource} icon={<FileText />} title={resource} meta="PDF - available offline" />)}</div>;
}

function Assignments({ lecture }: { lecture?: Lecture }) {
  return <div className="flex flex-col gap-4 rounded-xl border border-line p-4 sm:flex-row sm:items-center"><span className="grid size-11 place-items-center rounded-xl bg-amber-50 text-amber-600"><FileCheck2 size={20} /></span><div className="flex-1"><h2 className="text-sm font-semibold text-ink">{lecture?.assignment ?? "No assignment for this lecture"}</h2><p className="mt-1 text-xs text-muted">Pending assignments can be submitted from here without leaving the lecture.</p></div><Button variant="outline">Open assignment</Button></div>;
}

function Discussion({ question, setQuestion, answer, ask }: { question: string; setQuestion: (value: string) => void; answer: string; ask: () => void }) {
  return <div><div className="mb-4 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-brand"><Bot size={20} /></span><div><h2 className="text-sm font-semibold text-ink">Ask a doubt</h2><p className="text-xs text-muted">Teachers and AI assistance use this lecture context.</p></div></div>{answer && <div className="mb-3 rounded-xl bg-blue-50 p-4 text-sm leading-6 text-slate-700">{answer}</div>}<div className="flex gap-2"><input value={question} onChange={(e) => setQuestion(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ask()} placeholder="What would you like explained?" className="focus-ring h-11 min-w-0 flex-1 rounded-xl border border-line px-3 text-sm outline-none" /><Button onClick={ask} size="icon" className="size-11"><Send size={17} /></Button></div><Button variant="outline" size="sm" className="mt-4"><MessageCircle size={15} />Open class discussion</Button></div>;
}

function Downloads({ lecture }: { lecture?: Lecture }) {
  return <div className="grid gap-3 sm:grid-cols-2"><Resource icon={<Download />} title={lecture?.notes ?? "Lecture notes"} meta="PDF - 3.2 MB" /><Resource icon={<StickyNote />} title="Transcript" meta="Readable text" /><Resource icon={<FileCheck2 />} title="Practice worksheet" meta="18 questions" /></div>;
}

function Resource({ icon, title, meta }: { icon: React.ReactNode; title: string; meta: string }) {
  return <button className="flex items-center gap-3 rounded-xl border border-line p-4 text-left hover:border-blue-200 hover:bg-blue-50/40"><span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-brand [&>svg]:size-[18px]">{icon}</span><span className="flex-1"><span className="block text-sm font-semibold text-ink">{title}</span><span className="text-xs text-muted">{meta}</span></span><Download size={16} className="text-muted" /></button>;
}

function Meta({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border border-line bg-slate-50 p-3"><p className="text-[11px] font-semibold uppercase tracking-[.1em] text-muted">{label}</p><p className="mt-1 truncate text-sm font-semibold text-ink">{value}</p></div>;
}

function ControlSelect({ value, options, onChange, icon }: { value: string; options: string[]; onChange: (value: string) => void; icon: React.ReactNode }) {
  return <label className="flex items-center gap-1 text-xs">{icon}<select aria-label="Player setting" value={value} onChange={(e) => onChange(e.target.value)} className="max-w-20 cursor-pointer bg-transparent text-xs text-white outline-none">{options.map((option) => <option className="text-black" key={option}>{option}</option>)}</select></label>;
}

function LectureNavItem({ label, item, fallback, direction }: { label: string; item?: FlatLecture; fallback: string; direction: "previous" | "next" }) {
  if (!item) return <div className="rounded-xl border border-line bg-white px-4 py-3 text-sm text-muted">{fallback}</div>;
  return (
    <Link href={`/learn/${item.course.id}/${item.lecture.id}`} className={cn("flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 text-sm hover:bg-slate-50", direction === "next" && "justify-end text-right")}>
      {direction === "previous" && <ChevronLeft size={17} className="text-muted" />}
      <span className="min-w-0"><span className="block text-xs font-medium text-muted">{label}</span><span className="block truncate font-semibold text-ink">{item.lecture.title}</span></span>
      {direction === "next" && <ChevronRight size={17} className="text-muted" />}
    </Link>
  );
}

type FlatLecture = { course: Course; subject: Subject; chapter: Chapter; lecture: Lecture };

function flattenLectures(course: Course): FlatLecture[] {
  return course.subjects.flatMap((subject) => subject.chapters.flatMap((chapter) => chapter.lectures.map((lecture) => ({ course, subject, chapter, lecture }))));
}
