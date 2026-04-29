const db = require("../config/db");

exports.addExam = (req, res) => {
  const { subject, exam_date } = req.body;

  db.query(
    "INSERT INTO exams (subject, exam_date) VALUES (?, ?)",
    [subject, exam_date],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Exam added" });
    }
  );
};

exports.getExams = (req, res) => {
  db.query("SELECT * FROM exams", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};