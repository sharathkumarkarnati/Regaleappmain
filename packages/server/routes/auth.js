import bcrypt from "bcryptjs";
import express from "express";
import { User } from "../models/User.js";
import { generateToken } from "../services/token.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).send({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).send({
      message: "Registration successful",
      token: generateToken(newUser.id),
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).send({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    res.status(200).send({ token: generateToken(user.id) });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).send({ message: "Server error" });
  }
});

export const authRoutes = router;
