import { Student } from "../models/Student";

/**
 * Convert array of students to CSV format
 */
export const studentsToCSV = (students: Student[]): string => {
  if (students.length === 0) {
    return "First Name,Last Name,Email,Phone,Field of Interest,Registration Date,Registration Time\n";
  }

  // Header row
  const headers = ["First Name", "Last Name", "Email", "Phone", "Field of Interest", "Registration Date", "Registration Time"];
  const headerRow = headers.map(h => `"${h}"`).join(",");

  // Data rows
  const dataRows = students.map(student => {
    const registrationDate = new Date(student.registrationDate).toLocaleDateString();
    const registrationTime = new Date(student.registrationTime).toLocaleTimeString();
    
    return [
      `"${student.firstName}"`,
      `"${student.lastName}"`,
      `"${student.email}"`,
      `"${student.phone}"`,
      `"${student.fieldOfInterest}"`,
      `"${registrationDate}"`,
      `"${registrationTime}"`
    ].join(",");
  });

  return [headerRow, ...dataRows].join("\n");
};

/**
 * Generate CSV file name with timestamp
 */
export const generateCSVFileName = (): string => {
  const timestamp = new Date().toISOString().split("T")[0];
  return `students_${timestamp}.csv`;
};
