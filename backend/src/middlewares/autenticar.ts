import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const autenticar = (req: Request, res: Response, next: NextFunction) => {
  // o front manda o token assim: "Authorization: Bearer <token>"
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Faça login" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
};
