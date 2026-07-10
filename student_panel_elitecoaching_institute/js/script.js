const currentUserKey = "eliteCoachingCurrentUser";
const purchaseKey = "eliteCoachingStaticPurchasedCourses";
const teacherStudioKey = "eliteCoachingCourseStudioState";

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
  activeCourseId: "neet-2027",
  workspaceTab: "overview",
  activeSubjectId: "physics",
  activeChapterId: "electric-charges",
  chapterTab: "lectures",
  activeLectureId: "lec-3",
  purchases: new Set(),
  dynamicBound: false,
};

function init() {
  loadUser();
  loadPurchases();
  bindShellEvents();
  renderAll();
  showScreen("dashboard");
  applyTheme(localStorage.getItem("elitecoachingTheme") || "light");
}

function loadUser() {
  let user = null;
  try { user = JSON.parse(localStorage.getItem(currentUserKey)); } catch { user = null; }
  if (user && user.role === "teacher") {
    window.location.href = "../admin_dashboard_elitecoaching_institute/admin.html";
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
    if (event.key !== teacherStudioKey && event.key !== purchaseKey) return;
    if (event.key === purchaseKey) loadPurchases();
    renderAll();
    if (state.activeScreen === "courses") renderCourses();
  });
}

function navigateScreen(screen) {
  if (screen === "courses") {
    state.courseView = "list";
  }
  showScreen(screen);
  if (screen === "courses") {
    renderCourses();
  }
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

function teacherPublishedCourses() {
  const studioState = loadTeacherStudioState();
  return studioState.courses
    .filter((course) => course.status === "Published")
    .map((course, index) => {
      const batch = studioState.batches.find((item) => item.id === course.batchId);
      const lectures = (course.modules || []).reduce((total, module) => total + (module.lectures || []).length, 0);
      const minutes = (course.modules || []).reduce((total, module) => total + (module.lectures || []).reduce((sum, lecture) => sum + durationToMinutes(lecture.duration), 0), 0);
      return {
        id: course.id,
        title: course.title,
        faculty: course.faculty || "Elite Coaching Faculty",
        category: course.category || "Elite Course",
        access: "Premium",
        language: "English",
        duration: minutesToDuration(minutes),
        price: 0,
        rating: 4.9,
        students: "New",
        enrolled: false,
        progress: 0,
        batchStart: formatDateLabel(batch?.startDate),
        batchEnd: "To be announced",
        validTill: "Active",
        enrollmentDate: "Today",
        status: "Published",
        watchTime: "0h 00m",
        estimatedRemaining: minutesToDuration(minutes),
        lastDownloaded: "Module resources pending",
        lastAssignment: "No assignment yet",
        thumbnail: thumbnailForCourse(course.category),
        subjects: buildTeacherCourseCurriculum(course),
        sourceOrigin: "teacher",
        batchName: batch?.name || "Independent course",
        description: course.description || "Published by the teacher studio.",
        lectureCount: lectures,
        sourceCount: (course.modules || []).reduce((total, module) => total + (module.sources || []).length, 0),
        sortRank: 1000 - index,
      };
    });
}

function teacherPublishedBatches() {
  const studioState = loadTeacherStudioState();
  return studioState.batches
    .filter((batch) => batch.status === "Open" || batch.status === "Upcoming")
    .map((batch) => ({
      id: batch.id,
      name: batch.name,
      year: batch.year,
      status: batch.status,
      startDate: formatDateLabel(batch.startDate),
      courseCount: studioState.courses.filter((course) => course.batchId === batch.id && course.status === "Published").length,
    }));
}

function courses() {
  const staticCourses = courseCatalog.map((course, index) => {
    const enrolled = course.enrolled || state.purchases.has(course.id);
    return {
      ...course,
      enrolled,
      subjects: course.subjects.length ? course.subjects : buildStarterCurriculum(course),
      batchStart: course.batchStart || "01 Jul 2026",
      batchEnd: course.batchEnd || "31 Jan 2027",
      validTill: course.validTill || "31 Mar 2027",
      enrollmentDate: course.enrollmentDate || "Today",
      status: course.status || (enrolled ? "Active" : "Preview"),
      watchTime: course.watchTime || "0h 00m",
      estimatedRemaining: course.estimatedRemaining || course.duration,
      lastDownloaded: course.lastDownloaded || "Orientation Notes",
      lastAssignment: course.lastAssignment || "Not submitted yet",
      sortRank: 500 - index,
    };
  });

  return [...teacherPublishedCourses(), ...staticCourses].map((course) => ({
    ...course,
    enrolled: course.enrolled || state.purchases.has(course.id),
  }));
}

function buildStarterCurriculum(course) {
  const subjectName = course.category.includes("Class") ? course.category : course.category === "Crash Course" ? "Revision" : course.category;
  return [
    {
      id: `${course.id}-subject`,
      name: subjectName,
      icon: course.thumbnail || "menu_book",
      progress: course.progress || 0,
      lastStudied: "Orientation",
      chapters: [
        {
          id: `${course.id}-chapter-1`,
          name: `${course.title} Orientation`,
          duration: course.duration,
          progress: course.progress || 0,
          lectures: [
            { id: "lec-1", title: "Course Roadmap", duration: "32 min", progress: course.progress ? 100 : 0, completed: Boolean(course.progress), pdf: true },
            { id: "lec-2", title: "Study Plan and Resources", duration: "38 min", progress: 0, current: true, pdf: true },
            { id: "lec-3", title: "First Practice Session", duration: "45 min", progress: 0, pdf: false },
          ],
        },
      ],
    },
  ];
}

function purchasedCourses() {
  return courses().filter((course) => course.enrolled);
}

function exploreCourses() {
  return courses().filter((course) => !course.enrolled);
}

function activeCourse() {
  return courses().find((course) => course.id === state.activeCourseId) || purchasedCourses()[0] || courses()[0];
}

function activeSubject() {
  const course = activeCourse();
  return course.subjects.find((subject) => subject.id === state.activeSubjectId) || course.subjects[0];
}

function activeChapter() {
  const subject = activeSubject();
  return subject?.chapters.find((chapter) => chapter.id === state.activeChapterId) || subject?.chapters[0];
}

function activeLecture() {
  const chapter = activeChapter();
  return chapter?.lectures.find((lecture) => lecture.id === state.activeLectureId) || chapter?.lectures[0];
}

function courseStats(course) {
  const subjects = course.subjects.length;
  const chapters = course.subjects.reduce((sum, subject) => sum + subject.chapters.length, 0);
  const lectures = course.subjects.reduce((sum, subject) => sum + subject.chapters.reduce((total, chapter) => total + chapter.lectures.length, 0), 0);
  const completedLectures = course.subjects.reduce((sum, subject) => sum + subject.chapters.reduce((total, chapter) => total + chapter.lectures.filter((lecture) => lecture.completed || lecture.progress === 100).length, 0), 0);
  return { subjects, chapters, lectures, completedLectures, pendingLectures: Math.max(lectures - completedLectures, 0) };
}

function renderDashboard() {
  const enrolled = purchasedCourses();
  const avgProgress = Math.round(enrolled.reduce((sum, course) => sum + course.progress, 0) / Math.max(enrolled.length, 1));
  const nextCourse = enrolled[0] || courses()[0];
  document.getElementById("dashboardScreen").innerHTML = `
    <div class="page-head compact-head">
      <div>
        <h2>Welcome back, ${window.demoUser.name.split(" ")[0]}</h2>
        <p>Continue from your purchased courses and move through subjects, chapters, and lectures without distraction.</p>
      </div>
      <button class="btn outline" data-screen="courses"><span class="material-symbols-outlined">menu_book</span>Open Courses</button>
    </div>
    <div class="grid metrics-grid">
      ${metric("school", enrolled.length, "Purchased courses")}
      ${metric("monitoring", `${avgProgress}%`, "Average progress")}
      ${metric("play_circle", courseStats(nextCourse).pendingLectures, "Pending lectures")}
      ${metric("schedule", nextCourse.estimatedRemaining, "Remaining time")}
    </div>
    <div class="section-title-row"><div><h2>Courses</h2><p>Your active learning library</p></div><button class="btn outline" data-screen="courses">View all</button></div>
    <div class="grid course-grid">${enrolled.map(purchasedCourseCard).join("")}</div>
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
  if (state.workspaceTab === "tests") return testsPanel();
  if (state.workspaceTab === "study material") return materialsPanel();
  if (state.workspaceTab === "assignments") return assignmentsPanel();
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
        <h3>Recent Activity</h3>
        ${activityList([["play_circle", "Recently Watched Lecture", current.lecture.title], ["description", "Last Downloaded Notes", course.lastDownloaded], ["assignment_turned_in", "Last Assignment Submitted", course.lastAssignment]])}
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
        <h3>Upcoming Activities</h3>
        <div class="grid four-col">
          ${metric("live_tv", "3", "Upcoming live classes")}
          ${metric("quiz", "2", "Upcoming tests")}
          ${metric("pending_actions", "4", "Pending assignments")}
          ${metric("fiber_new", "6", "Recently uploaded lectures")}
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
        ${["lectures", "notes", "dpp", "resources"].map((tab) => `<button class="${state.chapterTab === tab ? "active" : ""}" data-chapter-tab="${tab}">${tab === "dpp" ? "DPP" : titleCase(tab)}</button>`).join("")}
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

function notesPanel(chapter) {
  return `
    <label class="module-search inline-note-search"><span class="material-symbols-outlined">search</span><input placeholder="Search notes" /></label>
    <div class="grid resource-grid">
      ${["Concept Notes", "Formula Sheet", "Solved Examples", "Revision Notes"].map((title, index) => resourceCard("picture_as_pdf", `${chapter.name} ${title}`, `${1.4 + index}.2 MB`, "Updated today", "Preview", "Download")).join("")}
    </div>
  `;
}

function dppPanel(chapter) {
  return `<div class="grid resource-grid">${["DPP 01", "DPP 02", "Mixed Practice", "Advanced Drill"].map((title, index) => `
    <article class="card resource-card">
      <span class="resource-icon"><span class="material-symbols-outlined">assignment</span></span>
      <h3>${chapter.name} ${title}</h3>
      <p>${20 + index * 5} questions · ${80 + index * 10} marks · ${35 + index * 5} min</p>
      <div class="course-actions"><button class="btn">Attempt</button><button class="btn outline">View Solution</button></div>
      ${badge(index === 0 ? "Attempted" : "Pending", index === 0 ? "green" : "amber")}
    </article>`).join("")}</div>`;
}

function resourcesPanel(chapter) {
  return `<div class="grid resource-grid">${["Formula Sheets", "Worksheets", "Reference PDFs", "Practice Material", "Downloads"].map((title) => resourceCard("folder_open", `${chapter.name} ${title}`, "2.8 MB", "Updated this week", "Open", "Download")).join("")}</div>`;
}

function renderVideoPlayer(root) {
  const course = activeCourse();
  const subject = activeSubject();
  const chapter = activeChapter();
  const lecture = activeLecture();
  root.innerHTML = `
    <div class="module-page player-page">
      <div class="video-layout">
        <div>
          <div class="video-frame">
            <span class="material-symbols-outlined">play_circle</span>
            <strong>${lecture.title}</strong>
            <p>Resume playback · ${lecture.progress}% watched</p>
            <div class="video-controls">
              <button>1x</button><button>1080p</button><button>Fullscreen</button><button>PiP</button><button>Bookmark</button>
            </div>
          </div>
          <div class="lecture-detail">
            <h2>${lecture.title}</h2>
            <p>${course.faculty}</p>
            <p class="breadcrumb">${course.title} &gt; ${subject.name} &gt; ${chapter.name} &gt; ${lecture.title}</p>
            <p class="muted">A focused lecture workspace with resume playback, auto next, bookmarks, timestamp notes, keyboard shortcuts, and progress tracking placeholders.</p>
            <div class="course-actions">
              <button class="btn outline" data-action="previous">Previous Lecture</button>
              <button class="btn" data-action="next">Next Lecture</button>
              <button class="btn outline" data-course-view="chapter">Back to Chapter</button>
            </div>
          </div>
          <div class="underline-tabs">
            ${["Overview", "Notes", "Resources", "Discussion", "Assignments"].map((tab, index) => `<button class="${index === 0 ? "active" : ""}">${tab}</button>`).join("")}
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

function testsPanel() {
  return `<div class="grid resource-grid">${["Chapter Test", "Minor Test", "Full Syllabus Mock"].map((title, index) => resourceCard("quiz", title, `${100 + index * 80} marks`, `${45 + index * 30} min`, "Start", "Syllabus")).join("")}</div>`;
}

function materialsPanel() {
  return `<div class="grid resource-grid">${["Master Notes", "PYQ Bank", "Class Slides", "Revision Pack"].map((title, index) => resourceCard("description", title, `${2 + index}.4 MB`, "Updated recently", "Preview", "Download")).join("")}</div>`;
}

function assignmentsPanel() {
  return `<div class="grid resource-grid">${["Weekly Assignment", "NCERT Drill", "Numerical Practice"].map((title, index) => resourceCard("assignment", title, `${30 + index * 10} questions`, index === 0 ? "Pending" : "Submitted", "Open", "Submit")).join("")}</div>`;
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
      state.purchases.add(buy.dataset.buy);
      savePurchases();
      state.courseTab = "purchased";
      state.courseView = "list";
      renderAll();
      showScreen("courses");
      toast("Course added to Purchased.");
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
      state.courseView = "player";
      renderCourses();
      return;
    }

    if (event.target.closest("[data-action]")) {
      toast("Demo action selected.");
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
  return { subject: course.subjects[0], chapter: course.subjects[0].chapters[0], lecture: course.subjects[0].chapters[0].lectures[0] };
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

function toast(message) {
  const element = document.getElementById("toast");
  element.textContent = message;
  element.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => element.classList.remove("show"), 2200);
}

init();
