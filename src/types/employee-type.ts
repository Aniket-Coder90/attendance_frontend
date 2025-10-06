import { AttendanceStatusEnum } from "@/lib/types";

export type TEmployeeState = {
    loader: {
        getEmployeeListLoader: boolean;
        getDesignationListLoader: boolean;
        createEmployeeLoader: boolean;
        updateEmployeeLoader: boolean;
        getCategoryListLoader: boolean;
    },
    employeeList: {
        total: number,
        list: TEmployeeType[],
        page: number
    },
    designationList: TEmployeeDesignationListApiResponseType;
    categoryList: TEmployeeDesignationListApiResponseType;
}

export type TEmployeeType = {
    id?: number,
    name: string,
    email: string,
    category: string,
    designation: string,
    attendances?: {
        attendanceId: number
        status: AttendanceStatusEnum
        date: string
    }[];
}

export type TCreateEmployeeApiPayloadType = {
    name: string,
    email?: string,
    category: string,
    designation: string
}

export type TUpdateEmployeeApiPayloadType = {
    name?: string,
    email?: string,
    category?: string,
    designation?: string
}

export type TEmployeeDesignationListApiResponseType = string[]
export type TEmployeeCategoryListApiResponseType = string[]