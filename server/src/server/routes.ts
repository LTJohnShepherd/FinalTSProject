import { Router } from "express";
import { studentRouter } from "../routes/studentRoutes";
import { adminRouter } from "../routes/adminRoutes";

/**
 * Create an Express router.
 * This router combines all application routes:
 * - Student registration routes
 * - Admin routes (authentication, data retrieval, CSV export)
 */
export const router = Router();

// Mount student routes
router.use(studentRouter);

// Mount admin routes
router.use("/admin", adminRouter);
