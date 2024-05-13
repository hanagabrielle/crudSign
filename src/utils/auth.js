import jwt from "jsonwebtoken";
import { compareSync } from "bcrypt";
import { JWT_SECRET } from "../../config.js";

function generateToken(email) {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
}

function comparePasswords(password, hashedPassword) {
  return compareSync(password, hashedPassword);
}

export default { generateToken, comparePasswords };
