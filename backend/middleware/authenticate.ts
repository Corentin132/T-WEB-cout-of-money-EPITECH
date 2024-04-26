import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.TOKEN_KEY || "${TOKEN_KEY}";
if (!JWT_SECRET) {
  throw new Error("JWT Secret is not defined");
}

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, payload: any) => {
    if (err) {
      console.error(err);
      return res.sendStatus(401);
    }

    req.user = {
      id: payload.userId,
      role: payload.role,
    };
    next();
  });
};

export default authenticateToken;
