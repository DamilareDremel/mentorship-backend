const { Availability, User } = require("../models");

// Mentor adds availability block
exports.addAvailability = async (req, res) => {
  const { day, startTime, endTime } = req.body;
  try {
    const mentor = await User.findByPk(req.user.id);
    if (mentor.role !== "mentor") {
      return res.status(403).json({ message: "Only mentors can set availability." });
    }

    const availability = await Availability.create({
      mentorId: req.user.id,
      day,
      startTime,
      endTime
    });

    res.status(201).json({ message: "Availability added.", availability });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get current mentor's availability
exports.getMyAvailability = async (req, res) => {
  try {
    const availabilities = await Availability.findAll({
      where: { mentorId: req.user.id }
    });
    res.status(200).json(availabilities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get availability for a specific mentor
exports.getMentorAvailability = async (req, res) => {
  try {
    const availabilities = await Availability.findAll({
      where: { mentorId: req.params.mentorId }
    });
    res.status(200).json(availabilities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete availability block
exports.deleteAvailability = async (req, res) => {
  try {
    const availability = await Availability.findByPk(req.params.id);
    if (!availability) {
      return res.status(404).json({ message: "Availability not found." });
    }

    if (availability.mentorId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this availability." });
    }

    await availability.destroy();
    res.status(200).json({ message: "Availability deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
