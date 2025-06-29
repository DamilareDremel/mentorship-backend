const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin, } = require("../middleware/authMiddleware");
const {
  getAllUsers,
  updateUserRole,
  getAllRequests,
  getAllSessions,
  assignMentor
} = require("../controllers/adminController");
const { deleteUser } = require("../controllers/adminController");

// View all users
router.get("/users", verifyToken, verifyAdmin, getAllUsers);

// Update user role
router.put("/users/:id/role", verifyToken, verifyAdmin, updateUserRole);

// View all mentorship requests
router.get("/requests", verifyToken, verifyAdmin, getAllRequests);

// View all sessions
router.get("/sessions", verifyToken, verifyAdmin, getAllSessions);

// Manually assign a mentor to a mentee
router.post("/assign-match", verifyToken, verifyAdmin, assignMentor);

// Delete a user
router.delete("/users/:id", verifyToken, verifyAdmin, deleteUser);

module.exports = router;
