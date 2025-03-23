import mongoose from "mongoose";

const bookmarksSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  bookmarks: [{ type: Object }],
});

export const Bookmarks = mongoose.model("Bookmarks", bookmarksSchema);
