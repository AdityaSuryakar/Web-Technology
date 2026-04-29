const db = require("../config/db");

exports.getSubjects = (req, res) => {
  db.query("SELECT * FROM subjects", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.addSubject = (req, res) => {
  const { name } = req.body;

  db.query(
    "INSERT INTO subjects (name) VALUES (?)",
    [name],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Subject added" });
    }
  );
};

exports.deleteSubject = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM subjects WHERE id=?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Deleted" });
    }
  );
};