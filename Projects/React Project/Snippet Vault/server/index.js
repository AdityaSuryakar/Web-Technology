require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const pool    = require("./db");

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// ── Helper: convert DB row → frontend object ─────────────────────────────────
const toSnippet = (row) => ({
  id:          row.id,
  title:       row.title,
  language:    row.language,
  code:        row.code,
  description: row.description || "",
  tags:        row.tags ? row.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
  createdAt:   row.created_at,
  updatedAt:   row.updated_at,
});

// ── GET /api/snippets ─────────────────────────────────────────────────────────
app.get("/api/snippets", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM snippets ORDER BY created_at DESC"
    );
    res.json(rows.map(toSnippet));
  } catch (err) {
    console.error("GET /api/snippets:", err.message);
    res.status(500).json({ error: "Failed to fetch snippets" });
  }
});

// ── GET /api/snippets/:id ─────────────────────────────────────────────────────
app.get("/api/snippets/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM snippets WHERE id = ?",
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Snippet not found" });
    res.json(toSnippet(rows[0]));
  } catch (err) {
    console.error("GET /api/snippets/:id:", err.message);
    res.status(500).json({ error: "Failed to fetch snippet" });
  }
});

// ── POST /api/snippets ────────────────────────────────────────────────────────
app.post("/api/snippets", async (req, res) => {
  const { title, language, code, description, tags } = req.body;
  if (!title || !code) {
    return res.status(400).json({ error: "Title and code are required" });
  }
  try {
    const tagsStr = Array.isArray(tags) ? tags.join(",") : (tags || "");
    const [result] = await pool.query(
      `INSERT INTO snippets (title, language, code, description, tags)
       VALUES (?, ?, ?, ?, ?)`,
      [title, language || "javascript", code, description || "", tagsStr]
    );
    const [rows] = await pool.query(
      "SELECT * FROM snippets WHERE id = ?",
      [result.insertId]
    );
    res.status(201).json(toSnippet(rows[0]));
  } catch (err) {
    console.error("POST /api/snippets:", err.message);
    res.status(500).json({ error: "Failed to create snippet" });
  }
});

// ── PUT /api/snippets/:id ─────────────────────────────────────────────────────
app.put("/api/snippets/:id", async (req, res) => {
  const { title, language, code, description, tags } = req.body;
  if (!title || !code) {
    return res.status(400).json({ error: "Title and code are required" });
  }
  try {
    const tagsStr = Array.isArray(tags) ? tags.join(",") : (tags || "");
    const [result] = await pool.query(
      `UPDATE snippets
       SET title = ?, language = ?, code = ?, description = ?, tags = ?
       WHERE id = ?`,
      [title, language || "javascript", code, description || "", tagsStr, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Snippet not found" });
    }
    const [rows] = await pool.query(
      "SELECT * FROM snippets WHERE id = ?",
      [req.params.id]
    );
    res.json(toSnippet(rows[0]));
  } catch (err) {
    console.error("PUT /api/snippets/:id:", err.message);
    res.status(500).json({ error: "Failed to update snippet" });
  }
});

// ── DELETE /api/snippets/:id ──────────────────────────────────────────────────
app.delete("/api/snippets/:id", async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM snippets WHERE id = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Snippet not found" });
    }
    res.json({ message: "Snippet deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/snippets/:id:", err.message);
    res.status(500).json({ error: "Failed to delete snippet" });
  }
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch (err) {
    res.status(500).json({ status: "error", database: "disconnected" });
  }
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Snippet Vault API running on http://localhost:${PORT}`);
});
