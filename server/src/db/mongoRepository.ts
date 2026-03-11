import { connectMongo } from "./mongoClient";
import { MongoCollections } from "../types/mongo";

let collections: MongoCollections;

export const initMongoRepository = async () => {
  const db = await connectMongo();

  collections = {
    students: db.collection("students"),
  };
};

export const getCollections = () => {
  if (!collections) {
    throw new Error("Mongo not initialized");
  }
  return collections;
};
