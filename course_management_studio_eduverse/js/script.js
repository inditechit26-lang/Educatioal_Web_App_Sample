const STORAGE_KEY = "eliteCoachingCourseStudioState";

const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarDrawer = document.getElementById("sidebarDrawer");
const tabButtons = document.querySelectorAll("[data-workspace-tab]");
const sections = document.querySelectorAll("[data-workspace-section]");

const courseForm = document.getElementById("courseForm");
const courseIdInput = document.getElementById("courseId");
const courseTitleInput = document.getElementById("courseTitle");
const courseBatchSelect = document.getElementById("courseBatch");
const courseFacultyInput = document.getElementById("courseFaculty");
const courseCategoryInput = document.getElementById("courseCategory");
const courseStatusInput = document.getElementById("courseStatus");
const courseDescriptionInput = document.getElementById("courseDescription");
const courseFormTitle = document.getElementById("courseFormTitle");
const courseList = document.getElementById("courseList");
const courseSummary = document.getElementById("courseSummary");
const studioOverviewStats = document.getElementById("studioOverviewStats");
const studioOverviewFeed = document.getElementById("studioOverviewFeed");

const batchForm = document.getElementById("batchForm");
const batchIdInput = document.getElementById("batchId");
const batchNameInput = document.getElementById("batchName");
const batchYearInput = document.getElementById("batchYear");
const batchStartInput = document.getElementById("batchStart");
const batchStatusInput = document.getElementById("batchStatus");
const batchFormTitle = document.getElementById("batchFormTitle");
const batchList = document.getElementById("batchList");

const builderEmpty = document.getElementById("builderEmpty");
const builderContent = document.getElementById("builderContent");
const builderCourseTitle = document.getElementById("builderCourseTitle");
const builderCourseMeta = document.getElementById("builderCourseMeta");
const moduleList = document.getElementById("moduleList");
const moduleForm = document.getElementById("moduleForm");
const moduleIdInput = document.getElementById("moduleId");
const moduleNameInput = document.getElementById("moduleName");
const moduleObjectiveInput = document.getElementById("moduleObjective");
const moduleDesignInput = document.getElementById("moduleDesign");
const moduleStatusInput = document.getElementById("moduleStatus");
const moduleFormTitle = document.getElementById("moduleFormTitle");

const lectureForm = document.getElementById("lectureForm");
const lectureIdInput = document.getElementById("lectureId");
const lectureTitleInput = document.getElementById("lectureTitle");
const lectureUrlInput = document.getElementById("lectureUrl");
const lectureDurationInput = document.getElementById("lectureDuration");
const lectureList = document.getElementById("lectureList");
const lectureSubmitButton = document.getElementById("lectureSubmitButton");

const sourceForm = document.getElementById("sourceForm");
const sourceIdInput = document.getElementById("sourceId");
const sourceTitleInput = document.getElementById("sourceTitle");
const sourceTypeInput = document.getElementById("sourceType");
const sourceUrlInput = document.getElementById("sourceUrl");
const sourceList = document.getElementById("sourceList");
const sourceSubmitButton = document.getElementById("sourceSubmitButton");

const addNewCourseButton = document.getElementById("addNewCourseButton");
const addNewBatchButton = document.getElementById("addNewBatchButton");
const clearModuleButton = document.getElementById("clearModuleButton");
const clearLectureButton = document.getElementById("clearLectureButton");
const clearSourceButton = document.getElementById("clearSourceButton");
const autosavePill = document.getElementById("studioAutosave");

const defaultState = {
  activeSection: "courses",
  selectedCourseId: null,
  selectedModuleId: null,
  batches: [
    {
      id: createId("batch"),
      name: "NEEV Batch 2026",
      year: "2026",
      startDate: "2026-04-01",
      status: "Open",
    },
  ],
  courses: [],
};

let state = loadState();

function createId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return structuredClone(defaultState);
    return {
      ...structuredClone(defaultState),
      ...saved,
      batches: saved.batches?.length ? saved.batches : structuredClone(defaultState.batches),
      courses: saved.courses || [],
    };
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState(label = "Saved") {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (!autosavePill) return;
  autosavePill.textContent = label;
  autosavePill.classList.remove("is-saving");
  autosavePill.classList.add("is-saved");
}

function markSaving() {
  if (!autosavePill) return;
  autosavePill.textContent = "Saving...";
  autosavePill.classList.remove("is-saved");
  autosavePill.classList.add("is-saving");
}

function setActiveSection(sectionId) {
  state.activeSection = sectionId;
  tabButtons.forEach((button) => {
    const isActive = button.dataset.workspaceTab === sectionId;
    button.classList.toggle("is-active", isActive);
    button.classList.toggle("bg-primary", isActive);
    button.classList.toggle("text-white", isActive);
    button.classList.toggle("border-border", !isActive);
    button.classList.toggle("bg-white", !isActive);
    button.classList.toggle("text-muted", !isActive);
  });
  sections.forEach((section) => {
    section.classList.toggle("is-active", section.dataset.workspaceSection === sectionId);
  });
  saveState();
}

function getSelectedCourse() {
  return state.courses.find((course) => course.id === state.selectedCourseId) || null;
}

function getSelectedModule() {
  const course = getSelectedCourse();
  if (!course) return null;
  return course.modules.find((module) => module.id === state.selectedModuleId) || null;
}

function getBatchById(batchId) {
  return state.batches.find((batch) => batch.id === batchId) || null;
}

function renderBatchOptions() {
  const currentValue = courseBatchSelect.value;
  courseBatchSelect.innerHTML = "";
  if (!state.batches.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Create a batch first";
    courseBatchSelect.appendChild(option);
    return;
  }

  state.batches.forEach((batch) => {
    const option = document.createElement("option");
    option.value = batch.id;
    option.textContent = batch.name;
    courseBatchSelect.appendChild(option);
  });
  courseBatchSelect.value = currentValue || state.batches[0]?.id || "";
}

function renderOverview() {
  const moduleCount = state.courses.reduce((total, course) => total + course.modules.length, 0);
  const lectureCount = state.courses.reduce((total, course) => total + course.modules.reduce((sum, module) => sum + module.lectures.length, 0), 0);
  const sourceCount = state.courses.reduce((total, course) => total + course.modules.reduce((sum, module) => sum + module.sources.length, 0), 0);
  const publishedCount = state.courses.filter((course) => course.status === "Published").length;
  const activeBatchCount = state.batches.filter((batch) => batch.status === "Open" || batch.status === "Upcoming").length;

  studioOverviewStats.innerHTML = [
    overviewStatCard("Courses in studio", state.courses.length, `${publishedCount} published and ready for students`),
    overviewStatCard("Teaching batches", state.batches.length, `${activeBatchCount} open or upcoming`),
    overviewStatCard("Modules designed", moduleCount, `${lectureCount} lecture videos mapped`),
    overviewStatCard("Learning assets", sourceCount, "PDF, PPT, and links attached"),
  ].join("");

  const publishedCourses = state.courses.filter((course) => course.status === "Published");
  const feedItems = [
    ...publishedCourses.slice(0, 3).map((course) => {
      const batch = getBatchById(course.batchId);
      return `
        <article class="feed-item rounded-2xl border border-border bg-white p-4">
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Published Course</p>
          <h5 class="mt-2 text-sm font-semibold text-ink">${escapeHtml(course.title)}</h5>
          <p class="mt-1 text-sm text-muted">${escapeHtml(course.faculty || "Faculty pending")} • ${escapeHtml(batch?.name || "Batch pending")}</p>
        </article>
      `;
    }),
    ...state.batches
      .filter((batch) => batch.status === "Open" || batch.status === "Upcoming")
      .slice(0, 2)
      .map((batch) => `
        <article class="feed-item rounded-2xl border border-border bg-white p-4">
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Batch Update</p>
          <h5 class="mt-2 text-sm font-semibold text-ink">${escapeHtml(batch.name)}</h5>
          <p class="mt-1 text-sm text-muted">${escapeHtml(batch.status)} • Start ${escapeHtml(batch.startDate || "date not set")}</p>
        </article>
      `),
  ];

  studioOverviewFeed.innerHTML = feedItems.length
    ? feedItems.join("")
    : `<div class="rounded-2xl border border-dashed border-border bg-white p-4 text-sm text-muted">No published teaching activity yet. Publish a course or open a batch to populate this board.</div>`;
}

function renderBatches() {
  renderBatchOptions();
  batchList.innerHTML = "";

  state.batches.forEach((batch) => {
    const linkedCourses = state.courses.filter((course) => course.batchId === batch.id).length;
    const card = document.createElement("article");
    card.className = "rounded-panel border border-border bg-white p-4";
    card.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-sm font-semibold text-ink">${escapeHtml(batch.name)}</p>
          <p class="mt-1 text-sm text-muted">Start ${escapeHtml(batch.startDate || "Not set")} • ${escapeHtml(batch.status)}</p>
        </div>
        <span class="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">${escapeHtml(batch.year)}</span>
      </div>
      <div class="mt-4 rounded-2xl border border-border bg-slate-50 p-3 text-sm text-muted">
        ${linkedCourses} course${linkedCourses === 1 ? "" : "s"} assigned to this batch
      </div>
      <div class="mt-4 flex flex-wrap gap-2">
        <button class="rounded-xl border border-border px-3 py-2 text-sm font-semibold" data-batch-action="edit" data-batch-id="${batch.id}" type="button">Edit</button>
        <button class="rounded-xl border border-border px-3 py-2 text-sm font-semibold text-danger" data-batch-action="delete" data-batch-id="${batch.id}" type="button">Delete</button>
      </div>
    `;
    batchList.appendChild(card);
  });
}

function renderCourses() {
  courseList.innerHTML = "";
  courseSummary.innerHTML = "";

  if (!state.courses.length) {
    courseList.innerHTML = `<div class="rounded-panel border border-dashed border-border bg-slate-50 p-5 text-sm text-muted">No courses created yet. Use the course creator form to build the first one from scratch.</div>`;
  }

  state.courses.forEach((course) => {
    const batch = getBatchById(course.batchId);
    const moduleCount = course.modules.length;
    const lectureCount = course.modules.reduce((total, module) => total + module.lectures.length, 0);
    const sourceCount = course.modules.reduce((total, module) => total + module.sources.length, 0);
    const isSelected = course.id === state.selectedCourseId;

    const card = document.createElement("article");
    card.className = `rounded-panel border p-5 ${isSelected ? "border-primary bg-primary-soft/40" : "border-border bg-white"}`;
    card.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-lg font-semibold text-ink">${escapeHtml(course.title)}</p>
          <p class="mt-1 text-sm text-muted">${escapeHtml(course.faculty || "Faculty not assigned")} • ${escapeHtml(batch?.name || "No batch")} • ${escapeHtml(course.status)}</p>
        </div>
        <span class="rounded-full bg-white px-3 py-1 text-xs font-semibold text-muted">${escapeHtml(course.category || "General")}</span>
      </div>
      <div class="mt-4 grid gap-3 sm:grid-cols-3">
        <div class="rounded-2xl border border-border bg-slate-50 p-3 text-sm"><strong class="block text-ink">${moduleCount}</strong> modules</div>
        <div class="rounded-2xl border border-border bg-slate-50 p-3 text-sm"><strong class="block text-ink">${lectureCount}</strong> video lectures</div>
        <div class="rounded-2xl border border-border bg-slate-50 p-3 text-sm"><strong class="block text-ink">${sourceCount}</strong> sources</div>
      </div>
      <div class="mt-4 flex flex-wrap gap-2">
        <button class="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white" data-course-action="select" data-course-id="${course.id}" type="button">Open</button>
        <button class="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold" data-course-action="edit" data-course-id="${course.id}" type="button">Edit</button>
        <button class="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-danger" data-course-action="delete" data-course-id="${course.id}" type="button">Delete</button>
      </div>
    `;
    courseList.appendChild(card);

    const summaryCard = document.createElement("div");
    summaryCard.className = "rounded-panel border border-border bg-slate-50 p-4 text-sm";
    summaryCard.innerHTML = `
      <strong class="block text-ink">${escapeHtml(course.title)}</strong>
      <span class="mt-1 block text-muted">${escapeHtml(course.description || "No description added yet.")}</span>
      <div class="mt-4 grid gap-3 sm:grid-cols-2">
        <div class="rounded-2xl border border-border bg-white p-3">
          <span class="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Status</span>
          <strong class="mt-2 block text-ink">${escapeHtml(course.status)}</strong>
        </div>
        <div class="rounded-2xl border border-border bg-white p-3">
          <span class="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Assigned Batch</span>
          <strong class="mt-2 block text-ink">${escapeHtml(batch?.name || "No batch selected")}</strong>
        </div>
      </div>
    `;
    courseSummary.appendChild(summaryCard);
  });
}

function renderModules() {
  const course = getSelectedCourse();
  moduleList.innerHTML = "";
  lectureList.innerHTML = "";
  sourceList.innerHTML = "";

  if (!course) {
    builderEmpty.classList.remove("hidden");
    builderContent.classList.add("hidden");
    return;
  }

  builderEmpty.classList.add("hidden");
  builderContent.classList.remove("hidden");
  builderCourseTitle.textContent = course.title;

  const batch = getBatchById(course.batchId);
  builderCourseMeta.textContent = `${course.faculty || "Faculty not assigned"} • ${batch?.name || "No batch selected"} • ${course.modules.length} modules`;

  if (!course.modules.length) {
    moduleList.innerHTML = `<div class="rounded-panel border border-dashed border-border bg-white p-4 text-sm text-muted">No modules added yet. Add the first module to start designing the course.</div>`;
  }

  course.modules.forEach((module, index) => {
    const isSelected = module.id === state.selectedModuleId;
    const card = document.createElement("div");
    card.className = `rounded-2xl border px-4 py-3 ${isSelected ? "border-primary bg-primary-soft/40" : "border-border bg-white"}`;
    card.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <button class="min-w-0 flex-1 text-left" data-module-action="select" data-module-id="${module.id}" type="button">
          <strong class="block text-sm text-ink">${index + 1}. ${escapeHtml(module.name)}</strong>
          <span class="mt-1 block text-xs text-muted">${module.lectures.length} lectures • ${module.sources.length} sources</span>
        </button>
        <div class="flex items-center gap-2">
          <span class="text-xs font-semibold text-muted">${escapeHtml(module.status)}</span>
          <button class="rounded-lg border border-border px-2 py-1 text-xs font-semibold text-danger" data-module-action="delete" data-module-id="${module.id}" type="button">Delete</button>
        </div>
      </div>
    `;
    moduleList.appendChild(card);
  });

  const module = getSelectedModule();

  if (!module && course.modules.length) {
    state.selectedModuleId = course.modules[0].id;
    return renderModules();
  }

  if (!module) {
    resetModuleForm();
    resetLectureForm();
    resetSourceForm();
    return;
  }

  moduleFormTitle.textContent = `Editing ${module.name}`;
  moduleIdInput.value = module.id;
  moduleNameInput.value = module.name;
  moduleObjectiveInput.value = module.objective || "";
  moduleDesignInput.value = module.design || "";
  moduleStatusInput.value = module.status || "Draft";

  renderLectures(module);
  renderSources(module);
}

function renderLectures(module) {
  lectureList.innerHTML = "";
  if (!module.lectures.length) {
    lectureList.innerHTML = `<div class="rounded-panel border border-dashed border-border bg-white p-4 text-sm text-muted">No video lectures added to this module yet.</div>`;
    return;
  }

  module.lectures.forEach((lecture) => {
    const row = document.createElement("div");
    row.className = "rounded-2xl border border-border bg-white p-4";
    row.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-sm font-semibold text-ink">${escapeHtml(lecture.title)}</p>
          <p class="mt-1 break-all text-sm text-muted">${escapeHtml(lecture.videoUrl)}</p>
          <p class="mt-1 text-xs text-muted">${escapeHtml(lecture.duration || "Duration not set")}</p>
        </div>
        <div class="flex items-center gap-2">
          <button class="rounded-xl border border-border px-3 py-2 text-xs font-semibold" data-lecture-action="edit" data-lecture-id="${lecture.id}" type="button">Edit</button>
          <button class="rounded-xl border border-border px-3 py-2 text-xs font-semibold text-danger" data-lecture-action="delete" data-lecture-id="${lecture.id}" type="button">Delete</button>
        </div>
      </div>
    `;
    lectureList.appendChild(row);
  });
}

function renderSources(module) {
  sourceList.innerHTML = "";
  if (!module.sources.length) {
    sourceList.innerHTML = `<div class="rounded-panel border border-dashed border-border bg-white p-4 text-sm text-muted">No PDF, PPT, or link sources attached to this module yet.</div>`;
    return;
  }

  module.sources.forEach((source) => {
    const row = document.createElement("div");
    row.className = "rounded-2xl border border-border bg-white p-4";
    row.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-sm font-semibold text-ink">${escapeHtml(source.title)}</p>
          <p class="mt-1 break-all text-sm text-muted">${escapeHtml(source.url)}</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">${escapeHtml(source.type)}</span>
          <button class="rounded-xl border border-border px-3 py-2 text-xs font-semibold" data-source-action="edit" data-source-id="${source.id}" type="button">Edit</button>
          <button class="rounded-xl border border-border px-3 py-2 text-xs font-semibold text-danger" data-source-action="delete" data-source-id="${source.id}" type="button">Delete</button>
        </div>
      </div>
    `;
    sourceList.appendChild(row);
  });
}

function resetCourseForm() {
  courseForm.reset();
  courseIdInput.value = "";
  courseFormTitle.textContent = "Create a new course";
  renderBatchOptions();
}

function resetBatchForm() {
  batchForm.reset();
  batchIdInput.value = "";
  batchFormTitle.textContent = "Create a new batch";
}

function resetModuleForm() {
  moduleForm.reset();
  moduleIdInput.value = "";
  moduleFormTitle.textContent = "Create a new module";
}

function resetLectureForm() {
  lectureForm.reset();
  lectureIdInput.value = "";
  lectureSubmitButton.textContent = "Add Lecture";
}

function resetSourceForm() {
  sourceForm.reset();
  sourceIdInput.value = "";
  sourceSubmitButton.textContent = "Add Source";
}

function hydrateCourseForm(course) {
  courseIdInput.value = course.id;
  courseTitleInput.value = course.title;
  courseBatchSelect.value = course.batchId || "";
  courseFacultyInput.value = course.faculty || "";
  courseCategoryInput.value = course.category || "";
  courseStatusInput.value = course.status || "Draft";
  courseDescriptionInput.value = course.description || "";
  courseFormTitle.textContent = `Editing ${course.title}`;
}

function hydrateBatchForm(batch) {
  batchIdInput.value = batch.id;
  batchNameInput.value = batch.name;
  batchYearInput.value = batch.year;
  batchStartInput.value = batch.startDate || "";
  batchStatusInput.value = batch.status || "Open";
  batchFormTitle.textContent = `Editing ${batch.name}`;
}

function renderAll() {
  setActiveSection(state.activeSection || "courses");
  renderOverview();
  renderBatches();
  renderCourses();
  renderModules();
}

function ensureSelections() {
  if (!state.selectedCourseId && state.courses.length) {
    state.selectedCourseId = state.courses[0].id;
  }
  const course = getSelectedCourse();
  if (course && !state.selectedModuleId && course.modules.length) {
    state.selectedModuleId = course.modules[0].id;
  }
}

function overviewStatCard(label, value, detail) {
  return `
    <article class="metric-card rounded-2xl p-4">
      <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted">${label}</p>
      <p class="mt-3 text-3xl font-semibold text-ink">${value}</p>
      <p class="mt-2 text-sm leading-6 text-muted">${detail}</p>
    </article>
  `;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  markSaving();

  const payload = {
    id: courseIdInput.value || createId("course"),
    title: courseTitleInput.value.trim(),
    batchId: courseBatchSelect.value,
    faculty: courseFacultyInput.value.trim(),
    category: courseCategoryInput.value.trim(),
    status: courseStatusInput.value,
    description: courseDescriptionInput.value.trim(),
    modules: courseIdInput.value ? (state.courses.find((course) => course.id === courseIdInput.value)?.modules || []) : [],
  };

  if (!payload.title) return;

  const existingIndex = state.courses.findIndex((course) => course.id === payload.id);
  if (existingIndex >= 0) {
    state.courses[existingIndex] = payload;
  } else {
    state.courses.unshift(payload);
  }

  state.selectedCourseId = payload.id;
  state.selectedModuleId = payload.modules[0]?.id || null;
  saveState();
  renderAll();
  hydrateCourseForm(payload);
});

batchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  markSaving();

  const payload = {
    id: batchIdInput.value || createId("batch"),
    name: batchNameInput.value.trim(),
    year: batchYearInput.value.trim(),
    startDate: batchStartInput.value,
    status: batchStatusInput.value,
  };

  if (!payload.name) return;

  const existingIndex = state.batches.findIndex((batch) => batch.id === payload.id);
  if (existingIndex >= 0) {
    state.batches[existingIndex] = payload;
  } else {
    state.batches.unshift(payload);
  }

  saveState();
  renderAll();
  hydrateBatchForm(payload);
});

moduleForm.addEventListener("submit", (event) => {
  event.preventDefault();
  markSaving();

  const course = getSelectedCourse();
  if (!course) return;

  const payload = {
    id: moduleIdInput.value || createId("module"),
    name: moduleNameInput.value.trim(),
    objective: moduleObjectiveInput.value.trim(),
    design: moduleDesignInput.value.trim(),
    status: moduleStatusInput.value,
    lectures: moduleIdInput.value ? (course.modules.find((module) => module.id === moduleIdInput.value)?.lectures || []) : [],
    sources: moduleIdInput.value ? (course.modules.find((module) => module.id === moduleIdInput.value)?.sources || []) : [],
  };

  if (!payload.name) return;

  const existingIndex = course.modules.findIndex((module) => module.id === payload.id);
  if (existingIndex >= 0) {
    course.modules[existingIndex] = payload;
  } else {
    course.modules.push(payload);
  }

  state.selectedModuleId = payload.id;
  saveState();
  renderAll();
});

lectureForm.addEventListener("submit", (event) => {
  event.preventDefault();
  markSaving();

  const module = getSelectedModule();
  if (!module || !lectureTitleInput.value.trim() || !lectureUrlInput.value.trim()) return;

  const payload = {
    id: lectureIdInput.value || createId("lecture"),
    title: lectureTitleInput.value.trim(),
    videoUrl: lectureUrlInput.value.trim(),
    duration: lectureDurationInput.value.trim(),
  };

  const existingIndex = module.lectures.findIndex((lecture) => lecture.id === payload.id);
  if (existingIndex >= 0) {
    module.lectures[existingIndex] = payload;
  } else {
    module.lectures.push(payload);
  }

  resetLectureForm();
  saveState();
  renderAll();
});

sourceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  markSaving();

  const module = getSelectedModule();
  if (!module || !sourceTitleInput.value.trim() || !sourceUrlInput.value.trim()) return;

  const payload = {
    id: sourceIdInput.value || createId("source"),
    title: sourceTitleInput.value.trim(),
    type: sourceTypeInput.value,
    url: sourceUrlInput.value.trim(),
  };

  const existingIndex = module.sources.findIndex((source) => source.id === payload.id);
  if (existingIndex >= 0) {
    module.sources[existingIndex] = payload;
  } else {
    module.sources.push(payload);
  }

  resetSourceForm();
  saveState();
  renderAll();
});

courseList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-course-action]");
  if (!button) return;

  const courseId = button.dataset.courseId;
  const action = button.dataset.courseAction;
  const course = state.courses.find((item) => item.id === courseId);
  if (!course) return;

  if (action === "select" || action === "edit") {
    state.selectedCourseId = course.id;
    state.selectedModuleId = course.modules[0]?.id || null;
    saveState();
    renderAll();
    hydrateCourseForm(course);
    return;
  }

  if (action === "delete") {
    state.courses = state.courses.filter((item) => item.id !== courseId);
    if (state.selectedCourseId === courseId) {
      state.selectedCourseId = state.courses[0]?.id || null;
      state.selectedModuleId = state.courses[0]?.modules[0]?.id || null;
    }
    resetCourseForm();
    resetModuleForm();
    resetLectureForm();
    resetSourceForm();
    saveState();
    renderAll();
  }
});

batchList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-batch-action]");
  if (!button) return;

  const batchId = button.dataset.batchId;
  const action = button.dataset.batchAction;
  const batch = state.batches.find((item) => item.id === batchId);
  if (!batch) return;

  if (action === "edit") {
    hydrateBatchForm(batch);
    return;
  }

  if (action === "delete") {
    state.batches = state.batches.filter((item) => item.id !== batchId);
    state.courses = state.courses.map((course) => ({
      ...course,
      batchId: course.batchId === batchId ? "" : course.batchId,
    }));
    resetBatchForm();
    saveState();
    renderAll();
  }
});

moduleList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-module-action]");
  if (!button) return;

  const course = getSelectedCourse();
  if (!course) return;

  if (button.dataset.moduleAction === "delete") {
    course.modules = course.modules.filter((module) => module.id !== button.dataset.moduleId);
    state.selectedModuleId = course.modules[0]?.id || null;
    resetModuleForm();
    resetLectureForm();
    resetSourceForm();
    saveState();
    renderAll();
    return;
  }

  state.selectedModuleId = button.dataset.moduleId;
  saveState();
  renderModules();
});

lectureList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-lecture-action]");
  if (!button) return;
  const module = getSelectedModule();
  if (!module) return;

  const lecture = module.lectures.find((item) => item.id === button.dataset.lectureId);
  if (!lecture) return;

  if (button.dataset.lectureAction === "edit") {
    lectureIdInput.value = lecture.id;
    lectureTitleInput.value = lecture.title;
    lectureUrlInput.value = lecture.videoUrl;
    lectureDurationInput.value = lecture.duration || "";
    lectureSubmitButton.textContent = "Update Lecture";
    return;
  }

  module.lectures = module.lectures.filter((item) => item.id !== button.dataset.lectureId);
  resetLectureForm();
  saveState();
  renderAll();
});

sourceList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-source-action]");
  if (!button) return;
  const module = getSelectedModule();
  if (!module) return;

  const source = module.sources.find((item) => item.id === button.dataset.sourceId);
  if (!source) return;

  if (button.dataset.sourceAction === "edit") {
    sourceIdInput.value = source.id;
    sourceTitleInput.value = source.title;
    sourceTypeInput.value = source.type;
    sourceUrlInput.value = source.url;
    sourceSubmitButton.textContent = "Update Source";
    return;
  }

  module.sources = module.sources.filter((item) => item.id !== button.dataset.sourceId);
  resetSourceForm();
  saveState();
  renderAll();
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveSection(button.dataset.workspaceTab);
  });
});

if (sidebarToggle && sidebarDrawer) {
  sidebarToggle.addEventListener("click", () => {
    sidebarDrawer.classList.toggle("is-open");
  });
}

addNewCourseButton.addEventListener("click", () => {
  resetCourseForm();
});

addNewBatchButton.addEventListener("click", () => {
  resetBatchForm();
});

clearModuleButton.addEventListener("click", () => {
  const course = getSelectedCourse();
  if (!course) return;

  if (moduleIdInput.value) {
    course.modules = course.modules.filter((module) => module.id !== moduleIdInput.value);
    state.selectedModuleId = course.modules[0]?.id || null;
    resetModuleForm();
    resetLectureForm();
    resetSourceForm();
    saveState();
    renderAll();
    return;
  }

  resetModuleForm();
});

clearLectureButton.addEventListener("click", () => {
  resetLectureForm();
});

clearSourceButton.addEventListener("click", () => {
  resetSourceForm();
});

document.querySelectorAll("[data-autosave-field]").forEach((field) => {
  field.addEventListener("input", markSaving);
});

if (!state.courses.length) {
  const starterCourse = {
    id: createId("course"),
    title: "Starter Biology Course",
    batchId: state.batches[0].id,
    faculty: "Dr. Kavya Singh",
    category: "NEET",
    status: "Draft",
    description: "Starter course with one module so teachers can immediately begin editing.",
    modules: [
      {
        id: createId("module"),
        name: "Introduction Module",
        objective: "Set the course flow, learning goals, and first lecture plan.",
        design: "Orientation lesson, first concept lecture, PDF notes, and one reference link.",
        status: "Draft",
        lectures: [],
        sources: [],
      },
    ],
  };
  state.courses.push(starterCourse);
  state.selectedCourseId = starterCourse.id;
  state.selectedModuleId = starterCourse.modules[0].id;
  saveState();
}

ensureSelections();
renderAll();
resetCourseForm();
resetBatchForm();
resetLectureForm();
resetSourceForm();
