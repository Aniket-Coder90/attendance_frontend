import store from "../redux/store";

type TRootState = {};

type TAppDispatch = typeof store.dispatch;

export type { TAppDispatch, TRootState };
