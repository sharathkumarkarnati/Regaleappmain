import mongoose from "mongoose";

import { nanoid } from "nanoid";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    default: () => nanoid(15),
    index: { unique: true },
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = mongoose.model("User", userSchema);
