import { Collection } from "mongodb";
import { User } from "./user";
import { Student } from "../models/Student";
import { Admin } from "../models/Admin";

export interface MongoCollections {
  users: Collection<User>;
  students: Collection<Student>;
  admins: Collection<Admin>;
}
