import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { getCollections } from "../db/mongoRepository";

/**
 * Admin login
 * POST /api/admin/login
 */
export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const { admins } = getCollections();

    // Find admin by username
    const admin = await admins.findOne({ username });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Compare password
    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Successful login - in production, would create JWT token here
    return res.status(200).json({
      message: "Login successful",
      admin: {
        _id: admin._id,
        username: admin.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Server error during login",
    });
  }
};
