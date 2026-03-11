import { Router, Request, Response } from "express";
import { adminLogin } from "../controllers/authController";
import { getCollections } from "../db/mongoRepository";
import { studentsToCSV, generateCSVFileName } from "../utils/csvExporter";

export const adminRouter = Router();

/**
 * POST /admin/login
 * Admin authentication
 */
adminRouter.post("/login", adminLogin);

/**
 * GET /admin/students
 * Get all registered students (admin only)
 * In production, would check JWT token here
 */
adminRouter.get("/students", async (req: Request, res: Response) => {
  try {
    const { students } = getCollections();

    const allStudents = await students.find({}).toArray();

    return res.status(200).json({
      message: "Students retrieved successfully",
      count: allStudents.length,
      data: allStudents,
    });
  } catch (error) {
    console.error("Get students error:", error);
    return res.status(500).json({
      message: "Server error retrieving students",
    });
  }
});

/**
 * GET /admin/export-csv
 * Export all students as CSV (admin only)
 */
adminRouter.get("/export-csv", async (req: Request, res: Response) => {
  try {
    const { students } = getCollections();

    const allStudents = await students.find({}).toArray();
    const csvContent = studentsToCSV(allStudents);
    const fileName = generateCSVFileName();

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    return res.send(csvContent);
  } catch (error) {
    console.error("Export CSV error:", error);
    return res.status(500).json({
      message: "Server error exporting CSV",
    });
  }
});
