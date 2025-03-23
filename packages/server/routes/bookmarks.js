import express from "express";
import { authenticateToken } from "../services/token.js";
import { Bookmarks } from "../models/Bookmarks.js";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) throw new Error("userId is null");

    const bookmarks = await Bookmarks.findOne({ userId });
    res.status(200).send({
      bookmarks: bookmarks ? bookmarks.bookmarks : [],
    });
  } catch {
    res.status(500).send("Internal server error");
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    if (!userId || !id) throw new Error("userId is null");

    const bookmarks = await Bookmarks.findOne({ userId });
    res.status(200).send({
      bookmarked: bookmarks
        ? bookmarks.bookmarks.some((b) => b.id === id)
        : false,
    });
  } catch {
    res.status(500).send("Internal server error");
  }
});

router.post("/add", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) throw new Error("userId is null");

    const { recipe } = req.body;
    if (!recipe) throw new Error("id is required");

    const bookmarks = await Bookmarks.findOne({ userId });
    if (!bookmarks) {
      await Bookmarks.create({ userId, bookmarks: [recipe] });
    } else {
      bookmarks.bookmarks.unshift(recipe);
      await bookmarks.save();
    }

    res.status(200).send({ bookmarks: bookmarks.bookmarks });
  } catch {
    res.status(500).send("Internal server error");
  }
});

router.post("/remove", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) throw new Error("userId is null");

    const { id } = req.body;
    if (!id) throw new Error("id is required");

    const bookmarks = await Bookmarks.findOne({ userId });
    if (bookmarks) {
      bookmarks.bookmarks = bookmarks.bookmarks.filter(
        (bookmark) => bookmark.id !== id,
      );
      await bookmarks.save();
    }

    res.status(200).send({ bookmarks: bookmarks.bookmarks });
  } catch {
    res.status(500).send("Internal server error");
  }
});

export const bookmarksRouter = router;
