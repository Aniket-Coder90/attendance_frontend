import { AxiosError, AxiosResponse } from "axios";

type TApiResponse<T> = Promise<
  AxiosResponse<{ data: T; status: number; message: string }>
>;

type TAsyncThunkResponseType<T> = {
  data: T;
  status: number;
  message: string;
};

type TApiFail<T> = AxiosError<{
  message: string;
  status: number;
  data: T;
}>;

export type { TApiResponse, TApiFail, TAsyncThunkResponseType };
