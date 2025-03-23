import jwt from "jsonwebtoken";
import { loadConfig } from "./loadConfig.js";

const { jwtSecret } = loadConfig();

const generateToken = (userId) =>
  jwt.sign({ id: userId }, jwtSecret, { expiresIn: "1h" });

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;

    next();
  });
};

export { generateToken, authenticateToken };
