import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  downloadCSVFileApi,
  employeeAttendanceFillApi,
  getEmployeesListApi,
} from "../service/employees-service";
import { TApiFail } from "@/types/axios";

export const getEmployeeListAsyncThunk = createAsyncThunk(
  "get/employeeList",
  async (
    params: { year?: number; month?: number; day?: number },
    { rejectWithValue }
  ) => {
    try {
      return (await getEmployeesListApi(params))?.data;
    } catch (error) {
      const { response } = error as TApiFail<[]>;
      return rejectWithValue(response);
    }
  }
);

export const employeeAttendanceFillAsyncThunk = createAsyncThunk(
  "post/employeeAttendance",
  async (
    payload: {
      employeeId: number;
      status: number;
      date: string;
    }[],
    { rejectWithValue }
  ) => {
    try {
      return (await employeeAttendanceFillApi(payload))?.data;
    } catch (error) {
      const { response } = error as TApiFail<[]>;
      return rejectWithValue(response);
    }
  }
);

export const downloadCSVFileAsyncThunk = createAsyncThunk(
  "post/employeeAttendance",
  async (
    payload: {
      month?: string;
      day?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      return (await downloadCSVFileApi(payload))?.data;
    } catch (error) {
      const { response } = error as TApiFail<[]>;
      return rejectWithValue(response);
    }
  }
);
