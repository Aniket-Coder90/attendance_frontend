export type Employee = {
  name: string;
  email?: string;
  category: string;
  designation: string;
  id?: number;
  attendances?: {
    attendanceId: number
    status: number
    date: string
  }[];
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

export enum AttendanceStatusEnum {
  ABSENT = 0,
  PRESENT = 1,
  LEAVE = 2,
  PRESENT_FIRST_HALF = 3,
  PRESENT_SECOND_HALF = 4,
  HOLIDAY = 5,
  DISABLED = -1
}
