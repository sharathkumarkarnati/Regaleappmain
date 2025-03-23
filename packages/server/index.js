import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { loadConfig } from "./services/loadConfig.js";
import { authRoutes } from "./routes/auth.js";
import { recipeRouter } from "./routes/recipe.js";
import { bookmarksRouter } from "./routes/bookmarks.js";

const config = loadConfig();
const { port, mongoURI, allowedOrigins } = config;

const app = express();
app.use(
  cors({
    origin: (origin, callback) => {
      if (!(allowedOrigins.length > 0) || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// Middleware
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/recipe", recipeRouter);
app.use("/api/bookmarks", bookmarksRouter);

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${port}`);
});

// MongoDB connection
mongoose
  .connect(mongoURI, {
    serverApi: {
      version: "1",
      strict: true,
      deprecationErrors: true,
      family: 4,
    },
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Connected to MongoDB");
    mongoose.connection.db
      .admin()
      .command({ ping: 1 })
      .then(() => {
        // eslint-disable-next-line no-console
        console.log("Connection to MongoDB is OK");
      });
  });
