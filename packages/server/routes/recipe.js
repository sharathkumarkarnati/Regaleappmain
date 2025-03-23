import express from "express";
import { loadConfig } from "../services/loadConfig.js";
import { authenticateToken } from "../services/token.js";

const router = express.Router();

const { recipeApiKey, recipeApiUrl } = loadConfig();

router.get("/search/:query", authenticateToken, async (req, res) => {
  try {
    const query = req.params.query;
    if (!query) throw new Error("query is required");
    const response = await fetch(
      `${recipeApiUrl}?search=${query}&key=${recipeApiKey}`,
    );
    const data = await response.json();
    res.status(200).send(data);
  } catch {
    res.status(500).send("Internal server error");
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("id is required");
    const response = await fetch(
      `${recipeApiUrl}/${req.params.id}?key=${recipeApiKey}`,
    );
    const data = await response.json();
    res.status(200).send(data);
  } catch {
    res.status(500).send("Internal server error");
  }
});

router.post("/upload", authenticateToken, async (req, res) => {
  try {
    const recipe = req.body;

    if (!recipe) throw new Error("recipe is required");
    const response = await fetch(`${recipeApiUrl}?key=${recipeApiKey}`, {
      method: "POST",
      body: JSON.stringify(recipe),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    res.status(200).send(data);
  } catch {
    res.status(500).send("Internal server error");
  }
});

export const recipeRouter = router;
