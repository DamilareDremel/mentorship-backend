const { Session, Request, User } = require("../models");

// Book session (after request accepted)
exports.bookSession = async (req, res) => {
  const { mentorId, date, time, requestId } = req.body;
  try {
    const request = await Request.findOne({
      where: { id: requestId, menteeId: req.user.id, mentorId, status: "ACCEPTED" },
    });

    if (!request) {
      return res.status(400).json({ message: "No accepted mentorship request found for this booking." });
    }

    const session = await Session.create({
      menteeId: req.user.id,
      mentorId,
      requestId,
      date,
      time,
      status: "SCHEDULED"
    });

    res.status(201).json({ message: "Session booked successfully.", session });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get mentee sessions
exports.getMenteeSessions = async (req, res) => {
  try {
    const sessions = await Session.findAll({ where: { menteeId: req.user.id },
    include: [
    { model: User, as: 'mentee', attributes: ['id', 'name'] },
    { model: User, as: 'mentor', attributes: ['id', 'name'] }
  ]
 });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get mentor sessions
exports.getMentorSessions = async (req, res) => {
  try {
    const sessions = await Session.findAll({ where: { mentorId: req.user.id },
    include: [
    { model: User, as: 'mentee', attributes: ['id', 'name'] },
    { model: User, as: 'mentor', attributes: ['id', 'name'] }
  ]
 });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit feedback and auto-complete
exports.submitFeedback = async (req, res) => {
  const { id } = req.params;
  const { menteeFeedback, menteeRating, mentorFeedback } = req.body;

  try {
    const session = await Session.findByPk(id);
    if (!session) return res.status(404).json({ message: "Session not found." });

    if (menteeFeedback) {
      session.menteeFeedback = menteeFeedback;
      session.menteeRating = menteeRating;
    }

    if (mentorFeedback) {
      session.mentorFeedback = mentorFeedback;
    }

    if (session.menteeFeedback && session.menteeRating) {
      session.status = "COMPLETED";
      await session.save();

      const request = await Request.findByPk(session.requestId);
      if (request && request.status !== "COMPLETED") {
        request.status = "COMPLETED";
        await request.save();
      }

      return res.status(200).json({ message: "Session and request marked as completed.", session });
    }

    await session.save();
    res.status(200).json({ message: "Feedback submitted.", session });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get single session
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findByPk(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found." });
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
