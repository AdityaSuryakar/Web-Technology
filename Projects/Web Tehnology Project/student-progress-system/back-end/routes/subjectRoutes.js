const express = require("express");
const router = express.Router();
const {
  getSubjects,
  addSubject,
  deleteSubject
} = require("../controllers/subjectController");

router.get("/", getSubjects);
router.post("/", addSubject);
router.delete("/:id", deleteSubject);

module.exports = router;