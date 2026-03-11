import { connectMongo } from "./mongoClient";
import { MongoCollections } from "../types/mongo";

let collections: MongoCollections;

export const initMongoRepository = async () => {
  const db = await connectMongo();

  collections = {
    users: db.collection("users"),
    students: db.collection("students"),
    admins: db.collection("admins"),
  };
};

export const getCollections = () => {
  if (!collections) {
    throw new Error("Mongo not initialized");
  }
  return collections;
};
