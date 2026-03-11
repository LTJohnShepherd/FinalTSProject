import { Router } from "express";
import { registerStudent } from "../controllers/studentController";
import { studentLogin } from "../controllers/authController";

export const studentRouter = Router();

/**
 * POST /register
 * Register a new student
 */
studentRouter.post("/register", registerStudent);

/**
 * POST /login
 * Student authentication
 */
studentRouter.post("/login", studentLogin);
