
const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");


module.exports = router;

// @created on 10-70-25
///api/reminders
const { createReminder, getMyReminders ,deleteReminder , updateReminder} = require("../controller/reminderController");
router.post("/", protect, createReminder);
router.get("/", protect, getMyReminders);
router.delete("/:id", protect, deleteReminder);
router.put("/:id", protect, updateReminder);
