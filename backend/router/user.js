const express = require("express");
const zod = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("./middleware"); // Ensure this import is correct

const router = express.Router();

const signupBody = zod.object({
  username: zod.string().min(3).max(30).email(),
  password: zod.string().min(6),
  name: zod.string().min(1)
});

// SignUp
router.post("/signup", async (req, res) => {
  const parseResult = signupBody.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parseResult.error.errors
    });
  }

  const { username, password, name } = req.body;

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).json({
      message: "Username already taken",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password: hashedPassword,
    name
  });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

  res.status(201).json({
    message: "User created successfully",
    token
  });
});

// SignIn
const signinBody = zod.object({
  username: zod.string().min(3).max(30).email(),
  password: zod.string().min(6),
});

router.post("/signin", async (req, res) => {
  const { success, error } = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: error.errors
    });
  }

  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token: token,
    });
    return;
  }

  res.status(401).json({
    message: "Invalid credentials",
  });
});

// Fetch user info
router.get("/userinfo", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    res.json({
      username: user.username,
      name: user.name,
      userId: req.userId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user info",
      error: error.message
    });
  }
});

module.exports = router;
