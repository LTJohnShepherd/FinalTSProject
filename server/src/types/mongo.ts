import { Collection } from "mongodb";
import { Student } from "../models/Student";

export interface MongoCollections {
  students: Collection<Student>;
}
