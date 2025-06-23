const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  addAvailability,
  getMyAvailability,
  getMentorAvailability,
  deleteAvailability
} = require("../controllers/availabilityController");

// Mentor adds availability
router.post("/", verifyToken, addAvailability);

// Mentor views own availability
router.get("/me", verifyToken, getMyAvailability);

// Mentee views a mentor's availability
router.get("/:mentorId", verifyToken, getMentorAvailability);

// Mentor deletes availability
router.delete("/:id", verifyToken, deleteAvailability);

module.exports = router;
