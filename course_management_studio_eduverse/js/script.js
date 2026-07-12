const STORAGE_KEY = "eliteCoachingCourseStudioState";
const CURRENT_USER_KEY = "eliteCoachingCurrentUser";
const LOGIN_URL = "../auth_elitecoaching_institute/auth.html?mode=login";
const STUDENT_PANEL_URL = "../student_panel_elitecoaching_institute/student panel.html";
const MAX_INLINE_FILE_SIZE = 5 * 1024 * 1024;

const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarDrawer = document.getElementById("sidebarDrawer");
const tabButtons = document.querySelectorAll("[data-workspace-tab]");
const sections = document.querySelectorAll("[data-workspace-section]");
const studioSearchInput = document.getElementById("studioSearch");

const courseForm = document.getElementById("courseForm");
const courseIdInput = document.getElementById("courseId");
const courseTitleInput = document.getElementById("courseTitle");
const courseBatchSelect = document.getElementById("courseBatch");
const courseFacultyInput = document.getElementById("courseFaculty");
const courseCategoryInput = document.getElementById("courseCategory");
const courseStatusInput = document.getElementById("courseStatus");
const courseDescriptionInput = document.getElementById("courseDescription");
const courseModeInput = document.getElementById("courseMode");
const courseDurationInput = document.getElementById("courseDuration");
const courseLevelInput = document.getElementById("courseLevel");
const courseVisibilityInput = document.getElementById("courseVisibility");
const courseApprovalModeInput = document.getElementById("courseApprovalMode");
const courseStudentsInput = document.getElementById("courseStudents");
const coursePriceInput = document.getElementById("coursePrice");
const courseOutcomesInput = document.getElementById("courseOutcomes");
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
const batchTypeInput = document.getElementById("batchType");
const batchCapacityInput = document.getElementById("batchCapacity");
const batchNotesInput = document.getElementById("batchNotes");
const batchFormTitle = document.getElementById("batchFormTitle");
const batchList = document.getElementById("batchList");
const batchCoursePicker = document.getElementById("batchCoursePicker");

const builderEmpty = document.getElementById("builderEmpty");
const builderContent = document.getElementById("builderContent");
const builderCourseTitle = document.getElementById("builderCourseTitle");
const builderCourseMeta = document.getElementById("builderCourseMeta");
const courseStructureTree = document.getElementById("courseStructureTree");
const courseValidationList = document.getElementById("courseValidationList");
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
const lectureSourceKindInput = document.getElementById("lectureSourceKind");
const lectureFileInput = document.getElementById("lectureFile");
const lectureFileMeta = document.getElementById("lectureFileMeta");
const lectureList = document.getElementById("lectureList");
const lectureSubmitButton = document.getElementById("lectureSubmitButton");

const sourceForm = document.getElementById("sourceForm");
const sourceIdInput = document.getElementById("sourceId");
const sourceTitleInput = document.getElementById("sourceTitle");
const sourceTypeInput = document.getElementById("sourceType");
const sourceUrlInput = document.getElementById("sourceUrl");
const sourceModeInput = document.getElementById("sourceMode");
const sourceFileInput = document.getElementById("sourceFile");
const sourceFileMeta = document.getElementById("sourceFileMeta");
const sourceList = document.getElementById("sourceList");
const sourceSubmitButton = document.getElementById("sourceSubmitButton");

const addNewCourseButton = document.getElementById("addNewCourseButton");
const addNewBatchButton = document.getElementById("addNewBatchButton");
const clearModuleButton = document.getElementById("clearModuleButton");
const clearLectureButton = document.getElementById("clearLectureButton");
const clearSourceButton = document.getElementById("clearSourceButton");
const autosavePill = document.getElementById("studioAutosave");
const teacherProfileName = document.getElementById("teacherProfileName");
const teacherProfileMeta = document.getElementById("teacherProfileMeta");
const teacherInitials = document.getElementById("teacherInitials");
const teacherLogoutButton = document.getElementById("teacherLogoutButton");
const sidebarOpenButton = document.getElementById("sidebarOpenButton");
const sidebarScrim = document.getElementById("sidebarScrim");

const defaultState = {
  activeSection: "overview",
  selectedCourseId: null,
  selectedModuleId: null,
  selectedBatchId: null,
  searchQuery: "",
  batches: [
    {
      id: createId("batch"),
      name: "JEE 2027 Morning Batch",
      year: "JEE-M-2027",
      startDate: "2026-04-01",
      status: "Draft",
      type: "JEE",
      capacity: "60 students",
      notes: "Morning batch with Physics, Chemistry, Mathematics, mock tests, and study material.",
      courseIds: [],
    },
  ],
  courses: [],
};

let state = loadState();
let pendingLectureFile = null;
let pendingSourceFile = null;

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
      selectedBatchId: saved.selectedBatchId || null,
      searchQuery: saved.searchQuery || "",
      batches: saved.batches?.length ? saved.batches.map(normalizeBatch) : structuredClone(defaultState.batches).map(normalizeBatch),
      courses: Array.isArray(saved.courses) ? saved.courses.map(normalizeCourse) : [],
    };
  } catch {
    return structuredClone(defaultState);
  }
}

function normalizeCourse(course) {
  return {
    ...course,
    mode: course.mode || "Online",
    duration: course.duration || "",
    level: course.level || "Beginner",
    visibility: course.visibility || "Premium",
    approvalMode: course.approvalMode || "Admin Approval Required",
    studentCount: course.studentCount || "0",
    assignedBy: course.assignedBy || "Admin Team",
    reviewState: course.reviewState || (course.approvalMode === "Direct Publish" ? "Direct Publish" : "Assigned"),
    lastUpdated: course.lastUpdated || "",
    publishedAt: course.publishedAt || "",
    approvedAt: course.approvedAt || "",
    submittedAt: course.submittedAt || "",
    price: course.price || "",
    outcomes: course.outcomes || "",
    modules: Array.isArray(course.modules) ? course.modules.map(normalizeModule) : [],
  };
}

function normalizeModule(module) {
  return {
    ...module,
    lectures: Array.isArray(module.lectures) ? module.lectures : [],
    sources: Array.isArray(module.sources) ? module.sources : [],
  };
}

function normalizeBatch(batch) {
  return {
    ...batch,
    status: batch.status || "Draft",
    type: batch.type || "JEE",
    courseIds: Array.isArray(batch.courseIds) ? batch.courseIds : [],
  };
}

function saveState(label = "Saved") {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (!autosavePill) return;
  autosavePill.textContent = label;
  autosavePill.classList.remove("is-saving");
  autosavePill.classList.add("is-saved");
}

function timestamp() {
  return new Date().toISOString();
}

function formatDateTime(value) {
  if (!value) return "Not updated";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function requiresAdminApproval(course) {
  return (course.approvalMode || "Admin Approval Required") !== "Direct Publish";
}

function courseCanGoLive(course) {
  return !requiresAdminApproval(course) || course.status === "Approved";
}

function courseExploreReady(course) {
  return course.status === "Published" && course.visibility !== "Private";
}

function reviewLabel(course) {
  return course.reviewState || (requiresAdminApproval(course) ? "Assigned" : "Direct Publish");
}

function markSaving() {
  if (!autosavePill) return;
  autosavePill.textContent = "Saving...";
  autosavePill.classList.remove("is-saved");
  autosavePill.classList.add("is-saving");
}

function setActiveSection(sectionId, shouldPersist = true) {
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
  document.querySelectorAll("[data-sidebar-tab]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.sidebarTab === sectionId);
  });
  sections.forEach((section) => {
    section.classList.toggle("is-active", section.dataset.workspaceSection === sectionId);
  });
  if (shouldPersist) saveState();
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

function getSelectedBatch() {
  return state.batches.find((batch) => batch.id === state.selectedBatchId) || null;
}

function toSearchableText(...values) {
  return values.filter(Boolean).join(" ").toLowerCase();
}

function matchesSearch(...values) {
  const query = (state.searchQuery || "").trim().toLowerCase();
  if (!query) return true;
  return toSearchableText(...values).includes(query);
}

function renderBatchOptions() {
  const currentValue = courseBatchSelect.value || getSelectedCourse()?.batchId || "Reusable Library";
  courseBatchSelect.innerHTML = "";
  const options = ["Reusable Library", "Batch-ready Course", "Revision Sprint", "Test Series Course"];
  if (!options.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Reusable Library";
    courseBatchSelect.appendChild(option);
    return;
  }

  options.forEach((batch) => {
    const option = document.createElement("option");
    option.value = batch;
    option.textContent = batch;
    courseBatchSelect.appendChild(option);
  });
  courseBatchSelect.value = currentValue || options[0];
}

function renderBatchCoursePicker() {
  if (!batchCoursePicker) return;
  const selectedBatch = getSelectedBatch();
  const selectedIds = new Set(selectedBatch?.courseIds || []);
  batchCoursePicker.innerHTML = "";

  if (!state.courses.length) {
    batchCoursePicker.innerHTML = `<div class="rounded-panel border border-dashed border-border bg-slate-50 p-4 text-sm text-muted">Create reusable library courses first, then add them into a batch here.</div>`;
    return;
  }

  state.courses.forEach((course) => {
    const item = document.createElement("label");
    item.className = "selection-option";
    item.innerHTML = `
      <input type="checkbox" value="${course.id}" ${selectedIds.has(course.id) ? "checked" : ""} />
      <span>
        <strong>${escapeHtml(course.title)}</strong>
        <small>${escapeHtml(course.category || "General")} | ${course.modules.length} chapters | ${escapeHtml(course.visibility || "Premium")}</small>
      </span>
    `;
    batchCoursePicker.appendChild(item);
  });
}

function selectedBatchCourseIds() {
  if (!batchCoursePicker) return [];
  return [...batchCoursePicker.querySelectorAll('input[type="checkbox"]:checked')].map((node) => node.value);
}

function batchCourseRecords(batch) {
  return (batch.courseIds || []).map((id) => state.courses.find((course) => course.id === id)).filter(Boolean);
}

function subjectNameForCourse(course) {
  return course.category || "General Subject";
}

function lectureLeaf(label, icon) {
  return `<div class="tree-leaf"><span>${icon}</span><strong>${escapeHtml(label)}</strong></div>`;
}

function renderCourseStructure(course) {
  if (!courseStructureTree) return;
  const subjectName = subjectNameForCourse(course);
  const chapters = course.modules || [];

  const chapterNodes = chapters.map((chapter) => {
    const notes = (chapter.sources || []).filter((source) => source.type === "PDF Notes");
    const dpps = (chapter.sources || []).filter((source) => source.type === "DPP");
    const resources = (chapter.sources || []).filter((source) => source.type !== "PDF Notes" && source.type !== "DPP");

    const lectureLeaves = (chapter.lectures || []).map((lecture, index) => lectureLeaf(lecture.title || `Lecture ${index + 1}`, "[L]"));
    const noteLeaves = notes.map((note) => lectureLeaf(note.title || "Notes", "[N]"));
    const dppLeaves = dpps.map((dpp) => lectureLeaf(dpp.title || "DPP", "[D]"));
    const resourceLeaves = resources.map((resource) => lectureLeaf(resource.title || "Resource", "[R]"));

    return `
      <div class="tree-node">
        <span class="tree-label">Chapter</span>
        <strong class="tree-title">Chapter: ${escapeHtml(chapter.name || "Untitled Chapter")}</strong>
        <span class="tree-meta">${(chapter.lectures || []).length} lectures | ${(chapter.sources || []).length} assets</span>
        <div class="tree-leaf-list">
          ${lectureLeaves.join("") || lectureLeaf("Add Lecture", "[L]")}
          ${noteLeaves.join("") || lectureLeaf("Notes", "[N]")}
          ${dppLeaves.join("") || lectureLeaf("DPP", "[D]")}
          ${resourceLeaves.join("") || lectureLeaf("Resources", "[R]")}
        </div>
      </div>
    `;
  }).join("");

  courseStructureTree.innerHTML = `
    <div class="tree-root">
      <span class="tree-label">Course</span>
      <strong class="tree-title">Course: ${escapeHtml(course.title || "Untitled Course")}</strong>
      <span class="tree-meta">${escapeHtml(course.faculty || "Faculty not assigned")} | ${escapeHtml(course.status || "Draft")}</span>
      <div class="tree-branch">
        <div class="tree-node">
          <span class="tree-label">Subject</span>
          <strong class="tree-title">Subject: ${escapeHtml(subjectName)}</strong>
          <span class="tree-meta">${chapters.length} chapters</span>
          <div class="tree-branch">
            ${chapterNodes || `<div class="tree-node"><strong class="tree-title">Add Chapter</strong><span class="tree-meta">Start building the first chapter here.</span></div>`}
          </div>
        </div>
        <div class="tree-node">
          <strong class="tree-title">Add Subject</strong>
          <span class="tree-meta">Create another reusable subject course from My Courses.</span>
        </div>
      </div>
    </div>
  `;
}

function renderValidationPanel(course) {
  if (!courseValidationList) return;
  const hasThumbnail = Boolean(course.description);
  const hasSubject = Boolean(course.category);
  const hasChapter = (course.modules || []).length > 0;
  const lectureCount = (course.modules || []).reduce((total, module) => total + (module.lectures || []).length, 0);
  const noteCount = (course.modules || []).reduce((total, module) => total + (module.sources || []).filter((source) => source.type === "PDF Notes").length, 0);
  const dppCount = (course.modules || []).reduce((total, module) => total + (module.sources || []).filter((source) => source.type === "DPP").length, 0);
  const resourceCount = (course.modules || []).reduce((total, module) => total + (module.sources || []).length, 0);

  const items = [
    [hasThumbnail, "Course details added", "Description and metadata are ready."],
    [hasSubject, "Subject created", "Primary subject is defined."],
    [hasChapter, "Chapter created", `${(course.modules || []).length} chapter${(course.modules || []).length === 1 ? "" : "s"} added.`],
    [lectureCount > 0, "Lectures uploaded", `${lectureCount} lecture${lectureCount === 1 ? "" : "s"} in the course.`],
    [noteCount > 0, "Notes uploaded", `${noteCount} note asset${noteCount === 1 ? "" : "s"} added.`],
    [dppCount > 0, "DPP created", `${dppCount} DPP asset${dppCount === 1 ? "" : "s"} added.`],
    [resourceCount > 0, "Resources attached", `${resourceCount} total supporting resource${resourceCount === 1 ? "" : "s"}.`],
  ];

  courseValidationList.innerHTML = items.map(([passed, label, detail]) => `
    <div class="validation-item">
      <span class="${passed ? "validation-pass" : "validation-fail"}">${passed ? "[OK]" : "[X]"}</span>
      <span>
        <strong>${label}</strong>
        <small>${detail}</small>
      </span>
    </div>
  `).join("");
}

function renderOverview() {
  const moduleCount = state.courses.reduce((total, course) => total + course.modules.length, 0);
  const lectureCount = state.courses.reduce((total, course) => total + course.modules.reduce((sum, module) => sum + module.lectures.length, 0), 0);
  const sourceCount = state.courses.reduce((total, course) => total + course.modules.reduce((sum, module) => sum + module.sources.length, 0), 0);
  const uploadCount = state.courses.reduce((total, course) => total + course.modules.reduce((sum, module) => sum + module.lectures.filter((lecture) => lecture.sourceKind === "upload").length + module.sources.filter((source) => source.mode === "upload").length, 0), 0);
  const publishedCount = state.batches.filter((batch) => batch.status === "Published").length;
  const reviewCount = state.courses.filter((course) => course.status === "In Review").length;
  const activeBatchCount = state.batches.filter((batch) => batch.status === "Draft" || batch.status === "Published").length;

  studioOverviewStats.innerHTML = [
    overviewStatCard("Reusable courses", state.courses.length, `${reviewCount} waiting for approval`),
    overviewStatCard("Published batches", publishedCount, `${publishedCount} visible to students`),
    overviewStatCard("Batch builder", state.batches.length, `${activeBatchCount} draft or published`),
    overviewStatCard("Content assets", sourceCount + lectureCount, `${lectureCount} lectures and ${uploadCount} uploads ready`),
  ].join("");

  const feedItems = [
    ...state.courses.slice(0, 3).map((course) => {
      return `
        <article class="feed-item rounded-2xl border border-border bg-white p-4">
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-primary">${escapeHtml(course.status)} | ${escapeHtml(reviewLabel(course))}</p>
          <h5 class="mt-2 text-sm font-semibold text-ink">${escapeHtml(course.title)}</h5>
          <p class="mt-1 text-sm text-muted">${escapeHtml(course.faculty || "Faculty pending")} | ${escapeHtml(course.mode)} | Reusable library | ${escapeHtml(course.visibility)}</p>
        </article>
      `;
    }),
    ...state.batches.slice(0, 2).map((batch) => `
      <article class="feed-item rounded-2xl border border-border bg-white p-4">
        <p class="text-xs font-semibold uppercase tracking-[0.16em] text-primary">${escapeHtml(batch.type || "Batch")}</p>
        <h5 class="mt-2 text-sm font-semibold text-ink">${escapeHtml(batch.name)}</h5>
        <p class="mt-1 text-sm text-muted">${escapeHtml(batch.status)} | Start ${escapeHtml(batch.startDate || "date not set")} | ${escapeHtml(batch.capacity || "capacity pending")}</p>
      </article>
    `),
  ].filter((item, index) => !state.searchQuery || index < 3);

  studioOverviewFeed.innerHTML = feedItems.length
    ? feedItems.join("")
    : `<div class="rounded-2xl border border-dashed border-border bg-white p-4 text-sm text-muted">No matching teaching activity for the current search.</div>`;
}

function renderBatches() {
  renderBatchOptions();
  renderBatchCoursePicker();
  batchList.innerHTML = "";

  const visibleBatches = state.batches.filter((batch) => matchesSearch(batch.name, batch.year, batch.status, batch.type, batch.capacity, batch.notes));

  if (!visibleBatches.length) {
    batchList.innerHTML = `<div class="rounded-panel border border-dashed border-border bg-slate-50 p-5 text-sm text-muted">No batches match the current search. Try another keyword or create a new independent batch.</div>`;
    return;
  }

  visibleBatches.forEach((batch) => {
    const linkedCourses = batchCourseRecords(batch);
    const chapterCount = linkedCourses.reduce((total, course) => total + course.modules.length, 0);
    const lectureCount = linkedCourses.reduce((total, course) => total + course.modules.reduce((sum, module) => sum + module.lectures.length, 0), 0);
    const card = document.createElement("article");
    card.className = "rounded-panel border border-border bg-white p-4";
    card.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-sm font-semibold text-ink">${escapeHtml(batch.name)}</p>
          <p class="mt-1 text-sm text-muted">Start ${escapeHtml(batch.startDate || "Not set")} | ${escapeHtml(batch.status)}</p>
        </div>
        <span class="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">${escapeHtml(batch.year)}</span>
      </div>
      <div class="mt-4 grid gap-3 md:grid-cols-2">
        <div class="rounded-2xl border border-border bg-slate-50 p-3 text-sm text-muted">
          <strong class="block text-ink">${escapeHtml(batch.type || "JEE")}</strong>
          Course type
        </div>
        <div class="rounded-2xl border border-border bg-slate-50 p-3 text-sm text-muted">
          <strong class="block text-ink">${escapeHtml(batch.capacity || "Not set")}</strong>
          Capacity
        </div>
      </div>
      <div class="mt-4 grid gap-3 md:grid-cols-3">
        <div class="rounded-2xl border border-border bg-slate-50 p-3 text-sm text-muted"><strong class="block text-ink">${linkedCourses.length}</strong> library courses</div>
        <div class="rounded-2xl border border-border bg-slate-50 p-3 text-sm text-muted"><strong class="block text-ink">${chapterCount}</strong> chapters</div>
        <div class="rounded-2xl border border-border bg-slate-50 p-3 text-sm text-muted"><strong class="block text-ink">${lectureCount}</strong> lectures</div>
      </div>
      <p class="mt-4 text-sm text-muted">${linkedCourses.length ? linkedCourses.map((course) => escapeHtml(course.title)).join(" | ") : "No reusable courses linked yet."}</p>
      <p class="mt-4 text-sm leading-6 text-muted">${escapeHtml(batch.notes || "No batch blueprint added yet.")}</p>
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

  const visibleCourses = state.courses.filter((course) =>
    matchesSearch(
      course.title,
      course.faculty,
      course.category,
      course.description,
      course.mode,
      course.level,
      course.outcomes,
      course.modules.map((module) => `${module.name} ${module.objective} ${module.lectures.map((lecture) => lecture.title).join(" ")} ${module.sources.map((source) => source.title).join(" ")}`).join(" ")
    )
  );

  if (!visibleCourses.length) {
    courseList.innerHTML = `<div class="rounded-panel border border-dashed border-border bg-slate-50 p-5 text-sm text-muted">No courses match the current search. Clear the search or create a new course.</div>`;
    courseSummary.innerHTML = `<div class="rounded-panel border border-dashed border-border bg-slate-50 p-5 text-sm text-muted">Course summaries appear here once a matching course is available.</div>`;
    return;
  }

  visibleCourses.forEach((course) => {
    const moduleCount = course.modules.length;
    const lectureCount = course.modules.reduce((total, module) => total + module.lectures.length, 0);
    const sourceCount = course.modules.reduce((total, module) => total + module.sources.length, 0);
    const isSelected = course.id === state.selectedCourseId;
    const exploreReady = courseExploreReady(course);
    const canGoLive = courseCanGoLive(course);

    const card = document.createElement("article");
    card.className = `rounded-panel border p-5 ${isSelected ? "border-primary bg-primary-soft/40" : "border-border bg-white"}`;
    card.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-lg font-semibold text-ink">${escapeHtml(course.title)}</p>
          <p class="mt-1 text-sm text-muted">${escapeHtml(course.faculty || "Faculty not assigned")} | Reusable library | ${escapeHtml(course.status)} | ${escapeHtml(reviewLabel(course))}</p>
        </div>
        <span class="rounded-full bg-white px-3 py-1 text-xs font-semibold text-muted">${escapeHtml(course.category || "General")}</span>
      </div>
      <div class="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
        <span class="rounded-full bg-primary-soft px-3 py-1 text-primary">${escapeHtml(course.visibility)}</span>
        <span class="rounded-full bg-white px-3 py-1 text-muted">${escapeHtml(course.approvalMode)}</span>
        <span class="rounded-full bg-white px-3 py-1 text-muted">${escapeHtml(course.studentCount)} students</span>
      </div>
      <div class="mt-4 grid gap-3 sm:grid-cols-3">
        <div class="rounded-2xl border border-border bg-slate-50 p-3 text-sm"><strong class="block text-ink">${moduleCount}</strong> chapters</div>
        <div class="rounded-2xl border border-border bg-slate-50 p-3 text-sm"><strong class="block text-ink">${lectureCount}</strong> video lectures</div>
        <div class="rounded-2xl border border-border bg-slate-50 p-3 text-sm"><strong class="block text-ink">${sourceCount}</strong> resources</div>
      </div>
      <div class="mt-4 grid gap-3 sm:grid-cols-3">
        <div class="rounded-2xl border border-border bg-white p-3 text-sm text-muted">
          <strong class="block text-ink">${escapeHtml(course.mode)}</strong>
          Delivery mode
        </div>
        <div class="rounded-2xl border border-border bg-white p-3 text-sm text-muted">
          <strong class="block text-ink">${escapeHtml(course.duration || "Not set")}</strong>
          Duration
        </div>
        <div class="rounded-2xl border border-border bg-white p-3 text-sm text-muted">
          <strong class="block text-ink">${escapeHtml(formatDateTime(course.lastUpdated))}</strong>
          Last updated
        </div>
      </div>
      <div class="mt-4 flex flex-wrap gap-2">
        <button class="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white" data-course-action="select" data-course-id="${course.id}" type="button">Manage Course</button>
        <button class="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold" data-course-action="edit" data-course-id="${course.id}" type="button">Edit</button>
        ${course.status === "Draft" || course.status === "Approved" ? `<button class="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold" data-course-action="submit-review" data-course-id="${course.id}" type="button">Submit for Review</button>` : ""}
        ${canGoLive && course.status !== "Published" ? `<button class="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold" data-course-action="publish" data-course-id="${course.id}" type="button">Publish</button>` : ""}
        ${exploreReady ? `<button class="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold" data-course-action="unpublish" data-course-id="${course.id}" type="button">Unpublish</button>` : ""}
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
          <span class="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Learning Outcomes</span>
          <strong class="mt-2 block text-ink">${escapeHtml(course.outcomes || "Add outcomes")}</strong>
        </div>
        <div class="rounded-2xl border border-border bg-white p-3">
          <span class="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Library Type</span>
          <strong class="mt-2 block text-ink">${escapeHtml(course.batchId || "Reusable Library")}</strong>
        </div>
      </div>
      <div class="mt-4 grid gap-3 sm:grid-cols-3">
        <div class="rounded-2xl border border-border bg-white p-3">
          <span class="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Mode</span>
          <strong class="mt-2 block text-ink">${escapeHtml(course.mode)}</strong>
        </div>
        <div class="rounded-2xl border border-border bg-white p-3">
          <span class="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Level</span>
          <strong class="mt-2 block text-ink">${escapeHtml(course.level)}</strong>
        </div>
        <div class="rounded-2xl border border-border bg-white p-3">
          <span class="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Fee</span>
          <strong class="mt-2 block text-ink">${escapeHtml(course.price || "Not set")}</strong>
        </div>
      </div>
      <div class="mt-4 grid gap-3 sm:grid-cols-3">
        <div class="rounded-2xl border border-border bg-white p-3">
          <span class="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Visibility</span>
          <strong class="mt-2 block text-ink">${escapeHtml(course.visibility || "Premium")}</strong>
        </div>
        <div class="rounded-2xl border border-border bg-white p-3">
          <span class="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Approval</span>
          <strong class="mt-2 block text-ink">${escapeHtml(reviewLabel(course))}</strong>
        </div>
        <div class="rounded-2xl border border-border bg-white p-3">
          <span class="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Assigned By</span>
          <strong class="mt-2 block text-ink">${escapeHtml(course.assignedBy || "Admin Team")}</strong>
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

  builderCourseMeta.textContent = `${course.faculty || "Faculty not assigned"} | Reusable course library | ${course.modules.length} chapters | ${course.mode} | ${course.status} | ${reviewLabel(course)}`;
  renderCourseStructure(course);
  renderValidationPanel(course);

  const visibleModules = course.modules.filter((module) =>
    matchesSearch(module.name, module.objective, module.design, module.status, module.lectures.map((lecture) => lecture.title).join(" "), module.sources.map((source) => source.title).join(" "))
  );

  if (!visibleModules.length) {
    moduleList.innerHTML = `<div class="rounded-panel border border-dashed border-border bg-white p-4 text-sm text-muted">No chapters match the current search. Add one or clear the search.</div>`;
  }

  visibleModules.forEach((module, index) => {
    const isSelected = module.id === state.selectedModuleId;
    const card = document.createElement("div");
    card.className = `rounded-2xl border px-4 py-3 ${isSelected ? "border-primary bg-primary-soft/40" : "border-border bg-white"}`;
    card.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <button class="min-w-0 flex-1 text-left" data-module-action="select" data-module-id="${module.id}" type="button">
          <strong class="block text-sm text-ink">${index + 1}. ${escapeHtml(module.name)}</strong>
          <span class="mt-1 block text-xs text-muted">${module.lectures.length} lectures | ${module.sources.length} resources</span>
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
    renderCourseStructure(course);
    renderValidationPanel(course);
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
  const visibleLectures = module.lectures.filter((lecture) => matchesSearch(lecture.title, lecture.videoUrl, lecture.duration, lecture.fileName, lecture.sourceKind));

  if (!visibleLectures.length) {
    lectureList.innerHTML = `<div class="rounded-panel border border-dashed border-border bg-white p-4 text-sm text-muted">No video lectures match the current context yet.</div>`;
    return;
  }

  visibleLectures.forEach((lecture) => {
    const previewHref = lecture.fileData || lecture.videoUrl || "#";
    const previewLabel = lecture.sourceKind === "upload" ? "Preview Upload" : "Open Link";
    const sourceMeta = lecture.sourceKind === "upload"
      ? `${lecture.fileName || "Uploaded video"} | ${formatBytes(lecture.fileSize)}`
      : (lecture.videoUrl || "No URL added");

    const row = document.createElement("div");
    row.className = "rounded-2xl border border-border bg-white p-4";
    row.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <p class="text-sm font-semibold text-ink">${escapeHtml(lecture.title)}</p>
          <p class="mt-1 break-all text-sm text-muted">${escapeHtml(sourceMeta)}</p>
          <p class="mt-1 text-xs text-muted">${escapeHtml(lecture.duration || "Duration not set")} | ${escapeHtml(lecture.sourceKind === "upload" ? "Browser upload" : "Hosted link")}</p>
        </div>
        <div class="flex items-center gap-2">
          ${previewHref !== "#" ? `<a class="rounded-xl border border-border px-3 py-2 text-xs font-semibold" href="${previewHref}" target="_blank" rel="noreferrer">${previewLabel}</a>` : ""}
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
  const visibleSources = module.sources.filter((source) => matchesSearch(source.title, source.url, source.type, source.fileName, source.mode));

  if (!visibleSources.length) {
    sourceList.innerHTML = `<div class="rounded-panel border border-dashed border-border bg-white p-4 text-sm text-muted">No PDF, DOC, PPT, worksheet, or link resources match the current context yet.</div>`;
    return;
  }

  visibleSources.forEach((source) => {
    const previewHref = source.fileData || source.url || "#";
    const meta = source.mode === "upload"
      ? `${source.fileName || "Uploaded file"} | ${formatBytes(source.fileSize)}`
      : (source.url || "No URL added");
    const row = document.createElement("div");
    row.className = "rounded-2xl border border-border bg-white p-4";
    row.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <p class="text-sm font-semibold text-ink">${escapeHtml(source.title)}</p>
          <p class="mt-1 break-all text-sm text-muted">${escapeHtml(meta)}</p>
          <p class="mt-1 text-xs text-muted">${escapeHtml(source.mode === "upload" ? "Uploaded resource" : "External resource")}</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">${escapeHtml(source.type)}</span>
          ${previewHref !== "#" ? `<a class="rounded-xl border border-border px-3 py-2 text-xs font-semibold" href="${previewHref}" target="_blank" rel="noreferrer">Open</a>` : ""}
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
  courseModeInput.value = "Online";
  courseLevelInput.value = "Beginner";
  if (courseVisibilityInput) courseVisibilityInput.value = "Premium";
  if (courseApprovalModeInput) courseApprovalModeInput.value = "Admin Approval Required";
  if (courseStudentsInput) courseStudentsInput.value = "0";
  renderBatchOptions();
}

function resetBatchForm() {
  batchForm.reset();
  batchIdInput.value = "";
  batchFormTitle.textContent = "Create a new batch";
  batchTypeInput.value = "JEE";
  batchStatusInput.value = "Draft";
  state.selectedBatchId = null;
  renderBatchCoursePicker();
}

function resetModuleForm() {
  moduleForm.reset();
  moduleIdInput.value = "";
  moduleFormTitle.textContent = "Create a new chapter";
}

function resetLectureForm() {
  lectureForm.reset();
  lectureIdInput.value = "";
  lectureSubmitButton.textContent = "Add Lecture";
  lectureSourceKindInput.value = "link";
  pendingLectureFile = null;
  if (lectureFileInput) lectureFileInput.value = "";
  updateLectureModeUi();
}

function resetSourceForm() {
  sourceForm.reset();
  sourceIdInput.value = "";
  sourceSubmitButton.textContent = "Add Source";
  sourceModeInput.value = "link";
  pendingSourceFile = null;
  if (sourceFileInput) sourceFileInput.value = "";
  updateSourceModeUi();
}

function hydrateCourseForm(course) {
  courseIdInput.value = course.id;
  courseTitleInput.value = course.title;
  courseBatchSelect.value = course.batchId || "Reusable Library";
  courseFacultyInput.value = course.faculty || "";
  courseCategoryInput.value = course.category || "";
  courseStatusInput.value = course.status || "Draft";
  courseDescriptionInput.value = course.description || "";
  courseModeInput.value = course.mode || "Online";
  courseDurationInput.value = course.duration || "";
  courseLevelInput.value = course.level || "Beginner";
  courseVisibilityInput.value = course.visibility || "Premium";
  courseApprovalModeInput.value = course.approvalMode || "Admin Approval Required";
  courseStudentsInput.value = course.studentCount || "0";
  coursePriceInput.value = course.price || "";
  courseOutcomesInput.value = course.outcomes || "";
  courseFormTitle.textContent = `Editing ${course.title}`;
}

function hydrateBatchForm(batch) {
  state.selectedBatchId = batch.id;
  batchIdInput.value = batch.id;
  batchNameInput.value = batch.name;
  batchYearInput.value = batch.year;
  batchStartInput.value = batch.startDate || "";
  batchStatusInput.value = batch.status || "Draft";
  batchTypeInput.value = batch.type || "JEE";
  batchCapacityInput.value = batch.capacity || "";
  batchNotesInput.value = batch.notes || "";
  batchFormTitle.textContent = `Editing ${batch.name}`;
  renderBatchCoursePicker();
}

function renderAll() {
  setActiveSection(state.activeSection || "courses", false);
  if (studioSearchInput) studioSearchInput.value = state.searchQuery || "";
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

function formatBytes(bytes) {
  if (!bytes) return "Unknown size";
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }
  return `${size.toFixed(size >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

function validateCoursePayload(payload) {
  if (!payload.title) {
    window.alert("Add a course title before saving.");
    return false;
  }
  return true;
}

function validateBatchPayload(payload) {
  if (!payload.name) {
    window.alert("Add a batch name before saving.");
    return false;
  }
  if (!payload.year) {
    window.alert("Add the academic year for this batch.");
    return false;
  }
  return true;
}

function updateLectureModeUi() {
  const isUpload = lectureSourceKindInput.value === "upload";
  lectureUrlInput.toggleAttribute("required", !isUpload);
  lectureFileInput.toggleAttribute("required", isUpload);
  lectureUrlInput.disabled = isUpload;
  lectureFileInput.disabled = !isUpload;
  lectureFileMeta.textContent = isUpload
    ? (pendingLectureFile ? `${pendingLectureFile.name} selected | ${formatBytes(pendingLectureFile.size)}` : "Upload a small video file. Large videos are better shared as hosted links.")
    : "Attach a hosted lecture link such as YouTube, Drive, or your media CDN.";
}

function updateSourceModeUi() {
  const isUpload = sourceModeInput.value === "upload";
  sourceUrlInput.toggleAttribute("required", !isUpload);
  sourceFileInput.toggleAttribute("required", isUpload);
  sourceUrlInput.disabled = isUpload;
  sourceFileInput.disabled = !isUpload;
  sourceFileMeta.textContent = isUpload
    ? (pendingSourceFile ? `${pendingSourceFile.name} selected | ${formatBytes(pendingSourceFile.size)}` : "Upload a PDF, PPT, DOC, worksheet, or related learning file.")
    : "Paste a shareable document or resource link for students and teachers.";
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read the selected file."));
    reader.readAsDataURL(file);
  });
}

async function buildLecturePayload() {
  const module = getSelectedModule();
  if (!module) return null;
  const existingLecture = lectureIdInput.value ? module.lectures.find((lecture) => lecture.id === lectureIdInput.value) : null;

  const sourceKind = lectureSourceKindInput.value;
  if (!lectureTitleInput.value.trim()) {
    window.alert("Add a lecture title.");
    return null;
  }

  if (sourceKind === "upload") {
    const file = pendingLectureFile;
    if (!file && existingLecture?.sourceKind === "upload") {
      return {
        ...existingLecture,
        title: lectureTitleInput.value.trim(),
        duration: lectureDurationInput.value.trim(),
        sourceKind,
      };
    }
    if (!file) {
      window.alert("Choose a video file to upload.");
      return null;
    }
    if (file.size > MAX_INLINE_FILE_SIZE) {
      window.alert("The selected video is too large for browser storage. Please use a hosted link for larger videos.");
      return null;
    }
    return {
      id: lectureIdInput.value || createId("lecture"),
      title: lectureTitleInput.value.trim(),
      videoUrl: "",
      duration: lectureDurationInput.value.trim(),
      sourceKind,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      fileData: await readFileAsDataUrl(file),
    };
  }

  if (!lectureUrlInput.value.trim()) {
    window.alert("Add a video link or switch to upload mode.");
    return null;
  }

  return {
    id: lectureIdInput.value || createId("lecture"),
    title: lectureTitleInput.value.trim(),
    videoUrl: lectureUrlInput.value.trim(),
    duration: lectureDurationInput.value.trim(),
    sourceKind,
    fileName: "",
    fileType: "",
    fileSize: 0,
    fileData: "",
  };
}

async function buildSourcePayload() {
  const module = getSelectedModule();
  if (!module) return null;
  const existingSource = sourceIdInput.value ? module.sources.find((source) => source.id === sourceIdInput.value) : null;

  const mode = sourceModeInput.value;
  if (!sourceTitleInput.value.trim()) {
    window.alert("Add a resource title.");
    return null;
  }

  if (mode === "upload") {
    const file = pendingSourceFile;
    if (!file && existingSource?.mode === "upload") {
      return {
        ...existingSource,
        title: sourceTitleInput.value.trim(),
        type: sourceTypeInput.value,
        mode,
      };
    }
    if (!file) {
      window.alert("Choose a file to upload.");
      return null;
    }
    if (file.size > MAX_INLINE_FILE_SIZE) {
      window.alert("The selected file is too large for browser storage. Please use a hosted link for larger documents.");
      return null;
    }
    return {
      id: sourceIdInput.value || createId("source"),
      title: sourceTitleInput.value.trim(),
      type: sourceTypeInput.value,
      url: "",
      mode,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      fileData: await readFileAsDataUrl(file),
    };
  }

  if (!sourceUrlInput.value.trim()) {
    window.alert("Add a resource link or switch to upload mode.");
    return null;
  }

  return {
    id: sourceIdInput.value || createId("source"),
    title: sourceTitleInput.value.trim(),
    type: sourceTypeInput.value,
    url: sourceUrlInput.value.trim(),
    mode,
    fileName: "",
    fileType: "",
    fileSize: 0,
    fileData: "",
  };
}

courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  markSaving();

  const existingModules = courseIdInput.value ? (state.courses.find((course) => course.id === courseIdInput.value)?.modules || []) : [];
  const existingCourse = courseIdInput.value ? state.courses.find((course) => course.id === courseIdInput.value) : null;
  const payload = {
    id: courseIdInput.value || createId("course"),
    title: courseTitleInput.value.trim(),
    batchId: courseBatchSelect.value,
    faculty: courseFacultyInput.value.trim(),
    category: courseCategoryInput.value.trim(),
    status: courseStatusInput.value,
    description: courseDescriptionInput.value.trim(),
    mode: courseModeInput.value,
    duration: courseDurationInput.value.trim(),
    level: courseLevelInput.value,
    visibility: courseVisibilityInput.value,
    approvalMode: courseApprovalModeInput.value,
    studentCount: courseStudentsInput.value.trim() || "0",
    assignedBy: existingCourse?.assignedBy || "Admin Team",
    reviewState: existingCourse?.reviewState || (courseApprovalModeInput.value === "Direct Publish" ? "Direct Publish" : "Assigned"),
    lastUpdated: timestamp(),
    publishedAt: existingCourse?.publishedAt || "",
    approvedAt: existingCourse?.approvedAt || "",
    submittedAt: existingCourse?.submittedAt || "",
    price: coursePriceInput.value.trim(),
    outcomes: courseOutcomesInput.value.trim(),
    modules: existingModules,
  };

  if (requiresAdminApproval(payload) && payload.status === "Published" && payload.reviewState !== "Approved") {
    payload.status = "In Review";
    payload.reviewState = "Submitted";
  }

  if (payload.status === "In Review") {
    payload.reviewState = "Submitted";
    payload.submittedAt = payload.submittedAt || timestamp();
  }

  if (payload.status === "Approved") {
    payload.reviewState = "Approved";
    payload.approvedAt = payload.approvedAt || timestamp();
  }

  if (payload.status === "Published") {
    payload.reviewState = requiresAdminApproval(payload) ? "Approved" : "Published directly";
    payload.publishedAt = payload.publishedAt || timestamp();
  }

  if (!validateCoursePayload(payload)) return;

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
    type: batchTypeInput.value,
    capacity: batchCapacityInput.value.trim(),
    notes: batchNotesInput.value.trim(),
    courseIds: selectedBatchCourseIds(),
  };

  if (!validateBatchPayload(payload)) return;

  const existingIndex = state.batches.findIndex((batch) => batch.id === payload.id);
  if (existingIndex >= 0) {
    state.batches[existingIndex] = payload;
  } else {
    state.batches.unshift(payload);
  }

  state.selectedBatchId = payload.id;
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

  if (!payload.name) {
    window.alert("Add a chapter name before saving.");
    return;
  }

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

lectureForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  markSaving();

  const module = getSelectedModule();
  if (!module) {
    window.alert("Select a chapter before adding lecture content.");
    return;
  }

  const payload = await buildLecturePayload();
  if (!payload) return;

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

sourceForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  markSaving();

  const module = getSelectedModule();
  if (!module) {
    window.alert("Select a chapter before adding study resources.");
    return;
  }

  const payload = await buildSourcePayload();
  if (!payload) return;

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

  if (action === "submit-review") {
    course.status = "In Review";
    course.reviewState = "Submitted";
    course.submittedAt = timestamp();
    course.lastUpdated = timestamp();
    saveState("Review submitted");
    renderAll();
    hydrateCourseForm(course);
    return;
  }

  if (action === "publish") {
    if (requiresAdminApproval(course) && course.status !== "Approved") {
      window.alert("This course still needs admin approval before it can be published to Explore.");
      return;
    }
    course.status = "Published";
    course.reviewState = requiresAdminApproval(course) ? "Approved" : "Published directly";
    course.publishedAt = timestamp();
    course.lastUpdated = timestamp();
    saveState("Published");
    renderAll();
    hydrateCourseForm(course);
    return;
  }

  if (action === "unpublish") {
    course.status = requiresAdminApproval(course) ? "Approved" : "Draft";
    course.lastUpdated = timestamp();
    saveState("Unpublished");
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
    lectureUrlInput.value = lecture.videoUrl || "";
    lectureDurationInput.value = lecture.duration || "";
    lectureSourceKindInput.value = lecture.sourceKind || "link";
    lectureSubmitButton.textContent = "Update Lecture";
    pendingLectureFile = null;
    if (lectureFileInput) lectureFileInput.value = "";
    lectureFileMeta.textContent = lecture.sourceKind === "upload"
      ? `${lecture.fileName || "Uploaded lecture"} already attached. Choose a new file only if you want to replace it.`
      : "Attach a hosted lecture link such as YouTube, Drive, or your media CDN.";
    updateLectureModeUi();
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
    sourceUrlInput.value = source.url || "";
    sourceModeInput.value = source.mode || "link";
    sourceSubmitButton.textContent = "Update Source";
    pendingSourceFile = null;
    if (sourceFileInput) sourceFileInput.value = "";
    sourceFileMeta.textContent = source.mode === "upload"
      ? `${source.fileName || "Uploaded resource"} already attached. Choose a new file only if you want to replace it.`
      : "Paste a shareable document or resource link for students and teachers.";
    updateSourceModeUi();
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

document.querySelectorAll("[data-sidebar-tab]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setActiveSection(link.dataset.sidebarTab);
    if (sidebarDrawer) sidebarDrawer.classList.remove("is-open");
    if (sidebarScrim) sidebarScrim.classList.remove("is-visible");
  });
});

if (studioSearchInput) {
  studioSearchInput.addEventListener("input", (event) => {
    state.searchQuery = event.target.value;
    saveState("Search ready");
    renderAll();
  });
}

if (lectureSourceKindInput) {
  lectureSourceKindInput.addEventListener("change", () => {
    pendingLectureFile = null;
    if (lectureFileInput) lectureFileInput.value = "";
    updateLectureModeUi();
    markSaving();
  });
}

if (sourceModeInput) {
  sourceModeInput.addEventListener("change", () => {
    pendingSourceFile = null;
    if (sourceFileInput) sourceFileInput.value = "";
    updateSourceModeUi();
    markSaving();
  });
}

if (lectureFileInput) {
  lectureFileInput.addEventListener("change", (event) => {
    pendingLectureFile = event.target.files?.[0] || null;
    updateLectureModeUi();
    markSaving();
  });
}

if (sourceFileInput) {
  sourceFileInput.addEventListener("change", (event) => {
    pendingSourceFile = event.target.files?.[0] || null;
    updateSourceModeUi();
    markSaving();
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
  field.addEventListener("change", markSaving);
});

if (!state.courses.length) {
  const starterCourse = {
    id: createId("course"),
    title: "Physics Class 11",
    batchId: "Reusable Library",
    faculty: "Dr. Kavya Singh",
    category: "Physics",
    status: "Draft",
    description: "Reusable physics course for adding into multiple institute batches.",
    mode: "Hybrid",
    duration: "16 weeks",
    level: "Intermediate",
    visibility: "Premium",
    approvalMode: "Admin Approval Required",
    studentCount: "42",
    assignedBy: "Academic Admin",
    reviewState: "Assigned",
    lastUpdated: timestamp(),
    publishedAt: "",
    approvedAt: "",
    submittedAt: "",
    price: "Rs 12,000",
    outcomes: "Reusable course blueprint, first teaching chapter, one lecture plan, and starter resource set.",
    modules: [
      {
        id: createId("module"),
        name: "Introduction Module",
        objective: "Set the chapter flow, learning goals, and first lecture plan.",
        design: "Orientation lesson, first concept lecture, PDF notes, and one reference link.",
        status: "Draft",
        lectures: [],
        sources: [],
      },
    ],
  };
  state.courses.push(starterCourse);
  state.courses.push({
    id: createId("course"),
    title: "Chemistry Class 11",
    batchId: "Reusable Library",
    faculty: "Dr. Rohan Mehta",
    category: "Chemistry",
    status: "Draft",
    description: "Reusable chemistry course for adding into multiple institute batches.",
    mode: "Hybrid",
    duration: "14 weeks",
    level: "Intermediate",
    visibility: "Premium",
    approvalMode: "Admin Approval Required",
    studentCount: "0",
    assignedBy: "Academic Admin",
    reviewState: "Assigned",
    lastUpdated: timestamp(),
    publishedAt: "",
    approvedAt: "",
    submittedAt: "",
    price: "Rs 12,000",
    outcomes: "Reusable chemistry course for multiple batches and schedules.",
    modules: [],
  });
  state.batches[0].courseIds = state.courses.map((course) => course.id);
  state.selectedCourseId = starterCourse.id;
  state.selectedModuleId = starterCourse.modules[0].id;
  state.selectedBatchId = state.batches[0].id;
  saveState();
}

function initials(name) {
  return String(name || "Teacher")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function loadTeacherSession() {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
  } catch {
    user = null;
  }

  if (user && user.role && user.role !== "teacher") {
    window.location.href = STUDENT_PANEL_URL;
    return;
  }

  const name = user?.name || "Teacher";
  const email = user?.email || "teacher@eduverse.demo";
  if (teacherProfileName) teacherProfileName.textContent = name;
  if (teacherProfileMeta) teacherProfileMeta.textContent = email;
  if (teacherInitials) teacherInitials.textContent = initials(name);
}

ensureSelections();
loadTeacherSession();
renderAll();
resetCourseForm();
resetBatchForm();
resetLectureForm();
resetSourceForm();
updateLectureModeUi();
updateSourceModeUi();

if (teacherLogoutButton) {
  teacherLogoutButton.addEventListener("click", () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    window.location.href = LOGIN_URL;
  });
}

if (sidebarOpenButton && sidebarDrawer) {
  sidebarOpenButton.addEventListener("click", () => {
    sidebarDrawer.classList.add("is-open");
    sidebarScrim?.classList.add("is-visible");
  });
}

if (sidebarToggle && sidebarDrawer) {
  sidebarToggle.addEventListener("click", () => {
    const isOpen = sidebarDrawer.classList.toggle("is-open");
    sidebarScrim?.classList.toggle("is-visible", isOpen);
  });
}

if (sidebarScrim && sidebarDrawer) {
  sidebarScrim.addEventListener("click", () => {
    sidebarDrawer.classList.remove("is-open");
    sidebarScrim.classList.remove("is-visible");
  });
}
