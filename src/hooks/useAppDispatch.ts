import { TAppDispatch } from "@/types/store";
import { useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch<TAppDispatch>();
