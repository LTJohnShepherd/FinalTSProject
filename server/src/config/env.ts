import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 3000,
  MONGO_URI:
    process.env.MONGO_URI ||
    "mongodb+srv://baraks_db_user:236TocitlNNQxEuT@cluster0.jajq2gv.mongodb.net/",
  MONGO_DB: process.env.MONGO_DB || "vite_web",
};
