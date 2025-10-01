import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

import rootReducer from "./reducers";
import { TRootState } from "@/types/store";

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NEXT_PUBLIC_NODE_ENV !== "production",
});

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;

export default store;
