const currentUserKey = "eliteCoachingCurrentUser";
const purchaseKey = "eliteCoachingStaticPurchasedCourses";
const teacherStudioKey = "eliteCoachingCourseStudioState";
const lectureProgressKey = "eliteCoachingLectureProgress";

const screens = {
  dashboard: { title: "Dashboard", eyebrow: "Student Panel" },
  courses: { title: "Courses", eyebrow: "Learning Library" },
  live: { title: "Live Classes", eyebrow: "Today" },
  tests: { title: "Tests", eyebrow: "Assessment Center" },
  materials: { title: "Study Material", eyebrow: "Resources" },
  performance: { title: "Performance", eyebrow: "Analytics" },
  profile: { title: "Profile", eyebrow: "Account" },
};

const courseCatalog = [
  {
    id: "neet-2027",
    title: "NEET 2027 Ultimate Batch",
    faculty: "Dr. Arjun Mehta",
    category: "NEET",
    access: "Premium",
    language: "Hinglish",
    duration: "184h 30m",
    price: 4999,
    rating: 4.9,
    students: "18.4k",
    enrolled: true,
    progress: 72,
    batchStart: "15 Apr 2026",
    batchEnd: "20 Feb 2027",
    validTill: "31 Mar 2027",
    enrollmentDate: "22 Apr 2026",
    status: "Active",
    watchTime: "96h 15m",
    estimatedRemaining: "38h 20m",
    lastDownloaded: "Electrostatics Formula Sheet",
    lastAssignment: "Motion in a Plane DPP",
    thumbnail: "science",
    subjects: [
      {
        id: "physics",
        name: "Physics",
        icon: "science",
        progress: 68,
        lastStudied: "Electrostatics",
        chapters: [
          {
            id: "electric-charges",
            name: "Electric Charges and Fields",
            duration: "8h 30m",
            progress: 76,
            lectures: [
              { id: "lec-1", title: "Charge and Coulomb Law", duration: "42 min", progress: 100, completed: true, pdf: true },
              { id: "lec-2", title: "Electric Field Intensity", duration: "48 min", progress: 100, completed: true, pdf: true },
              { id: "lec-3", title: "Gauss Law Applications", duration: "55 min", progress: 64, current: true, pdf: true },
              { id: "lec-4", title: "Electric Dipole", duration: "46 min", progress: 0, pdf: false },
              { id: "lec-5", title: "Field Due to Continuous Charge", duration: "51 min", progress: 0, locked: true, pdf: true },
            ],
          },
          {
            id: "current-electricity",
            name: "Current Electricity",
            duration: "7h 10m",
            progress: 35,
            lectures: [
              { id: "lec-1", title: "Drift Velocity", duration: "38 min", progress: 100, completed: true, pdf: true },
              { id: "lec-2", title: "Ohm Law and Resistance", duration: "44 min", progress: 20, current: true, pdf: true },
              { id: "lec-3", title: "Kirchhoff Laws", duration: "52 min", progress: 0, pdf: true },
            ],
          },
          {
            id: "modern-physics",
            name: "Modern Physics",
            duration: "9h 20m",
            progress: 0,
            lectures: [
              { id: "lec-1", title: "Photoelectric Effect", duration: "50 min", progress: 0, pdf: true },
              { id: "lec-2", title: "Bohr Model", duration: "47 min", progress: 0, locked: true, pdf: true },
            ],
          },
        ],
      },
      {
        id: "chemistry",
        name: "Chemistry",
        icon: "biotech",
        progress: 74,
        lastStudied: "Chemical Bonding",
        chapters: [
          {
            id: "chemical-bonding",
            name: "Chemical Bonding",
            duration: "9h 45m",
            progress: 82,
            lectures: [
              { id: "lec-1", title: "VSEPR Theory", duration: "46 min", progress: 100, completed: true, pdf: true },
              { id: "lec-2", title: "Hybridisation", duration: "50 min", progress: 100, completed: true, pdf: true },
              { id: "lec-3", title: "Molecular Orbital Theory", duration: "58 min", progress: 35, current: true, pdf: true },
            ],
          },
          {
            id: "organic-basics",
            name: "Organic Chemistry Basics",
            duration: "8h 10m",
            progress: 54,
            lectures: [
              { id: "lec-1", title: "Inductive Effect", duration: "43 min", progress: 100, completed: true, pdf: true },
              { id: "lec-2", title: "Resonance", duration: "49 min", progress: 25, pdf: true },
            ],
          },
        ],
      },
      {
        id: "biology",
        name: "Biology",
        icon: "genetics",
        progress: 79,
        lastStudied: "Human Physiology",
        chapters: [
          {
            id: "human-physiology",
            name: "Human Physiology",
            duration: "12h 15m",
            progress: 88,
            lectures: [
              { id: "lec-1", title: "Digestion and Absorption", duration: "52 min", progress: 100, completed: true, pdf: true },
              { id: "lec-2", title: "Breathing and Exchange", duration: "48 min", progress: 100, completed: true, pdf: true },
              { id: "lec-3", title: "Body Fluids and Circulation", duration: "54 min", progress: 72, current: true, pdf: true },
            ],
          },
          {
            id: "cell-biology",
            name: "Cell Biology",
            duration: "6h 35m",
            progress: 62,
            lectures: [
              { id: "lec-1", title: "Cell Organelles", duration: "40 min", progress: 100, completed: true, pdf: true },
              { id: "lec-2", title: "Cell Cycle", duration: "46 min", progress: 55, pdf: true },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "jee-advanced",
    title: "JEE Advanced Rank Booster",
    faculty: "Vikram Rao",
    category: "JEE",
    access: "Premium",
    language: "English",
    duration: "156h 10m",
    price: 6499,
    rating: 4.8,
    students: "11.2k",
    enrolled: true,
    progress: 41,
    batchStart: "02 May 2026",
    batchEnd: "18 Jan 2027",
    validTill: "31 Mar 2027",
    enrollmentDate: "05 May 2026",
    status: "Active",
    watchTime: "54h 40m",
    estimatedRemaining: "77h 15m",
    lastDownloaded: "Calculus PYQ Sheet",
    lastAssignment: "Matrices Advanced Set",
    thumbnail: "functions",
    subjects: [
      {
        id: "math",
        name: "Mathematics",
        icon: "functions",
        progress: 46,
        lastStudied: "Limits and Continuity",
        chapters: [
          {
            id: "calculus",
            name: "Calculus",
            duration: "15h 20m",
            progress: 48,
            lectures: [
              { id: "lec-1", title: "Limits Foundation", duration: "51 min", progress: 100, completed: true, pdf: true },
              { id: "lec-2", title: "Continuity", duration: "46 min", progress: 45, current: true, pdf: true },
              { id: "lec-3", title: "Differentiability", duration: "59 min", progress: 0, pdf: true },
            ],
          },
          {
            id: "algebra",
            name: "Algebra",
            duration: "13h 05m",
            progress: 34,
            lectures: [
              { id: "lec-1", title: "Complex Numbers", duration: "52 min", progress: 100, completed: true, pdf: true },
              { id: "lec-2", title: "Quadratic Expressions", duration: "48 min", progress: 0, pdf: true },
            ],
          },
        ],
      },
      {
        id: "physics",
        name: "Physics",
        icon: "bolt",
        progress: 36,
        lastStudied: "Rotational Motion",
        chapters: [
          {
            id: "mechanics",
            name: "Advanced Mechanics",
            duration: "14h 00m",
            progress: 36,
            lectures: [
              { id: "lec-1", title: "Rigid Body Dynamics", duration: "57 min", progress: 80, pdf: true },
              { id: "lec-2", title: "Angular Momentum", duration: "53 min", progress: 0, pdf: true },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "foundation-11",
    title: "Class 11 Foundation Complete",
    faculty: "Ananya Bose",
    category: "Class 11",
    access: "Premium",
    language: "English",
    duration: "120h 00m",
    price: 2999,
    rating: 4.7,
    students: "9.8k",
    enrolled: false,
    progress: 0,
    thumbnail: "school",
    subjects: [],
  },
  {
    id: "class-12-bio",
    title: "Class 12 Biology Revision Sprint",
    faculty: "Dr. Priya Menon",
    category: "Class 12",
    access: "Premium",
    language: "Hinglish",
    duration: "48h 20m",
    price: 1999,
    rating: 4.9,
    students: "7.1k",
    enrolled: false,
    progress: 0,
    thumbnail: "eco",
    subjects: [],
  },
  {
    id: "neet-free",
    title: "Free NEET Starter Study Kit",
    faculty: "EliteCoaching Faculty",
    category: "Crash Course",
    access: "Free",
    language: "Hinglish",
    duration: "6h 45m",
    price: 0,
    rating: 4.6,
    students: "32.5k",
    enrolled: false,
    progress: 0,
    thumbnail: "menu_book",
    subjects: [],
  },
];

const state = {
  activeScreen: "dashboard",
  courseTab: "purchased",
  courseCategory: "All",
  courseQuery: "",
  sort: "recent",
  courseView: "list",
  activeCourseId: "",
  workspaceTab: "overview",
  activeSubjectId: "",
  activeChapterId: "",
  chapterTab: "lectures",
  activeLectureId: "",
  purchases: new Set(),
  lectureProgress: {},
  dynamicBound: false,
};

function setButtonLoading(button, isLoading, success = false) {
  if (!button) return;
  if (!button.dataset.originalLabel) button.dataset.originalLabel = button.innerHTML;
  button.classList.toggle("is-loading", isLoading);
  button.classList.toggle("is-success", success);
  button.disabled = isLoading;
  document.body.classList.toggle("motion-busy", isLoading);
  if (isLoading) {
    button.innerHTML = "<span>Working</span>";
    return;
  }
  button.innerHTML = success ? `<span class="material-symbols-outlined">check</span><span>Done</span>` : button.dataset.originalLabel;
  if (success) {
    window.setTimeout(() => {
      button.classList.remove("is-success");
      button.innerHTML = button.dataset.originalLabel;
    }, 900);
  }
}

function skeletonGrid(count = 3) {
  return `
    <div class="skeleton-shell">
      <div class="grid course-grid">
        ${Array.from({ length: count }, () => `<article class="skeleton-card"></article>`).join("")}
      </div>
    </div>
  `;
}

function showScreenSkeleton(screen) {
  const root = document.getElementById(`${screen}Screen`);
  if (!root) return;
  if (screen === "courses" || screen === "dashboard" || screen === "materials" || screen === "tests") {
    root.innerHTML = skeletonGrid(screen === "dashboard" ? 4 : 3);
  }
}

function init() {
  loadUser();
  loadPurchases();
  loadLectureProgress();
  bindShellEvents();
  renderAll();
  showScreen("dashboard");
  applyTheme(localStorage.getItem("elitecoachingTheme") || "light");
}

function loadUser() {
  let user = null;
  try { user = JSON.parse(localStorage.getItem(currentUserKey)); } catch { user = null; }
  if (user && user.role === "teacher") {
    window.location.href = "../course_management_studio_eduverse/studio.html";
    return;
  }
  const name = user?.name || "Aarav Singh";
  const email = user?.email || "aarav.singh@student.demo";
  document.getElementById("profileName").textContent = name;
  document.getElementById("profileInitials").textContent = initials(name);
  window.demoUser = { name, email };
}

function loadPurchases() {
  try {
    JSON.parse(localStorage.getItem(purchaseKey) || "[]").forEach((id) => state.purchases.add(id));
  } catch {
    state.purchases = new Set();
  }
}

function savePurchases() {
  localStorage.setItem(purchaseKey, JSON.stringify([...state.purchases]));
}

function loadLectureProgress() {
  try {
    state.lectureProgress = JSON.parse(localStorage.getItem(lectureProgressKey) || "{}");
  } catch {
    state.lectureProgress = {};
  }
}

function saveLectureProgress() {
  localStorage.setItem(lectureProgressKey, JSON.stringify(state.lectureProgress));
}

function bindShellEvents() {
  document.querySelectorAll("[data-screen]").forEach((button) => {
    button.addEventListener("click", () => navigateScreen(button.dataset.screen));
  });
  document.querySelectorAll("[data-screen-shortcut]").forEach((button) => {
    button.addEventListener("click", () => navigateScreen(button.dataset.screenShortcut));
  });
  document.getElementById("logoutButton").addEventListener("click", () => {
    localStorage.removeItem(currentUserKey);
    window.location.href = "../auth_elitecoaching_institute/auth.html?mode=login";
  });
  document.getElementById("themeToggle").addEventListener("click", () => {
    applyTheme(document.body.classList.contains("dark") ? "light" : "dark");
  });
  document.getElementById("openSidebar").addEventListener("click", openSidebar);
  document.getElementById("closeSidebar").addEventListener("click", closeSidebar);
  document.getElementById("overlay").addEventListener("click", closeSidebar);
  document.getElementById("globalSearch").addEventListener("input", (event) => {
    state.courseQuery = event.target.value;
    state.courseView = "list";
    navigateScreen("courses");
    renderCourses();
  });
  window.addEventListener("storage", (event) => {
    if (event.key !== teacherStudioKey && event.key !== purchaseKey && event.key !== lectureProgressKey) return;
    if (event.key === purchaseKey) loadPurchases();
    if (event.key === lectureProgressKey) loadLectureProgress();
    renderAll();
    if (state.activeScreen === "courses") renderCourses();
  });
}

function navigateScreen(screen) {
  showScreenSkeleton(screen);
  if (screen === "courses") {
    state.courseView = "list";
  }
  showScreen(screen);
  window.requestAnimationFrame(() => {
    if (screen === "courses") {
      renderCourses();
      return;
    }
    if (screen === "dashboard") renderDashboard();
    if (screen === "tests") renderTests();
    if (screen === "materials") renderMaterials();
    if (screen === "performance") renderPerformance();
    if (screen === "profile") renderProfile();
    if (screen === "live") renderLive();
  });
}

function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  localStorage.setItem("elitecoachingTheme", theme);
}

function openSidebar() {
  document.getElementById("sidebar").classList.add("open");
  document.getElementById("overlay").classList.add("show");
}

function closeSidebar() {
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("overlay").classList.remove("show");
}

function showScreen(screen) {
  state.activeScreen = screen;
  const meta = screens[screen] || screens.dashboard;
  document.getElementById("screenTitle").textContent = meta.title;
  document.getElementById("screenEyebrow").textContent = meta.eyebrow;
  document.querySelectorAll(".screen").forEach((section) => section.classList.remove("active"));
  document.getElementById(`${screen}Screen`).classList.add("active");
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.screen === screen));
  closeSidebar();
}

function renderAll() {
  renderDashboard();
  renderCourses();
  renderLive();
  renderTests();
  renderMaterials();
  renderPerformance();
  renderProfile();
}

function loadTeacherStudioState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(teacherStudioKey) || "{}");
    return {
      courses: Array.isArray(parsed.courses) ? parsed.courses : [],
      batches: Array.isArray(parsed.batches) ? parsed.batches : [],
    };
  } catch {
    return { courses: [], batches: [] };
  }
}

function formatDateLabel(value) {
  if (!value) return "Date not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function durationToMinutes(value) {
  if (!value) return 0;
  const hourMatch = value.match(/(\d+)\s*h/i);
  const minuteMatch = value.match(/(\d+)\s*m/i);
  return (hourMatch ? Number(hourMatch[1]) * 60 : 0) + (minuteMatch ? Number(minuteMatch[1]) : 0);
}

function minutesToDuration(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (!hours && !minutes) return "0h 00m";
  return `${hours}h ${String(minutes).padStart(2, "0")}m`;
}

function thumbnailForCourse(category) {
  const key = String(category || "").toLowerCase();
  if (key.includes("bio")) return "genetics";
  if (key.includes("chem")) return "biotech";
  if (key.includes("math") || key.includes("jee")) return "functions";
  if (key.includes("foundation") || key.includes("class")) return "school";
  return "menu_book";
}

function dynamicSubjectName(course) {
  if (course.category) return course.category;
  return "Course Modules";
}

function lectureProgressRecord(lectureId) {
  const record = state.lectureProgress?.[lectureId] || {};
  const percent = Math.max(0, Math.min(100, Number(record.percent) || 0));
  return {
    percent,
    completed: Boolean(record.completed) || percent >= 100,
    updatedAt: record.updatedAt || "",
  };
}

function updateLectureProgress(lectureId, percent) {
  const nextPercent = Math.max(0, Math.min(100, Number(percent) || 0));
  state.lectureProgress[lectureId] = {
    percent: nextPercent,
    completed: nextPercent >= 100,
    updatedAt: new Date().toISOString(),
  };
  saveLectureProgress();
}

function sourceKindMeta(type) {
  const key = String(type || "").toLowerCase();
  if (key.includes("note") || key.includes("pdf")) return { bucket: "notes", icon: "description", primary: "Preview", secondary: "Download" };
  if (key.includes("dpp") || key.includes("worksheet") || key.includes("practice")) return { bucket: "dpps", icon: "assignment", primary: "Attempt", secondary: "Solutions" };
  if (key.includes("assignment")) return { bucket: "assignments", icon: "assignment_turned_in", primary: "Open", secondary: "Submit" };
  if (key.includes("test") || key.includes("quiz")) return { bucket: "assignments", icon: "quiz", primary: "Start", secondary: "Syllabus" };
  return { bucket: "resources", icon: key.includes("link") ? "link" : "folder_open", primary: "Open", secondary: "Download" };
}

function formatSourceItem(source, fallbackTitle, context) {
  const meta = sourceKindMeta(source?.type);
  return {
    id: source?.id || `${context.chapterId}-${meta.bucket}-${context.index + 1}`,
    title: source?.title || fallbackTitle,
    type: source?.type || "Resource",
    icon: meta.icon,
    primaryAction: meta.primary,
    secondaryAction: meta.secondary,
    fileName: source?.fileName || "",
    fileType: source?.fileType || source?.type || "File",
    fileSize: source?.fileSize || "File attached",
    updatedAt: formatDateLabel(source?.updatedAt || source?.createdAt || context.updatedAt),
    url: source?.fileData || source?.url || "",
    bucket: meta.bucket,
  };
}

function buildTeacherChapter(batch, course, module, subjectIndex, chapterIndex) {
  const chapterId = `${batch.id}-${course.id}-${module.id || `chapter-${chapterIndex + 1}`}`;
  const sources = (module.sources || []).map((source, index) => formatSourceItem(source, `${module.name || `Chapter ${chapterIndex + 1}`} Resource ${index + 1}`, {
    chapterId,
    index,
    updatedAt: course.updatedAt || course.createdAt || batch.updatedAt || batch.createdAt,
  }));
  const notes = sources.filter((item) => item.bucket === "notes");
  const dpps = sources.filter((item) => item.bucket === "dpps");
  const resources = sources.filter((item) => item.bucket === "resources");
  const assignments = sources.filter((item) => item.bucket === "assignments");
  const lectures = (module.lectures || []).map((lecture, lectureIndex) => ({
    id: `${chapterId}-lecture-${lecture.id || lectureIndex + 1}`,
    title: lecture.title || `Lecture ${lectureIndex + 1}`,
    duration: lecture.duration || "Recorded lecture",
    progress: 0,
    completed: false,
    current: false,
    locked: false,
    pdf: Boolean(notes.length),
    teacherName: course.faculty || "Elite Coaching Faculty",
    description: module.objective || module.design || `Lecture from ${module.name || `Chapter ${chapterIndex + 1}`}.`,
    videoSrc: lecture.fileData || lecture.videoUrl || "",
    uploadDate: formatDateLabel(lecture.updatedAt || lecture.createdAt || course.updatedAt || course.createdAt),
  }));

  return {
    id: chapterId,
    name: module.name || `Chapter ${chapterIndex + 1}`,
    description: module.objective || module.design || "Chapter content published from the teacher studio.",
    duration: minutesToDuration(lectures.reduce((total, lecture) => total + durationToMinutes(lecture.duration), 0)),
    progress: 0,
    notes,
    dpps,
    resources,
    assignments,
    lectures,
    subjectOrder: subjectIndex,
    chapterOrder: chapterIndex,
  };
}

function applyProgressToCourse(course) {
  let firstIncompleteId = "";
  const subjects = (course.subjects || []).map((subject) => {
    const chapters = (subject.chapters || []).map((chapter) => {
      const lectures = (chapter.lectures || []).map((lecture) => {
        const record = lectureProgressRecord(lecture.id);
        if (!firstIncompleteId && !record.completed && !lecture.locked) firstIncompleteId = lecture.id;
        return {
          ...lecture,
          progress: record.percent,
          completed: record.completed,
          current: false,
        };
      });
      const lectureCount = lectures.length || 1;
      return {
        ...chapter,
        lectures,
        progress: Math.round(lectures.reduce((sum, lecture) => sum + lecture.progress, 0) / lectureCount),
      };
    });

    const chapterCount = chapters.length || 1;
    const activeChapter = chapters.find((chapter) => chapter.lectures.some((lecture) => lecture.id === firstIncompleteId)) || chapters.find((chapter) => chapter.lectures.some((lecture) => lecture.completed)) || chapters[0];
    return {
      ...subject,
      chapters,
      progress: Math.round(chapters.reduce((sum, chapter) => sum + chapter.progress, 0) / chapterCount),
      lastStudied: activeChapter?.name || "Not started",
    };
  });

  const allLectures = subjects.flatMap((subject) => subject.chapters.flatMap((chapter) => chapter.lectures));
  const allNotes = subjects.flatMap((subject) => subject.chapters.flatMap((chapter) => chapter.notes || []));
  const allDpps = subjects.flatMap((subject) => subject.chapters.flatMap((chapter) => chapter.dpps || []));
  const allResources = subjects.flatMap((subject) => subject.chapters.flatMap((chapter) => chapter.resources || []));
  const allAssignments = subjects.flatMap((subject) => subject.chapters.flatMap((chapter) => chapter.assignments || []));
  const totalLectures = allLectures.length || 1;
  const totalProgress = Math.round(allLectures.reduce((sum, lecture) => sum + lecture.progress, 0) / totalLectures);
  const currentLectureId = firstIncompleteId || allLectures[0]?.id || "";
  const markedSubjects = subjects.map((subject) => ({
    ...subject,
    chapters: subject.chapters.map((chapter) => ({
      ...chapter,
      lectures: chapter.lectures.map((lecture) => ({
        ...lecture,
        current: lecture.id === currentLectureId,
      })),
    })),
  }));

  const watchedMinutes = allLectures.reduce((sum, lecture) => sum + Math.round(durationToMinutes(lecture.duration) * (lecture.progress / 100)), 0);
  const remainingMinutes = allLectures.reduce((sum, lecture) => sum + Math.round(durationToMinutes(lecture.duration) * ((100 - lecture.progress) / 100)), 0);

  return {
    ...course,
    subjects: markedSubjects,
    progress: totalProgress,
    watchTime: minutesToDuration(watchedMinutes),
    estimatedRemaining: minutesToDuration(remainingMinutes),
    lectureCount: allLectures.length,
    sourceCount: allNotes.length + allDpps.length + allResources.length + allAssignments.length,
    lastDownloaded: allNotes[0]?.title || allResources[0]?.title || "No resources yet",
    lastAssignment: allAssignments[0]?.title || allDpps[0]?.title || "No practice uploaded yet",
  };
}
function buildTeacherCourseCurriculum(course) {
  const chapters = (course.modules || []).map((module, index) => ({
    id: module.id,
    name: module.name || `Module ${index + 1}`,
    duration: minutesToDuration(module.lectures.reduce((total, lecture) => total + durationToMinutes(lecture.duration), 0)),
    progress: 0,
    lectures: (module.lectures || []).map((lecture, lectureIndex) => ({
      id: lecture.id || `${module.id}-lecture-${lectureIndex + 1}`,
      title: lecture.title || `Lecture ${lectureIndex + 1}`,
      duration: lecture.duration || "Recorded lecture",
      progress: 0,
      current: index === 0 && lectureIndex === 0,
      pdf: Boolean((module.sources || []).length),
      completed: false,
      locked: false,
    })),
  }));

  return [
    {
      id: `${course.id}-subject`,
      name: dynamicSubjectName(course),
      icon: thumbnailForCourse(course.category),
      progress: 0,
      lastStudied: "Orientation",
      chapters: chapters.length ? chapters : [{
        id: `${course.id}-chapter-1`,
        name: `${course.title} Orientation`,
        duration: "0h 00m",
        progress: 0,
        lectures: [
          { id: `${course.id}-lecture-1`, title: "Course Roadmap", duration: "20 min", progress: 0, current: true, pdf: false, completed: false, locked: false },
        ],
      }],
    },
  ];
}

function buildTeacherBatchCurriculum(batch, linkedCourses) {
  return linkedCourses.map((course, subjectIndex) => {
    const chapters = (course.modules || []).map((module, chapterIndex) => buildTeacherChapter(batch, course, module, subjectIndex, chapterIndex));
    return {
      id: `${batch.id}-${course.id}-subject`,
      name: course.title,
      icon: thumbnailForCourse(course.category),
      progress: 0,
      lastStudied: "Batch roadmap",
      chapters: chapters.length ? chapters : [{
        id: `${batch.id}-${course.id}-orientation`,
        name: `${course.title} Orientation`,
        description: "The teacher has created the course shell. Content will appear here after upload and publish.",
        duration: "0h 00m",
        progress: 0,
        notes: [],
        dpps: [],
        resources: [],
        assignments: [],
        lectures: [],
      }],
    };
  });
}
function teacherPublishedCourses() {
  const studioState = loadTeacherStudioState();
  const publishedBatches = studioState.batches
    .filter((batch) => batch.status === "Published")
    .map((batch, index) => {
      const linkedCourses = (batch.courseIds || []).map((id) => studioState.courses.find((course) => course.id === id)).filter(Boolean);
      const firstCourse = linkedCourses[0];
      const minutes = linkedCourses.reduce((total, course) => total + (course.modules || []).reduce((sum, module) => sum + (module.lectures || []).reduce((inner, lecture) => inner + durationToMinutes(lecture.duration), 0), 0), 0);
      return applyProgressToCourse({
        id: batch.id,
        title: batch.name,
        faculty: firstCourse?.faculty || "Elite Coaching Faculty",
        category: batch.type || firstCourse?.category || "Elite Batch",
        access: "Premium",
        language: "English",
        duration: minutesToDuration(minutes),
        price: Number(String(firstCourse?.price || "0").replace(/[^\d.]/g, "")) || 0,
        rating: 4.9,
        students: batch.capacity || "New",
        enrolled: false,
        progress: 0,
        batchStart: formatDateLabel(batch?.startDate),
        batchEnd: "To be announced",
        validTill: "Active",
        enrollmentDate: "Today",
        status: "Published",
        watchTime: "0h 00m",
        estimatedRemaining: minutesToDuration(minutes),
        lastDownloaded: "No resources yet",
        lastAssignment: "No practice uploaded yet",
        thumbnail: thumbnailForCourse(batch.type || firstCourse?.category),
        subjects: buildTeacherBatchCurriculum(batch, linkedCourses),
        sourceOrigin: "teacher",
        batchName: batch.name || "Independent batch",
        description: batch.notes || "Published from the batch builder.",
        lectureCount: 0,
        sourceCount: 0,
        sortRank: 1000 - index,
      });
    });

  const publishedBatchCourseIds = new Set(
    studioState.batches
      .filter((batch) => batch.status === "Published")
      .flatMap((batch) => batch.courseIds || [])
  );

  const standalonePublishedCourses = studioState.courses
    .filter((course) => course.status === "Published" && course.visibility !== "Private" && !publishedBatchCourseIds.has(course.id))
    .map((course, index) => {
      const minutes = (course.modules || []).reduce((sum, module) => sum + (module.lectures || []).reduce((inner, lecture) => inner + durationToMinutes(lecture.duration), 0), 0);
      return applyProgressToCourse({
        id: course.id,
        title: course.title,
        faculty: course.faculty || "Elite Coaching Faculty",
        category: course.category || "Course",
        access: "Premium",
        language: course.language || "English",
        duration: minutesToDuration(minutes),
        price: Number(String(course.price || "0").replace(/[^\d.]/g, "")) || 0,
        rating: 4.9,
        students: course.studentCount || "New",
        enrolled: false,
        progress: 0,
        batchStart: "Available now",
        batchEnd: "Self-paced",
        validTill: "Active",
        enrollmentDate: "Today",
        status: "Published",
        watchTime: "0h 00m",
        estimatedRemaining: minutesToDuration(minutes),
        lastDownloaded: "No resources yet",
        lastAssignment: "No practice uploaded yet",
        thumbnail: thumbnailForCourse(course.category),
        subjects: buildTeacherCourseCurriculum(course),
        sourceOrigin: "teacher",
        batchName: course.batchId && course.batchId !== "Reusable Library" ? course.batchId : "Teacher Library",
        description: course.description || "Published directly from the teacher content library.",
        lectureCount: 0,
        sourceCount: 0,
        sortRank: 800 - index,
      });
    });

  return [...publishedBatches, ...standalonePublishedCourses];
}
function teacherPublishedBatches() {
  const studioState = loadTeacherStudioState();
  return studioState.batches
    .filter((batch) => batch.status === "Published")
    .map((batch) => ({
      id: batch.id,
      name: batch.name,
      year: batch.year,
      status: batch.status,
      startDate: formatDateLabel(batch.startDate),
      courseCount: Array.isArray(batch.courseIds) ? batch.courseIds.length : 0,
    }));
}

function courses() {
  return teacherPublishedCourses().map((course) => ({
    ...course,
    enrolled: course.enrolled || state.purchases.has(course.id),
  }));
}
function purchasedCourses() {
  return courses().filter((course) => course.enrolled);
}

function exploreCourses() {
  return courses().filter((course) => !course.enrolled);
}

function activeCourse() {
  return courses().find((course) => course.id === state.activeCourseId) || purchasedCourses()[0] || courses()[0] || null;
}

function activeSubject() {
  const course = activeCourse();
  return course?.subjects.find((subject) => subject.id === state.activeSubjectId) || course?.subjects[0] || null;
}

function activeChapter() {
  const subject = activeSubject();
  return subject?.chapters.find((chapter) => chapter.id === state.activeChapterId) || subject?.chapters[0] || null;
}

function activeLecture() {
  const chapter = activeChapter();
  return chapter?.lectures.find((lecture) => lecture.id === state.activeLectureId) || chapter?.lectures[0] || null;
}

function courseStats(course) {
  if (!course) return { subjects: 0, chapters: 0, lectures: 0, completedLectures: 0, pendingLectures: 0, notes: 0, dpps: 0, resources: 0, assignments: 0 };
  const subjects = course.subjects.length;
  const chapters = course.subjects.reduce((sum, subject) => sum + subject.chapters.length, 0);
  const lectures = course.subjects.reduce((sum, subject) => sum + subject.chapters.reduce((total, chapter) => total + chapter.lectures.length, 0), 0);
  const completedLectures = course.subjects.reduce((sum, subject) => sum + subject.chapters.reduce((total, chapter) => total + chapter.lectures.filter((lecture) => lecture.completed || lecture.progress === 100).length, 0), 0);
  const notes = course.subjects.reduce((sum, subject) => sum + subject.chapters.reduce((total, chapter) => total + (chapter.notes || []).length, 0), 0);
  const dpps = course.subjects.reduce((sum, subject) => sum + subject.chapters.reduce((total, chapter) => total + (chapter.dpps || []).length, 0), 0);
  const resources = course.subjects.reduce((sum, subject) => sum + subject.chapters.reduce((total, chapter) => total + (chapter.resources || []).length, 0), 0);
  const assignments = course.subjects.reduce((sum, subject) => sum + subject.chapters.reduce((total, chapter) => total + (chapter.assignments || []).length, 0), 0);
  return { subjects, chapters, lectures, completedLectures, pendingLectures: Math.max(lectures - completedLectures, 0), notes, dpps, resources, assignments };
}
function renderDashboard() {
  const enrolled = purchasedCourses();
  const avgProgress = Math.round(enrolled.reduce((sum, course) => sum + course.progress, 0) / Math.max(enrolled.length, 1));
  const nextCourse = enrolled[0] || courses()[0] || null;
  const nextStats = courseStats(nextCourse);
  document.getElementById("dashboardScreen").innerHTML = `
    <div class="page-head compact-head">
      <div>
        <h2>Welcome back, ${window.demoUser.name.split(" ")[0]}</h2>
        <p>Continue with the latest teacher-published lectures, notes, DPPs, and assignments.</p>
      </div>
      <button class="btn outline" data-screen="courses"><span class="material-symbols-outlined">menu_book</span>Open Courses</button>
    </div>
    <div class="grid metrics-grid">
      ${metric("school", enrolled.length, "Purchased courses")}
      ${metric("monitoring", `${avgProgress}%`, "Average progress")}
      ${metric("play_circle", nextStats.pendingLectures, "Pending lectures")}
      ${metric("schedule", nextCourse?.estimatedRemaining || "0h 00m", "Remaining time")}
    </div>
    ${nextCourse ? `
      <article class="card panel ${nextCourse.progress === 100 ? "course-complete" : ""}">
        <div class="progress-line"><strong>Current Position</strong><span>${nextCourse.title}</span></div>
        <div class="grid" style="grid-template-columns:auto minmax(0,1fr);align-items:center;">
          <div class="progress-ring" style="--progress:${Math.round(nextCourse.progress * 3.6)}deg"><strong>${nextCourse.progress}%</strong></div>
          <div>
            <p class="muted" style="margin:0;">Subject -> ${findCurrentTrail(nextCourse).subject.name} -> ${findCurrentTrail(nextCourse).chapter.name} -> ${findCurrentTrail(nextCourse).lecture.title}</p>
            <p style="margin:8px 0 0;font-weight:700;">Next recommended: ${findNextLectureLabel(nextCourse)}</p>
          </div>
        </div>
      </article>
    ` : ""}
    <div class="section-title-row"><div><h2>Courses</h2><p>Your active learning library</p></div><button class="btn outline" data-screen="courses">View all</button></div>
    ${enrolled.length ? `<div class="grid course-grid">${enrolled.map(purchasedCourseCard).join("")}</div>` : emptyState("No purchased courses yet", "Published batches appear in Explore. Unlock one there to start learning.")}
  `;
  bindDynamicActions();
}
function renderCourses() {
  const root = document.getElementById("coursesScreen");
  if (state.courseView === "workspace") return renderCourseWorkspace(root);
  if (state.courseView === "subject") return renderSubjectPage(root);
  if (state.courseView === "chapter") return renderChapterWorkspace(root);
  if (state.courseView === "player") return renderVideoPlayer(root);
  renderCourseList(root);
}

function renderCourseList(root) {
  const teacherCourses = teacherPublishedCourses();
  const teacherBatches = teacherPublishedBatches();
  const dynamicCategories = [...new Set(teacherCourses.map((course) => course.category).filter(Boolean))];
  const categories = ["All", "NEET", "JEE", "Foundation", "Class 11", "Class 12", "Crash Course", "Premium", "Free", ...dynamicCategories.filter((category) => !["NEET", "JEE", "Foundation", "Class 11", "Class 12", "Crash Course", "Premium", "Free"].includes(category))];
  const source = state.courseTab === "purchased" ? purchasedCourses() : exploreCourses();
  const filtered = sortCourses(source.filter((course) => {
    const categoryMatch = state.courseCategory === "All" || course.category === state.courseCategory || course.access === state.courseCategory;
    const text = `${course.title} ${course.faculty} ${course.category} ${course.access} ${course.batchName || ""} ${course.subjects.map((subject) => subject.name).join(" ")}`.toLowerCase();
    return categoryMatch && text.includes(state.courseQuery.toLowerCase());
  }));
  root.innerHTML = `
    <div class="module-page">
      <div class="course-toolbar">
        <div>
          <p class="eyebrow">Course Module</p>
          <h2>Courses</h2>
        </div>
        <label class="module-search">
          <span class="material-symbols-outlined">search</span>
          <input id="courseSearch" value="${escapeHtml(state.courseQuery)}" placeholder="Search course, faculty, subject, category" />
        </label>
        <select class="sort-select" id="courseSort" aria-label="Sort courses">
          <option value="recent" ${state.sort === "recent" ? "selected" : ""}>Recently Accessed</option>
          <option value="progress" ${state.sort === "progress" ? "selected" : ""}>Progress</option>
          <option value="az" ${state.sort === "az" ? "selected" : ""}>A-Z</option>
          <option value="rating" ${state.sort === "rating" ? "selected" : ""}>Rating</option>
        </select>
      </div>
      <div class="chip-scroll">
        ${categories.map((category) => `<button class="filter-chip ${state.courseCategory === category ? "active" : ""}" data-category="${category}">${category}</button>`).join("")}
      </div>
      <div class="underline-tabs">
        <button class="${state.courseTab === "purchased" ? "active" : ""}" data-course-tab="purchased">Purchased</button>
        <button class="${state.courseTab === "explore" ? "active" : ""}" data-course-tab="explore">Explore</button>
      </div>
      ${state.courseTab === "explore" ? exploreHighlights(teacherCourses, teacherBatches) : ""}
      ${filtered.length ? `<div class="grid course-grid lms-course-grid">${filtered.map(state.courseTab === "purchased" ? purchasedCourseCard : exploreCourseCard).join("")}</div>` : emptyState("No courses found", "Try another search, category, or tab.")}
    </div>
  `;
  bindDynamicActions();
}

function sortCourses(items) {
  return [...items].sort((a, b) => {
    if (state.sort === "progress") return b.progress - a.progress;
    if (state.sort === "az") return a.title.localeCompare(b.title);
    if (state.sort === "rating") return b.rating - a.rating;
    return (b.sortRank || Number(b.enrolled)) - (a.sortRank || Number(a.enrolled));
  });
}

function exploreHighlights(coursesList, batchList) {
  const publishedCourses = coursesList.length;
  const liveBatches = batchList.length;
  const latestCourses = coursesList.slice(0, 3);
  const latestBatches = batchList.slice(0, 2);

  return `
    <section class="card explore-hero">
      <div>
        <p class="eyebrow">Teacher Releases</p>
        <h3>Freshly published from the teacher dashboard</h3>
        <p>Whenever a teacher publishes a new course or opens a new batch, it appears here for students to discover in Explore.</p>
      </div>
      <div class="explore-metrics">
        <article><strong>${publishedCourses}</strong><span>Published courses</span></article>
        <article><strong>${liveBatches}</strong><span>Visible batches</span></article>
      </div>
      <div class="highlight-grid">
        ${latestCourses.map((course) => `
          <article class="highlight-card">
            <span class="teacher-badge">New Course</span>
            <h4>${course.title}</h4>
            <p>${course.faculty} • ${course.batchName}</p>
            <small>${course.lectureCount} lectures • ${course.sourceCount} resources</small>
          </article>
        `).join("") || `<article class="highlight-card empty-highlight"><h4>No teacher course published yet</h4><p>Publish a course from the teacher studio to show it here.</p></article>`}
        ${latestBatches.map((batch) => `
          <article class="highlight-card">
            <span class="teacher-badge alt">Batch</span>
            <h4>${batch.name}</h4>
            <p>${batch.status} • Starts ${batch.startDate}</p>
            <small>${batch.courseCount} published courses attached</small>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function purchasedCourseCard(course) {
  const stats = courseStats(course);
  const current = findCurrentTrail(course);
  return `
    <article class="card lms-course-card clickable" data-start-course="${course.id}" tabindex="0">
      <div class="course-thumb ${subjectTone(course.category)}"><span class="material-symbols-outlined">${course.thumbnail}</span></div>
      <div class="course-card-body">
        <div class="pill-row">${badge(course.category)}${badge(course.access, "blue")}</div>
        <h3>${course.title}</h3>
        <p>${course.faculty}</p>
        <div class="course-facts">
          <span>${stats.subjects} subjects</span><span>${stats.chapters} chapters</span><span>${stats.lectures} lectures</span>
        </div>
        ${course.batchName ? `<div class="teacher-inline-meta"><span class="material-symbols-outlined">groups</span><span>${course.batchName}</span></div>` : ""}
        <div class="progress-line"><span>Progress</span><strong>${course.progress}%</strong></div>
        <div class="progress"><span style="width:${course.progress}%"></span></div>
        <div class="learning-meta">
          <span><strong>Last watched</strong>${current.lecture.title}</span>
          <span><strong>Remaining</strong>${stats.pendingLectures} lectures · ${course.estimatedRemaining}</span>
        </div>
        <button class="btn full" data-start-course="${course.id}">Start Learning</button>
      </div>
    </article>
  `;
}

function exploreCourseCard(course) {
  return `
    <article class="card lms-course-card">
      <div class="course-thumb ${subjectTone(course.category)}"><span class="material-symbols-outlined">${course.thumbnail}</span></div>
      <div class="course-card-body">
        <div class="pill-row">${badge(course.category)}${badge(course.access, course.access === "Free" ? "green" : "blue")}</div>
        <h3>${course.title}</h3>
        <p>${course.faculty}</p>
        <div class="course-facts">
          <span>${course.duration}</span><span>${course.rating} rating</span><span>${course.students} students</span>
        </div>
        ${course.batchName ? `<div class="teacher-inline-meta"><span class="material-symbols-outlined">groups</span><span>${course.batchName}</span></div>` : ""}
        ${course.sourceOrigin === "teacher" ? `<p class="teacher-note">${course.description}</p>` : ""}
        <div class="price-row"><strong>${course.price ? `Rs. ${course.price.toLocaleString("en-IN")}` : "Free"}</strong><span>${course.language}</span></div>
        <div class="course-actions">
          <button class="btn" data-buy="${course.id}">${course.price ? "Buy Now" : "Unlock Course"}</button>
          <button class="btn outline" data-action="details">View Details</button>
        </div>
      </div>
    </article>
  `;
}

function renderCourseWorkspace(root) {
  const course = activeCourse();
  if (!course) {
    root.innerHTML = `<div class="module-page">${emptyState("No course available", "Publish a batch from the teacher studio to populate the student workspace.")}</div>`;
    bindDynamicActions();
    return;
  }
  const stats = courseStats(course);
  root.innerHTML = `
    <div class="module-page">
      ${courseHeader(course, "Back to Courses", "list")}
      ${workspaceTabs()}
      <div class="workspace-body">${workspaceTabContent(course, stats)}</div>
    </div>
  `;
  bindDynamicActions();
}
function courseHeader(course, backLabel, backView) {
  return `
    <div class="compact-module-header">
      <button class="link-button" data-course-view="${backView}"><span class="material-symbols-outlined">arrow_back</span>${backLabel}</button>
      <div class="header-main">
        <div>
          <h2>${course.title}</h2>
          <p>${course.faculty}</p>
        </div>
        <div class="header-progress">
          <span>Progress ${course.progress}%</span>
          <div class="progress"><span style="width:${course.progress}%"></span></div>
        </div>
      </div>
    </div>
  `;
}

function workspaceTabs() {
  return `
    <div class="sticky-tabs underline-tabs">
      ${["overview", "classes", "tests", "study material", "assignments"].map((tab) => `<button class="${state.workspaceTab === tab ? "active" : ""}" data-workspace-tab="${tab}">${titleCase(tab)}</button>`).join("")}
    </div>
  `;
}

function workspaceTabContent(course, stats) {
  if (state.workspaceTab === "classes") return classesTab(course);
  if (state.workspaceTab === "tests") return testsPanel(course);
  if (state.workspaceTab === "study material") return materialsPanel(course);
  if (state.workspaceTab === "assignments") return assignmentsPanel(course);
  const current = findCurrentTrail(course);
  return `
    <div class="overview-grid">
      <article class="card panel">
        <h3>Course Information</h3>
        ${infoRows([["Faculty", course.faculty], ["Batch Start Date", course.batchStart], ["Batch End Date", course.batchEnd], ["Batch Valid Till", course.validTill], ["Enrollment Date", course.enrollmentDate], ["Course Status", course.status], ["Course Language", course.language], ["Course Duration", course.duration]])}
      </article>
      <article class="card panel">
        <h3>Learning Progress</h3>
        <div class="large-progress"><strong>${course.progress}%</strong><span>Course completion</span></div>
        <div class="progress"><span style="width:${course.progress}%"></span></div>
        ${infoRows([["Completed Subjects", `${Math.floor(stats.subjects * course.progress / 100)} of ${stats.subjects}`], ["Completed Chapters", `${Math.floor(stats.chapters * course.progress / 100)} of ${stats.chapters}`], ["Completed Lectures", `${stats.completedLectures} of ${stats.lectures}`], ["Pending Lectures", stats.pendingLectures], ["Current Subject", current.subject.name], ["Current Chapter", current.chapter.name], ["Current Lecture", current.lecture.title], ["Watch Time", course.watchTime], ["Estimated Remaining Time", course.estimatedRemaining]])}
      </article>
      <article class="card panel">
        <h3>Content Snapshot</h3>
        ${activityList([["play_circle", "Current Lecture", current.lecture.title], ["description", "Latest Notes", course.lastDownloaded], ["assignment_turned_in", "Latest Practice", course.lastAssignment], ["folder_open", "Library Assets", `${stats.notes + stats.resources} files available`]])}
      </article>
      <article class="card panel">
        <h3>Quick Actions</h3>
        <div class="quick-actions">
          <button class="btn" data-open-player="${current.subject.id}|${current.chapter.id}|${current.lecture.id}">Continue Learning</button>
          <button class="btn outline" data-workspace-tab="classes">Open Classes</button>
          <button class="btn outline" data-workspace-tab="tests">Open Tests</button>
          <button class="btn outline" data-workspace-tab="study material">Open Study Material</button>
          <button class="btn outline" data-workspace-tab="assignments">Open Assignments</button>
        </div>
      </article>
      <article class="card panel full-span">
        <h3>Workspace Overview</h3>
        <div class="grid four-col">
          ${metric("video_library", stats.lectures, "Published lectures")}
          ${metric("description", stats.notes, "Notes")}
          ${metric("quiz", stats.dpps, "DPP / tests")}
          ${metric("assignment", stats.assignments, "Assignments")}
        </div>
      </article>
    </div>
  `;
}
function classesTab(course) {
  return `
    <div class="grid subject-grid">
      ${course.subjects.map((subject) => {
        const chapters = subject.chapters.length;
        const lectures = subject.chapters.reduce((sum, chapter) => sum + chapter.lectures.length, 0);
        return `
          <article class="card subject-card clickable" data-open-subject="${subject.id}" tabindex="0">
            <span class="subject-icon"><span class="material-symbols-outlined">${subject.icon}</span></span>
            <div>
              <h3>${subject.name}</h3>
              <p>${chapters} chapters · ${lectures} lectures</p>
            </div>
            <div class="progress-line"><span>${subject.progress}% complete</span><strong>${subject.lastStudied}</strong></div>
            <div class="progress"><span style="width:${subject.progress}%"></span></div>
            <div class="card-link">Continue <span class="material-symbols-outlined">arrow_forward</span></div>
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function renderSubjectPage(root) {
  const subject = activeSubject();
  const chapters = subject.chapters;
  const lectures = chapters.reduce((sum, chapter) => sum + chapter.lectures.length, 0);
  root.innerHTML = `
    <div class="module-page">
      <div class="compact-module-header">
        <button class="link-button" data-course-view="workspace"><span class="material-symbols-outlined">arrow_back</span>Back</button>
        <div class="header-main">
          <div><h2>${subject.name}</h2><p>${chapters.length} chapters · ${lectures} lectures</p></div>
          <div class="header-progress"><span>Progress ${subject.progress}%</span><div class="progress"><span style="width:${subject.progress}%"></span></div></div>
        </div>
      </div>
      <div class="grid chapter-grid">
        ${chapters.map((chapter, index) => chapterCard(chapter, index + 1)).join("")}
      </div>
    </div>
  `;
  bindDynamicActions();
}

function chapterCard(chapter, number) {
  const completed = chapter.lectures.filter((lecture) => lecture.completed || lecture.progress === 100).length;
  return `
    <article class="card chapter-card clickable" data-open-chapter="${chapter.id}" tabindex="0">
      <span class="chapter-number">Chapter ${number}</span>
      <h3>${chapter.name}</h3>
      <p>${chapter.lectures.length} lectures · ${completed} completed</p>
      <div class="progress-line"><span>${chapter.progress}% complete</span><strong>${chapter.duration}</strong></div>
      <div class="progress"><span style="width:${chapter.progress}%"></span></div>
      <button class="btn outline">Continue</button>
    </article>
  `;
}

function renderChapterWorkspace(root) {
  const subject = activeSubject();
  const chapter = activeChapter();
  const completed = chapter.lectures.filter((lecture) => lecture.completed || lecture.progress === 100).length;
  root.innerHTML = `
    <div class="module-page">
      <div class="compact-module-header">
        <button class="link-button" data-course-view="subject"><span class="material-symbols-outlined">arrow_back</span>Back</button>
        <div class="header-main">
          <div><p>${subject.name}</p><h2>${chapter.name}</h2></div>
          <div class="header-progress"><span>${completed} completed · ${chapter.lectures.length - completed} pending</span><div class="progress"><span style="width:${chapter.progress}%"></span></div></div>
        </div>
      </div>
      <div class="underline-tabs">
        ${["lectures", "notes", "dpp", "resources", "assignments"].map((tab) => `<button class="${state.chapterTab === tab ? "active" : ""}" data-chapter-tab="${tab}">${tab === "dpp" ? "DPP" : titleCase(tab)}</button>`).join("")}
      </div>
      ${chapterTabContent(subject, chapter)}
    </div>
  `;
  bindDynamicActions();
}

function chapterTabContent(subject, chapter) {
  if (state.chapterTab === "notes") return notesPanel(chapter);
  if (state.chapterTab === "dpp") return dppPanel(chapter);
  if (state.chapterTab === "resources") return resourcesPanel(chapter);
  if (state.chapterTab === "assignments") return chapterAssignmentsPanel(chapter);
  if (!chapter.lectures.length) return emptyState("No lectures yet", "The teacher has not published any lectures inside this chapter yet.");
  return `
    <div class="lecture-list">
      ${chapter.lectures.map((lecture, index) => `
        <article class="lecture-row ${lecture.current ? "current" : ""} ${lecture.completed ? "completed" : ""} ${lecture.locked ? "locked" : ""}">
          <span class="play-state"><span class="material-symbols-outlined">${lecture.locked ? "lock" : lecture.completed ? "check_circle" : "play_circle"}</span></span>
          <div><strong>Lecture ${index + 1}</strong><h3>${lecture.title}</h3></div>
          <span>${lecture.duration}</span>
          <span>${lecture.progress}% watched</span>
          <span>${lecture.completed ? badge("Completed", "green") : lecture.locked ? badge("Locked", "amber") : badge("In Progress", "blue")}</span>
          <span>${lecture.pdf ? "PDF" : "-"}</span>
          <button class="btn outline" ${lecture.locked ? "disabled" : `data-open-player="${subject.id}|${chapter.id}|${lecture.id}"`}>Play</button>
        </article>
      `).join("")}
    </div>
  `;
}

function chapterResourceGrid(items, emptyTitle, emptyDetail) {
  if (!items.length) return emptyState(emptyTitle, emptyDetail);
  return `<div class="grid resource-grid">${items.map((item) => resourceCard(item.icon, item.title, item.fileSize || item.fileType, item.updatedAt, item.primaryAction, item.secondaryAction)).join("")}</div>`;
}

function notesPanel(chapter) {
  return chapterResourceGrid(chapter.notes || [], "No notes uploaded", "Notes will appear here once the teacher uploads chapter PDFs or study material.");
}

function dppPanel(chapter) {
  return chapterResourceGrid(chapter.dpps || [], "No DPP uploaded", "Daily practice sheets will appear here after the teacher publishes them.");
}

function resourcesPanel(chapter) {
  return chapterResourceGrid(chapter.resources || [], "No resources uploaded", "Extra resources, links, and reference files will appear here.");
}

function chapterAssignmentsPanel(chapter) {
  return chapterResourceGrid(chapter.assignments || [], "No assignments uploaded", "Assignments and chapter tests will appear here after publication.");
}

function renderVideoPlayer(root) {
  const course = activeCourse();
  const subject = activeSubject();
  const chapter = activeChapter();
  const lecture = activeLecture();
  if (!course || !subject || !chapter || !lecture) {
    root.innerHTML = `<div class="module-page">${emptyState("No lecture selected", "Open a published lecture from the chapter workspace to continue.")}</div>`;
    bindDynamicActions();
    return;
  }
  if (!lecture.progress) updateLectureProgress(lecture.id, 15);
  const notes = chapter.notes || [];
  const resources = chapter.resources || [];
  const practice = [...(chapter.dpps || []), ...(chapter.assignments || [])];
  root.innerHTML = `
    <div class="module-page player-page">
      <div class="video-layout">
        <div>
          <div class="video-frame">
            ${lecture.videoSrc ? `<video class="video-player" controls src="${lecture.videoSrc}"></video>` : `<><span class="material-symbols-outlined">play_circle</span><strong>${lecture.title}</strong><p>Resume playback | ${lecture.progress}% watched</p></>`}
            <div class="video-controls">
              <button data-mark-progress="${lecture.id}|25">+25%</button><button data-mark-progress="${lecture.id}|100">Mark Complete</button><button data-course-view="chapter">Back to Chapter</button>
            </div>
          </div>
          <div class="lecture-detail">
            <h2>${lecture.title}</h2>
            <p>${lecture.teacherName}</p>
            <p class="breadcrumb">${course.title} > ${subject.name} > ${chapter.name} > ${lecture.title}</p>
            <p class="muted">${lecture.description}</p>
            <div class="course-actions">
              <button class="btn outline" data-player-nav="previous">Previous Lecture</button>
              <button class="btn" data-player-nav="next">Next Lecture</button>
              <button class="btn outline" data-course-view="chapter">Back to Chapter</button>
            </div>
          </div>
          <div class="grid resource-grid">
            ${notes.slice(0, 2).map((item) => resourceCard(item.icon, item.title, item.fileSize || item.fileType, item.updatedAt, item.primaryAction, item.secondaryAction)).join("")}
            ${resources.slice(0, 1).map((item) => resourceCard(item.icon, item.title, item.fileSize || item.fileType, item.updatedAt, item.primaryAction, item.secondaryAction)).join("")}
            ${practice.slice(0, 1).map((item) => resourceCard(item.icon, item.title, item.fileSize || item.fileType, item.updatedAt, item.primaryAction, item.secondaryAction)).join("")}
          </div>
        </div>
        <aside class="card playlist">
          <h3>Playlist</h3>
          ${course.subjects.map((playlistSubject) => `
            <div class="playlist-subject">
              <strong>${playlistSubject.name}</strong>
              ${playlistSubject.chapters.map((playlistChapter) => `
                <div class="playlist-chapter ${playlistChapter.id === chapter.id ? "open" : ""}">
                  <span>${playlistChapter.name}</span>
                  ${playlistChapter.id === chapter.id ? playlistChapter.lectures.map((item) => `<button class="${item.id === lecture.id ? "active" : ""}" data-open-player="${playlistSubject.id}|${playlistChapter.id}|${item.id}">${item.title}</button>`).join("") : ""}
                </div>
              `).join("")}
            </div>
          `).join("")}
        </aside>
      </div>
    </div>
  `;
  bindDynamicActions();
}

function aggregateCourseItems(course, key) {
  if (!course) return [];
  return course.subjects.flatMap((subject) => subject.chapters.flatMap((chapter) => chapter[key] || []));
}

function testsPanel(course = activeCourse()) {
  return chapterResourceGrid(aggregateCourseItems(course, "dpps"), "No DPP or tests available", "Practice items will appear here as soon as the teacher publishes them.");
}

function materialsPanel(course = activeCourse()) {
  return chapterResourceGrid([...aggregateCourseItems(course, "notes"), ...aggregateCourseItems(course, "resources")], "No study material available", "Notes and study resources will appear here after teacher upload.");
}

function assignmentsPanel(course = activeCourse()) {
  return chapterResourceGrid(aggregateCourseItems(course, "assignments"), "No assignments available", "Assignments will appear here after the teacher publishes them.");
}
function renderLive() {
  document.getElementById("liveScreen").innerHTML = `<div class="page-head"><div><h2>Live Classes</h2><p>Join live sessions and review today's class plan.</p></div></div>${testsPanel()}`;
}

function renderTests() {
  document.getElementById("testsScreen").innerHTML = `<div class="page-head"><div><h2>Tests</h2><p>Attempt upcoming tests and track exam readiness.</p></div></div>${testsPanel()}`;
}

function renderMaterials() {
  document.getElementById("materialsScreen").innerHTML = `<div class="page-head"><div><h2>Study Material</h2><p>Download notes, worksheets, question banks, and assignment bundles.</p></div></div>${materialsPanel()}`;
}

function renderPerformance() {
  const enrolled = purchasedCourses();
  document.getElementById("performanceScreen").innerHTML = `
    <div class="page-head"><div><h2>Performance</h2><p>Track progress across active courses.</p></div></div>
    <div class="grid">${enrolled.map((course) => `<article class="card panel"><div class="progress-line"><strong>${course.title}</strong><span>${course.progress}%</span></div><div class="progress"><span style="width:${course.progress}%"></span></div></article>`).join("")}</div>
  `;
}

function renderProfile() {
  document.getElementById("profileScreen").innerHTML = `
    <div class="page-head"><div><h2>Student Profile</h2><p>Account details and enrollment information.</p></div></div>
    <div class="profile-grid">
      <article class="card profile-hero"><div class="avatar-lg">${initials(window.demoUser.name)}</div><h3>${window.demoUser.name}</h3><p class="muted">${window.demoUser.email}</p></article>
      <article class="card panel"><h3>Enrollment Details</h3>${infoRows([["Student ID", "EC-24091"], ["Active Courses", purchasedCourses().length], ["Mentor", "Dr. Arjun Mehta"], ["Attendance", "92%"]])}</article>
    </div>
  `;
}

function bindDynamicActions() {
  if (state.dynamicBound) return;
  state.dynamicBound = true;
  const content = document.querySelector(".content");

  content.addEventListener("click", (event) => {
    const disabled = event.target.closest("button:disabled");
    if (disabled) return;

    const screen = event.target.closest("[data-screen]");
    if (screen) {
      navigateScreen(screen.dataset.screen);
      return;
    }

    const tab = event.target.closest("[data-course-tab]");
    if (tab) {
      state.courseTab = tab.dataset.courseTab;
      state.courseView = "list";
      renderCourses();
      return;
    }

    const category = event.target.closest("[data-category]");
    if (category) {
      state.courseCategory = category.dataset.category;
      renderCourses();
      return;
    }

    const buy = event.target.closest("[data-buy]");
    if (buy) {
      event.stopPropagation();
      setButtonLoading(buy, true);
      state.purchases.add(buy.dataset.buy);
      savePurchases();
      state.courseTab = "purchased";
      state.courseView = "list";
      window.setTimeout(() => {
        renderAll();
        showScreen("courses");
        setButtonLoading(buy, false, true);
        toast("Course added to Purchased.", "success");
      }, 220);
      return;
    }

    const start = event.target.closest("[data-start-course]");
    if (start) {
      event.stopPropagation();
      openCourse(start.dataset.startCourse);
      return;
    }

    const courseView = event.target.closest("[data-course-view]");
    if (courseView) {
      state.courseView = courseView.dataset.courseView;
      renderCourses();
      return;
    }

    const workspaceTab = event.target.closest("[data-workspace-tab]");
    if (workspaceTab) {
      state.workspaceTab = workspaceTab.dataset.workspaceTab;
      state.courseView = "workspace";
      renderCourses();
      return;
    }

    const subject = event.target.closest("[data-open-subject]");
    if (subject) {
      state.activeSubjectId = subject.dataset.openSubject;
      const firstChapter = activeSubject()?.chapters[0];
      if (firstChapter) state.activeChapterId = firstChapter.id;
      state.courseView = "subject";
      renderCourses();
      return;
    }

    const chapter = event.target.closest("[data-open-chapter]");
    if (chapter) {
      state.activeChapterId = chapter.dataset.openChapter;
      state.courseView = "chapter";
      state.chapterTab = "lectures";
      renderCourses();
      return;
    }

    const chapterTab = event.target.closest("[data-chapter-tab]");
    if (chapterTab) {
      state.chapterTab = chapterTab.dataset.chapterTab;
      renderCourses();
      return;
    }

    const player = event.target.closest("[data-open-player]");
    if (player) {
      const [subjectId, chapterId, lectureId] = player.dataset.openPlayer.split("|");
      state.activeSubjectId = subjectId;
      state.activeChapterId = chapterId;
      state.activeLectureId = lectureId;
      updateLectureProgress(lectureId, Math.max(lectureProgressRecord(lectureId).percent, 15));
      state.courseView = "player";
      renderCourses();
      return;
    }

    const markProgress = event.target.closest("[data-mark-progress]");
    if (markProgress) {
      const [lectureId, percent] = markProgress.dataset.markProgress.split("|");
      const next = percent === "100" ? 100 : Math.min(100, lectureProgressRecord(lectureId).percent + Number(percent));
      updateLectureProgress(lectureId, next);
      renderAll();
      renderCourses();
      if (next >= 100) {
        toast("Lecture completed successfully.", "success");
        const course = activeCourse();
        if (course?.progress === 100) {
          toast("Course completed. Certificate ready.", "info");
        }
      } else {
        toast(`Progress updated to ${next}%.`, "info");
      }
      return;
    }

    const playerNav = event.target.closest("[data-player-nav]");
    if (playerNav) {
      const course = activeCourse();
      const playlist = course.subjects.flatMap((subject) => subject.chapters.flatMap((chapter) => chapter.lectures.map((lecture) => ({ subjectId: subject.id, chapterId: chapter.id, lectureId: lecture.id }))));
      const currentIndex = playlist.findIndex((item) => item.lectureId === state.activeLectureId);
      const offset = playerNav.dataset.playerNav === "previous" ? -1 : 1;
      const nextItem = playlist[currentIndex + offset];
      if (nextItem) {
        state.activeSubjectId = nextItem.subjectId;
        state.activeChapterId = nextItem.chapterId;
        state.activeLectureId = nextItem.lectureId;
        updateLectureProgress(nextItem.lectureId, Math.max(lectureProgressRecord(nextItem.lectureId).percent, 15));
        state.courseView = "player";
        renderCourses();
      }
      return;
    }

    if (event.target.closest("[data-action]")) {
      toast("Action captured.", "info");
    }
  });

  content.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest(".clickable");
    if (!card) return;
    event.preventDefault();
    card.click();
  });

  content.addEventListener("input", (event) => {
    if (event.target.id !== "courseSearch") return;
    state.courseQuery = event.target.value;
    renderCourses();
  });

  content.addEventListener("change", (event) => {
    if (event.target.id !== "courseSort") return;
    state.sort = event.target.value;
    renderCourses();
  });
}

function openCourse(courseId) {
  state.activeCourseId = courseId;
  const course = activeCourse();
  const trail = findCurrentTrail(course);
  state.activeSubjectId = trail.subject.id;
  state.activeChapterId = trail.chapter.id;
  state.activeLectureId = trail.lecture.id;
  state.workspaceTab = "overview";
  state.courseView = "workspace";
  showScreen("courses");
  renderCourses();
}

function findCurrentTrail(course) {
  for (const subject of course.subjects) {
    for (const chapter of subject.chapters) {
      const lecture = chapter.lectures.find((item) => item.current) || chapter.lectures.find((item) => !item.completed && !item.locked);
      if (lecture) return { subject, chapter, lecture };
    }
  }
  return course?.subjects?.[0]?.chapters?.[0]?.lectures?.[0] ? { subject: course.subjects[0], chapter: course.subjects[0].chapters[0], lecture: course.subjects[0].chapters[0].lectures[0] } : { subject: { id: "", name: "No subject" }, chapter: { id: "", name: "No chapter" }, lecture: { id: "", title: "No lecture" } };
}

function findNextLectureLabel(course) {
  const playlist = course.subjects.flatMap((subject) => subject.chapters.flatMap((chapter) => chapter.lectures));
  return playlist.find((lecture) => !lecture.completed && !lecture.current && !lecture.locked)?.title || "Course completion in progress";
}

function metric(icon, value, label) {
  return `<article class="card metric-card"><span class="metric-icon"><span class="material-symbols-outlined">${icon}</span></span><strong>${value}</strong><span>${label}</span></article>`;
}

function infoRows(rows) {
  return `<div class="info-list">${rows.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("")}</div>`;
}

function activityList(rows) {
  return `<div class="activity-list">${rows.map(([icon, label, value]) => `<div><span class="material-symbols-outlined">${icon}</span><p><small>${label}</small><strong>${value}</strong></p></div>`).join("")}</div>`;
}

function resourceCard(icon, title, meta, date, primary, secondary) {
  return `<article class="card resource-card"><span class="resource-icon"><span class="material-symbols-outlined">${icon}</span></span><h3>${title}</h3><p>${meta} · ${date}</p><div class="course-actions"><button class="btn outline">${primary}</button><button class="btn">${secondary}</button></div></article>`;
}

function badge(text, tone = "blue") {
  return `<span class="pill ${tone}">${text}</span>`;
}

function emptyState(title, detail) {
  return `<article class="card panel empty-state"><span class="material-symbols-outlined">search_off</span><h3>${title}</h3><p>${detail}</p></article>`;
}

function subjectTone(value) {
  const key = value.toLowerCase();
  if (key.includes("chem")) return "chemistry";
  if (key.includes("bio")) return "biology";
  if (key.includes("jee") || key.includes("math")) return "math";
  if (key.includes("foundation") || key.includes("class")) return "mixed";
  return "physics";
}

function initials(name) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

function titleCase(value) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

function toast(message, tone = "success") {
  const element = document.getElementById("toast");
  element.textContent = message;
  element.className = `toast is-${tone}`;
  element.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    element.classList.remove("show");
    window.setTimeout(() => { element.className = "toast"; }, 220);
  }, 4000);
}

init();


