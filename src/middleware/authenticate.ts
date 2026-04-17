import type { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: any, res: Response, next: NextFunction) => {
  let token = req.cookies?.accessToken;
  if (!token && req.headers.authorization) {
    token=req.headers.authorization?.split(" ")[1];
  }
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
};