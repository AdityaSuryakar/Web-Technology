const express = require("express");
const router = express.Router();

let token = 0;
let queue = [];
let current = 0;

// Book appointment (generate token)
router.post("/book", (req, res) => {
  token++;
  queue.push({ token, name: req.body.name });
  res.json({ token });
});

// Get queue
router.get("/queue", (req, res) => {
  res.json({ queue, current });
});

// Serve next patient
router.post("/serve", (req, res) => {
  if (queue.length > 0) {
    current = queue.shift();
  }
  res.json({ current });
});

module.exports = router;