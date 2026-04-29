const express = require("express");
const router = express.Router();
const { addHistory, getHistory } = require("../controllers/historyController");

router.post("/", addHistory);
router.get("/", getHistory);

module.exports = router;