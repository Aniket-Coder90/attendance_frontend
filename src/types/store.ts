import store from "../redux/store";
import { TEmployeeState } from "./employee-type";

type TRootState = {
    employees: TEmployeeState
};

type TAppDispatch = typeof store.dispatch;

export type { TAppDispatch, TRootState };
