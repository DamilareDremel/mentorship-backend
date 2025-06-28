const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  bookSession,
  getMenteeSessions,
  getMentorSessions,
  submitFeedback,
  getSessionById,  // ← you can leave this here cleanly
} = require("../controllers/sessionController");

// Book a session (mentees only)
router.post("/", verifyToken, bookSession);

// Get mentee's sessions
router.get("/mentee", verifyToken, getMenteeSessions);

// Get mentor's sessions
router.get("/mentor", verifyToken, getMentorSessions);

// Get session by ID
router.get("/:id", verifyToken, getSessionById);

// Submit feedback
router.put("/:id/feedback", verifyToken, submitFeedback);

module.exports = router;
