const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  sendRequest,
  getSentRequests,
  getReceivedRequests,
  updateRequest
} = require("../controllers/requestController");

// Send mentorship request
router.post("/", verifyToken, sendRequest);

// View sent requests (mentee)
router.get("/sent", verifyToken, getSentRequests);

// View received requests (mentor)
router.get("/received", verifyToken, getReceivedRequests);

// Update request status (mentor)
router.put("/:id", verifyToken, updateRequest);

module.exports = router;
