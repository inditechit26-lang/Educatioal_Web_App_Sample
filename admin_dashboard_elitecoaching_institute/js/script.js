const pages = {
  dashboard: ["Institute Dashboard", "Monitor institute activity, pending approvals, people, collections, and operational health."],
  teachers: ["Teacher Management", "Manage faculty, workload, assigned subjects, assigned batches, and performance."],
  students: ["Student Management", "Manage admissions, enrollment, attendance, progress, payment status, and bulk operations."],
  approvals: ["Content Approval", "Review teacher-submitted courses and batches before publishing them to students."],
  batches: ["Batch Management", "Create, assign, approve, clone, and monitor batch delivery across the institute."],
  attendance: ["Attendance", "Track student, teacher, and live class attendance with operational alerts."],
  payments: ["Fees & Payments", "Manage invoices, receipts, pending dues, discounts, refunds, and collection health."],
  certificates: ["Certificates", "Issue, approve, verify, and track institute certificates and completion credentials."],
  reports: ["Reports", "Generate institute, teacher, student, batch, revenue, and completion reports."],
  communication: ["Communication", "Send announcements to the entire institute or to targeted courses, batches, and people."],
  settings: ["Institute Settings", "Configure branding, roles, permissions, academic year, integrations, and institute rules."],
  profile: ["Admin Profile", "Review your account, permissions, recent actions, and administrative activity logs."],
};

const content = document.getElementById("pageContent");
const pageTitle = document.getElementById("pageTitle");
const breadcrumb = document.getElementById("breadcrumb");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebarOverlay");
const palette = document.getElementById("commandPalette");
const commandInput = document.getElementById("commandInput");
const commandResults = document.getElementById("commandResults");
const globalSearch = document.getElementById("globalSearch");
const quickCreateButton = document.getElementById("quickCreateButton");

const iconButton = (icon, title = "Action") => `<button title="${title}"><span class="material-symbols-outlined">${icon}</span></button>`;
const button = (icon, label, primary = false) => `<button class="button ${primary ? "primary" : ""}" data-action="${label}"><span class="material-symbols-outlined">${icon}</span>${label}</button>`;
const status = (text, type = "success") => `<span class="status ${type}">${text}</span>`;
const person = (initials, name, detail) => `<div class="person"><span class="avatar">${initials}</span><span><strong>${name}</strong><small>${detail}</small></span></div>`;
const actions = () => `<div class="row-actions">${iconButton("visibility", "View")}${iconButton("edit", "Edit")}${iconButton("more_horiz", "More")}</div>`;
const pageHead = (title, subtitle, action = "Add New", icon = "add") => `<div class="page-head"><div><h2>${title}</h2><p>${subtitle}</p></div><div class="head-actions">${button("download", "Export")}${button(icon, action, true)}</div></div>`;
const metric = (icon, value, label, trend, color = "#3b5dfd", tint = "#eff4ff", down = false) => `<article class="metric-card" style="--accent:${color};--tint:${tint};--glow:${tint}"><div class="metric-top"><span class="metric-icon"><span class="material-symbols-outlined">${icon}</span></span><span class="trend ${down ? "down" : ""}">${trend}</span></div><h3>${value}</h3><p>${label}</p></article>`;
const activity = (icon, title, detail, time) => `<div class="activity-item"><span class="activity-icon"><span class="material-symbols-outlined">${icon}</span></span><div><strong>${title}</strong><p>${detail}</p></div><time>${time}</time></div>`;
const tableCard = (title, headers, rows, filter = "All Status") => `<section class="card table-card"><div class="table-toolbar"><div><strong>${title}</strong><p class="card-subtitle">Updated just now</p></div><div class="filter-row"><label class="mini-search"><span class="material-symbols-outlined">search</span><input placeholder="Search records..." /></label><select class="select"><option>${filter}</option><option>Active</option><option>Pending</option><option>Needs Review</option></select></div></div><div class="table-wrap"><table><thead><tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead><tbody>${rows.join("")}</tbody></table></div></section>`;

function dashboardPage() {
  const approvalRows = [
    `<tr><td>${person("KS", "Kavya Singh", "Physics Teacher")}</td><td>Physics Class 11</td><td>Course Approval</td><td>Today, 09:20 AM</td><td>${status("Pending Review", "warning")}</td><td>${actions()}</td></tr>`,
    `<tr><td>${person("RM", "Rohan Mehta", "Chemistry Teacher")}</td><td>NEET 2027 Evening Batch</td><td>Batch Approval</td><td>Today, 08:10 AM</td><td>${status("Pending Review", "warning")}</td><td>${actions()}</td></tr>`,
    `<tr><td>${person("SP", "Sneha Patel", "Biology Teacher")}</td><td>Human Physiology Sprint</td><td>Course Update</td><td>Yesterday</td><td>${status("Changes Requested", "info")}</td><td>${actions()}</td></tr>`,
    `<tr><td>${person("AD", "Academic Desk", "Institute Ops")}</td><td>Certificate Request - JEE Toppers</td><td>Certificate Approval</td><td>Yesterday</td><td>${status("Pending Review", "warning")}</td><td>${actions()}</td></tr>`,
  ];

  return `${pageHead("Good morning, Aakash", "This dashboard answers what is happening inside the institute today.", "Open Approval Queue", "approval")}
  <section class="metric-grid">
    ${metric("groups", "3,248", "Total Students", "+186 this month")}
    ${metric("person_check", "2,982", "Active Students", "91.8% active", "#16a34a", "#dcfce7")}
    ${metric("co_present", "128", "Teachers", "12 need review", "#7c5cff", "#f1eaff")}
    ${metric("menu_book", "42", "Courses", "8 pending approval", "#0891b2", "#e0f2fe")}
    ${metric("group_work", "36", "Batches", "4 pending publish", "#f59e0b", "#fef3c7")}
    ${metric("live_tv", "14", "Live Classes Today", "5 starting soon")}
    ${metric("assignment", "28", "Assignments Pending", "Teacher review")}
    ${metric("payments", "Rs. 8.6L", "Payments Due", "184 dues", "#dc2626", "#fee2e2", true)}
  </section>
  <div class="dashboard-grid">
    <section class="card">
      <div class="card-head"><div><h3>Today's Activities</h3><p>What the institute team should focus on next</p></div>${status("Live", "info")}</div>
      <div class="activity-list">
        ${activity("live_tv", "12 live classes scheduled", "Physics, Chemistry, Biology, Mathematics, and Foundation lectures running today.", "09:00")}
        ${activity("event_busy", "2 teacher leave requests", "One substitute required for the evening NEET batch.", "09:30")}
        ${activity("person_add", "18 new student admissions", "Admissions team completed registration and batch allocation.", "10:00")}
        ${activity("approval", "8 course approvals pending", "Teacher submissions are waiting for admin preview and decision.", "Now")}
        ${activity("quiz", "3 upcoming tests", "JEE Mock 08, NEET Weekly Drill, Foundation Checkpoint.", "2:00 PM")}
      </div>
    </section>
    <section class="card quick-card">
      <div class="card-head"><div><h3>Quick Actions</h3><p>Institute operations with the highest frequency</p></div><span class="material-symbols-outlined">bolt</span></div>
      <div class="quick-actions">
        ${button("person_add", "Add Teacher")}
        ${button("group_add", "Add Student")}
        ${button("groups", "Create Batch")}
        ${button("approval", "Approve Course")}
        ${button("campaign", "Send Announcement")}
        ${button("workspace_premium", "Generate Certificate")}
      </div>
    </section>
  </div>
  <div class="split-charts">
    <section class="card">
      <div class="card-head"><div><h3>Pending Approvals</h3><p>Approvals that block teacher publishing and student visibility</p></div><button class="button" data-open-page="approvals">Open Queue</button></div>
      <div class="activity-list">
        ${activity("menu_book", "Courses waiting for approval", "8 reusable library courses submitted by teachers.", "High")}
        ${activity("groups", "Batches waiting for approval", "4 batch drafts ready for admin review.", "Medium")}
        ${activity("badge", "Teacher registration checks", "3 faculty onboarding requests pending document verification.", "Medium")}
        ${activity("workspace_premium", "Certificate requests", "12 student certificate issues pending approval.", "Low")}
      </div>
    </section>
    <section class="card">
      <div class="card-head"><div><h3>Institute Health</h3><p>Operational gaps that need admin attention</p></div>${status("Healthy", "success")}</div>
      <div class="activity-list">
        ${activity("warning", "Courses without faculty", "2 courses are published but missing an assigned lead teacher.", "Action")}
        ${activity("schedule", "Expired batches", "3 archived batches should be cleaned up from active scheduling.", "Action")}
        ${activity("person_off", "Inactive students", "41 enrolled students have not opened the LMS in 7 days.", "Alert")}
        ${activity("cloud", "Storage usage", "74% of institute storage allocated across notes, videos, and certificates.", "Review")}
      </div>
    </section>
  </div>
  ${tableCard("Approval Queue Snapshot", ["Requester", "Item", "Approval Type", "Submitted", "Status", "Actions"], approvalRows, "Pending Review")}`;
}

function teachersPage() {
  const rows = [
    ["T-104", person("KS", "Kavya Singh", "Physics | 8 years"), "Physics, Mechanics, Thermodynamics", "JEE Morning, NEET Evening", "4 courses", "92%", status("Active"), actions()],
    ["T-118", person("RM", "Rohan Mehta", "Chemistry | 11 years"), "Organic, Physical Chemistry", "JEE Morning", "3 courses", "88%", status("Active"), actions()],
    ["T-123", person("SP", "Sneha Patel", "Biology | 9 years"), "Biology, Botany, Zoology", "NEET Prime", "5 courses", "95%", status("Top Performer", "success"), actions()],
    ["T-131", person("AS", "Amit Sharma", "Mathematics | 7 years"), "Calculus, Algebra", "JEE Weekend", "2 courses", "81%", status("Overloaded", "warning"), actions()],
  ].map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`);

  return `${pageHead("Teacher Management", "Admin controls teacher onboarding, assignment, workload, performance, and lifecycle states.", "Add Teacher", "person_add")}
  <section class="metric-grid">
    ${metric("co_present", "128", "Teachers", "+6 new this quarter")}
    ${metric("menu_book", "42", "Assigned Courses", "Admin controlled")}
    ${metric("groups", "36", "Assigned Batches", "8 require balancing")}
    ${metric("trending_up", "4.8", "Average Faculty Rating", "Student feedback")}
  </section>
  ${tableCard("Teacher Directory", ["Teacher ID", "Teacher", "Subjects", "Assigned Batches", "Assigned Courses", "Performance", "Status", "Actions"], rows, "All Teachers")}
  <section class="feature-grid" style="margin-top:18px">
    <article class="card feature-card"><span class="material-symbols-outlined">badge</span><h3>Teacher Profile</h3><p>Photo, experience, qualification, subjects, courses, batches, attendance, login history, and storage usage.</p>${button("visibility", "Open Profile")}</article>
    <article class="card feature-card"><span class="material-symbols-outlined">conversion_path</span><h3>Workload Balancer</h3><p>Detect overloaded faculty and redistribute batches before student delivery is affected.</p>${button("tune", "Balance Workload")}</article>
    <article class="card feature-card"><span class="material-symbols-outlined">rule_settings</span><h3>Assign Subjects & Batches</h3><p>Control who teaches what, who reviews content, and who owns each institute batch.</p>${button("edit", "Manage Assignments")}</article>
  </section>`;
}

function studentsPage() {
  const rows = [
    ["ST-24091", person("AS", "Aarav Sharma", "JEE 2027 | Active"), "JEE Morning", "Physics, Chemistry, Mathematics", "91%", status("Paid"), status("Active"), actions()],
    ["ST-24090", person("MK", "Meera Kapoor", "NEET 2027 | Active"), "NEET Prime", "Biology, Chemistry, Physics", "87%", status("Due", "warning"), status("At Risk", "warning"), actions()],
    ["ST-24089", person("RV", "Rohan Verma", "Foundation | Active"), "Foundation Batch", "Science, Maths", "78%", status("Partial", "info"), status("Active"), actions()],
    ["ST-24088", person("IA", "Ishita Anand", "JEE Weekend | Inactive"), "JEE Weekend", "Mathematics, Physics", "69%", status("Overdue", "danger"), status("Inactive", "danger"), actions()],
  ].map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`);

  return `${pageHead("Student Management", "Manage student lifecycle, enrollment, progress, attendance, fee state, and bulk operations.", "Add Student", "person_add")}
  <section class="metric-grid">
    ${metric("groups", "3,248", "Total Students", "+186 this month")}
    ${metric("upload_file", "1", "Bulk Import Wizard", "Ready to run", "#7c5cff", "#f1eaff")}
    ${metric("mail", "3,248", "Login Credentials", "Email + SMS supported", "#0891b2", "#e0f2fe")}
    ${metric("fact_check", "86.4%", "Attendance Average", "Operational KPI")}
  </section>
  ${tableCard("Student Directory", ["Student ID", "Student", "Batch", "Courses", "Attendance", "Payment", "Status", "Actions"], rows, "All Students")}
  <section class="feature-grid" style="margin-top:18px">
    <article class="card feature-card"><span class="material-symbols-outlined">upload_file</span><h3>Bulk Import Wizard</h3><p>Upload Excel, preview records, validate, import, generate credentials, and send SMS/email in one flow.</p>${button("arrow_forward", "Open Wizard")}</article>
    <article class="card feature-card"><span class="material-symbols-outlined">lock_reset</span><h3>Reset Password</h3><p>Admin can regenerate student access quickly without involving teachers or content teams.</p>${button("vpn_key", "Reset Access")}</article>
    <article class="card feature-card"><span class="material-symbols-outlined">monitoring</span><h3>Student Progress</h3><p>Track academic progress, attendance, course completion, and payment status from one profile.</p>${button("visibility", "View Progress")}</article>
  </section>`;
}

function approvalsPage() {
  const rows = [
    ["APP-301", person("KS", "Kavya Singh", "Teacher"), "Physics Class 11", "Course Approval", "Teacher created course and submitted for review", status("Pending Review", "warning"), actions()],
    ["APP-302", person("RM", "Rohan Mehta", "Teacher"), "NEET 2027 Evening Batch", "Batch Approval", "Batch created and submitted with assigned reusable courses", status("Pending Review", "warning"), actions()],
    ["APP-303", person("SP", "Sneha Patel", "Teacher"), "Biology Revision Sprint", "Request Changes", "Admin asked for stronger DPP and notes structure", status("Changes Requested", "info"), actions()],
    ["APP-304", person("AD", "Academic Desk", "Ops"), "Certificate Issue - JEE Topper", "Certificate Approval", "Certificate PDF and QR verification pending", status("Pending Review", "warning"), actions()],
  ].map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`);

  return `${pageHead("Content Approval", "Admin reviews teacher-created courses and batches before they are published to students.", "Approve Next", "approval")}
  <section class="metric-grid">
    ${metric("approval", "12", "Pending Approvals", "Needs review")}
    ${metric("menu_book", "8", "Courses Waiting", "Teacher submissions")}
    ${metric("groups", "4", "Batches Waiting", "Publish blockers")}
    ${metric("notifications_active", "6", "Admin Alerts", "Approval notifications")}
  </section>
  <div class="dashboard-grid">
    <section class="card">
      <div class="card-head"><div><h3>Approval Workflow</h3><p>How teacher-created content reaches students</p></div>${status("Automated", "info")}</div>
      <div class="activity-list">
        ${activity("edit_note", "Teacher creates course", "Teacher owns lectures, notes, DPPs, assignments, and structure.", "Step 1")}
        ${activity("send", "Teacher submits for approval", "Content enters Pending Review instead of publishing immediately.", "Step 2")}
        ${activity("notifications", "Admin receives notification", "Institute admin reviews course preview and operational readiness.", "Step 3")}
        ${activity("preview", "Preview + decision", "Approve, Reject, or Request Changes with review notes.", "Step 4")}
        ${activity("publish", "Course published", "Automatically becomes visible in Student -> Explore Courses.", "Step 5")}
      </div>
    </section>
    <section class="card">
      <div class="card-head"><div><h3>Review Controls</h3><p>What admin controls before publishing</p></div></div>
      <div class="activity-list">
        ${activity("account_tree", "Course structure", "Verify subject, chapter, lecture, notes, DPP, and assignment coverage.", "Preview")}
        ${activity("groups", "Batch readiness", "Confirm assigned teacher, assigned course, student capacity, and schedule.", "Preview")}
        ${activity("rule_settings", "Request changes", "Return content to teacher with a structured review note.", "Action")}
        ${activity("public", "Student visibility", "Only approved items can be published to the student Explore experience.", "Control")}
      </div>
    </section>
  </div>
  ${tableCard("Approval Queue", ["Approval ID", "Submitted By", "Item", "Type", "Review Notes", "Status", "Actions"], rows, "Pending Review")}`;
}

function batchesPage() {
  const rows = [
    ["BAT-101", "JEE 2027 Morning Batch", "JEE", "3 teachers", "186 students", "Physics, Chemistry, Maths", status("Published"), actions()],
    ["BAT-102", "NEET 2027 Prime Batch", "NEET", "4 teachers", "214 students", "Biology, Chemistry, Physics", status("Pending Approval", "warning"), actions()],
    ["BAT-103", "Foundation Evening", "Foundation", "2 teachers", "122 students", "Science, Maths", status("Draft", "info"), actions()],
    ["BAT-104", "JEE Weekend", "JEE", "2 teachers", "98 students", "Maths, Physics", status("Archived", "danger"), actions()],
  ].map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`);

  return `${pageHead("Batch Management", "Admin owns batch creation, assignment, scheduling, approval, cloning, and lifecycle control.", "Create Batch", "groups")}
  <section class="metric-grid">
    ${metric("groups", "36", "Active Batches", "+4 this quarter")}
    ${metric("school", "3,248", "Students Assigned", "Across all batches")}
    ${metric("co_present", "128", "Teachers Assigned", "Balanced by admin")}
    ${metric("calendar_month", "14", "Batch Calendar Events", "This week")}
  </section>
  ${tableCard("Batch Control Center", ["Batch ID", "Batch Name", "Type", "Teachers", "Students", "Courses", "Status", "Actions"], rows, "All Batches")}
  <section class="feature-grid" style="margin-top:18px">
    <article class="card feature-card"><span class="material-symbols-outlined">content_copy</span><h3>Clone Batch</h3><p>Reuse a successful structure, schedule, and course composition for the next academic cycle.</p>${button("content_copy", "Clone Batch")}</article>
    <article class="card feature-card"><span class="material-symbols-outlined">event</span><h3>Batch Calendar</h3><p>Plan class windows, tests, revisions, and holidays without asking teachers to manage institute logistics.</p>${button("calendar_month", "Open Calendar")}</article>
    <article class="card feature-card"><span class="material-symbols-outlined">approval</span><h3>Batch Approval</h3><p>Teachers can build batches, but students only see them after admin approval and publish.</p>${button("approval", "Review Batch")}</article>
  </section>`;
}

function attendancePage() {
  const rows = [
    ["Today", "JEE 2027 Morning", "Student Attendance", "91.4%", "12 absent", status("Recorded"), actions()],
    ["Today", "Teacher Attendance", "Faculty Check-in", "96.1%", "2 leave requests", status("Recorded"), actions()],
    ["Today", "NEET Prime Live Class", "Live Class Attendance", "88.2%", "Late joins: 14", status("In Progress", "info"), actions()],
    ["Yesterday", "Foundation Evening", "Student Attendance", "82.6%", "Low attendance alert", status("Needs Follow-up", "warning"), actions()],
  ].map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`);

  return `${pageHead("Attendance", "Track student, teacher, and live class attendance with follow-up and reporting controls.", "Export Attendance", "download")}
  <section class="metric-grid">
    ${metric("fact_check", "86.4%", "Institute Average", "+1.8%")}
    ${metric("warning", "27", "Low Attendance Alerts", "Needs intervention", "#f59e0b", "#fef3c7")}
    ${metric("co_present", "96.1%", "Teacher Attendance", "Today", "#7c5cff", "#f1eaff")}
    ${metric("live_tv", "88.2%", "Live Class Attendance", "Current sessions", "#0891b2", "#e0f2fe")}
  </section>
  ${tableCard("Attendance Overview", ["Date", "Scope", "Type", "Attendance", "Exception", "Status", "Actions"], rows, "Today")}`;
}

function paymentsPage() {
  const rows = [
    ["INV-9102", person("AS", "Aarav Sharma", "JEE Morning"), "Tuition Fee", "Rs. 24,500", "UPI", status("Paid"), actions()],
    ["INV-9103", person("MK", "Meera Kapoor", "NEET Prime"), "Installment 3", "Rs. 18,000", "Pending", status("Due", "warning"), actions()],
    ["INV-9104", person("IA", "Ishita Anand", "JEE Weekend"), "Monthly Fee", "Rs. 12,500", "Pending", status("Overdue", "danger"), actions()],
    ["INV-9105", person("RV", "Rohan Verma", "Foundation"), "Scholarship Adjusted", "Rs. 8,400", "Cash", status("Partial", "info"), actions()],
  ].map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`);

  return `${pageHead("Fees & Payments", "Admin manages invoices, receipts, online and offline collections, discounts, refunds, and dues.", "Record Payment", "payments")}
  <section class="metric-grid">
    ${metric("currency_rupee", "Rs. 48.6L", "Total Revenue", "+18.3%")}
    ${metric("receipt_long", "1,248", "Invoices Issued", "This academic year", "#7c5cff", "#f1eaff")}
    ${metric("pending_actions", "Rs. 8.6L", "Pending Fees", "184 dues", "#dc2626", "#fee2e2", true)}
    ${metric("redeem", "Rs. 3.2L", "Discounts & Coupons", "Admin approved", "#16a34a", "#dcfce7")}
  </section>
  ${tableCard("Payments Control Center", ["Invoice", "Student", "Type", "Amount", "Channel", "Status", "Actions"], rows, "All Payments")}
  <section class="feature-grid" style="margin-top:18px">
    <article class="card feature-card"><span class="material-symbols-outlined">payments</span><h3>Payment Channels</h3><p>Track online, offline, card, UPI, bank transfer, refund, and cash collection states in one place.</p>${button("monitoring", "View Channels")}</article>
    <article class="card feature-card"><span class="material-symbols-outlined">local_offer</span><h3>Coupons & Discounts</h3><p>Control scholarships, promotional discounts, and concession rules at institute level.</p>${button("edit", "Manage Discounts")}</article>
    <article class="card feature-card"><span class="material-symbols-outlined">receipt</span><h3>Receipts & Refunds</h3><p>Generate receipts, audit refund approvals, and maintain compliant payment records.</p>${button("receipt_long", "Open Ledger")}</article>
  </section>`;
}

function certificatesPage() {
  const rows = [
    ["CERT-301", "JEE Excellence Certificate", "Template", "Batch Topper", status("Active"), actions()],
    ["CERT-302", "Course Completion Certificate", "Issued", "NEET 2027 Prime", status("Approved"), actions()],
    ["CERT-303", "Attendance Appreciation", "Pending", "Foundation Evening", status("Pending Review", "warning"), actions()],
    ["CERT-304", "Institute Merit Award", "Issued", "Annual Ceremony", status("Verified", "success"), actions()],
  ].map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`);

  return `${pageHead("Certificates", "Create templates, approve issues, download PDFs, and verify credentials with institute controls.", "Create Template", "workspace_premium")}
  <section class="metric-grid">
    ${metric("workspace_premium", "24", "Active Templates", "Brand controlled")}
    ${metric("verified", "1,186", "Issued Certificates", "This year", "#16a34a", "#dcfce7")}
    ${metric("qr_code_2", "100%", "QR Verification", "Enabled", "#7c5cff", "#f1eaff")}
    ${metric("approval", "12", "Pending Approval", "Needs review", "#f59e0b", "#fef3c7")}
  </section>
  ${tableCard("Certificate Center", ["Certificate ID", "Title", "Mode", "Scope", "Status", "Actions"], rows, "All Certificates")}`;
}

function reportsPage() {
  const cards = [
    ["monitoring", "Institute Report", "Students, teachers, approvals, collections, and institute health."],
    ["groups", "Batch Report", "Batch strength, attendance, course completion, and scheduling quality."],
    ["co_present", "Teacher Report", "Workload, performance, approval turnaround, and attendance."],
    ["school", "Student Report", "Progress, fees, attendance, and course completion."],
    ["payments", "Revenue Report", "Collections, pending dues, refunds, and discount exposure."],
    ["live_tv", "Watch Time Report", "Lecture consumption and student learning engagement."],
  ];

  return `${pageHead("Reports", "Admin uses reports to run the institute, not to browse vanity charts.", "Generate Report", "download")}
  <section class="metric-grid">
    ${metric("summarize", "9", "Report Types", "Operational reporting")}
    ${metric("download", "126", "Exports This Month", "Admin usage", "#7c5cff", "#f1eaff")}
    ${metric("assignment", "18", "Scheduled Reports", "Automation ready", "#0891b2", "#e0f2fe")}
    ${metric("insights", "34", "Actionable Alerts", "Across reports", "#f59e0b", "#fef3c7")}
  </section>
  <section class="feature-grid" style="margin-top:18px">
    ${cards.map((card) => `<article class="card feature-card"><span class="material-symbols-outlined">${card[0]}</span><h3>${card[1]}</h3><p>${card[2]}</p>${button("arrow_forward", "Open Report")}</article>`).join("")}
  </section>`;
}

function communicationPage() {
  const rows = [
    ["COMM-21", "Entire Institute", "Admission reminder + payment deadline", "Scheduled", status("Scheduled", "info"), actions()],
    ["COMM-22", "JEE 2027 Morning", "Mock test reminder and reporting time", "Push + SMS", status("Sent"), actions()],
    ["COMM-23", "Teachers", "Faculty meeting notice for approvals", "Email", status("Draft", "warning"), actions()],
    ["COMM-24", "Specific Students", "Low attendance follow-up", "WhatsApp", status("In Review", "warning"), actions()],
  ].map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`);

  return `${pageHead("Communication", "Send institute-wide or targeted announcements to teachers, students, batches, and courses.", "Send Announcement", "campaign")}
  <section class="metric-grid">
    ${metric("campaign", "24", "Active Campaigns", "6 scheduled")}
    ${metric("send", "18.6K", "Messages Sent", "Multi-channel", "#7c5cff", "#f1eaff")}
    ${metric("mark_email_read", "92%", "Delivery Rate", "Institute average", "#16a34a", "#dcfce7")}
    ${metric("schedule_send", "8", "Scheduled Sends", "Queued")}
  </section>
  ${tableCard("Announcement Center", ["ID", "Audience", "Message", "Channel", "Status", "Actions"], rows, "All Campaigns")}`;
}

function settingsPage() {
  const rows = [
    ["Institute Profile", "Institute name, domain, logo, timezone, and working days."],
    ["Branding", "Theme, primary color, secondary color, certificate identity, and parent-facing visual system."],
    ["Roles & Permissions", "Institute Admin, Academic Coordinator, Teacher, TA, Student, Parent permissions."],
    ["Academic Year", "Current year, term control, and archive rules."],
    ["Integrations", "Cloudinary, Firebase, Email, SMS Gateway, WhatsApp API, Zoom, Google Meet."],
    ["Security & Audit Logs", "Access rules, password policy, device logs, and permission traceability."],
  ];

  return `${pageHead("Institute Settings", "Admin owns institute branding, permissions, integrations, tenant rules, and governance.", "Save Settings", "save")}
  <section class="card">
    <div class="card-head"><div><h3>Configuration Areas</h3><p>Everything required to operate EduVerse as an institute product</p></div></div>
    <div class="setting-list">
      ${rows.map((row, index) => `<div class="setting-row"><div><h4>${row[0]}</h4><p>${row[1]}</p></div><button class="switch ${index < 4 ? "on" : ""}" aria-label="Toggle ${row[0]}"></button></div>`).join("")}
    </div>
  </section>`;
}

function profilePage() {
  const logs = [
    ["Today, 10:42", "Approved Physics Class 11 for student visibility", "103.21.58.14", "Chrome | Windows", status("Successful")],
    ["Today, 09:18", "Opened batch approval queue", "103.21.58.14", "Chrome | Windows", status("Successful")],
    ["Yesterday, 18:03", "Updated role permissions for Academic Coordinator", "103.21.58.14", "Chrome | Windows", status("Verified", "info")],
  ].map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`);

  return `${pageHead("Admin Profile", "Manage institute admin identity, security, permissions, and recent actions.", "Edit Profile", "edit")}
  <div class="dashboard-grid">
    <section class="card faculty-card"><span class="avatar" style="width:90px;height:90px;font-size:25px">AV</span><h3 style="font-size:20px">Aakash Verma</h3><p>Institute Admin | EduVerse LMS</p><div class="faculty-stats"><span><strong>2FA</strong><small>Enabled</small></span><span><strong>128</strong><small>Actions this week</small></span><span><strong>Full</strong><small>Access scope</small></span></div></section>
    <section class="card"><div class="card-head"><div><h3>Security & Access</h3><p>Personal administrative controls</p></div></div><div class="setting-list"><div class="setting-row"><div><h4>Change Password</h4><p>Last changed 42 days ago</p></div>${button("lock_reset", "Update")}</div><div class="setting-row"><div><h4>Two-factor Authentication</h4><p>Authenticator app connected</p></div><button class="switch on"></button></div><div class="setting-row"><div><h4>Audit Logs</h4><p>Every approval and configuration change is tracked</p></div>${button("history", "Open Logs")}</div></div></section>
  </div>
  ${tableCard("Recent Admin Activity", ["Time", "Activity", "IP Address", "Device", "Status"], logs, "All Logs")}`;
}

function renderPage(key) {
  const page = pages[key] || pages.dashboard;
  pageTitle.textContent = page[0];
  breadcrumb.textContent = page[0];
  document.querySelectorAll(".nav-item[data-page]").forEach((item) => item.classList.toggle("active", item.dataset.page === key));

  const renderers = {
    dashboard: dashboardPage,
    teachers: teachersPage,
    students: studentsPage,
    approvals: approvalsPage,
    batches: batchesPage,
    attendance: attendancePage,
    payments: paymentsPage,
    certificates: certificatesPage,
    reports: reportsPage,
    communication: communicationPage,
    settings: settingsPage,
    profile: profilePage,
  };

  content.innerHTML = renderers[key] ? renderers[key]() : dashboardPage();
  window.scrollTo({ top: 0, behavior: "smooth" });
  closeMobile();
  bindContentActions();
}

function showToast(text) {
  const toast = document.getElementById("toast");
  document.getElementById("toastText").textContent = text;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2400);
}

function bindContentActions() {
  document.querySelectorAll("[data-action]").forEach((buttonNode) => buttonNode.addEventListener("click", () => showToast(`${buttonNode.dataset.action} opened`)));
  document.querySelectorAll(".row-actions button").forEach((buttonNode) => buttonNode.addEventListener("click", () => showToast(`${buttonNode.title} action selected`)));
  document.querySelectorAll(".switch").forEach((switchNode) => switchNode.addEventListener("click", () => {
    switchNode.classList.toggle("on");
    showToast("Setting updated");
  }));
  document.querySelectorAll("[data-open-page]").forEach((buttonNode) => buttonNode.addEventListener("click", () => renderPage(buttonNode.dataset.openPage)));
}

function closeMobile() {
  sidebar.classList.remove("mobile-open");
  overlay.classList.remove("show");
}

function openPalette() {
  palette.classList.add("open");
  commandInput.value = "";
  filterCommands();
  window.setTimeout(() => commandInput.focus(), 30);
}

function closePalette() {
  palette.classList.remove("open");
}

function filterCommands() {
  const query = commandInput.value.toLowerCase();
  commandResults.innerHTML = Object.entries(pages)
    .filter(([, value]) => value[0].toLowerCase().includes(query))
    .map(([key, value]) => `<button class="command-result" data-command="${key}"><span class="material-symbols-outlined">arrow_forward</span><span>${value[0]}</span></button>`)
    .join("");
}

document.getElementById("adminNav").addEventListener("click", (event) => {
  const item = event.target.closest("[data-page]");
  if (item) renderPage(item.dataset.page);
});

document.getElementById("collapseSidebar").addEventListener("click", () => sidebar.classList.toggle("collapsed"));
document.getElementById("mobileMenu").addEventListener("click", () => {
  sidebar.classList.add("mobile-open");
  overlay.classList.add("show");
});
overlay.addEventListener("click", closeMobile);

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("eliteAdminTheme", document.body.classList.contains("dark") ? "dark" : "light");
});

if (localStorage.getItem("eliteAdminTheme") === "dark") document.body.classList.add("dark");

document.getElementById("aiAssistant").addEventListener("click", () => showToast("EduVerse AI is ready to help with approvals, reports, and operations"));
commandInput.addEventListener("input", filterCommands);
commandResults.addEventListener("click", (event) => {
  const buttonNode = event.target.closest("[data-command]");
  if (buttonNode) {
    renderPage(buttonNode.dataset.command);
    closePalette();
  }
});
palette.addEventListener("click", (event) => { if (event.target === palette) closePalette(); });

globalSearch.addEventListener("focus", openPalette);
document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openPalette();
  }
  if (event.key === "Escape") closePalette();
});

if (quickCreateButton) {
  quickCreateButton.addEventListener("click", () => showToast("Quick Create opened"));
}

renderPage("dashboard");
