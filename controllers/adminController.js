const { User, Request, Session } = require("../models");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user role
exports.updateUserRole = async (req, res) => {
  const { role } = req.body;
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.role = role;
    await user.save();

    res.status(200).json({ message: "User role updated.", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View all mentorship requests
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.findAll();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View all sessions
exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.findAll();
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Manually assign a mentor to a mentee
exports.assignMentor = async (req, res) => {
  const { menteeId, mentorId } = req.body;
  try {
    // Check if both users exist
    const mentee = await User.findByPk(menteeId);
    const mentor = await User.findByPk(mentorId);

    if (!mentee || !mentor) {
      return res.status(404).json({ message: "Mentee or mentor not found." });
    }

    if (mentor.role !== "mentor") {
      return res.status(400).json({ message: "Selected user is not a mentor." });
    }

    // Check if a request already exists between them
    const existing = await Request.findOne({
      where: { menteeId, mentorId }
    });

    if (existing) {
      return res.status(400).json({ message: "A mentorship request already exists between these users." });
    }

    // Create direct accepted request
    const newRequest = await Request.create({
      menteeId,
      mentorId,
      status: "ACCEPTED"
    });

    res.status(201).json({ message: "Mentor assigned manually.", newRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};