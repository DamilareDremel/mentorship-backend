const { Session, Request, User } = require("../models");

// Book session (after request accepted)
exports.bookSession = async (req, res) => {
  const { mentorId, date, time } = req.body;

  try {
    // Check if request was accepted
    const request = await Request.findOne({
      where: {
        mentorId,
        menteeId: req.user.id,
        status: "ACCEPTED"
      }
    });

    if (!request) {
      return res.status(400).json({ message: "No accepted mentorship request found." });
    }

    // Create session
    const session = await Session.create({
      menteeId: req.user.id,
      mentorId,
      date,
      time,
      status: "SCHEDULED"
    });

    res.status(201).json({ message: "Session booked successfully.", session });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get sessions where current user is mentee
exports.getMenteeSessions = async (req, res) => {
  try {
    const sessions = await Session.findAll({
      where: { menteeId: req.user.id }
    });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get sessions where current user is mentor
exports.getMentorSessions = async (req, res) => {
  try {
    const sessions = await Session.findAll({
      where: { mentorId: req.user.id }
    });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit feedback
exports.submitFeedback = async (req, res) => {
  const { menteeFeedback, menteeRating, mentorFeedback } = req.body;
  try {
    const session = await Session.findByPk(req.params.id);
    if (!session) {
      return res.status(404).json({ message: "Session not found." });
    }

    // Mentee submitting feedback
    if (req.user.id === session.menteeId && menteeFeedback) {
      session.menteeFeedback = menteeFeedback;
      session.menteeRating = menteeRating;
    }

    // Mentor submitting feedback
    if (req.user.id === session.mentorId && mentorFeedback) {
      session.mentorFeedback = mentorFeedback;
    }

    // Check if any feedback is submitted and mark session as COMPLETED
    if (
      session.menteeFeedback || session.mentorFeedback
    ) {
      session.status = "COMPLETED";
    }

    await session.save();

    res.status(200).json({ message: "Feedback submitted.", session });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
