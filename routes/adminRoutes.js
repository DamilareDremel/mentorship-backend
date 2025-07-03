const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin, authenticate, authorizeAdmin } = require("../middleware/authMiddleware");
const {
  getAllUsers,
  updateUserRole,
  getAllRequests,
  getAllSessions,
  assignMentor,
  deleteUser,
  deleteRequest,
  deleteSession,
  addUser,
  editUser
} = require("../controllers/adminController");

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

// Delete a mentorship request
router.delete("/requests/:id", verifyToken, verifyAdmin, deleteRequest);

// Delete a session
router.delete("/sessions/:id", verifyToken, verifyAdmin, deleteSession);

// Add new user
router.post("/users", verifyToken, verifyAdmin, addUser);

// Edit user
router.put("/users/:id", verifyToken, verifyAdmin, editUser);

module.exports = router;
