import { TApiResponse } from "@/types/axios";
import { API_END_POINTS } from "../endPoints";
import { GET } from "@/services/api-service";

export const getEmployeesList = (): TApiResponse<any> => {
  return GET({
    URL: API_END_POINTS.EMPLOYEES_LIST,
  });
};
