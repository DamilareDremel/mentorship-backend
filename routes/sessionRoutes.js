const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  bookSession,
  getMenteeSessions,
  getMentorSessions,
  submitFeedback
} = require("../controllers/sessionController");

// Book a session (mentees only)
router.post("/", verifyToken, bookSession);

// Get mentee's sessions
router.get("/mentee", verifyToken, getMenteeSessions);

// Get mentor's sessions
router.get("/mentor", verifyToken, getMentorSessions);

// Submit feedback
router.put("/:id/feedback", verifyToken, submitFeedback);

module.exports = router;
