import { createSlice } from "@reduxjs/toolkit";
import {
  addEmployeeAsyncThunk,
  getDesignationListAsyncThunk,
  getEmployeeListAsyncThunk,
  removeEmployeeAsyncThunk,
  updateEmployeeAsyncThunk,
} from "../async-thunk/employees-async-thunk";
import { TEmployeeState } from "@/types/employee-type";

const initialState: TEmployeeState = {
  loader: {
    getEmployeeListLoader: false,
    getDesignationListLoader: false,
    createEmployeeLoader: false,
    updateEmployeeLoader: false,
  },
  employeeList: {
    total: 0,
    list: [],
    page: 1,
  },
  designationList: [],
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    employeeListUpdateActionHandler: (state, { payload }) => {
      state.employeeList = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeListAsyncThunk.pending, (state, action) => {
        state.loader.getEmployeeListLoader = true;
      })
      .addCase(getEmployeeListAsyncThunk.fulfilled, (state, { payload }) => {
        state.loader.getEmployeeListLoader = false;
        state.employeeList.list = payload.data;
      })
      .addCase(getEmployeeListAsyncThunk.rejected, (state, action) => {
        state.loader.getEmployeeListLoader = false;
      })
      .addCase(addEmployeeAsyncThunk.pending, (state, action) => {
        state.loader.createEmployeeLoader = true;
      })
      .addCase(addEmployeeAsyncThunk.fulfilled, (state, { payload }) => {
        state.loader.createEmployeeLoader = false;
        state.employeeList.list = [...state.employeeList?.list, payload.data];
      })
      .addCase(addEmployeeAsyncThunk.rejected, (state, action) => {
        state.loader.createEmployeeLoader = false;
      })
      .addCase(updateEmployeeAsyncThunk.pending, (state, action) => {
        state.loader.updateEmployeeLoader = true;
      })
      .addCase(updateEmployeeAsyncThunk.fulfilled, (state, { payload }) => {
        state.loader.updateEmployeeLoader = false;
        state.employeeList.list = state.employeeList?.list?.map((item) => {
          if (item.id === payload.data.id) {
            return payload.data;
          } else return item;
        });
      })
      .addCase(updateEmployeeAsyncThunk.rejected, (state, action) => {
        state.loader.updateEmployeeLoader = false;
      })
      .addCase(getDesignationListAsyncThunk.pending, (state, action) => {
        state.loader.getDesignationListLoader = true;
      })
      .addCase(getDesignationListAsyncThunk.fulfilled, (state, { payload }) => {
        state.loader.getDesignationListLoader = false;
        state.designationList = payload.data;
      })
      .addCase(getDesignationListAsyncThunk.rejected, (state, action) => {
        state.loader.getDesignationListLoader = false;
      });
  },
});

export const { employeeListUpdateActionHandler } = employeeSlice.actions;
export default employeeSlice.reducer;
