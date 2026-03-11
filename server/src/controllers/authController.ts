import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { getCollections } from "../db/mongoRepository";

/**
 * Admin login
 * POST /api/admin/login
 */
export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const { students } = getCollections();

    // Find admin user by email and role
    const admin = await students.findOne({ email, role: "admin" });

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

    // Successful login - create JWT token
    const jwt = require("jsonwebtoken");
    const token = jwt.sign(
      { adminId: admin._id.toString(), email: admin.email, role: admin.role },
      process.env.JWT_SECRET || "",
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        _id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Server error during login",
    });
  }
};

/**
 * Student login
 * POST /api/login
 */
export const studentLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const { students } = getCollections();
    const student = await students.findOne({ email, role: "student" });

    if (!student) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, student.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const jwt = require("jsonwebtoken");
    const token = jwt.sign(
      { studentId: student._id.toString(), email: student.email },
      process.env.JWT_SECRET || "",
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      student: { _id: student._id, email: student.email, firstName: student.firstName, lastName: student.lastName },
    });
  } catch (error) {
    console.error("Student login error:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
};
