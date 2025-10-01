import { createAsyncThunk } from "@reduxjs/toolkit";
import { getEmployeesList } from "../service/employees-service";
import { TApiFail } from "@/types/axios";

export const getUserModulesActivityAsyncThunk = createAsyncThunk(
  "get/userModuleActivity",
  async (_, { rejectWithValue }) => {
    try {
      return (await getEmployeesList())?.data;
    } catch (error) {
      const { response } = error as TApiFail<[]>;
      return rejectWithValue(response);
    }
  }
);
