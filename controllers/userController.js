const { User } = require("../models");

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] }  // 👈 exclude password here
    });

    if (!user) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    if (user.role !== "mentor") {
      return res.status(403).json({ message: "Access denied. Not a mentor." });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching mentor:", err);
    res.status(500).json({ message: "Server error" });
  }
};
