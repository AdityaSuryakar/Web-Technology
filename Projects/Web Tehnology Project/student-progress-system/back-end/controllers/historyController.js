const db = require("../config/db");

exports.addHistory = (req, res) => {
  const { user_id, note_id } = req.body;

  db.query(
    "INSERT INTO history (user_id, note_id) VALUES (?, ?)",
    [user_id, note_id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "History saved" });
    }
  );
};

exports.getHistory = (req, res) => {
  db.query("SELECT * FROM history", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};