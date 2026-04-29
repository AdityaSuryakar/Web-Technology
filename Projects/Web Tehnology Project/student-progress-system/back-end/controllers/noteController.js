const db = require("../config/db");

exports.addNote = (req, res) => {
  const { subject_id, title, content } = req.body;

  db.query(
    "INSERT INTO notes (subject_id, title, content) VALUES (?, ?, ?)",
    [subject_id, title, content],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Note added" });
    }
  );
};

exports.getNotes = (req, res) => {
  const { subjectId } = req.params;

  db.query(
    "SELECT * FROM notes WHERE subject_id=?",
    [subjectId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};