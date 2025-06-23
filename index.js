const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const requestRoutes = require('./routes/requestRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const adminRoutes = require("./routes/adminRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/sessions', sessionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/availability", availabilityRoutes);

// Basic Route
app.get("/", (req, res) => {
  res.send("Mentorship Backend API is running.");
});

// Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // 👈 export the app only

