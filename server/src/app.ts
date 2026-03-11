import express from "express";
import { env } from "./config/env";
import { BASE_API_URL } from "./config/baseUrl";
import { router } from "./server/routes";
import { initMongoRepository } from "./db/mongoRepository";
import cors from "cors";
const app = express();

/**
 * Parse JSON bodies (for fetch / axios requests)
 */
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3005', // הגדרת מקור ספציפי
}));

/**
 * Parse HTML form bodies (application/x-www-form-urlencoded)
 * THIS is what fixes your error
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Register routes
 */
app.use(BASE_API_URL, router);

const startServer = async () => {
  await initMongoRepository();

  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
};

startServer();
