const express = require("express");
const router = express.Router();

// ─── In-Memory Data Store ──────────────────────────────────────────────────
let books = [
  { id: 1, title: "The Great Gatsby",      author: "F. Scott Fitzgerald", genre: "Fiction",    copies: 3, available: 3 },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee",          genre: "Fiction",    copies: 2, available: 2 },
  { id: 3, title: "1984",                  author: "George Orwell",       genre: "Dystopian",  copies: 4, available: 4 },
  { id: 4, title: "Clean Code",            author: "Robert C. Martin",    genre: "Technology", copies: 2, available: 2 },
  { id: 5, title: "Sapiens",               author: "Yuval Noah Harari",   genre: "History",    copies: 3, available: 3 },
];

let students = [
  { id: 1, name: "Aditya Suryakar", roll: "CS2021001", email: "aditya@college.edu" },
  { id: 2, name: "Sattu Patil",     roll: "CS2021002", email: "sattu@college.edu" },
  { id: 3, name: "Ammu Phule",      roll: "CS2021003", email: "ammu@college.edu" },
];

let issues = [];   // { id, bookId, studentId, issueDate, dueDate, returnDate, fine }
let nextBookId    = 6;
let nextStudentId = 4;
let nextIssueId   = 1;

const FINE_PER_DAY  = 2;   // ₹2 per day
const LOAN_DAYS     = 14;  // 14-day loan period

// ─── Helper ───────────────────────────────────────────────────────────────
function calcFine(dueDate, returnDate) {
  const due    = new Date(dueDate);
  const ret    = returnDate ? new Date(returnDate) : new Date();
  const diff   = Math.floor((ret - due) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff * FINE_PER_DAY : 0;
}

// ═══════════════════════════════════════════════════════════════════════════
//  BOOKS CRUD
// ═══════════════════════════════════════════════════════════════════════════

// GET all books (with optional search & genre filter)
router.get("/books", (req, res) => {
  let result = [...books];
  const { q, genre } = req.query;
  if (q)     result = result.filter(b => b.title.toLowerCase().includes(q.toLowerCase()) || b.author.toLowerCase().includes(q.toLowerCase()));
  if (genre) result = result.filter(b => b.genre.toLowerCase() === genre.toLowerCase());
  res.json(result);
});

// GET single book
router.get("/books/:id", (req, res) => {
  const book = books.find(b => b.id === +req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

// POST add book (Admin)
router.post("/books", (req, res) => {
  const { title, author, genre, copies } = req.body;
  if (!title || !author) return res.status(400).json({ error: "Title and author required" });
  const book = { id: nextBookId++, title, author, genre: genre || "General", copies: +copies || 1, available: +copies || 1 };
  books.push(book);
  res.status(201).json(book);
});

// PUT update book (Admin)
router.put("/books/:id", (req, res) => {
  const idx = books.findIndex(b => b.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Book not found" });
  const { title, author, genre, copies } = req.body;
  const diff = (+copies || books[idx].copies) - books[idx].copies;
  books[idx] = { ...books[idx], title: title || books[idx].title, author: author || books[idx].author, genre: genre || books[idx].genre, copies: +copies || books[idx].copies, available: books[idx].available + diff };
  res.json(books[idx]);
});

// DELETE book (Admin)
router.delete("/books/:id", (req, res) => {
  const idx = books.findIndex(b => b.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Book not found" });
  books.splice(idx, 1);
  res.json({ message: "Book deleted" });
});

// ═══════════════════════════════════════════════════════════════════════════
//  STUDENTS CRUD
// ═══════════════════════════════════════════════════════════════════════════

router.get("/students", (req, res) => res.json(students));

router.post("/students", (req, res) => {
  const { name, roll, email } = req.body;
  if (!name || !roll) return res.status(400).json({ error: "Name and roll number required" });
  if (students.find(s => s.roll === roll)) return res.status(400).json({ error: "Roll number already exists" });
  const student = { id: nextStudentId++, name, roll, email: email || "" };
  students.push(student);
  res.status(201).json(student);
});

router.delete("/students/:id", (req, res) => {
  const idx = students.findIndex(s => s.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Student not found" });
  students.splice(idx, 1);
  res.json({ message: "Student deleted" });
});

// ═══════════════════════════════════════════════════════════════════════════
//  ISSUE / RETURN
// ═══════════════════════════════════════════════════════════════════════════

// GET all issues (Admin) — with optional filter by student id or book id
router.get("/issues", (req, res) => {
  let result = issues.map(iss => {
    const book    = books.find(b => b.id === iss.bookId);
    const student = students.find(s => s.id === iss.studentId);
    const fine    = iss.returnDate ? iss.fine : calcFine(iss.dueDate, null);
    return { ...iss, bookTitle: book?.title, studentName: student?.name, studentRoll: student?.roll, currentFine: fine };
  });
  if (req.query.studentId) result = result.filter(i => i.studentId === +req.query.studentId);
  if (req.query.active)    result = result.filter(i => !i.returnDate);
  res.json(result);
});

// POST issue a book
router.post("/issue", (req, res) => {
  const { bookId, studentId } = req.body;
  const book    = books.find(b => b.id === +bookId);
  const student = students.find(s => s.id === +studentId);
  if (!book)    return res.status(404).json({ error: "Book not found" });
  if (!student) return res.status(404).json({ error: "Student not found" });
  if (book.available <= 0) return res.status(400).json({ error: "No copies available" });
  const existing = issues.find(i => i.bookId === +bookId && i.studentId === +studentId && !i.returnDate);
  if (existing) return res.status(400).json({ error: "Student already has this book" });

  const issueDate = new Date();
  const dueDate   = new Date(issueDate);
  dueDate.setDate(dueDate.getDate() + LOAN_DAYS);

  const record = { id: nextIssueId++, bookId: +bookId, studentId: +studentId, issueDate: issueDate.toISOString(), dueDate: dueDate.toISOString(), returnDate: null, fine: 0 };
  issues.push(record);
  book.available--;
  res.status(201).json({ ...record, bookTitle: book.title, studentName: student.name, dueDate: dueDate.toISOString() });
});

// POST return a book
router.post("/return", (req, res) => {
  const { issueId } = req.body;
  const record = issues.find(i => i.id === +issueId);
  if (!record)         return res.status(404).json({ error: "Issue record not found" });
  if (record.returnDate) return res.status(400).json({ error: "Book already returned" });

  record.returnDate = new Date().toISOString();
  record.fine       = calcFine(record.dueDate, record.returnDate);

  const book = books.find(b => b.id === record.bookId);
  if (book) book.available++;

  const student = students.find(s => s.id === record.studentId);
  res.json({ ...record, bookTitle: book?.title, studentName: student?.name, fine: record.fine });
});

// GET genres list
router.get("/genres", (req, res) => {
  const genres = [...new Set(books.map(b => b.genre))];
  res.json(genres);
});

// GET dashboard stats (Admin)
router.get("/stats", (req, res) => {
  const totalBooks    = books.reduce((s, b) => s + b.copies, 0);
  const totalAvail    = books.reduce((s, b) => s + b.available, 0);
  const activeIssues  = issues.filter(i => !i.returnDate).length;
  const overdueIssues = issues.filter(i => !i.returnDate && new Date(i.dueDate) < new Date()).length;
  const totalFines    = issues.reduce((s, i) => s + (i.returnDate ? i.fine : calcFine(i.dueDate, null)), 0);
  res.json({ totalBooks, totalAvail, totalIssued: totalBooks - totalAvail, activeIssues, overdueIssues, totalFines, totalStudents: students.length, totalTitles: books.length });
});

module.exports = router;
