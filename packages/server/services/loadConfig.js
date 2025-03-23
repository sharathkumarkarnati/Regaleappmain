import dotenv from "dotenv";

export const loadConfig = () => {
  dotenv.config();

  const config = {
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT,
    recipeApiUrl: process.env.RECIPE_API_URI,
    recipeApiKey: process.env.RECIPE_API_KEY,
  };

  if (Object.values(config).some((value) => !value)) {
    throw new Error("configs are missing");
  }

  config.allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter((i) => !!i);

  return config;
};
