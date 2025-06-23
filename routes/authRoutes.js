const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { resetPassword } = require("../controllers/authController");

// Register Route
router.post('/register', register);

// Login Route
router.post('/login', login);

// Password reset route
router.post("/reset-password", resetPassword);

module.exports = router;
