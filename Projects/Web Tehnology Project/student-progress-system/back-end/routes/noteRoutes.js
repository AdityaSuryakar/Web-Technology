const express = require("express");
const router = express.Router();
const { addNote, getNotes } = require("../controllers/noteController");

router.post("/", addNote);
router.get("/:subjectId", getNotes);

module.exports = router;