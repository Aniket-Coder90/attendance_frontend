import { TRootState } from "@/types/store";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
