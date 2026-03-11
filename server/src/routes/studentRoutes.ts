import { Router } from "express";
import { registerStudent } from "../controllers/studentController";

export const studentRouter = Router();

/**
 * POST /register
 * Register a new student
 */
studentRouter.post("/register", registerStudent);
