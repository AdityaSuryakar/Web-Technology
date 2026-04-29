/* ──────────────────────────────────────────────────────────────
   Library Management System — Shared Frontend Script
   Pipeline: fetch() → /api/* → Routes/library.js
   ────────────────────────────────────────────────────────────── */

const API = "/api";

/* ═══════════════════════════════════════════════════════════════
   TOAST NOTIFICATION
════════════════════════════════════════════════════════════════ */
function toast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.className = "show";
  clearTimeout(el._t);
  el._t = setTimeout(() => el.className = "", 3000);
}

/* ═══════════════════════════════════════════════════════════════
   DATE HELPERS
════════════════════════════════════════════════════════════════ */
function fmtDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function isOverdue(dueDate, returnDate) {
  if (returnDate) return false;
  return new Date(dueDate) < new Date();
}

/* ═══════════════════════════════════════════════════════════════
   DASHBOARD STATS  (index.html)
════════════════════════════════════════════════════════════════ */
async function loadStats() {
  try {
    const res  = await fetch(`${API}/stats`);
    const data = await res.json();
    setEl("stat-titles",   data.totalTitles);
    setEl("stat-avail",    data.totalAvail);
    setEl("stat-issued",   data.totalIssued);
    setEl("stat-overdue",  data.overdueIssues);
    setEl("stat-students", data.totalStudents);
    setEl("stat-fines",    "₹" + data.totalFines);
  } catch (e) { console.error("Stats error", e); }
}

function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

/* ═══════════════════════════════════════════════════════════════
   BOOKS PAGE  (books.html)
════════════════════════════════════════════════════════════════ */
async function loadBooks() {
  const q     = document.getElementById("search-q")?.value || "";
  const genre = document.getElementById("filter-genre")?.value || "";
  const res   = await fetch(`${API}/books?q=${encodeURIComponent(q)}&genre=${encodeURIComponent(genre)}`);
  const books = await res.json();
  renderBooks(books);
}

function renderBooks(books) {
  const tbody = document.getElementById("books-tbody");
  if (!tbody) return;
  if (!books.length) {
    tbody.innerHTML = `<tr><td colspan="6"><div class="empty-state"><div class="empty-icon">📭</div><p>No books found</p></div></td></tr>`;
    return;
  }
  tbody.innerHTML = books.map(b => `
    <tr>
      <td><strong>${b.title}</strong></td>
      <td>${b.author}</td>
      <td><span class="badge badge-purple">${b.genre}</span></td>
      <td>${b.copies}</td>
      <td>
        <span class="badge ${b.available > 0 ? "badge-green" : "badge-red"}">
          ${b.available > 0 ? b.available + " available" : "All issued"}
        </span>
      </td>
      <td>
        <button class="btn btn-ghost btn-sm" onclick="openEditBook(${b.id},'${esc(b.title)}','${esc(b.author)}','${esc(b.genre)}',${b.copies})">✏️ Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteBook(${b.id})">🗑️ Delete</button>
      </td>
    </tr>
  `).join("");
}

async function addBook() {
  const title  = val("book-title");
  const author = val("book-author");
  const genre  = val("book-genre");
  const copies = val("book-copies") || "1";
  if (!title || !author) return toast("Title and author are required", "error");

  const res  = await fetch(`${API}/books`, { method: "POST", headers: json(), body: JSON.stringify({ title, author, genre, copies }) });
  const data = await res.json();
  if (!res.ok) return toast(data.error, "error");
  toast("📚 Book added: " + data.title);
  clearFields(["book-title","book-author","book-genre","book-copies"]);
  loadBooks();
}

async function openEditBook(id, title, author, genre, copies) {
  const newTitle  = prompt("Title:",  title)  ?? title;
  const newAuthor = prompt("Author:", author) ?? author;
  const newGenre  = prompt("Genre:",  genre)  ?? genre;
  const newCopies = prompt("Copies:", copies) ?? copies;
  const res  = await fetch(`${API}/books/${id}`, { method: "PUT", headers: json(), body: JSON.stringify({ title: newTitle, author: newAuthor, genre: newGenre, copies: newCopies }) });
  const data = await res.json();
  if (!res.ok) return toast(data.error, "error");
  toast("✅ Book updated");
  loadBooks();
}

async function deleteBook(id) {
  if (!confirm("Delete this book?")) return;
  const res = await fetch(`${API}/books/${id}`, { method: "DELETE" });
  if (res.ok) { toast("🗑️ Book deleted", "warn"); loadBooks(); }
}

async function loadGenreFilter() {
  const res    = await fetch(`${API}/genres`);
  const genres = await res.json();
  const sel    = document.getElementById("filter-genre");
  if (!sel) return;
  genres.forEach(g => {
    const opt = document.createElement("option");
    opt.value = g; opt.textContent = g;
    sel.appendChild(opt);
  });
}

/* ═══════════════════════════════════════════════════════════════
   ISSUE PAGE  (issue.html)
════════════════════════════════════════════════════════════════ */
async function populateSelects() {
  const [bRes, sRes] = await Promise.all([fetch(`${API}/books`), fetch(`${API}/students`)]);
  const books    = await bRes.json();
  const students = await sRes.json();

  const bSel = document.getElementById("issue-book");
  const sSel = document.getElementById("issue-student");
  if (bSel) {
    bSel.innerHTML = `<option value="">Select Book</option>`;
    books.filter(b => b.available > 0).forEach(b => {
      bSel.innerHTML += `<option value="${b.id}">${b.title} (${b.available} left)</option>`;
    });
  }
  if (sSel) {
    sSel.innerHTML = `<option value="">Select Student</option>`;
    students.forEach(s => {
      sSel.innerHTML += `<option value="${s.id}">${s.name} — ${s.roll}</option>`;
    });
  }
}

async function issueBook() {
  const bookId    = val("issue-book");
  const studentId = val("issue-student");
  if (!bookId || !studentId) return toast("Select both book and student", "error");

  const res  = await fetch(`${API}/issue`, { method: "POST", headers: json(), body: JSON.stringify({ bookId, studentId }) });
  const data = await res.json();
  if (!res.ok) return toast(data.error, "error");
  toast(`✅ Issued: "${data.bookTitle}" to ${data.studentName}. Due: ${fmtDate(data.dueDate)}`);
  populateSelects();
  loadIssues();
}

async function loadIssues() {
  const res    = await fetch(`${API}/issues`);
  const issues = await res.json();
  renderIssues(issues);
}

function renderIssues(issues) {
  const tbody = document.getElementById("issues-tbody");
  if (!tbody) return;
  const active = issues.filter(i => !i.returnDate);
  if (!active.length) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><div class="empty-icon">📋</div><p>No active issues</p></div></td></tr>`;
    return;
  }
  tbody.innerHTML = active.map(i => {
    const overdue = isOverdue(i.dueDate, i.returnDate);
    return `
      <tr class="${overdue ? "overdue" : ""}">
        <td>#${i.id}</td>
        <td><strong>${i.bookTitle}</strong></td>
        <td>${i.studentName}<br><small style="color:var(--muted)">${i.studentRoll}</small></td>
        <td>${fmtDate(i.issueDate)}</td>
        <td>${fmtDate(i.dueDate)}</td>
        <td>
          ${overdue
            ? `<span class="badge badge-red">Overdue — ₹${i.currentFine}</span>`
            : `<span class="badge badge-green">On Time</span>`}
        </td>
        <td>
          <button class="btn btn-success btn-sm" onclick="returnBook(${i.id})">↩️ Return</button>
        </td>
      </tr>
    `;
  }).join("");
}

async function returnBook(issueId) {
  const res  = await fetch(`${API}/return`, { method: "POST", headers: json(), body: JSON.stringify({ issueId }) });
  const data = await res.json();
  if (!res.ok) return toast(data.error, "error");
  const fineMsg = data.fine > 0 ? ` Fine: ₹${data.fine}` : " No fine.";
  toast(`↩️ "${data.bookTitle}" returned.${fineMsg}`, data.fine > 0 ? "warn" : "success");
  populateSelects();
  loadIssues();
}

/* ═══════════════════════════════════════════════════════════════
   ADMIN PAGE  (admin.html)
════════════════════════════════════════════════════════════════ */
async function loadAllIssues() {
  const res    = await fetch(`${API}/issues`);
  const issues = await res.json();
  const tbody  = document.getElementById("admin-issues-tbody");
  if (!tbody) return;
  if (!issues.length) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><div class="empty-icon">📭</div><p>No records</p></div></td></tr>`;
    return;
  }
  tbody.innerHTML = issues.map(i => {
    const overdue = isOverdue(i.dueDate, i.returnDate);
    const fine    = i.returnDate ? i.fine : i.currentFine;
    return `
      <tr class="${overdue ? "overdue" : ""}">
        <td>#${i.id}</td>
        <td>${i.bookTitle}</td>
        <td>${i.studentName}<br><small style="color:var(--muted)">${i.studentRoll}</small></td>
        <td>${fmtDate(i.issueDate)}</td>
        <td>${fmtDate(i.dueDate)}</td>
        <td>${i.returnDate ? fmtDate(i.returnDate) : '<span class="badge badge-gold">Active</span>'}</td>
        <td>
          ${fine > 0
            ? `<span class="badge badge-red">₹${fine}</span>`
            : `<span class="badge badge-green">₹0</span>`}
        </td>
      </tr>
    `;
  }).join("");
}

async function addStudent() {
  const name  = val("stu-name");
  const roll  = val("stu-roll");
  const email = val("stu-email");
  if (!name || !roll) return toast("Name and roll number required", "error");

  const res  = await fetch(`${API}/students`, { method: "POST", headers: json(), body: JSON.stringify({ name, roll, email }) });
  const data = await res.json();
  if (!res.ok) return toast(data.error, "error");
  toast("🎓 Student added: " + data.name);
  clearFields(["stu-name","stu-roll","stu-email"]);
  loadStudentsTable();
}

async function loadStudentsTable() {
  const res      = await fetch(`${API}/students`);
  const students = await res.json();
  const tbody    = document.getElementById("students-tbody");
  if (!tbody) return;
  if (!students.length) {
    tbody.innerHTML = `<tr><td colspan="4"><div class="empty-state"><div class="empty-icon">🎓</div><p>No students registered</p></div></td></tr>`;
    return;
  }
  tbody.innerHTML = students.map(s => `
    <tr>
      <td>${s.id}</td>
      <td><strong>${s.name}</strong></td>
      <td>${s.roll}</td>
      <td>${s.email || "—"}</td>
    </tr>
  `).join("");
}

/* ═══════════════════════════════════════════════════════════════
   STUDENT PAGE  (student.html)
════════════════════════════════════════════════════════════════ */
async function loadMyBooks() {
  const sid = val("my-student-id");
  if (!sid) return toast("Select your name", "error");
  const res    = await fetch(`${API}/issues?studentId=${sid}`);
  const issues = await res.json();
  const tbody  = document.getElementById("my-issues-tbody");
  if (!tbody) return;
  if (!issues.length) {
    tbody.innerHTML = `<tr><td colspan="5"><div class="empty-state"><div class="empty-icon">📚</div><p>No books issued to you</p></div></td></tr>`;
    return;
  }
  tbody.innerHTML = issues.map(i => {
    const overdue = isOverdue(i.dueDate, i.returnDate);
    const fine    = i.returnDate ? i.fine : i.currentFine;
    return `
      <tr class="${overdue ? "overdue" : ""}">
        <td><strong>${i.bookTitle}</strong></td>
        <td>${fmtDate(i.issueDate)}</td>
        <td>${fmtDate(i.dueDate)}</td>
        <td>${i.returnDate ? fmtDate(i.returnDate) : '<span class="badge badge-gold">Active</span>'}</td>
        <td>
          ${fine > 0
            ? `<span class="badge badge-red">₹${fine}</span>`
            : i.returnDate
              ? `<span class="badge badge-green">Returned</span>`
              : `<span class="badge badge-green">No Fine</span>`}
        </td>
      </tr>
    `;
  }).join("");
}

async function populateStudentSelect() {
  const res      = await fetch(`${API}/students`);
  const students = await res.json();
  const sel      = document.getElementById("my-student-id");
  if (!sel) return;
  sel.innerHTML = `<option value="">-- Select your name --</option>`;
  students.forEach(s => {
    sel.innerHTML += `<option value="${s.id}">${s.name} (${s.roll})</option>`;
  });
}

/* ═══════════════════════════════════════════════════════════════
   UTILITIES
════════════════════════════════════════════════════════════════ */
function val(id)  { return document.getElementById(id)?.value?.trim() || ""; }
function json()   { return { "Content-Type": "application/json" }; }
function esc(s)   { return String(s).replace(/'/g, "\\'"); }
function clearFields(ids) { ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = ""; }); }