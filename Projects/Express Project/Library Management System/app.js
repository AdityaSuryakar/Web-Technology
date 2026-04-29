const express = require('express')
const app = express()
const port = 3000
const path = require("path");
const libraryRoutes = require("./Routes/library");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api", libraryRoutes);

// Page routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/books", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "books.html"));
});

app.get("/issue", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "issue.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "admin.html"));
});

app.get("/student", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "student.html"));
});

app.listen(port, () => {
  console.log(`📚 Library Management System running on http://localhost:${port}`)
})