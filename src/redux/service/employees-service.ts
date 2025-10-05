import { TApiResponse } from "@/types/axios";
import { API_END_POINTS } from "../endPoints";
import { DELETE, GET, PATCH, POST } from "@/services/api-service";
import { TCreateEmployeeApiPayloadType, TEmployeeType, TUpdateEmployeeApiPayloadType } from "@/types/employee-type";

export const getEmployeesListApi = (params: { year?: number; month?: number; day?: number; designation?: string }): TApiResponse<TEmployeeType[]> => {
  const { year, month, day, designation } = params;
  return GET({
    URL: API_END_POINTS.EMPLOYEES_LIST,
    params: {
      ...(year && { year }),
      ...(month && { month }),
      ...(day && { day }),
      ...(designation?.length && { designation }),
    },
  });
};

export const addEmployeesApi = (payload: TCreateEmployeeApiPayloadType): TApiResponse<TEmployeeType> => {
  return POST({
    URL: API_END_POINTS.CREATE_EMPLOYEE,
    body: payload,
  });
};

export const updateEmployeesApi = (payload: TUpdateEmployeeApiPayloadType, emp_id: number): TApiResponse<TEmployeeType> => {
  return PATCH({
    URL: API_END_POINTS.UPDATE_EMPLOYEE(emp_id),
    body: payload,
  });
};

export const removeEmployeeApi = (emp_id: number): TApiResponse<TEmployeeType> => {
  return DELETE({
    URL: API_END_POINTS.REMOVE_EMPLOYEE(emp_id),
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

export const getDesignationListApi = (): TApiResponse<string[]> => {
  return GET({
    URL: API_END_POINTS.GET_DESIGNATION_OPTIONS
  });
};
