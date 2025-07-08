const express = require('express');
const router = express.Router();
const { register, login, resetPassword } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

// Register Route
router.post('/register', register);

// Login Route
router.post('/login', login);

// Password reset route
router.post("/reset-password", resetPassword);

// Token validity check route
router.get("/check-token", verifyToken, (req, res) => {
  res.status(200).json({ message: "Token valid" });
});

module.exports = router;