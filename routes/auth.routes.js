const { Router } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = Router();

// /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const validateUser = await User.findOne({ email: email });
    if (validateUser) {
      return res
        .status(400)
        .json({ message: "There is a user with this email in a database" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email: email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: "User has been created" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

// /api/auth/login
router.post("/login", async (req, res) => {});

module.exports = router;
