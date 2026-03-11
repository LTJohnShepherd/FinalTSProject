export interface Student {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;            // bcrypt hash stored here
  phone: string;
  fieldOfInterest: string;
  role: "student" | "admin"; // determines access level
  registrationDate: Date;
  registrationTime: Date;
}
