const express = require("express");
const router = express.Router();
const { addExam, getExams } = require("../controllers/examController");

router.post("/", addExam);
router.get("/", getExams);

module.exports = router;