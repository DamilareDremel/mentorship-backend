const { Request, User } = require('../models');

// Send mentorship request
exports.sendRequest = async (req, res) => {
  const { mentorId } = req.body;
  try {
    const mentor = await User.findByPk(mentorId);
    if (!mentor || mentor.role !== "mentor") {
      return res.status(404).json({ message: "Mentor not found." });
    }

    const newRequest = await Request.create({
      menteeId: req.user.id,
      mentorId,
      status: "PENDING"
    });

    res.status(201).json({
      message: "Mentorship request sent.",
      newRequest
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mentee: view sent requests
exports.getSentRequests = async (req, res) => {
  try {
    const requests = await Request.findAll({
      where: { menteeId: req.user.id },
      include: [
    { model: User, as: 'mentee', attributes: ['id', 'name'] },
    { model: User, as: 'mentor', attributes: ['id', 'name'] }
  ]
    });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mentor: view received requests
exports.getReceivedRequests = async (req, res) => {
  try {
    const requests = await Request.findAll({
      where: { mentorId: req.user.id },
      include: [
    { model: User, as: 'mentee', attributes: ['id', 'name'] },
    { model: User, as: 'mentor', attributes: ['id', 'name'] }
  ]
    });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mentor: update request status
exports.updateRequest = async (req, res) => {
  const { status } = req.body;
  try {
    const request = await Request.findByPk(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    // Only the mentor can update the request status
    if (request.mentorId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized action." });
    }

    request.status = status;
    await request.save();

    res.status(200).json({ message: "Request updated.", request });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
