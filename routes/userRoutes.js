const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { User } = require('../models');

// GET current user's profile
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update profile
router.put('/me/profile', verifyToken, async (req, res) => {
  const { bio, skills, goals } = req.body;
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.bio = bio || user.bio;
    user.skills = skills || user.skills;
    user.goals = goals || user.goals;

    await user.save();

    const { password, ...safeUser } = user.toJSON();

res.status(200).json({
  message: "Profile updated successfully.",
  updatedProfile: safeUser
});


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all mentors (optionally filter by skill)
router.get('/mentors', verifyToken, async (req, res) => {
  try {
    const skillFilter = req.query.skill;

    let whereCondition = { role: 'mentor' };

    if (skillFilter) {
      whereCondition.skills = {
        [require("sequelize").Op.contains]: [skillFilter]
      };
    }

    const mentors = await User.findAll({
      where: whereCondition,
      attributes: { exclude: ["password"] }
    });

    res.status(200).json(mentors);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
