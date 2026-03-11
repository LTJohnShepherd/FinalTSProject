import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { getCollections } from "../db/mongoRepository";
import { Student } from "../models/Student";

/**
 * Register a new student
 * POST /api/register
 */
export const registerStudent = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, phone, fieldOfInterest } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password || !phone || !fieldOfInterest) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const { students } = getCollections();

    // Check if email already registered
    const existingStudent = await students.findOne({ email });
    if (existingStudent) {
      return res.status(409).json({
        message: "This email is already registered",
      });
    }

    // Hash password before storing
    const hashed = await bcrypt.hash(password, 10);

    // Create new student record (role student by default)
    const now = new Date();
    const newStudent: Student = {
      firstName,
      lastName,
      email,
      password: hashed,
      phone,
      fieldOfInterest,
      role: "student",
      registrationDate: now,
      registrationTime: now,
    };

    await students.insertOne(newStudent);

    return res.status(201).json({
      message: "Successfully registered",
      data: newStudent,
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      message: "Server error during registration",
    });
  }
};
