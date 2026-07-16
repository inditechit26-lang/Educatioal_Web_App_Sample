const STORAGE_KEY = "eduverseVisualCurriculumV1";
const VERSION_KEY = "eduverseVisualCurriculumVersionsV1";
const LEGACY_STORAGE_KEY = "eliteCoachingCourseStudioState";
const CURRENT_USER_KEY = "eliteCoachingCurrentUser";
const LOGIN_URL = "../auth_elitecoaching_institute/auth.html?mode=login";
const ROW_HEIGHT = 38;
const MAX_UNDO = 60;
const MAX_VERSIONS = 10;
const VERSION_STORAGE_BUDGET = 1_500_000;

const TYPES = {
  course: { label: "Course", icon: "menu_book", color: "#5b5bd6", children: ["subject"] },
  subject: { label: "Subject", icon: "category", color: "#1687a7", children: ["chapter"] },
  chapter: { label: "Chapter", icon: "folder", color: "#e6863b", children: ["lecture"] },
  lecture: { label: "Lecture", icon: "smart_display", color: "#d95087", children: ["notes", "dpp", "assignment", "questionBank", "resource"] },
  notes: { label: "Notes", icon: "description", color: "#0f9f76", children: [] },
  dpp: { label: "DPP", icon: "fact_check", color: "#8b5cf6", children: [] },
  assignment: { label: "Assignment", icon: "assignment", color: "#dc6b35", children: [] },
  questionBank: { label: "Question Bank", icon: "quiz", color: "#b05dc4", children: [] },
  resource: { label: "Resource", icon: "attach_file", color: "#3976d6", children: [] },
};

const RESOURCE_TYPES = {
  pdf: { label: "PDF", icon: "picture_as_pdf", color: "#dc4c5e" }, doc: { label: "DOC", icon: "description", color: "#3976d6" },
  ppt: { label: "PPT", icon: "slideshow", color: "#e06c36" }, excel: { label: "Excel", icon: "table_view", color: "#15966a" },
  zip: { label: "ZIP", icon: "folder_zip", color: "#8b5cf6" }, image: { label: "Image", icon: "image", color: "#d95087" },
  video: { label: "Video", icon: "video_library", color: "#7255d9" }, "google-drive": { label: "Google Drive", icon: "add_to_drive", color: "#1687a7" },
  youtube: { label: "YouTube", icon: "smart_display", color: "#e13e4c" }, external: { label: "External URL", icon: "link", color: "#67717f" },
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const byId = (id) => document.getElementById(id);
const uid = () => `node-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
const now = () => new Date().toISOString();
const clone = (value) => JSON.parse(JSON.stringify(value));

const refs = {
  autosave: byId("studioAutosave"), search: byId("studioSearch"), treeViewport: byId("treeViewport"), treeCanvas: byId("treeCanvas"),
  itemCounter: byId("itemCounter"), visibleCount: byId("visibleCount"), canvasEmpty: byId("canvasEmpty"), nodeCanvas: byId("nodeCanvas"),
  breadcrumbs: byId("nodeBreadcrumbs"), typeLabel: byId("nodeTypeLabel"), iconLarge: byId("nodeIconLarge"), title: byId("canvasTitleInput"),
  description: byId("canvasDescriptionInput"), status: byId("nodeStatusInput"), duration: byId("nodeDurationInput"), owner: byId("nodeOwnerInput"),
  date: byId("nodeDateInput"), notes: byId("nodeNotesInput"), childBoard: byId("childBoard"), childBoardTitle: byId("childBoardTitle"),
  progressLabel: byId("nodeProgressLabel"), progressBar: byId("nodeProgressBar"), inspectorType: byId("inspectorType"), inspectorId: byId("inspectorId"),
  inspectorChildren: byId("inspectorChildren"), inspectorUpdated: byId("inspectorUpdated"), iconInput: byId("nodeIconInput"), visible: byId("nodeVisibleInput"),
  preview: byId("nodePreviewInput"), contextMenu: byId("contextMenu"), addMenu: byId("addMenu"), addMenuOptions: byId("addMenuOptions"),
  historyDrawer: byId("historyDrawer"), historyList: byId("historyList"), drawerScrim: byId("drawerScrim"), toastStack: byId("teacherToastStack"),
  template: byId("nodeTemplateInput"), templateRow: byId("templateToggleRow"), versionLabel: byId("courseVersionLabel"), linkedBatchCount: byId("linkedBatchCount"), linkedBatchList: byId("linkedBatchList"),
  studentViewport: byId("studentCourseViewport"), studentPreview: byId("studentCoursePreview"),
  thumbnail: byId("nodeThumbnailInput"), contentUrl: byId("nodeContentUrlInput"), validationShell: byId("publishValidationShell"), checklist: byId("professionalChecklist"),
};

function seedNodes() {
  const course = uid(); const physics = uid(); const chemistry = uid(); const mechanics = uid(); const electro = uid(); const lecture1 = uid(); const lecture2 = uid();
  return [
    node(course, null, "course", "JEE 2027 Complete Program", { description: "A complete two-year preparation pathway for JEE Main and Advanced.", status: "Draft", owner: "Dr. Kavya Singh" }),
    node(physics, course, "subject", "Physics", { description: "Concept-first physics with problem solving and experiments." }),
    node(mechanics, physics, "chapter", "Mechanics", { description: "Motion, forces, energy, momentum, and rotation." }),
    node(lecture1, mechanics, "lecture", "Motion in a Straight Line", { duration: "48 min", status: "Published" }),
    node(uid(), lecture1, "notes", "Lecture Notes · Kinematics", { status: "Published" }),
    node(uid(), lecture1, "dpp", "DPP 01 · Motion Graphs"),
    node(uid(), lecture1, "assignment", "Assignment · Relative Motion"),
    node(uid(), lecture1, "questionBank", "Question Bank · Kinematics"),
    node(uid(), lecture1, "resource", "Formula Sheet · Kinematics"),
    node(lecture2, mechanics, "lecture", "Newton's Laws of Motion", { duration: "52 min" }),
    node(uid(), lecture2, "notes", "Free Body Diagrams"),
    node(electro, physics, "chapter", "Electrostatics"),
    node(uid(), electro, "lecture", "Coulomb's Law", { duration: "44 min" }),
    node(chemistry, course, "subject", "Chemistry"),
    node(uid(), chemistry, "chapter", "Physical Chemistry"),
    node(uid(), chemistry, "chapter", "Organic Chemistry"),
    node(uid(), course, "subject", "Mathematics"),
  ];
}

function node(id, parentId, type, title, extra = {}) {
  return { id, parentId, type, title, description: "", status: "Draft", duration: "", owner: "", date: "", notes: "", thumbnail: "", url: "", expanded: true, visible: true, preview: false, reusable: true, isTemplate: false, version: 1, color: TYPES[type].color, icon: "auto", updatedAt: now(), ...extra };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.nodes?.length) return { activeSection: "courses", search: "", contentFilter: "all", previewDevice: "desktop", previewTheme: "light", clipboard: null, renamingId: null, ...saved };
    const legacy = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY));
    if (legacy?.courses?.length) return migrateLegacyCourses(legacy.courses);
  } catch (error) { console.warn("Curriculum state could not be loaded", error); }
  const nodes = seedNodes();
  return { nodes, selectedId: nodes[0].id, activeSection: "courses", search: "", contentFilter: "all", previewDevice: "desktop", previewTheme: "light", clipboard: null, renamingId: null };
}

function migrateLegacyCourses(courses) {
  const nodes = [];
  courses.forEach((course) => {
    const courseId = uid();
    const subjectId = uid();
    nodes.push(node(courseId, null, "course", course.title || "Untitled Course", { description: course.description || "", status: course.status || "Draft", owner: course.faculty || "", duration: course.duration || "", notes: course.outcomes || "" }));
    nodes.push(node(subjectId, courseId, "subject", course.category || "Main Subject"));
    (course.modules || []).forEach((module) => {
      const chapterId = uid();
      nodes.push(node(chapterId, subjectId, "chapter", module.name || "Untitled Chapter", { description: module.objective || "", status: module.status || "Draft", notes: module.design || "" }));
      const lectures = module.lectures?.length ? module.lectures : [{ title: "Chapter materials", duration: "" }];
      lectures.forEach((lecture, lectureIndex) => {
        const lectureId = uid();
        nodes.push(node(lectureId, chapterId, "lecture", lecture.title || "Untitled Lecture", { duration: lecture.duration || "" }));
        if (lectureIndex === 0) (module.sources || []).forEach((source) => {
          const label = `${source.type || ""} ${source.title || ""}`.toLowerCase();
          const type = label.includes("dpp") ? "dpp" : label.includes("assignment") ? "assignment" : label.includes("note") ? "notes" : "resource";
          nodes.push(node(uid(), lectureId, type, source.title || TYPES[type].label));
        });
      });
    });
  });
  return { nodes, selectedId: nodes[0]?.id || null, activeSection: "courses", search: "", contentFilter: "all", previewDevice: "desktop", previewTheme: "light", clipboard: null, renamingId: null };
}

function loadVersions() {
  try { return JSON.parse(localStorage.getItem(VERSION_KEY)) || []; } catch { return []; }
}

let state = loadState();
let versions = loadVersions();
let undoStack = [];
let redoStack = [];
let visibleRows = [];
let draggedId = null;
let saveTimer = null;
let confirmResolver = null;
let fieldStartSnapshot = null;
let nodeIndex = new Map();
let childIndex = new Map();
let batches = Array.isArray(state.batches) ? state.batches : loadLegacyBatches();
let batchDraggedContentId = null;
let globalResources = Array.isArray(state.resources) ? state.resources : seedGlobalResources();
let resourceFilter = "all";
let resourceSource = "upload";
state.selectedResourceId = globalResources.some((resource) => resource.id === state.selectedResourceId) ? state.selectedResourceId : globalResources[0]?.id || null;

function loadLegacyBatches() {
  try { return JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY))?.batches || []; } catch { return []; }
}

function seedGlobalResources() {
  const course = state.nodes.find((item) => item.type === "course");
  const youtube = { id: uid(), title: "Kinematics Concept Overview", type: "youtube", source: "youtube", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", description: "Reusable concept video for motion chapters.", fileName: "", size: 0, createdAt: now(), updatedAt: now(), attachments: course ? [{ targetType: "course", targetId: course.id }] : [] };
  const pdf = { id: uid(), title: "JEE Physics Formula Handbook", type: "pdf", source: "external", url: "https://example.com/physics-formulas.pdf", description: "Formula reference for students and faculty.", fileName: "physics-formulas.pdf", size: 0, createdAt: now(), updatedAt: now(), attachments: [] };
  const drive = { id: uid(), title: "Shared Teaching Slides", type: "google-drive", source: "google-drive", url: "https://drive.google.com/", description: "Institute-wide presentation deck.", fileName: "", size: 0, createdAt: now(), updatedAt: now(), attachments: [] };
  if (course) course.resourceIds = [...new Set([...(course.resourceIds || []), youtube.id])];
  return [youtube, pdf, drive];
}

function openResourceDatabase() {
  if (!("indexedDB" in window)) return Promise.reject(new Error("IndexedDB is unavailable"));
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("eduverseGlobalResourceFiles", 1);
    request.onupgradeneeded = () => { if (!request.result.objectStoreNames.contains("files")) request.result.createObjectStore("files"); };
    request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error);
  });
}

async function storeResourceFile(resourceId, file) {
  const db = await openResourceDatabase();
  await new Promise((resolve, reject) => { const transaction = db.transaction("files", "readwrite"); transaction.objectStore("files").put(file, resourceId); transaction.oncomplete = resolve; transaction.onerror = () => reject(transaction.error); });
  db.close();
}

async function getResourceFile(resourceId) {
  const db = await openResourceDatabase();
  const file = await new Promise((resolve, reject) => { const request = db.transaction("files", "readonly").objectStore("files").get(resourceId); request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error); });
  db.close(); return file;
}

async function deleteResourceFile(resourceId) {
  try { const db = await openResourceDatabase(); await new Promise((resolve, reject) => { const transaction = db.transaction("files", "readwrite"); transaction.objectStore("files").delete(resourceId); transaction.oncomplete = resolve; transaction.onerror = () => reject(transaction.error); }); db.close(); } catch { /* Linked resources do not have stored files. */ }
}

function rebuildIndexes() {
  nodeIndex = new Map();
  childIndex = new Map();
  state.nodes.forEach((item) => {
    nodeIndex.set(item.id, item);
    if (!childIndex.has(item.parentId)) childIndex.set(item.parentId, []);
    childIndex.get(item.parentId).push(item);
  });
}

function getNode(id = state.selectedId) { return nodeIndex.get(id) || null; }
function childrenOf(id) { return childIndex.get(id) || []; }
function typeOf(nodeItem) { return TYPES[nodeItem?.type] || TYPES.course; }
function escapeHtml(value) { return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char])); }
function initials(value) { return String(value || "Teacher").split(/[\s@.]+/).filter(Boolean).map((part) => part[0]).join("").slice(0, 2).toUpperCase(); }

function rootCourseOf(id = state.selectedId) {
  let current = getNode(id);
  while (current?.parentId) current = getNode(current.parentId);
  return current?.type === "course" ? current : null;
}

function ensureBatchLinks() {
  const courses = state.nodes.filter((item) => item.type === "course");
  if (!courses.length) return;
  if (!batches.length) {
    batches = [
      { id: uid(), name: "JEE 2027 Morning", capacity: "186 students", status: "Active", courseLinks: [{ courseId: courses[0].id, version: courses[0].version || 1, locked: false, syncedAt: now() }] },
      { id: uid(), name: "JEE 2027 Evening", capacity: "142 students", status: "Active", courseLinks: [{ courseId: courses[0].id, version: courses[0].version || 1, locked: true, syncedAt: now() }] },
    ];
  }
  batches.forEach((batch, batchIndex) => {
    if (!Array.isArray(batch.courseLinks)) {
      const count = Math.max(1, batch.courseIds?.length || 1);
      batch.courseLinks = courses.slice(0, count).map((course, index) => ({ courseId: course.id, version: course.version || 1, locked: batchIndex === 1 && index === 0, syncedAt: now() }));
    }
    batch.courseLinks.forEach((link) => {
      link.contentId = link.contentId || link.courseId;
      link.contentType = link.contentType || "course";
      link.title = link.title || getNode(link.contentId)?.title || "Reusable content";
    });
    batch.courseIds = batch.courseLinks.map((link) => link.courseId);
    batch.teachers = Array.isArray(batch.teachers) && batch.teachers.length ? batch.teachers : batchIndex === 0 ? ["Dr. Kavya Singh", "Rohan Mehta"] : ["Dr. Kavya Singh"];
    batch.schedule = { startDate: "", endDate: "", classTime: "09:00", days: "Mon, Wed, Fri", ...(batch.schedule || {}) };
    batch.history = Array.isArray(batch.history) ? batch.history : [];
  });
  state.selectedBatchId = batches.some((batch) => batch.id === state.selectedBatchId) ? state.selectedBatchId : batches[0]?.id || null;
}

function linksForCourse(courseId) {
  return batches.flatMap((batch) => (batch.courseLinks || []).filter((link) => link.courseId === courseId).map((link) => ({ batch, link })));
}

function propagateCourseChange(nodeId, label = "Content updated") {
  const course = rootCourseOf(nodeId);
  if (!course) return;
  course.version = (course.version || 1) + 1;
  course.updatedAt = now();
  linksForCourse(course.id).forEach(({ link }) => {
    if (link.locked) return;
    link.version = course.version;
    link.syncedAt = now();
    link.lastChange = label;
  });
}

function renderReuseState(selected) {
  const course = rootCourseOf(selected.id);
  const links = course ? linksForCourse(course.id) : [];
  refs.versionLabel.textContent = `Version ${course?.version || 1}`;
  refs.templateRow.hidden = selected.type !== "course";
  refs.template.checked = Boolean(course?.isTemplate);
  refs.linkedBatchCount.textContent = links.length;
  refs.linkedBatchList.innerHTML = links.length ? links.map(({ batch, link }) => `<div class="linked-batch-row"><span class="material-symbols-outlined">group_work</span><div><strong>${escapeHtml(batch.name)}</strong><small>${link.locked ? `Locked to v${link.version}` : `Synced to v${link.version}`}</small></div><button class="version-lock${link.locked ? " is-locked" : ""}" data-toggle-batch-lock="${batch.id}" type="button" title="${link.locked ? "Unlock automatic updates" : "Lock this version"}"><span class="material-symbols-outlined">${link.locked ? "lock" : "lock_open"}</span></button></div>`).join("") : '<p class="no-links">Not linked to a batch yet.</p>';
}

function snapshot() { return { nodes: clone(state.nodes), selectedId: state.selectedId }; }
function trimUndoStack() {
  const adaptiveLimit = Math.max(5, Math.min(MAX_UNDO, Math.floor(120000 / Math.max(1, state.nodes.length))));
  if (undoStack.length > adaptiveLimit) undoStack.splice(0, undoStack.length - adaptiveLimit);
}
function pushUndo() {
  undoStack.push(snapshot());
  trimUndoStack();
  redoStack = [];
  updateCommandState();
}

function restoreSnapshot(value, label = "Restored") {
  if (!value) return;
  state.nodes = clone(value.nodes);
  rebuildIndexes();
  state.selectedId = value.selectedId && getNodeFrom(value.nodes, value.selectedId) ? value.selectedId : value.nodes[0]?.id || null;
  state.renamingId = null;
  propagateCourseChange(state.selectedId, label);
  scheduleSave(label, true);
  renderAll();
}

function getNodeFrom(nodes, id) { return nodes.find((item) => item.id === id); }
function undo() { if (!undoStack.length) return; redoStack.push(snapshot()); restoreSnapshot(undoStack.pop(), "Undo saved"); updateCommandState(); }
function redo() { if (!redoStack.length) return; undoStack.push(snapshot()); restoreSnapshot(redoStack.pop(), "Redo saved"); updateCommandState(); }

function markSaving() {
  refs.autosave.className = "autosave-pill is-saving";
  refs.autosave.innerHTML = '<span class="material-symbols-outlined">sync</span>Saving';
  byId("miniSaveState").textContent = "Saving…";
}

function scheduleSave(label = "Edited", makeVersion = false) {
  markSaving();
  clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => persist(label, makeVersion), 450);
}

function persist(label = "Autosaved", makeVersion = false) {
  try {
    const payload = { nodes: state.nodes, selectedId: state.selectedId, selectedBatchId: state.selectedBatchId, selectedResourceId: state.selectedResourceId, activeSection: state.activeSection, contentFilter: state.contentFilter, previewDevice: state.previewDevice, previewTheme: state.previewTheme, batches, resources: globalResources };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    refs.autosave.className = "autosave-pill is-saved";
    refs.autosave.innerHTML = '<span class="material-symbols-outlined">cloud_done</span>Saved';
    byId("miniSaveState").textContent = "Autosaved";
    if (makeVersion) recordVersion(label);
  } catch (error) {
    refs.autosave.className = "autosave-pill is-error";
    refs.autosave.innerHTML = '<span class="material-symbols-outlined">cloud_off</span>Save failed';
    showToast("error", "Autosave failed", "Browser storage is full. Your current editing session is still available.");
    console.error("Curriculum save failed", error);
  }
}

function recordVersion(label) {
  const latest = versions[0];
  if (latest && Date.now() - new Date(latest.createdAt).getTime() < 5000) return;
  versions.unshift({ id: uid(), label, createdAt: now(), nodes: clone(state.nodes), selectedId: state.selectedId });
  versions = versions.slice(0, MAX_VERSIONS);
  try {
    let used = 0;
    const persisted = versions.map((version) => {
      const full = JSON.stringify(version);
      if (used + full.length <= VERSION_STORAGE_BUDGET) { used += full.length; return version; }
      return { id: version.id, label: version.label, createdAt: version.createdAt, itemCount: version.nodes?.length || version.itemCount || 0, snapshotAvailable: false };
    });
    localStorage.setItem(VERSION_KEY, JSON.stringify(persisted));
  } catch (error) { console.warn("Version metadata could not be persisted", error); }
  renderHistory();
}

function buildVisibleRows() {
  const query = state.search.trim().toLowerCase();
  const include = new Set();
  if (query) {
    state.nodes.filter((item) => `${item.title} ${TYPES[item.type].label}`.toLowerCase().includes(query)).forEach((match) => {
      let current = match;
      while (current) { include.add(current.id); current = getNode(current.parentId); }
    });
  }
  const adjacency = new Map();
  state.nodes.forEach((item) => {
    if (!adjacency.has(item.parentId)) adjacency.set(item.parentId, []);
    adjacency.get(item.parentId).push(item);
  });
  const rows = [];
  const visit = (parentId, depth) => {
    (adjacency.get(parentId) || []).forEach((item) => {
      if (parentId === null && state.contentFilter === "drafts" && item.status !== "Draft") return;
      if (parentId === null && state.contentFilter === "templates" && !item.isTemplate) return;
      if (query && !include.has(item.id)) return;
      rows.push({ node: item, depth });
      if ((item.expanded || query) && childrenOfFast(adjacency, item.id).length) visit(item.id, depth + 1);
    });
  };
  visit(null, 0);
  return rows;
}

function childrenOfFast(adjacency, id) { return adjacency.get(id) || []; }

function renderTree() {
  visibleRows = buildVisibleRows();
  const viewportHeight = refs.treeViewport.clientHeight || 600;
  const start = Math.max(0, Math.floor(refs.treeViewport.scrollTop / ROW_HEIGHT) - 8);
  const end = Math.min(visibleRows.length, start + Math.ceil(viewportHeight / ROW_HEIGHT) + 16);
  refs.treeCanvas.style.height = `${visibleRows.length * ROW_HEIGHT}px`;
  refs.treeCanvas.innerHTML = visibleRows.slice(start, end).map(({ node: item, depth }, offset) => treeRow(item, depth, start + offset)).join("");
  refs.visibleCount.textContent = `${visibleRows.length.toLocaleString()} visible`;
  refs.itemCounter.textContent = `${state.nodes.length.toLocaleString()} items`;
}

function treeRow(item, depth, index) {
  const config = typeOf(item);
  const childCount = childrenOf(item.id).length;
  const selected = item.id === state.selectedId ? " is-selected" : "";
  const drop = item.id === draggedId ? " is-dragging" : "";
  const title = state.renamingId === item.id
    ? `<input class="tree-rename-input" value="${escapeHtml(item.title)}" aria-label="Rename ${config.label}" />`
    : `<span class="tree-row-title">${escapeHtml(item.title)}</span>`;
  return `<div class="tree-row${selected}${drop}" role="treeitem" aria-level="${depth + 1}" aria-selected="${item.id === state.selectedId}" draggable="${state.renamingId !== item.id}" data-node-id="${item.id}" style="--depth:${depth};--row-index:${index};--node-color:${item.color || config.color};transform:translateY(${index * ROW_HEIGHT}px)">
    <span class="drag-handle material-symbols-outlined">drag_indicator</span>
    <button class="tree-chevron${childCount ? "" : " is-empty"}" data-tree-action="toggle" type="button" aria-label="${item.expanded ? "Collapse" : "Expand"}"><span class="material-symbols-outlined">${item.expanded ? "expand_more" : "chevron_right"}</span></button>
    <span class="tree-type-icon material-symbols-outlined">${item.icon === "auto" ? config.icon : item.icon}</span>${title}
    <span class="tree-type-tag">${config.label}</span><button class="tree-more material-symbols-outlined" data-tree-action="menu" type="button" aria-label="More actions">more_horiz</button>
  </div>`;
}

function renderEditor() {
  const selected = getNode();
  refs.canvasEmpty.hidden = Boolean(selected);
  refs.nodeCanvas.hidden = !selected;
  if (!selected) return;
  const config = typeOf(selected);
  refs.typeLabel.textContent = config.label;
  refs.iconLarge.style.setProperty("--node-color", selected.color || config.color);
  refs.iconLarge.innerHTML = `<span class="material-symbols-outlined">${selected.icon === "auto" ? config.icon : selected.icon}</span>`;
  refs.title.value = selected.title;
  refs.description.value = selected.description || "";
  refs.status.value = selected.status || "Draft";
  refs.duration.value = selected.duration || "";
  refs.owner.value = selected.owner || "";
  refs.date.value = selected.date || "";
  refs.notes.value = selected.notes || "";
  refs.thumbnail.value = selected.type === "course" ? selected.thumbnail || "" : "";
  refs.contentUrl.value = selected.url || "";
  byId("thumbnailField").hidden = selected.type !== "course";
  byId("contentUrlField").hidden = !["lecture", "notes", "dpp", "assignment", "questionBank", "resource"].includes(selected.type);
  byId("contentUrlLabel").textContent = selected.type === "lecture" ? "Video link" : ["notes", "resource"].includes(selected.type) ? "PDF or resource link" : "Content link";
  refs.iconInput.value = selected.icon || "auto";
  refs.visible.checked = selected.visible !== false;
  refs.preview.checked = Boolean(selected.preview);
  refs.inspectorType.textContent = config.label;
  refs.inspectorId.textContent = selected.id.slice(-8).toUpperCase();
  refs.inspectorChildren.textContent = childrenOf(selected.id).length;
  refs.inspectorUpdated.textContent = relativeTime(selected.updatedAt);
  $$("[data-color]", byId("colorOptions")).forEach((button) => button.classList.toggle("is-active", button.dataset.color === selected.color));
  renderBreadcrumbs(selected);
  renderChildBoard(selected);
  renderProgress(selected);
  renderReuseState(selected);
  updateCommandState();
}

function renderBreadcrumbs(selected) {
  const path = [];
  let current = selected;
  while (current) { path.unshift(current); current = getNode(current.parentId); }
  refs.breadcrumbs.innerHTML = path.map((item, index) => `<button data-select-id="${item.id}" type="button">${index ? '<span class="material-symbols-outlined">chevron_right</span>' : ""}${escapeHtml(item.title)}</button>`).join("");
}

function renderChildBoard(selected) {
  const children = childrenOf(selected.id);
  const allowed = typeOf(selected).children;
  refs.childBoardTitle.textContent = allowed.length ? `${typeOf(selected).label} structure` : "Learning item";
  byId("addChildInlineButton").hidden = !allowed.length;
  if (!children.length) {
    refs.childBoard.innerHTML = allowed.length
      ? `<button class="empty-child-card" data-add-inline type="button"><span class="material-symbols-outlined">add_circle</span><strong>Add ${TYPES[allowed[0]].label}</strong><small>Continue building this curriculum</small></button>`
      : `<div class="leaf-message"><span class="material-symbols-outlined">check_circle</span><div><strong>Ready for student content</strong><small>This is an end item in the curriculum hierarchy.</small></div></div>`;
    return;
  }
  refs.childBoard.innerHTML = children.map((item) => {
    const config = typeOf(item);
    return `<button class="child-card" data-select-id="${item.id}" type="button" style="--node-color:${item.color || config.color}"><span class="material-symbols-outlined">${item.icon === "auto" ? config.icon : item.icon}</span><span><small>${config.label}</small><strong>${escapeHtml(item.title)}</strong><em>${childrenOf(item.id).length} nested items</em></span><i class="material-symbols-outlined">arrow_forward</i></button>`;
  }).join("");
}

function renderProgress(selected) {
  const descendants = collectDescendantIds(selected.id);
  const relevant = [selected, ...descendants.map(getNode).filter(Boolean)];
  const completed = relevant.filter((item) => item.status === "Published").length;
  const percent = Math.max(12, Math.round((completed / Math.max(1, relevant.length)) * 100));
  refs.progressLabel.textContent = `${percent}%`;
  refs.progressBar.style.width = `${percent}%`;
}

function renderStudentPreview() {
  if (!refs.studentPreview || !refs.studentViewport) return;
  const selected = getNode();
  const course = rootCourseOf(selected?.id);
  refs.studentViewport.className = `student-course-viewport is-${state.previewDevice || "desktop"} is-${state.previewTheme || "light"}`;
  $$("[data-preview-device]", byId("previewDeviceControls")).forEach((button) => button.classList.toggle("is-active", button.dataset.previewDevice === (state.previewDevice || "desktop")));
  $$("[data-preview-theme]", byId("previewThemeControls")).forEach((button) => button.classList.toggle("is-active", button.dataset.previewTheme === (state.previewTheme || "light")));
  if (!course) {
    refs.studentPreview.innerHTML = '<div class="student-preview-empty"><span class="material-symbols-outlined">school</span><strong>Create a course to preview it</strong></div>';
    return;
  }
  const descendants = collectDescendantIds(course.id).map(getNode).filter(Boolean);
  const subjects = childrenOf(course.id).filter((item) => item.visible !== false && item.status !== "Archived");
  let activeSubject = selected;
  while (activeSubject && activeSubject.parentId !== course.id) activeSubject = getNode(activeSubject.parentId);
  if (activeSubject?.type !== "subject") activeSubject = subjects[0] || null;
  const chapters = activeSubject ? childrenOf(activeSubject.id).filter((item) => item.visible !== false && item.status !== "Archived") : [];
  const lectureCount = descendants.filter((item) => item.type === "lecture" && item.visible !== false && item.status !== "Archived").length;
  const resourceCount = descendants.filter((item) => ["notes", "dpp", "assignment", "questionBank", "resource"].includes(item.type) && item.visible !== false && item.status !== "Archived").length;
  const accent = course.color || TYPES.course.color;
  refs.studentPreview.innerHTML = `<header class="student-mini-nav"><span class="student-mini-brand"><i>EV</i><strong>EduVerse</strong></span><span class="student-mini-search"><span class="material-symbols-outlined">search</span>Search your course</span><span class="student-mini-avatar">${escapeHtml(initials(course.owner || "Student"))}</span></header><section class="student-course-hero" style="--course-accent:${accent}"><div><span>${course.status === "Published" ? "Enrolled course" : "Draft preview"}</span><h2>${escapeHtml(course.title)}</h2><p>${escapeHtml(course.description || "Start learning with your teacher-curated course pathway.")}</p><div class="student-course-meta"><b><span class="material-symbols-outlined">menu_book</span>${subjects.length} subjects</b><b><span class="material-symbols-outlined">smart_display</span>${lectureCount} lectures</b><b><span class="material-symbols-outlined">folder_open</span>${resourceCount} resources</b></div></div><button type="button">Continue learning<span class="material-symbols-outlined">arrow_forward</span></button></section><div class="student-course-body"><aside><small>Course subjects</small>${subjects.map((subject, index) => `<button class="${subject.id === activeSubject?.id ? "is-active" : ""}" type="button"><i>${String(index + 1).padStart(2, "0")}</i><span>${escapeHtml(subject.title)}</span><em>${childrenOf(subject.id).length}</em></button>`).join("") || '<p>No published subjects yet.</p>'}</aside><main><div class="student-section-heading"><div><small>${escapeHtml(activeSubject ? "Current subject" : "Course content")}</small><h3>${escapeHtml(activeSubject?.title || "Learning path")}</h3></div><span>${chapters.length} chapters</span></div><div class="student-chapter-grid">${chapters.map((chapter, index) => { const lectures = childrenOf(chapter.id).filter((item) => item.type === "lecture" && item.visible !== false && item.status !== "Archived"); return `<article class="${chapter.id === selected?.id ? "is-selected" : ""}"><span class="material-symbols-outlined">folder</span><div><small>Chapter ${index + 1}</small><strong>${escapeHtml(chapter.title)}</strong><em>${lectures.length} lectures · ${escapeHtml(chapter.description || "Learn at your own pace")}</em></div><span class="material-symbols-outlined">chevron_right</span></article>`; }).join("") || '<div class="student-no-content">Content will appear here when it is ready.</div>'}</div></main></div>`;
}

function renderAll() { renderTree(); renderEditor(); renderStudentPreview(); renderDashboardCounts(); if (refs.validationShell && !refs.validationShell.hidden) renderCourseValidation(); }

function selectNode(id, focusTree = false) {
  if (!getNode(id)) return;
  state.selectedId = id;
  state.renamingId = null;
  renderTree(); renderEditor(); renderStudentPreview();
  if (focusTree) refs.treeViewport.focus();
}

function addNode(type, parentId = null) {
  if (!TYPES[type]) return;
  if (type !== "course") {
    const parent = getNode(parentId);
    if (!parent || !typeOf(parent).children.includes(type)) return showToast("warning", "That item cannot be placed here", `Add ${TYPES[type].label} under the correct parent level.`);
  }
  pushUndo();
  const created = node(uid(), type === "course" ? null : parentId, type, `Untitled ${TYPES[type].label}`);
  state.nodes.push(created);
  rebuildIndexes();
  if (parentId) getNode(parentId).expanded = true;
  state.selectedId = created.id;
  state.renamingId = created.id;
  if (parentId) propagateCourseChange(parentId, `${TYPES[type].label} added`);
  scheduleSave(`${TYPES[type].label} added`, true);
  renderAll();
  requestAnimationFrame(focusRenameInput);
}

function showAddMenu(anchor = byId("addChildButton")) {
  const selected = getNode();
  const allowed = selected ? typeOf(selected).children : ["course"];
  if (!allowed.length) return showToast("info", "This is an end item", "Select a parent item to add more curriculum content.");
  refs.addMenuOptions.innerHTML = allowed.map((type) => `<button data-add-type="${type}" type="button"><span class="material-symbols-outlined" style="--node-color:${TYPES[type].color}">${TYPES[type].icon}</span><span><strong>${TYPES[type].label}</strong><small>Add under ${selected ? selected.title : "curriculum"}</small></span></button>`).join("");
  refs.addMenu.hidden = false;
  positionFloating(refs.addMenu, anchor.getBoundingClientRect());
}

function beginRename(id = state.selectedId) { if (!getNode(id)) return; state.renamingId = id; renderTree(); requestAnimationFrame(focusRenameInput); }
function focusRenameInput() { const input = $(".tree-rename-input"); if (input) { input.focus(); input.select(); } }
function finishRename(commit = true) {
  const id = state.renamingId; const input = $(".tree-rename-input"); const item = getNode(id);
  if (!item) return;
  if (commit && input?.value.trim() && input.value.trim() !== item.title) { pushUndo(); item.title = input.value.trim(); item.updatedAt = now(); propagateCourseChange(item.id, "Item renamed"); scheduleSave("Renamed", true); }
  state.renamingId = null; renderAll();
}

function collectDescendantIds(id) {
  const result = [];
  const stack = [...childrenOf(id)];
  while (stack.length) {
    const child = stack.pop();
    result.push(child.id);
    stack.push(...childrenOf(child.id));
  }
  return result;
}

function copySelected() {
  const selected = getNode(); if (!selected) return;
  const ids = new Set([selected.id, ...collectDescendantIds(selected.id)]);
  state.clipboard = { rootId: selected.id, nodes: clone(state.nodes.filter((item) => ids.has(item.id))) };
  updateCommandState(); showToast("success", `${typeOf(selected).label} copied`, "Choose a compatible destination and paste.");
}

function canAccept(parent, type) { return parent ? typeOf(parent).children.includes(type) : type === "course"; }

function pasteClipboard(targetId = state.selectedId) {
  if (!state.clipboard) return;
  const root = state.clipboard.nodes.find((item) => item.id === state.clipboard.rootId);
  let parent = getNode(targetId);
  if (!canAccept(parent, root.type)) parent = parent ? getNode(parent.parentId) : null;
  if (!canAccept(parent, root.type)) return showToast("warning", "Cannot paste here", `Select a destination that accepts a ${TYPES[root.type].label}.`);
  pushUndo();
  const idMap = new Map(state.clipboard.nodes.map((item) => [item.id, uid()]));
  const copies = state.clipboard.nodes.map((item) => ({ ...clone(item), id: idMap.get(item.id), parentId: item.id === root.id ? parent?.id || null : idMap.get(item.parentId), title: item.id === root.id ? `${item.title} copy` : item.title, updatedAt: now() }));
  state.nodes.push(...copies);
  rebuildIndexes();
  if (parent) parent.expanded = true;
  state.selectedId = idMap.get(root.id);
  if (parent) propagateCourseChange(parent.id, "Reusable content pasted");
  scheduleSave("Pasted", true); renderAll();
}

function duplicateSelected() { const originalClipboard = state.clipboard; copySelected(); const selected = getNode(); pasteClipboard(selected.parentId); state.clipboard = originalClipboard; updateCommandState(); }

function cloneCourse() {
  const course = rootCourseOf();
  if (!course) return showToast("info", "Select a course", "Choose any item inside the course you want to clone.");
  pushUndo();
  const sourceIds = new Set([course.id, ...collectDescendantIds(course.id)]);
  const sourceNodes = state.nodes.filter((item) => sourceIds.has(item.id));
  const idMap = new Map(sourceNodes.map((item) => [item.id, uid()]));
  const copies = sourceNodes.map((item) => ({ ...clone(item), id: idMap.get(item.id), parentId: item.id === course.id ? null : idMap.get(item.parentId), title: item.id === course.id ? `${item.title} — Clone` : item.title, status: item.id === course.id ? "Draft" : item.status, isTemplate: false, version: 1, updatedAt: now() }));
  state.nodes.push(...copies);
  rebuildIndexes();
  state.selectedId = idMap.get(course.id);
  scheduleSave("Course cloned", true); renderAll();
  showToast("success", "Course cloned", "A reusable draft copy was added to Content Studio.");
}

async function deleteSelected() {
  const selected = getNode(); if (!selected) return;
  const count = collectDescendantIds(selected.id).length;
  const accepted = await confirmAction("Delete curriculum item?", count ? `${selected.title} and ${count} nested item${count === 1 ? "" : "s"} will be deleted.` : `${selected.title} will be deleted.`);
  if (!accepted) return;
  pushUndo();
  const ids = new Set([selected.id, ...collectDescendantIds(selected.id)]);
  state.nodes = state.nodes.filter((item) => !ids.has(item.id));
  rebuildIndexes();
  state.selectedId = selected.parentId && getNode(selected.parentId) ? selected.parentId : state.nodes[0]?.id || null;
  if (selected.parentId) propagateCourseChange(selected.parentId, "Content deleted");
  scheduleSave("Deleted", true); renderAll(); showToast("success", "Item deleted", "You can undo this action from the toolbar.");
}

function moveNode(sourceId, targetId) {
  const source = getNode(sourceId); const target = getNode(targetId);
  if (!source || !target || source.id === target.id || collectDescendantIds(source.id).includes(target.id)) return;
  const previousCourseId = rootCourseOf(source.id)?.id || null;
  let newParent = canAccept(target, source.type) ? target : getNode(target.parentId);
  if (!canAccept(newParent, source.type)) return showToast("warning", "Cannot move there", `A ${TYPES[source.type].label} needs a compatible parent.`);
  if (source.parentId === newParent?.id) {
    const sourceIndex = state.nodes.indexOf(source);
    const targetIndex = state.nodes.indexOf(target);
    if (sourceIndex === targetIndex) return;
    pushUndo();
    state.nodes.splice(sourceIndex, 1);
    state.nodes.splice(state.nodes.indexOf(target), 0, source);
    source.updatedAt = now();
    rebuildIndexes();
    propagateCourseChange(source.id, "Content reordered"); scheduleSave("Reordered", true); renderAll();
    return showToast("success", "Order updated", `${source.title} was moved before ${target.title}.`);
  }
  pushUndo(); source.parentId = newParent?.id || null; source.updatedAt = now(); if (newParent) newParent.expanded = true;
  rebuildIndexes();
  state.selectedId = source.id;
  const newCourseId = rootCourseOf(source.id)?.id || null;
  if (previousCourseId && previousCourseId !== newCourseId) propagateCourseChange(previousCourseId, "Content moved out");
  propagateCourseChange(source.id, "Content moved in"); scheduleSave("Moved", true); renderAll(); showToast("success", "Curriculum updated", `${source.title} moved into ${newParent?.title || "the curriculum"}.`);
}

function updateSelected(patch, versionLabel = null) {
  const selected = getNode(); if (!selected) return;
  Object.assign(selected, patch, { updatedAt: now() });
  if (versionLabel) propagateCourseChange(selected.id, versionLabel);
  scheduleSave(versionLabel || "Edited", Boolean(versionLabel));
  renderTree(); renderStudentPreview(); renderDashboardCounts();
  if (!refs.validationShell.hidden) renderCourseValidation();
  refs.inspectorUpdated.textContent = "Just now";
}

function startFieldEdit() { if (!fieldStartSnapshot) fieldStartSnapshot = snapshot(); }
function finishFieldEdit(label = "Details updated") {
  if (fieldStartSnapshot) { undoStack.push(fieldStartSnapshot); trimUndoStack(); redoStack = []; fieldStartSnapshot = null; updateCommandState(); propagateCourseChange(state.selectedId, label); scheduleSave(label, true); }
}

function updateCommandState() {
  byId("undoButton").disabled = !undoStack.length;
  byId("redoButton").disabled = !redoStack.length;
  byId("pasteButton").disabled = !state.clipboard;
  const selected = getNode();
  byId("copyButton").disabled = !selected; byId("duplicateButton").disabled = !selected; byId("deleteButton").disabled = !selected;
  const addDisabled = !selected || !typeOf(selected).children.length;
  byId("addChildButton").disabled = addDisabled;
}

function relativeTime(value) {
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(value || Date.now()).getTime()) / 1000));
  if (seconds < 60) return "Just now"; if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`; if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`; return `${Math.floor(seconds / 86400)}d ago`;
}

function showContextMenu(x, y, id) {
  selectNode(id); refs.contextMenu.hidden = false;
  refs.contextMenu.style.left = `${Math.min(x, innerWidth - 230)}px`; refs.contextMenu.style.top = `${Math.min(y, innerHeight - 320)}px`;
  $('[data-context-action="paste"]', refs.contextMenu).disabled = !state.clipboard;
  $('[data-context-action="add"]', refs.contextMenu).disabled = !typeOf(getNode()).children.length;
}

function closeFloatingMenus() { refs.contextMenu.hidden = true; refs.addMenu.hidden = true; }
function positionFloating(element, rect) { element.style.left = `${Math.min(rect.left, innerWidth - 300)}px`; element.style.top = `${Math.min(rect.bottom + 8, innerHeight - 360)}px`; }

function showToast(type, title, detail = "") {
  const toast = document.createElement("article"); toast.className = `toast-card is-${type}`;
  const icon = { success: "check_circle", warning: "warning", error: "error", info: "info" }[type] || "info";
  toast.innerHTML = `<span class="material-symbols-outlined">${icon}</span><div><strong>${escapeHtml(title)}</strong>${detail ? `<small>${escapeHtml(detail)}</small>` : ""}</div>`;
  refs.toastStack.appendChild(toast); setTimeout(() => { toast.classList.add("is-leaving"); setTimeout(() => toast.remove(), 220); }, 3500);
}

function confirmAction(title, message) {
  byId("confirmTitle").textContent = title; byId("confirmMessage").textContent = message; byId("confirmShell").hidden = false;
  return new Promise((resolve) => { confirmResolver = resolve; });
}

function closeConfirm(result) { byId("confirmShell").hidden = true; confirmResolver?.(result); confirmResolver = null; }

function validWebUrl(value) {
  try { const parsed = new URL(value); return ["http:", "https:"].includes(parsed.protocol) && Boolean(parsed.hostname); } catch { return false; }
}

function lectureNumber(title) {
  const match = String(title || "").match(/(?:lecture|lec)\s*[-:#.]?\s*(\d+)/i) || String(title || "").match(/^\s*(\d+)\s*[.)-]/);
  return match ? Number(match[1]) : null;
}

function validateCourse(courseId) {
  const course = getNode(courseId);
  if (!course || course.type !== "course") return { course: null, checks: [], passed: false };
  const descendants = collectDescendantIds(course.id).map(getNode).filter(Boolean);
  const chapters = descendants.filter((item) => item.type === "chapter");
  const lectures = descendants.filter((item) => item.type === "lecture");
  const notes = descendants.filter((item) => item.type === "notes");
  const dpps = descendants.filter((item) => item.type === "dpp");
  const resources = descendants.filter((item) => item.type === "resource");
  const brokenVideos = lectures.filter((item) => item.url && !validWebUrl(item.url));
  const pdfItems = descendants.filter((item) => ["notes", "resource"].includes(item.type) && item.url);
  const brokenPdfs = pdfItems.filter((item) => !validWebUrl(item.url));
  const duplicateLectures = [];
  chapters.forEach((chapter) => {
    const seen = new Map();
    childrenOf(chapter.id).filter((item) => item.type === "lecture").forEach((lecture) => {
      const number = lectureNumber(lecture.title); if (number === null) return;
      if (seen.has(number)) { duplicateLectures.push(seen.get(number), lecture); } else seen.set(number, lecture);
    });
  });
  const checks = [
    { key: "thumbnail", label: "Course thumbnail", passed: Boolean(course.thumbnail?.trim()) && validWebUrl(course.thumbnail), detail: course.thumbnail?.trim() ? "Use a valid HTTP(S) thumbnail URL." : "Add a thumbnail so students can recognize the course.", nodeId: course.id },
    { key: "description", label: "Course description", passed: Boolean(course.description?.trim()), detail: "Add a clear description of the course and learning outcomes.", nodeId: course.id },
    { key: "chapters", label: "Chapters", passed: chapters.length > 0, detail: chapters.length ? `${chapters.length} chapter${chapters.length === 1 ? "" : "s"} found.` : "Add at least one chapter to a subject.", nodeId: descendants.find((item) => item.type === "subject")?.id || course.id },
    { key: "lectures", label: "Lectures", passed: lectures.length > 0, detail: lectures.length ? `${lectures.length} lecture${lectures.length === 1 ? "" : "s"} found.` : "Add at least one lecture to a chapter.", nodeId: chapters[0]?.id || course.id },
    { key: "notes", label: "Lecture notes", passed: notes.length > 0, detail: notes.length ? `${notes.length} notes item${notes.length === 1 ? "" : "s"} found.` : "Attach at least one notes item.", nodeId: lectures[0]?.id || course.id },
    { key: "dpp", label: "Daily Practice Problems", passed: dpps.length > 0, detail: dpps.length ? `${dpps.length} DPP item${dpps.length === 1 ? "" : "s"} found.` : "Add at least one DPP for student practice.", nodeId: lectures[0]?.id || course.id },
    { key: "resources", label: "Learning resources", passed: resources.length > 0, detail: resources.length ? `${resources.length} resource${resources.length === 1 ? "" : "s"} found.` : "Add at least one reusable learning resource.", nodeId: lectures[0]?.id || course.id },
    { key: "video-links", label: "Video links", passed: brokenVideos.length === 0, detail: brokenVideos.length ? `${brokenVideos.length} malformed video link${brokenVideos.length === 1 ? "" : "s"} found.` : "All supplied video links are valid HTTP(S) URLs.", nodeId: brokenVideos[0]?.id || lectures[0]?.id || course.id },
    { key: "pdf-links", label: "PDF links", passed: brokenPdfs.length === 0, detail: brokenPdfs.length ? `${brokenPdfs.length} malformed PDF/resource link${brokenPdfs.length === 1 ? "" : "s"} found.` : "All supplied PDF/resource links are valid HTTP(S) URLs.", nodeId: brokenPdfs[0]?.id || notes[0]?.id || resources[0]?.id || course.id },
    { key: "lecture-numbers", label: "Lecture numbering", passed: duplicateLectures.length === 0, detail: duplicateLectures.length ? "Duplicate lecture numbers exist within the same chapter." : "No duplicate lecture numbers were found.", nodeId: duplicateLectures[0]?.id || lectures[0]?.id || course.id },
  ];
  return { course, checks, passed: checks.every((check) => check.passed) };
}

function renderCourseValidation(courseId = state.validationCourseId) {
  const result = validateCourse(courseId);
  if (!result.course) return result;
  const passedCount = result.checks.filter((check) => check.passed).length;
  const percent = Math.round((passedCount / result.checks.length) * 100);
  byId("validationSummary").textContent = result.passed ? "All required checks passed. This course is ready to publish." : `${passedCount} of ${result.checks.length} checks passed. Resolve the remaining issues to publish.`;
  byId("validationProgressBar").style.width = `${percent}%`;
  byId("validationProgressBar").classList.toggle("is-complete", result.passed);
  refs.checklist.innerHTML = result.checks.map((check) => `<article class="publish-check${check.passed ? " is-passed" : " is-failed"}"><span class="material-symbols-outlined">${check.passed ? "check_circle" : "error"}</span><div><strong>${escapeHtml(check.label)}</strong><small>${escapeHtml(check.detail)}</small></div><em>${check.passed ? "Passed" : "Required"}</em>${check.passed ? "" : `<button data-fix-validation="${check.key}" data-validation-node="${check.nodeId}" type="button">Fix issue<span class="material-symbols-outlined">arrow_forward</span></button>`}</article>`).join("");
  byId("confirmCoursePublishButton").disabled = !result.passed;
  return result;
}

function openCourseValidation() {
  const course = rootCourseOf(); if (!course) return showToast("warning", "Select a course", "Choose a course before publishing.");
  state.validationCourseId = course.id;
  refs.validationShell.hidden = false;
  renderCourseValidation(course.id);
}

function closeCourseValidation() { refs.validationShell.hidden = true; }

function completeCoursePublish() {
  const result = renderCourseValidation();
  if (!result.passed) return showToast("error", "Publishing blocked", "Complete every required validation before publishing.");
  pushUndo(); result.course.status = "Published"; result.course.updatedAt = now(); propagateCourseChange(result.course.id, "Course published"); scheduleSave("Course published", true); closeCourseValidation(); renderAll(); showToast("success", "Course published", `${result.course.title} passed all quality checks and synced to unlocked batches.`);
}

function setSection(section) {
  state.activeSection = section;
  $$("[data-workspace-section]").forEach((item) => item.classList.toggle("is-active", item.dataset.workspaceSection === section));
  $$(".sidebar-link").forEach((item) => item.classList.toggle("is-active", item.dataset.sidebarTab === section));
  const activeButton = $(`.sidebar-link[data-sidebar-tab="${section}"] span:nth-child(2)`);
  byId("pageTitle").textContent = section === "courses" ? "Content Studio" : activeButton?.textContent || "Teacher Portal";
  refs.search.closest("label").hidden = section !== "courses";
  byId("versionHistoryButton").hidden = section !== "courses";
  byId("publishButton").hidden = section !== "courses";
  closeSidebar(); scheduleSave("Workspace changed");
}

function renderHistory() {
  refs.historyList.innerHTML = versions.length ? versions.map((version, index) => `<article class="history-item${index === 0 ? " is-current" : ""}"><span class="history-marker"></span><div><strong>${escapeHtml(version.label || "Autosaved version")}</strong><small>${new Date(version.createdAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })} · ${(version.nodes?.length || version.itemCount || 0).toLocaleString()} items</small></div>${index === 0 ? '<em>Current</em>' : version.nodes ? `<button data-restore-version="${version.id}" type="button">Restore</button>` : '<em>Metadata</em>'}</article>`).join("") : '<div class="history-empty"><span class="material-symbols-outlined">history</span><p>Versions appear as you edit the curriculum.</p></div>';
}

function openHistory() { renderHistory(); refs.historyDrawer.classList.add("is-open"); refs.historyDrawer.setAttribute("aria-hidden", "false"); refs.drawerScrim.hidden = false; }
function closeHistory() { refs.historyDrawer.classList.remove("is-open"); refs.historyDrawer.setAttribute("aria-hidden", "true"); refs.drawerScrim.hidden = true; }

function renderDashboardCounts() {
  byId("dashboardCourseCount").textContent = state.nodes.filter((item) => item.type === "course").length;
  byId("dashboardLectureCount").textContent = state.nodes.filter((item) => item.type === "lecture").length;
}

function renderBatches() {
  if (!byId("batchContentLibrary")) return;
  const batch = batches.find((item) => item.id === state.selectedBatchId) || batches[0];
  const query = (byId("batchLibrarySearch").value || "").trim().toLowerCase();
  const courses = state.nodes.filter((item) => item.type === "course" && (!query || item.title.toLowerCase().includes(query) || childrenOf(item.id).some((child) => child.title.toLowerCase().includes(query))));
  byId("batchContentLibrary").innerHTML = courses.length ? courses.map((course) => {
    const subjects = childrenOf(course.id).filter((item) => item.type === "subject" && (!query || item.title.toLowerCase().includes(query) || course.title.toLowerCase().includes(query)));
    return `<article class="library-course"><div class="library-course-head" draggable="true" data-batch-library-id="${course.id}"><span class="material-symbols-outlined">menu_book</span><div><small>Course · v${course.version || 1}</small><strong>${escapeHtml(course.title)}</strong></div><button class="clone-library-course" data-clone-library-course="${course.id}" type="button" title="Clone course"><span class="material-symbols-outlined">library_add</span></button><span class="material-symbols-outlined drag-mark">drag_indicator</span></div><div class="library-subjects">${subjects.map((subject) => `<div class="library-subject" draggable="true" data-batch-library-id="${subject.id}"><span class="material-symbols-outlined">category</span><span>${escapeHtml(subject.title)}</span><small>Subject</small><span class="material-symbols-outlined drag-mark">drag_indicator</span></div>`).join("")}</div></article>`;
  }).join("") : '<div class="batch-library-empty"><span class="material-symbols-outlined">search_off</span>No reusable content found.</div>';

  byId("batchSelector").innerHTML = batches.map((item) => `<option value="${item.id}">${escapeHtml(item.name)}</option>`).join("");
  if (!batch) return;
  byId("batchSelector").value = batch.id;
  byId("batchTitleInput").value = batch.name;
  byId("batchStatusPill").textContent = batch.status || "Draft";
  byId("batchStatusPill").className = `batch-status-pill is-${String(batch.status || "Draft").toLowerCase()}`;
  const links = batch.courseLinks || [];
  byId("batchDropEmpty").hidden = Boolean(links.length);
  byId("batchLinkedContent").innerHTML = links.map((link) => {
    const source = getNode(link.contentId) || getNode(link.courseId);
    const config = typeOf(source);
    const currentVersion = rootCourseOf(link.courseId)?.version || link.version || 1;
    return `<article class="batch-content-card${link.locked ? " is-locked" : ""}" data-batch-link-id="${link.contentId}"><span class="batch-content-icon material-symbols-outlined" style="--node-color:${source?.color || config.color}">${config.icon}</span><div><small>${escapeHtml(config.label)} · Source v${currentVersion}</small><strong>${escapeHtml(source?.title || link.title)}</strong><em>${link.locked ? `Locked to version ${link.version}` : `Auto-synced · version ${link.version}`}</em></div><button data-batch-link-action="lock" type="button" title="${link.locked ? "Unlock version" : "Lock version"}"><span class="material-symbols-outlined">${link.locked ? "lock" : "lock_open"}</span></button><button data-batch-link-action="remove" type="button" title="Remove from batch"><span class="material-symbols-outlined">close</span></button></article>`;
  }).join("");

  byId("batchTeacherCount").textContent = `${batch.teachers.length} teacher${batch.teachers.length === 1 ? "" : "s"}`;
  byId("batchTeacherList").innerHTML = batch.teachers.map((teacher, index) => `<span class="batch-teacher-chip"><i>${escapeHtml(initials(teacher))}</i><strong>${escapeHtml(teacher)}</strong><button data-remove-batch-teacher="${index}" type="button"><span class="material-symbols-outlined">close</span></button></span>`).join("");
  byId("batchStartDate").value = batch.schedule.startDate || "";
  byId("batchEndDate").value = batch.schedule.endDate || "";
  byId("batchClassTime").value = batch.schedule.classTime || "09:00";
  byId("batchDays").value = batch.schedule.days || "Mon, Wed, Fri";
  renderBatchHistory(batch);
}

function createBatch() {
  const course = rootCourseOf();
  const created = { id: uid(), name: "Untitled Batch", status: "Draft", capacity: "Capacity pending", teachers: [byId("teacherProfileName").textContent || "Teacher"], schedule: { startDate: "", endDate: "", classTime: "09:00", days: "Mon, Wed, Fri" }, courseIds: [], courseLinks: [], history: [] };
  if (course) created.lastViewedCourseId = course.id;
  batches.unshift(created); state.selectedBatchId = created.id;
  recordBatchEvent(created, "Batch created"); scheduleSave("Batch created", true); renderBatches(); byId("batchTitleInput").focus(); byId("batchTitleInput").select();
}

function selectedBatch() { return batches.find((item) => item.id === state.selectedBatchId) || null; }

function recordBatchEvent(batch, label) {
  batch.history = batch.history || [];
  batch.history.unshift({ id: uid(), label, at: now(), snapshot: { name: batch.name, status: batch.status, courseLinks: clone(batch.courseLinks || []), teachers: clone(batch.teachers || []), schedule: clone(batch.schedule || {}) } });
  batch.history = batch.history.slice(0, 12);
}

function renderBatchHistory(batch) {
  byId("batchVersionList").innerHTML = batch.history.length ? batch.history.map((entry, index) => `<article class="batch-history-row"><span></span><div><strong>${escapeHtml(entry.label)}</strong><small>${relativeTime(entry.at)} · ${entry.snapshot.courseLinks.length} items</small></div>${index ? `<button data-restore-batch-version="${entry.id}" type="button">Restore</button>` : "<em>Current</em>"}</article>`).join("") : '<p class="no-links">Batch changes will appear here.</p>';
}

function addContentToBatch(contentId) {
  const batch = selectedBatch(); const content = getNode(contentId); if (!batch || !content || !["course", "subject"].includes(content.type)) return;
  if (batch.courseLinks.some((link) => link.contentId === content.id)) return showToast("info", "Already in this batch", `${content.title} is already linked.`);
  const course = rootCourseOf(content.id); if (!course) return;
  batch.courseLinks.push({ contentId: content.id, contentType: content.type, courseId: course.id, title: content.title, version: course.version || 1, locked: false, syncedAt: now() });
  batch.courseIds = [...new Set(batch.courseLinks.map((link) => link.courseId))];
  recordBatchEvent(batch, `${typeOf(content).label} linked`); scheduleSave("Batch content linked", true); renderBatches(); showToast("success", "Reusable content linked", `${content.title} will stay synced with Content Studio.`);
}

function cloneSelectedBatch() {
  const batch = selectedBatch(); if (!batch) return;
  const copy = clone(batch); copy.id = uid(); copy.name = `${batch.name} — Clone`; copy.status = "Draft"; copy.history = [];
  batches.unshift(copy); state.selectedBatchId = copy.id; recordBatchEvent(copy, "Batch cloned"); scheduleSave("Batch cloned", true); renderBatches(); showToast("success", "Batch cloned", "Schedule and publish the new batch when ready.");
}

function previewStudentBatch() {
  const batch = selectedBatch(); if (!batch) return;
  const links = batch.courseLinks || [];
  byId("studentPreviewContent").innerHTML = `<section class="student-preview-hero"><span>Upcoming batch</span><h2 id="studentPreviewTitle">${escapeHtml(batch.name)}</h2><p>${escapeHtml(batch.schedule.days)} · ${escapeHtml(batch.schedule.classTime || "Time pending")}</p><div><strong>${links.length}</strong> learning tracks <strong>${batch.teachers.length}</strong> teachers</div></section><section class="student-preview-list"><h3>Your learning content</h3>${links.map((link, index) => { const source = getNode(link.contentId) || getNode(link.courseId); return `<article><i>${String(index + 1).padStart(2, "0")}</i><span class="material-symbols-outlined">${typeOf(source).icon}</span><div><small>${typeOf(source).label}</small><strong>${escapeHtml(source?.title || link.title)}</strong></div><em>${link.locked ? `v${link.version}` : "Latest"}</em></article>`; }).join("") || '<p>No content has been added yet.</p>'}</section>`;
  byId("studentPreviewShell").hidden = false;
}

function publishSelectedBatch() {
  const batch = selectedBatch(); if (!batch) return;
  if (!batch.courseLinks.length) return showToast("warning", "Add reusable content", "Drag at least one course or subject into the batch before publishing.");
  if (!batch.teachers.length) return showToast("warning", "Add a teacher", "Assign at least one teacher before publishing.");
  if (!batch.schedule.startDate) return showToast("warning", "Schedule the batch", "Choose a start date before publishing.");
  batch.status = "Published"; recordBatchEvent(batch, "Batch published"); scheduleSave("Batch published", true); renderBatches(); showToast("success", "Batch published", `${batch.name} is now available in the student portal.`);
}

function cloneCourseIntoBatch(courseId) {
  const previousSelection = state.selectedId;
  selectNode(courseId);
  cloneCourse();
  const clonedCourseId = state.selectedId;
  addContentToBatch(clonedCourseId);
  state.selectedId = previousSelection;
}

function resourceTypeConfig(type) { return RESOURCE_TYPES[type] || RESOURCE_TYPES.external; }
function selectedGlobalResource() { return globalResources.find((resource) => resource.id === state.selectedResourceId) || null; }
function formatResourceSize(bytes) { if (!bytes) return "Linked resource"; const units = ["B", "KB", "MB", "GB"]; let value = bytes; let index = 0; while (value >= 1024 && index < units.length - 1) { value /= 1024; index += 1; } return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${units[index]}`; }
function inferResourceType(file) { const extension = file.name.split(".").pop()?.toLowerCase(); if (extension === "pdf") return "pdf"; if (["doc", "docx"].includes(extension)) return "doc"; if (["ppt", "pptx"].includes(extension)) return "ppt"; if (["xls", "xlsx", "csv"].includes(extension)) return "excel"; if (extension === "zip") return "zip"; if (file.type.startsWith("image/")) return "image"; if (file.type.startsWith("video/")) return "video"; return "external"; }

function resourceTargets(type) {
  if (type === "batch") return batches.map((batch) => ({ id: batch.id, title: batch.name }));
  return state.nodes.filter((item) => item.type === type).map((item) => ({ id: item.id, title: item.title }));
}

function resourceTargetTitle(attachment) {
  if (attachment.targetType === "batch") return batches.find((batch) => batch.id === attachment.targetId)?.name || "Deleted batch";
  return getNode(attachment.targetId)?.title || "Deleted content";
}

function renderResourceTargetOptions() {
  const type = byId("resourceTargetType").value || "course";
  const targets = resourceTargets(type);
  byId("resourceTargetId").innerHTML = targets.length ? targets.map((target) => `<option value="${target.id}">${escapeHtml(target.title)}</option>`).join("") : '<option value="">No destinations available</option>';
  byId("attachGlobalResourceButton").disabled = !targets.length || !selectedGlobalResource();
}

function renderGlobalResources() {
  if (!byId("globalResourceList")) return;
  const query = (byId("resourceSearchInput").value || "").trim().toLowerCase();
  const visible = globalResources.filter((resource) => (resourceFilter === "all" || resource.type === resourceFilter) && (!query || `${resource.title} ${resource.description || ""} ${resourceTypeConfig(resource.type).label}`.toLowerCase().includes(query)));
  const attachmentCount = globalResources.reduce((total, resource) => total + (resource.attachments?.length || 0), 0);
  const bytes = globalResources.reduce((total, resource) => total + (resource.size || 0), 0);
  byId("resourceTotalCount").textContent = globalResources.length;
  byId("resourceFilterAllCount").textContent = globalResources.length;
  byId("resourceAttachmentCount").textContent = attachmentCount;
  byId("resourceStorageLabel").textContent = formatResourceSize(bytes).replace("Linked resource", "0 MB");
  byId("resourceResultCount").textContent = `${visible.length} resource${visible.length === 1 ? "" : "s"}`;
  byId("globalResourceList").innerHTML = visible.length ? visible.map((resource) => { const config = resourceTypeConfig(resource.type); return `<button class="global-resource-row${resource.id === state.selectedResourceId ? " is-selected" : ""}" data-global-resource-id="${resource.id}" type="button" style="--resource-color:${config.color}"><span class="resource-row-main"><i class="material-symbols-outlined">${config.icon}</i><span><strong>${escapeHtml(resource.title)}</strong><small>${escapeHtml(resource.fileName || resource.url || "Reusable resource")}</small></span></span><em>${escapeHtml(config.label)}</em><span>${resource.attachments?.length || 0} places</span><time>${relativeTime(resource.updatedAt)}</time><i class="material-symbols-outlined">chevron_right</i></button>`; }).join("") : '<div class="resource-list-empty"><span class="material-symbols-outlined">inventory_2</span><strong>No resources found</strong><small>Add a reusable file or link to get started.</small></div>';
  const resource = selectedGlobalResource();
  byId("resourceDetailEmpty").hidden = Boolean(resource); byId("resourceDetailContent").hidden = !resource;
  if (resource) {
    const config = resourceTypeConfig(resource.type);
    byId("resourceDetailIcon").textContent = config.icon; byId("resourceDetailIcon").style.setProperty("--resource-color", config.color);
    byId("resourceDetailType").textContent = config.label; byId("resourceDetailTitle").textContent = resource.title;
    byId("resourceDetailMeta").textContent = `${formatResourceSize(resource.size)} · Added ${relativeTime(resource.createdAt)}`;
    const attachments = resource.attachments || [];
    byId("resourceUsedCount").textContent = attachments.length;
    byId("resourceUsedList").innerHTML = attachments.length ? attachments.map((attachment, index) => `<article class="resource-used-row"><span class="material-symbols-outlined">${attachment.targetType === "batch" ? "group_work" : typeOf(getNode(attachment.targetId)).icon}</span><div><small>${escapeHtml(attachment.targetType)}</small><strong>${escapeHtml(resourceTargetTitle(attachment))}</strong></div><button data-detach-resource="${index}" type="button" title="Detach"><span class="material-symbols-outlined">link_off</span></button></article>`).join("") : '<p class="no-links">Not attached yet. This file remains safely stored in the library.</p>';
  }
  renderResourceTargetOptions();
}

function setResourceSource(source) {
  resourceSource = source;
  $$("[data-resource-source]", byId("resourceSourceTabs")).forEach((button) => button.classList.toggle("is-active", button.dataset.resourceSource === source));
  byId("resourceFileField").hidden = source !== "upload"; byId("resourceUrlField").hidden = source === "upload";
  byId("globalResourceFile").required = source === "upload"; byId("globalResourceUrl").required = source !== "upload";
  if (source !== "upload") {
    byId("globalResourceType").value = source;
    byId("globalResourceType").disabled = true;
    byId("resourceUrlHint").textContent = source === "google-drive" ? "Paste a shareable Google Drive link." : source === "youtube" ? "Paste a YouTube video or playlist link." : "Paste any accessible external URL.";
  } else { byId("globalResourceType").disabled = false; }
}

function openResourceDialog() { byId("globalResourceForm").reset(); setResourceSource("upload"); byId("resourceDialogShell").hidden = false; byId("globalResourceTitle").focus(); }
function closeResourceDialog() { byId("resourceDialogShell").hidden = true; }

async function saveGlobalResource(event) {
  event.preventDefault();
  const title = byId("globalResourceTitle").value.trim(); const file = byId("globalResourceFile").files?.[0]; const url = byId("globalResourceUrl").value.trim();
  if (!title) return showToast("warning", "Resource title required", "Give this reusable resource a clear name.");
  if (resourceSource === "upload" && !file) return showToast("warning", "Choose a file", "Select a supported file to upload once.");
  if (resourceSource !== "upload" && !validWebUrl(url)) return showToast("warning", "Valid URL required", "Enter a complete HTTP(S) resource link.");
  const id = uid(); const type = resourceSource === "upload" ? (byId("globalResourceType").value || inferResourceType(file)) : resourceSource;
  if (file) {
    try { await storeResourceFile(id, file); } catch (error) { console.error("Resource file storage failed", error); return showToast("error", "File could not be stored", "Your browser did not allow offline file storage."); }
  }
  const resource = { id, title, type, source: resourceSource, url: resourceSource === "upload" ? "" : url, description: byId("globalResourceDescription").value.trim(), fileName: file?.name || "", size: file?.size || 0, mime: file?.type || "", createdAt: now(), updatedAt: now(), attachments: [] };
  globalResources.unshift(resource); state.selectedResourceId = id; closeResourceDialog(); scheduleSave("Resource added", true); renderGlobalResources(); showToast("success", "Resource saved once", "It can now be attached anywhere without uploading again.");
}

function attachSelectedResource() {
  const resource = selectedGlobalResource(); const targetType = byId("resourceTargetType").value; const targetId = byId("resourceTargetId").value; if (!resource || !targetId) return;
  resource.attachments = resource.attachments || [];
  if (resource.attachments.some((item) => item.targetType === targetType && item.targetId === targetId)) return showToast("info", "Already attached", `${resource.title} is already used there.`);
  resource.attachments.push({ targetType, targetId, attachedAt: now() }); resource.updatedAt = now();
  const target = targetType === "batch" ? batches.find((batch) => batch.id === targetId) : getNode(targetId); if (target) target.resourceIds = [...new Set([...(target.resourceIds || []), resource.id])];
  scheduleSave("Resource attached", true); renderGlobalResources(); showToast("success", "Resource attached", "The destination now references the global file.");
}

function detachSelectedResource(index) {
  const resource = selectedGlobalResource(); const attachment = resource?.attachments?.[index]; if (!resource || !attachment) return;
  const target = attachment.targetType === "batch" ? batches.find((batch) => batch.id === attachment.targetId) : getNode(attachment.targetId); if (target) target.resourceIds = (target.resourceIds || []).filter((id) => id !== resource.id);
  resource.attachments.splice(index, 1); resource.updatedAt = now(); scheduleSave("Resource detached", true); renderGlobalResources();
}

async function openSelectedResource() {
  const resource = selectedGlobalResource(); if (!resource) return;
  if (resource.url) return window.open(resource.url, "_blank", "noopener,noreferrer");
  try { const file = await getResourceFile(resource.id); if (!file) throw new Error("File missing"); const objectUrl = URL.createObjectURL(file); window.open(objectUrl, "_blank", "noopener,noreferrer"); setTimeout(() => URL.revokeObjectURL(objectUrl), 60000); } catch { showToast("error", "File unavailable", "The locally stored file could not be opened on this device."); }
}

async function deleteSelectedGlobalResource() {
  const resource = selectedGlobalResource(); if (!resource) return;
  const accepted = await confirmAction("Delete global resource?", `${resource.title} will be detached from ${resource.attachments?.length || 0} destination${resource.attachments?.length === 1 ? "" : "s"}.`); if (!accepted) return;
  (resource.attachments || []).forEach((attachment) => { const target = attachment.targetType === "batch" ? batches.find((batch) => batch.id === attachment.targetId) : getNode(attachment.targetId); if (target) target.resourceIds = (target.resourceIds || []).filter((id) => id !== resource.id); });
  await deleteResourceFile(resource.id); globalResources = globalResources.filter((item) => item.id !== resource.id); state.selectedResourceId = globalResources[0]?.id || null; scheduleSave("Resource deleted", true); renderGlobalResources(); showToast("success", "Resource deleted", "All lightweight attachments were removed.");
}

function closeSidebar() { byId("sidebarDrawer").classList.remove("is-open"); byId("sidebarScrim").classList.remove("is-visible"); }

function bindEvents() {
  $$("[data-sidebar-tab]").forEach((button) => button.addEventListener("click", () => setSection(button.dataset.sidebarTab)));
  byId("sidebarOpenButton").addEventListener("click", () => { byId("sidebarDrawer").classList.add("is-open"); byId("sidebarScrim").classList.add("is-visible"); });
  byId("sidebarToggle").addEventListener("click", closeSidebar); byId("sidebarScrim").addEventListener("click", closeSidebar);
  byId("addCourseButton").addEventListener("click", () => addNode("course"));
  byId("cloneCourseButton").addEventListener("click", cloneCourse);
  $$('[data-create-first]').forEach((button) => button.addEventListener("click", () => addNode("course")));
  byId("addChildButton").addEventListener("click", (event) => showAddMenu(event.currentTarget));
  byId("addChildInlineButton").addEventListener("click", (event) => showAddMenu(event.currentTarget));
  byId("undoButton").addEventListener("click", undo); byId("redoButton").addEventListener("click", redo);
  byId("copyButton").addEventListener("click", copySelected); byId("pasteButton").addEventListener("click", () => pasteClipboard());
  byId("duplicateButton").addEventListener("click", duplicateSelected); byId("deleteButton").addEventListener("click", deleteSelected);
  byId("collapseAllButton").addEventListener("click", () => { pushUndo(); state.nodes.forEach((item) => { item.expanded = false; }); scheduleSave("Collapsed"); renderTree(); });
  refs.search.addEventListener("input", () => { state.search = refs.search.value; refs.treeViewport.scrollTop = 0; renderTree(); });
  byId("contentFilter").addEventListener("click", (event) => { const button = event.target.closest("[data-content-filter]"); if (!button) return; state.contentFilter = button.dataset.contentFilter; $$("[data-content-filter]", byId("contentFilter")).forEach((item) => item.classList.toggle("is-active", item === button)); refs.treeViewport.scrollTop = 0; scheduleSave("View updated"); renderTree(); });
  byId("previewDeviceControls").addEventListener("click", (event) => { const button = event.target.closest("[data-preview-device]"); if (!button) return; state.previewDevice = button.dataset.previewDevice; scheduleSave("Preview device changed"); renderStudentPreview(); });
  byId("previewThemeControls").addEventListener("click", (event) => { const button = event.target.closest("[data-preview-theme]"); if (!button) return; state.previewTheme = button.dataset.previewTheme; scheduleSave("Preview theme changed"); renderStudentPreview(); });
  refs.treeViewport.addEventListener("scroll", renderTree, { passive: true });

  refs.treeCanvas.addEventListener("click", (event) => {
    if (event.target.closest(".tree-rename-input")) return;
    const row = event.target.closest(".tree-row"); if (!row) return;
    const item = getNode(row.dataset.nodeId); const action = event.target.closest("[data-tree-action]")?.dataset.treeAction;
    if (action === "toggle") { item.expanded = !item.expanded; scheduleSave("View updated"); renderTree(); return; }
    if (action === "menu") { showContextMenu(event.clientX, event.clientY, item.id); return; }
    selectNode(item.id);
  });
  refs.treeCanvas.addEventListener("dblclick", (event) => { const row = event.target.closest(".tree-row"); if (row) beginRename(row.dataset.nodeId); });
  refs.treeCanvas.addEventListener("contextmenu", (event) => { const row = event.target.closest(".tree-row"); if (!row) return; event.preventDefault(); showContextMenu(event.clientX, event.clientY, row.dataset.nodeId); });
  refs.treeCanvas.addEventListener("keydown", (event) => { if (!event.target.matches(".tree-rename-input")) return; if (event.key === "Enter") finishRename(true); if (event.key === "Escape") finishRename(false); });
  refs.treeCanvas.addEventListener("focusout", (event) => { if (event.target.matches(".tree-rename-input")) setTimeout(() => { if (state.renamingId) finishRename(true); }, 0); });
  refs.treeCanvas.addEventListener("dragstart", (event) => { const row = event.target.closest(".tree-row"); if (!row) return; draggedId = row.dataset.nodeId; event.dataTransfer.effectAllowed = "move"; event.dataTransfer.setData("text/plain", draggedId); requestAnimationFrame(renderTree); });
  refs.treeCanvas.addEventListener("dragover", (event) => { const row = event.target.closest(".tree-row"); if (!row || row.dataset.nodeId === draggedId) return; event.preventDefault(); $$(".is-drop-target", refs.treeCanvas).forEach((item) => item.classList.remove("is-drop-target")); row.classList.add("is-drop-target"); });
  refs.treeCanvas.addEventListener("drop", (event) => { event.preventDefault(); const row = event.target.closest(".tree-row"); if (row) moveNode(draggedId, row.dataset.nodeId); draggedId = null; });
  refs.treeCanvas.addEventListener("dragend", () => { draggedId = null; renderTree(); });

  document.addEventListener("click", (event) => {
    if (!event.target.closest("#contextMenu") && !event.target.closest(".tree-more")) refs.contextMenu.hidden = true;
    if (!event.target.closest("#addMenu") && !event.target.closest("#addChildButton") && !event.target.closest("#addChildInlineButton")) refs.addMenu.hidden = true;
    const select = event.target.closest("[data-select-id]"); if (select) selectNode(select.dataset.selectId);
    if (event.target.closest("[data-add-inline]")) showAddMenu(event.target.closest("[data-add-inline]"));
  });
  refs.addMenu.addEventListener("click", (event) => { const button = event.target.closest("[data-add-type]"); if (!button) return; addNode(button.dataset.addType, state.selectedId); refs.addMenu.hidden = true; });
  refs.contextMenu.addEventListener("click", (event) => { const action = event.target.closest("[data-context-action]")?.dataset.contextAction; if (!action) return; refs.contextMenu.hidden = true; ({ add: () => showAddMenu(byId("addChildButton")), rename: () => beginRename(), duplicate: duplicateSelected, copy: copySelected, paste: () => pasteClipboard(), delete: deleteSelected })[action]?.(); });

  const textBindings = [[refs.title, "title"], [refs.description, "description"], [refs.duration, "duration"], [refs.owner, "owner"], [refs.notes, "notes"], [refs.thumbnail, "thumbnail"], [refs.contentUrl, "url"]];
  textBindings.forEach(([input, key]) => { input.addEventListener("focus", startFieldEdit); input.addEventListener("input", () => updateSelected({ [key]: input.value })); input.addEventListener("change", () => { finishFieldEdit(`${key[0].toUpperCase() + key.slice(1)} updated`); renderEditor(); }); });
  [[refs.status, "status"], [refs.date, "date"], [refs.iconInput, "icon"], [refs.visible, "visible"], [refs.preview, "preview"]].forEach(([input, key]) => input.addEventListener("change", () => { pushUndo(); updateSelected({ [key]: input.type === "checkbox" ? input.checked : input.value }, `${key} updated`); renderEditor(); }));
  refs.template.addEventListener("change", () => { const course = rootCourseOf(); if (!course) return; pushUndo(); course.isTemplate = refs.template.checked; course.updatedAt = now(); scheduleSave(course.isTemplate ? "Template created" : "Template removed", true); renderAll(); showToast("success", course.isTemplate ? "Template ready" : "Template removed", course.isTemplate ? "This reusable course is now available as a template." : "The course remains available in Content Studio."); });
  refs.linkedBatchList.addEventListener("click", (event) => { const button = event.target.closest("[data-toggle-batch-lock]"); if (!button) return; const course = rootCourseOf(); const batch = batches.find((item) => item.id === button.dataset.toggleBatchLock); const link = batch?.courseLinks?.find((item) => item.courseId === course?.id); if (!link || !course) return; link.locked = !link.locked; if (!link.locked) { link.version = course.version || 1; link.syncedAt = now(); } scheduleSave(link.locked ? "Batch version locked" : "Batch auto-sync enabled", true); renderReuseState(getNode()); renderBatches(); showToast("success", link.locked ? "Version locked" : "Automatic updates enabled", link.locked ? `${batch.name} will stay on version ${link.version}.` : `${batch.name} now receives reusable course updates.`); });
  byId("colorOptions").addEventListener("click", (event) => { const button = event.target.closest("[data-color]"); if (!button) return; pushUndo(); updateSelected({ color: button.dataset.color }, "Appearance updated"); renderEditor(); });
  byId("canvasMoreButton").addEventListener("click", (event) => { const rect = event.currentTarget.getBoundingClientRect(); showContextMenu(rect.right - 210, rect.bottom + 6, state.selectedId); });
  byId("explorerMenuButton").addEventListener("click", () => { state.nodes.forEach((item) => { item.expanded = true; }); renderTree(); });
  byId("versionHistoryButton").addEventListener("click", openHistory); byId("closeHistoryButton").addEventListener("click", closeHistory); refs.drawerScrim.addEventListener("click", closeHistory);
  refs.historyList.addEventListener("click", (event) => { const button = event.target.closest("[data-restore-version]"); if (!button) return; const version = versions.find((item) => item.id === button.dataset.restoreVersion); if (!version) return; pushUndo(); restoreSnapshot(version, "Version restored"); closeHistory(); showToast("success", "Version restored", "The previous curriculum is now active."); });
  byId("publishButton").addEventListener("click", openCourseValidation);
  byId("confirmCoursePublishButton").addEventListener("click", completeCoursePublish);
  $$('[data-close-validation]').forEach((button) => button.addEventListener("click", closeCourseValidation));
  refs.checklist.addEventListener("click", (event) => { const button = event.target.closest("[data-fix-validation]"); if (!button) return; const nodeId = button.dataset.validationNode; const key = button.dataset.fixValidation; closeCourseValidation(); selectNode(nodeId); setTimeout(() => { if (key === "thumbnail") refs.thumbnail.focus(); else if (key === "description") refs.description.focus(); else if (key.includes("links")) refs.contentUrl.focus(); else byId("addChildButton").focus(); }, 0); showToast("info", "Fix this requirement", `The relevant ${typeOf(getNode()).label.toLowerCase()} is selected.`); });
  byId("confirmCancelButton").addEventListener("click", () => closeConfirm(false)); byId("confirmAcceptButton").addEventListener("click", () => closeConfirm(true)); $$('[data-confirm-close]').forEach((item) => item.addEventListener("click", () => closeConfirm(false)));
  byId("closeInspectorButton").addEventListener("click", () => byId("visualBuilder").classList.toggle("inspector-collapsed"));
  byId("addBatchButton").addEventListener("click", createBatch);
  byId("cloneBatchButton").addEventListener("click", cloneSelectedBatch);
  byId("batchHistoryButton").addEventListener("click", () => { const panel = byId("batchVersionPanel"); panel.hidden = !panel.hidden; });
  byId("previewBatchButton").addEventListener("click", previewStudentBatch);
  byId("publishBatchButton").addEventListener("click", publishSelectedBatch);
  $$('[data-close-student-preview]').forEach((button) => button.addEventListener("click", () => { byId("studentPreviewShell").hidden = true; }));
  byId("batchLibrarySearch").addEventListener("input", renderBatches);
  byId("batchSelector").addEventListener("change", () => { state.selectedBatchId = byId("batchSelector").value; scheduleSave("Batch selected"); renderBatches(); });
  byId("batchTitleInput").addEventListener("change", () => { const batch = selectedBatch(); const title = byId("batchTitleInput").value.trim(); if (!batch || !title || title === batch.name) return renderBatches(); batch.name = title; recordBatchEvent(batch, "Batch renamed"); scheduleSave("Batch renamed", true); renderBatches(); });
  byId("batchContentLibrary").addEventListener("dragstart", (event) => { const item = event.target.closest("[data-batch-library-id]"); if (!item) return; batchDraggedContentId = item.dataset.batchLibraryId; event.dataTransfer.effectAllowed = "copy"; event.dataTransfer.setData("text/plain", batchDraggedContentId); byId("batchDropZone").classList.add("is-drag-ready"); });
  byId("batchContentLibrary").addEventListener("dragend", () => { batchDraggedContentId = null; byId("batchDropZone").classList.remove("is-drag-ready", "is-drag-over"); });
  byId("batchContentLibrary").addEventListener("click", (event) => { const cloneButton = event.target.closest("[data-clone-library-course]"); if (cloneButton) cloneCourseIntoBatch(cloneButton.dataset.cloneLibraryCourse); });
  byId("batchDropZone").addEventListener("dragover", (event) => { event.preventDefault(); event.dataTransfer.dropEffect = "copy"; byId("batchDropZone").classList.add("is-drag-over"); });
  byId("batchDropZone").addEventListener("dragleave", (event) => { if (!byId("batchDropZone").contains(event.relatedTarget)) byId("batchDropZone").classList.remove("is-drag-over"); });
  byId("batchDropZone").addEventListener("drop", (event) => { event.preventDefault(); const contentId = event.dataTransfer.getData("text/plain") || batchDraggedContentId; byId("batchDropZone").classList.remove("is-drag-ready", "is-drag-over"); addContentToBatch(contentId); batchDraggedContentId = null; });
  byId("batchLinkedContent").addEventListener("click", (event) => { const button = event.target.closest("[data-batch-link-action]"); const card = event.target.closest("[data-batch-link-id]"); const batch = selectedBatch(); if (!button || !card || !batch) return; const link = batch.courseLinks.find((item) => item.contentId === card.dataset.batchLinkId); if (!link) return; if (button.dataset.batchLinkAction === "remove") { batch.courseLinks = batch.courseLinks.filter((item) => item !== link); batch.courseIds = [...new Set(batch.courseLinks.map((item) => item.courseId))]; recordBatchEvent(batch, "Content removed"); } else { link.locked = !link.locked; if (!link.locked) link.version = rootCourseOf(link.courseId)?.version || link.version; recordBatchEvent(batch, link.locked ? "Content version locked" : "Content auto-sync enabled"); } scheduleSave("Batch updated", true); renderBatches(); });
  byId("addBatchTeacherButton").addEventListener("click", () => { const batch = selectedBatch(); const input = byId("batchTeacherInput"); const teacher = input.value.trim(); if (!batch || !teacher) return; if (batch.teachers.some((item) => item.toLowerCase() === teacher.toLowerCase())) return showToast("info", "Teacher already assigned", teacher); batch.teachers.push(teacher); input.value = ""; recordBatchEvent(batch, "Teacher assigned"); scheduleSave("Teacher assigned", true); renderBatches(); });
  byId("batchTeacherInput").addEventListener("keydown", (event) => { if (event.key === "Enter") { event.preventDefault(); byId("addBatchTeacherButton").click(); } });
  byId("batchTeacherList").addEventListener("click", (event) => { const button = event.target.closest("[data-remove-batch-teacher]"); const batch = selectedBatch(); if (!button || !batch) return; batch.teachers.splice(Number(button.dataset.removeBatchTeacher), 1); recordBatchEvent(batch, "Teacher removed"); scheduleSave("Teacher removed", true); renderBatches(); });
  [["batchStartDate", "startDate"], ["batchEndDate", "endDate"], ["batchClassTime", "classTime"], ["batchDays", "days"]].forEach(([id, key]) => byId(id).addEventListener("change", () => { const batch = selectedBatch(); if (!batch) return; batch.schedule[key] = byId(id).value; recordBatchEvent(batch, "Schedule updated"); scheduleSave("Batch scheduled", true); renderBatches(); }));
  byId("batchVersionList").addEventListener("click", (event) => { const button = event.target.closest("[data-restore-batch-version]"); const batch = selectedBatch(); const entry = batch?.history.find((item) => item.id === button?.dataset.restoreBatchVersion); if (!entry) return; const restored = clone(entry.snapshot); batch.name = restored.name; batch.status = restored.status; batch.courseLinks = restored.courseLinks; batch.teachers = restored.teachers; batch.schedule = restored.schedule; recordBatchEvent(batch, "Version restored"); scheduleSave("Batch version restored", true); renderBatches(); showToast("success", "Batch version restored", "The selected batch configuration is active again."); });
  byId("addGlobalResourceButton").addEventListener("click", openResourceDialog);
  $$('[data-close-resource-dialog]').forEach((button) => button.addEventListener("click", closeResourceDialog));
  byId("resourceSourceTabs").addEventListener("click", (event) => { const button = event.target.closest("[data-resource-source]"); if (button) setResourceSource(button.dataset.resourceSource); });
  byId("globalResourceFile").addEventListener("change", () => { const file = byId("globalResourceFile").files?.[0]; if (!file) return; byId("globalResourceType").value = inferResourceType(file); if (!byId("globalResourceTitle").value.trim()) byId("globalResourceTitle").value = file.name.replace(/\.[^.]+$/, ""); });
  byId("globalResourceForm").addEventListener("submit", saveGlobalResource);
  byId("resourceTypeFilters").addEventListener("click", (event) => { const button = event.target.closest("[data-resource-filter]"); if (!button) return; resourceFilter = button.dataset.resourceFilter; $$("[data-resource-filter]", byId("resourceTypeFilters")).forEach((item) => item.classList.toggle("is-active", item === button)); renderGlobalResources(); });
  byId("resourceSearchInput").addEventListener("input", renderGlobalResources);
  byId("globalResourceList").addEventListener("click", (event) => { const row = event.target.closest("[data-global-resource-id]"); if (!row) return; state.selectedResourceId = row.dataset.globalResourceId; scheduleSave("Resource selected"); renderGlobalResources(); });
  byId("resourceTargetType").addEventListener("change", renderResourceTargetOptions);
  byId("attachGlobalResourceButton").addEventListener("click", attachSelectedResource);
  byId("resourceUsedList").addEventListener("click", (event) => { const button = event.target.closest("[data-detach-resource]"); if (button) detachSelectedResource(Number(button.dataset.detachResource)); });
  byId("openGlobalResourceButton").addEventListener("click", openSelectedResource);
  byId("deleteGlobalResourceButton").addEventListener("click", deleteSelectedGlobalResource);

  document.addEventListener("keydown", (event) => {
    const typing = event.target.matches("input, textarea, select"); const command = event.ctrlKey || event.metaKey;
    if (command && event.key.toLowerCase() === "k") { event.preventDefault(); refs.search.focus(); }
    if (typing && event.key !== "Escape") return;
    if (command && event.key.toLowerCase() === "z") { event.preventDefault(); event.shiftKey ? redo() : undo(); }
    else if (command && event.key.toLowerCase() === "y") { event.preventDefault(); redo(); }
    else if (command && event.key.toLowerCase() === "c") { event.preventDefault(); copySelected(); }
    else if (command && event.key.toLowerCase() === "v") { event.preventDefault(); pasteClipboard(); }
    else if (command && event.key.toLowerCase() === "d") { event.preventDefault(); duplicateSelected(); }
    else if (event.key === "Delete" || event.key === "Backspace") { event.preventDefault(); deleteSelected(); }
    else if (event.key === "F2") { event.preventDefault(); beginRename(); }
    else if (event.key === "Escape") { closeFloatingMenus(); closeHistory(); closeCourseValidation(); closeResourceDialog(); }
  });
  window.addEventListener("resize", () => { closeFloatingMenus(); renderTree(); });
}

function loadTeacherSession() {
  let user = null; try { user = JSON.parse(localStorage.getItem(CURRENT_USER_KEY)); } catch { user = null; }
  const name = user?.name || "Teacher"; const email = user?.email || "teacher@eduverse.demo";
  byId("teacherProfileName").textContent = name; byId("teacherProfileMeta").textContent = email;
  byId("teacherInitials").textContent = name.split(" ").filter(Boolean).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  byId("welcomeGreeting").textContent = `Welcome back, ${name.split(" ")[0]}`;
  byId("welcomeDate").textContent = new Date().toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });
  byId("teacherLogoutButton").addEventListener("click", () => { localStorage.removeItem(CURRENT_USER_KEY); location.href = LOGIN_URL; });
}

rebuildIndexes();
ensureBatchLinks();
loadTeacherSession();
bindEvents();
$$('[data-content-filter]').forEach((button) => button.classList.toggle("is-active", button.dataset.contentFilter === (state.contentFilter || "all")));
renderBatches();
renderGlobalResources();
setSection(state.activeSection || "courses");
renderAll();
persist("Loaded");
