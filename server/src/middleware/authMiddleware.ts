import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";
const jwt = require("jsonwebtoken");

export const verifyAdminToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization") || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : authHeader;

  if (!token) {
    return res.status(401).json({ message: "Missing auth token" });
  }

  try {
    const payload: any = jwt.verify(token, env.JWT_SECRET);
    // ensure user is admin
    if (payload.role !== "admin") {
      return res.status(403).json({ message: "Insufficient privileges" });
    }
    // attach to request if needed
    (req as any).admin = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
