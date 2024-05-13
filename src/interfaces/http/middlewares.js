import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../config.js";

function authMiddleware(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ mensagem: "Não autorizado" });
  }

  const token = authorizationHeader.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensagem: "Não autorizado" });
    }

    req.user = decoded;
    next();
  });
}

export default authMiddleware;
