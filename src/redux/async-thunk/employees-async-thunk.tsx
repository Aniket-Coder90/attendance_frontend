import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addEmployeesApi,
  downloadCSVFileApi,
  employeeAttendanceFillApi,
  getDesignationListApi,
  getEmployeesListApi,
  removeEmployeeApi,
  updateEmployeesApi,
} from "../service/employees-service";
import { TApiFail } from "@/types/axios";
import {
  TCreateEmployeeApiPayloadType,
  TUpdateEmployeeApiPayloadType,
} from "@/types/employee-type";

export const getEmployeeListAsyncThunk = createAsyncThunk(
  "get/employeeList",
  async (
    params: {
      year?: number;
      month?: number;
      day?: number;
      designation?: string;
    },
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

export const addEmployeeAsyncThunk = createAsyncThunk(
  "add/employee",
  async (payload: TCreateEmployeeApiPayloadType, { rejectWithValue }) => {
    try {
      return (await addEmployeesApi(payload))?.data;
    } catch (error) {
      const { response } = error as TApiFail<[]>;
      return rejectWithValue(response);
    }
  }
);

export const updateEmployeeAsyncThunk = createAsyncThunk(
  "update/employee",
  async (
    {
      payload,
      emp_id,
    }: { payload: TUpdateEmployeeApiPayloadType; emp_id: number },
    { rejectWithValue }
  ) => {
    try {
      return (await updateEmployeesApi(payload, emp_id))?.data;
    } catch (error) {
      const { response } = error as TApiFail<[]>;
      return rejectWithValue(response);
    }
  }
);

export const removeEmployeeAsyncThunk = createAsyncThunk(
  "remove/employee",
  async (emp_id: number, { rejectWithValue }) => {
    try {
      return (await removeEmployeeApi(emp_id))?.data;
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

export const getDesignationListAsyncThunk = createAsyncThunk(
  "post/getDesignationList",
  async (_, { rejectWithValue }) => {
    try {
      return (await getDesignationListApi())?.data;
    } catch (error) {
      const { response } = error as TApiFail<[]>;
      return rejectWithValue(response);
    }
  }
);
