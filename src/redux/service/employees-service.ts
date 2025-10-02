import { TApiResponse } from "@/types/axios";
import { API_END_POINTS } from "../endPoints";
import { GET, POST } from "@/services/api-service";

export const getEmployeesListApi = (params: { year?: number; month?: number; day?: number }): TApiResponse<any> => {
  return GET({
    URL: API_END_POINTS.EMPLOYEES_LIST,
    params,
  });
};

export const employeeAttendanceFillApi = (payload: { employeeId: number; status: number, date: string }[]): TApiResponse<any> => {
  return POST({
    URL: API_END_POINTS.EMPLOYEE_ATTENDANCE_FILL,
    body: {attendances: payload},
  });
};

export const downloadCSVFileApi = (payload: { month?: string; day?: string }): TApiResponse<any> => {
  return GET({
    URL: API_END_POINTS.DOWNLOAD_CSV,
    params: payload
  });
};
