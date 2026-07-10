const currentUserKey = "eliteCoachingCurrentUser";
const purchaseKey = "eliteCoachingStaticPurchasedCourses";

const screens = {
  dashboard: { title: "Dashboard", eyebrow: "Student Panel" },
  courses: { title: "Courses", eyebrow: "Learning Library" },
  live: { title: "Live Classes", eyebrow: "Today" },
  tests: { title: "Tests", eyebrow: "Assessment Center" },
  materials: { title: "Study Material", eyebrow: "Resources" },
  performance: { title: "Performance", eyebrow: "Analytics" },
  profile: { title: "Profile", eyebrow: "Account" },
};

const demoCourses = [
  { id: "neet-master", title: "Complete NEET 2026 Master Course", category: "NEET", subject: "Physics", icon: "science", faculty: "Dr. Arjun Mehta", duration: "142h 30m", price: 3999, progress: 64, lectures: 50, completed: 34, enrolled: true, access: "Premium", batch: "NEET 2026 - Batch A", last: "Gauss law - intuition and proof" },
  { id: "organic", title: "Organic Chemistry Mastery", category: "JEE", subject: "Chemistry", icon: "biotech", faculty: "Prof. Nisha Kapoor", duration: "36h 20m", price: 3499, progress: 42, lectures: 32, completed: 14, enrolled: true, access: "Premium", batch: "JEE 2026 - Batch B", last: "Hybridisation made simple" },
  { id: "physiology", title: "Human Physiology Intensive", category: "NEET", subject: "Biology", icon: "genetics", faculty: "Dr. Rhea Sharma", duration: "28h 10m", price: 2999, progress: 81, lectures: 28, completed: 23, enrolled: true, access: "Premium", batch: "NEET 2026 - Batch A", last: "Cell cycle and mitosis" },
  { id: "jee-calculus", title: "Calculus for JEE Advanced", category: "JEE", subject: "Mathematics", icon: "functions", faculty: "Vikram Rao", duration: "40h 15m", price: 4499, progress: 0, lectures: 42, completed: 0, enrolled: false, access: "Premium", batch: "JEE Advanced upcoming", last: "Course roadmap" },
  { id: "test-series", title: "NEET Grand Test Series", category: "NEET", subject: "Mixed", icon: "quiz", faculty: "Academic Testing Team", duration: "18h 00m", price: 1999, progress: 0, lectures: 18, completed: 0, enrolled: false, access: "Premium", batch: "Open test batch", last: "Diagnostic practice" },
  { id: "foundation", title: "Foundation Mathematics Booster", category: "Foundation", subject: "Mathematics", icon: "calculate", faculty: "Ananya Bose", duration: "34h 20m", price: 2199, progress: 0, lectures: 30, completed: 0, enrolled: false, access: "Premium", batch: "Foundation demo batch", last: "Number systems warmup" },
  { id: "revision", title: "Free NEET Starter Study Kit", category: "Crash Course", subject: "Mixed", icon: "school", faculty: "EliteCoaching Faculty", duration: "4h 45m", price: 0, progress: 0, lectures: 8, completed: 0, enrolled: false, access: "Free", batch: "Open access", last: "Study plan setup" },
  { id: "biology-revision", title: "Class 12 Biology Complete Revision", category: "Class 12", subject: "Biology", icon: "eco", faculty: "Dr. Priya Menon", duration: "29h 35m", price: 1799, progress: 0, lectures: 24, completed: 0, enrolled: false, access: "Premium", batch: "Class 12 revision", last: "NCERT line review" },
];

const liveClasses = [
  { time: "10:00 AM", subject: "Electrostatics: Gauss Law Applications", teacher: "Dr. Arjun Mehta", status: "Live", duration: "75 min" },
  { time: "01:30 PM", subject: "Hybridisation and Molecular Shapes", teacher: "Prof. Nisha Kapoor", status: "Upcoming", duration: "60 min" },
  { time: "04:00 PM", subject: "Cell Cycle Problem Solving", teacher: "Dr. Rhea Sharma", status: "Upcoming", duration: "70 min" },
];

const tests = [
  { title: "Electrostatics Chapter Test", subject: "Physics", date: "11 Jul", duration: "45 min", marks: 120, status: "Ready" },
  { title: "Organic Reactions Mock", subject: "Chemistry", date: "14 Jul", duration: "60 min", marks: 100, status: "Scheduled" },
  { title: "Human Physiology Practice", subject: "Biology", date: "16 Jul", duration: "50 min", marks: 100, status: "Scheduled" },
  { title: "Full Syllabus Mini Mock", subject: "NEET", date: "20 Jul", duration: "90 min", marks: 180, status: "Locked" },
];

const materials = [
  { title: "Gauss Law Formula Sheet", subject: "Physics", type: "PDF", size: "1.8 MB" },
  { title: "Electrostatics Practice Set", subject: "Physics", type: "Worksheet", size: "2.4 MB" },
  { title: "Hybridisation Quick Notes", subject: "Chemistry", type: "PDF", size: "1.2 MB" },
  { title: "Cell Cycle Diagram Pack", subject: "Biology", type: "PDF", size: "3.1 MB" },
  { title: "NEET Previous Year Questions", subject: "Mixed", type: "Question Bank", size: "5.6 MB" },
  { title: "Weekly Assignment Bundle", subject: "Mixed", type: "Assignment", size: "4.2 MB" },
];

const state = {
  activeScreen: "dashboard",
  activeCourseTab: "my",
  activeCategory: "All",
  query: "",
  purchases: new Set(),
};

function init() {
  loadUser();
  loadPurchases();
  bindEvents();
  renderAll();
  showScreen("dashboard");
  applyTheme(localStorage.getItem("elitecoachingTheme") || "light");
}

function loadUser() {
  let user = null;
  try { user = JSON.parse(localStorage.getItem(currentUserKey)); } catch (error) { user = null; }
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
  } catch (error) {
    state.purchases = new Set();
  }
}

function savePurchases() {
  localStorage.setItem(purchaseKey, JSON.stringify([...state.purchases]));
}

function bindEvents() {
  document.querySelectorAll("[data-screen]").forEach((button) => {
    button.addEventListener("click", () => showScreen(button.dataset.screen));
  });
  document.querySelectorAll("[data-screen-shortcut]").forEach((button) => {
    button.addEventListener("click", () => showScreen(button.dataset.screenShortcut));
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
    state.query = event.target.value;
    showScreen("courses");
    renderCourses();
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

function withPurchases() {
  return demoCourses.map((course) => ({ ...course, enrolled: course.enrolled || state.purchases.has(course.id) }));
}

function enrolledCourses() {
  return withPurchases().filter((course) => course.enrolled);
}

function exploreCourses() {
  return withPurchases().filter((course) => !course.enrolled);
}

function renderDashboard() {
  const courses = enrolledCourses();
  const avgProgress = Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length);
  document.getElementById("dashboardScreen").innerHTML = `
    <div class="page-head">
      <div>
        <h2>Welcome back, ${window.demoUser.name.split(" ")[0]}</h2>
        <p>Your learning plan is ready. Continue lectures, join live classes, and review upcoming tests from one workspace.</p>
      </div>
      <button class="btn outline" data-action="sync"><span class="material-symbols-outlined">sync</span>Synced</button>
    </div>
    <div class="grid metrics-grid">
      ${metric("menu_book", courses.length, "Enrolled courses")}
      ${metric("monitoring", `${avgProgress}%`, "Average progress")}
      ${metric("fact_check", "92%", "Attendance")}
      ${metric("local_fire_department", "7 days", "Learning streak")}
    </div>
    <div class="section-title-row"><div><h2>Courses</h2><p>Your current learning library</p></div><button class="btn outline" data-screen="courses">View all</button></div>
    <div class="grid course-grid">${courses.slice(0, 3).map(courseCard).join("")}</div>
    <div class="section-title-row"><div><h2>Today</h2><p>Live classes and tasks</p></div></div>
    <div class="grid">${liveClasses.map((item) => compactList(item.status === "Live" ? "radio_button_checked" : "schedule", item.subject, `${item.time} - ${item.teacher}`, item.status === "Live" ? "Join" : "View", "live")).join("")}</div>
  `;
  bindDynamicActions();
}

function renderCourses() {
  const all = withPurchases();
  const source = state.activeCourseTab === "my" ? enrolledCourses() : exploreCourses();
  const filtered = source.filter((course) => {
    const categoryMatch = state.activeCategory === "All" || course.category === state.activeCategory || (state.activeCategory === "Free" && course.access === "Free");
    const text = `${course.title} ${course.category} ${course.subject} ${course.faculty} ${course.access}`.toLowerCase();
    return categoryMatch && text.includes(state.query.toLowerCase());
  });
  const categories = ["All", "NEET", "JEE", "Foundation", "Crash Course", "Class 12", "Free"];
  document.getElementById("coursesScreen").innerHTML = `
    <div class="page-head">
      <div>
        <h2>Courses</h2>
        <p>Test enrolled courses, explore courses, filters, search, enroll buttons, and curriculum opening without any framework.</p>
      </div>
      <button class="btn outline" id="resetDemo">Reset Demo</button>
    </div>
    <div class="grid metrics-grid">
      ${metric("school", enrolledCourses().length, "My courses")}
      ${metric("explore", exploreCourses().length, "Explore courses")}
      ${metric("play_circle", all.reduce((sum, course) => sum + course.lectures, 0), "Demo lectures")}
      ${metric("workspace_premium", "12", "Certificates")}
    </div>
    <div class="tabs" style="margin-top:18px">
      <div class="tab-group">
        <button class="tab ${state.activeCourseTab === "my" ? "active" : ""}" data-course-tab="my">My Courses</button>
        <button class="tab ${state.activeCourseTab === "explore" ? "active" : ""}" data-course-tab="explore">Explore</button>
      </div>
      <input class="inline-search" id="courseSearch" value="${escapeHtml(state.query)}" placeholder="Search courses, faculty, or subject" />
    </div>
    <div class="filter-row" style="margin-bottom:16px">
      ${categories.map((category) => `<button class="filter-chip ${state.activeCategory === category ? "active" : ""}" data-category="${category}">${category}</button>`).join("")}
    </div>
    ${filtered.length ? `<div class="grid course-grid">${filtered.map(courseCard).join("")}</div>` : emptyState("No courses found", "Try another tab, category, or search term.")}
  `;
  bindDynamicActions();
}

function renderLive() {
  document.getElementById("liveScreen").innerHTML = `
    <div class="page-head"><div><h2>Live Classes</h2><p>Join live sessions and review today's class plan.</p></div></div>
    <div class="grid two-col">
      <div class="grid">${liveClasses.map((item) => listCard("live_tv", item.subject, `${item.teacher} - ${item.time} - ${item.duration}`, item.status === "Live" ? "Join Class" : "Set Reminder", "live")).join("")}</div>
      <article class="card panel">
        <h3>Class readiness</h3>
        ${infoRows([["Classes today", "3"], ["Learning time", "3h 25m"], ["Preparation", "Ready"], ["Attendance this week", "92%"]])}
      </article>
    </div>
  `;
  bindDynamicActions();
}

function renderTests() {
  document.getElementById("testsScreen").innerHTML = `
    <div class="page-head"><div><h2>Tests</h2><p>Attempt upcoming tests and track exam readiness.</p></div></div>
    <div class="grid metrics-grid">
      ${metric("quiz", tests.length, "Tests")}
      ${metric("target", "86%", "Average score")}
      ${metric("trending_up", "+18", "Rank trend")}
      ${metric("timer", "45m", "Next test")}
    </div>
    <article class="card table-card" style="margin-top:18px">
      <table>
        <thead><tr><th>Test</th><th>Subject</th><th>Date</th><th>Duration</th><th>Marks</th><th>Status</th><th></th></tr></thead>
        <tbody>${tests.map((test) => `<tr><td><strong>${test.title}</strong></td><td>${test.subject}</td><td>${test.date}</td><td>${test.duration}</td><td>${test.marks}</td><td>${badge(test.status)}</td><td><button class="btn ${test.status === "Locked" ? "outline" : ""}" data-action="${test.status === "Locked" ? "locked" : "start"}">${test.status === "Locked" ? "Locked" : "Start"}</button></td></tr>`).join("")}</tbody>
      </table>
    </article>
  `;
  bindDynamicActions();
}

function renderMaterials() {
  document.getElementById("materialsScreen").innerHTML = `
    <div class="page-head"><div><h2>Study Material</h2><p>Download notes, worksheets, question banks, and assignment bundles.</p></div></div>
    <div class="grid course-grid">
      ${materials.map((item) => `
        <article class="card course-card">
          <div class="thumbnail mixed"><span class="material-symbols-outlined">description</span></div>
          <h3>${item.title}</h3>
          <p>${item.subject} - ${item.type} - ${item.size}</p>
          <div class="course-footer">
            <button class="btn outline" data-action="preview">Preview</button>
            <button class="btn" data-action="download">Download</button>
          </div>
        </article>
      `).join("")}
    </div>
  `;
  bindDynamicActions();
}

function renderPerformance() {
  const courses = enrolledCourses();
  const avg = Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length);
  document.getElementById("performanceScreen").innerHTML = `
    <div class="page-head"><div><h2>Performance</h2><p>Track progress, attendance, tests, and next best actions.</p></div></div>
    <div class="grid metrics-grid">
      ${metric("monitoring", `${avg}%`, "Overall progress")}
      ${metric("star", "86%", "Average score")}
      ${metric("fact_check", "92%", "Attendance")}
      ${metric("local_fire_department", "7", "Day streak")}
    </div>
    <div class="grid two-col" style="margin-top:18px">
      <article class="card panel">
        <h3>Course progress</h3>
        ${courses.map((course) => `<div style="margin-top:16px"><div class="button-row" style="justify-content:space-between"><strong>${course.title}</strong><span>${course.progress}%</span></div><div class="progress" style="margin-top:8px"><span style="width:${course.progress}%"></span></div></div>`).join("")}
      </article>
      <article class="card panel">
        <h3>Next best actions</h3>
        ${compactList("play_circle", "Resume Physics lecture", "21 minutes remaining", "Open", "continue")}
        ${compactList("description", "Download practice set", "Electrostatics worksheet", "Download", "download")}
        ${compactList("quiz", "Attempt chapter test", "Physics test is ready", "Start", "start")}
      </article>
    </div>
  `;
  bindDynamicActions();
}

function renderProfile() {
  document.getElementById("profileScreen").innerHTML = `
    <div class="page-head"><div><h2>Student Profile</h2><p>Account details, enrollment information, and learning summary.</p></div></div>
    <div class="profile-grid">
      <article class="card profile-hero">
        <div class="avatar-lg">${initials(window.demoUser.name)}</div>
        <h3>${window.demoUser.name}</h3>
        <p class="muted">${window.demoUser.email}</p>
        <div class="grid three-col" style="margin-top:18px">
          ${mini("Courses", enrolledCourses().length)}
          ${mini("Tests", tests.length)}
          ${mini("Streak", "7")}
        </div>
      </article>
      <article class="card panel">
        <h3>Enrollment details</h3>
        ${infoRows([["Student ID", "EC-24091"], ["Program", "NEET Master Course"], ["Batch", "NEET 2026 - Batch A"], ["Mentor", "Dr. Arjun Mehta"], ["Assignments", "7 submitted"], ["Attendance", "92%"]])}
      </article>
    </div>
  `;
}

function courseCard(course) {
  const subjectClass = subjectTone(course.subject);
  const remaining = Math.max(course.lectures - course.completed, 0);
  return `
    <article class="card course-card">
      <div class="thumbnail ${subjectClass}"><span class="material-symbols-outlined">${course.icon}</span></div>
      <div class="pill-row" style="margin-top:14px">${badge(course.category)}${badge(course.access, course.access === "Free" ? "green" : "blue")}${course.enrolled ? badge("Enrolled", "green") : ""}</div>
      <h3>${course.title}</h3>
      <p>${course.faculty} - ${course.batch}</p>
      <div class="button-row" style="justify-content:space-between;margin:10px 0 8px"><span class="muted">${course.lectures} lectures</span><strong>${course.price ? `Rs. ${course.price.toLocaleString("en-IN")}` : "Free"}</strong></div>
      <div class="progress"><span style="width:${course.progress}%"></span></div>
      <p class="muted">${course.enrolled ? `${remaining} lectures left - last: ${course.last}` : `${course.duration} - demo curriculum available`}</p>
      <div class="course-footer">
        <button class="btn outline" data-open-course="${course.id}">Details</button>
        ${course.enrolled ? `<button class="btn" data-action="continue">Continue</button>` : `<button class="btn" data-buy="${course.id}">${course.price ? "Buy" : "Enroll"}</button>`}
      </div>
    </article>
  `;
}

function metric(icon, value, label) {
  return `<article class="card metric-card"><span class="metric-icon"><span class="material-symbols-outlined">${icon}</span></span><strong>${value}</strong><span>${label}</span></article>`;
}

function listCard(icon, title, detail, action, actionKey) {
  return `<article class="card list-card"><span class="list-icon"><span class="material-symbols-outlined">${icon}</span></span><div><h3>${title}</h3><p>${detail}</p></div><button class="btn" data-action="${actionKey}">${action}</button></article>`;
}

function compactList(icon, title, detail, action, actionKey) {
  return `<div class="list-card" style="padding-left:0;padding-right:0;box-shadow:none;border-left:0;border-right:0;border-top:0;border-radius:0"><span class="list-icon"><span class="material-symbols-outlined">${icon}</span></span><div><h3>${title}</h3><p>${detail}</p></div><button class="btn outline" data-action="${actionKey}">${action}</button></div>`;
}

function infoRows(rows) {
  return `<div class="grid" style="margin-top:16px">${rows.map(([label, value]) => `<div class="button-row" style="justify-content:space-between;border:1px solid var(--line);border-radius:14px;padding:12px"><span class="muted">${label}</span><strong>${value}</strong></div>`).join("")}</div>`;
}

function mini(label, value) {
  return `<div class="card panel" style="box-shadow:none"><strong>${value}</strong><p class="muted" style="margin:6px 0 0">${label}</p></div>`;
}

function badge(text, tone = "blue") {
  return `<span class="pill ${tone}">${text}</span>`;
}

function emptyState(title, detail) {
  return `<article class="card panel" style="text-align:center"><span class="material-symbols-outlined" style="font-size:42px;color:var(--muted)">search_off</span><h3>${title}</h3><p class="muted">${detail}</p></article>`;
}

function bindDynamicActions() {
  document.querySelectorAll("[data-screen]").forEach((button) => button.addEventListener("click", () => showScreen(button.dataset.screen)));
  document.querySelectorAll("[data-course-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeCourseTab = button.dataset.courseTab;
      renderCourses();
    });
  });
  document.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeCategory = button.dataset.category;
      renderCourses();
    });
  });
  document.querySelectorAll("[data-buy]").forEach((button) => {
    button.addEventListener("click", () => {
      state.purchases.add(button.dataset.buy);
      savePurchases();
      state.activeCourseTab = "my";
      renderAll();
      showScreen("courses");
      toast("Course added to My Courses.");
    });
  });
  document.querySelectorAll("[data-action]").forEach((button) => button.addEventListener("click", () => toast("Demo action selected.")));
  document.querySelectorAll("[data-open-course]").forEach((button) => button.addEventListener("click", () => toast(`Opened ${courseById(button.dataset.openCourse).title} curriculum demo.`)));
  const courseSearch = document.getElementById("courseSearch");
  if (courseSearch) {
    courseSearch.addEventListener("input", (event) => {
      state.query = event.target.value;
      renderCourses();
    });
  }
  const reset = document.getElementById("resetDemo");
  if (reset) {
    reset.addEventListener("click", () => {
      state.purchases.clear();
      state.activeCourseTab = "my";
      state.activeCategory = "All";
      state.query = "";
      localStorage.removeItem(purchaseKey);
      renderAll();
      toast("Demo data reset.");
    });
  }
}

function courseById(id) {
  return demoCourses.find((course) => course.id === id) || demoCourses[0];
}

function subjectTone(subject) {
  const key = subject.toLowerCase();
  if (key.includes("chem")) return "chemistry";
  if (key.includes("bio")) return "biology";
  if (key.includes("math")) return "math";
  if (key.includes("mixed")) return "mixed";
  return "physics";
}

function initials(name) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

function toast(message) {
  const element = document.getElementById("toast");
  element.textContent = message;
  element.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => element.classList.remove("show"), 2200);
}

init();
