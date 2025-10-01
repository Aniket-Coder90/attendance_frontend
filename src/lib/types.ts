export type Employee = {
  name: string;
  email: any;
  category: string;
  designation: string;
  id: number;
};

export type AttendanceStatus = "present" | "absent" | "leave";

export type AttendanceRecord = {
  employeeId: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
};

export type AttendanceEntry = {
  [employeeId: string]: AttendanceStatus;
};
