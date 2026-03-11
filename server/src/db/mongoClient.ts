import { MongoClient } from "mongodb";
import { env } from "../config/env";

const client = new MongoClient(env.MONGO_URI);

export const connectMongo = async () => {
  await client.connect();
  console.log("MongoDB connected");
  return client.db(env.MONGO_DB);
};
