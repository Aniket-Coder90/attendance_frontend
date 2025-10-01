import axiosInstance from "@/middleware/axios";

enum HttpMethodType {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type HttpRequestType =
  | "arraybuffer"
  | "blob"
  | "document"
  | "json"
  | "text"
  | "stream";

type ApiType<T> = {
  URL: string;
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: T;
  params?: Record<string, unknown>;
  queryParams?: Record<string, unknown>;
  responseType?: HttpRequestType;
  signal?: AbortSignal;
  version?: "v1" | "v2" | "v3";
};

const makeApi = <T>({
  URL,
  method,
  headers: headerParams,
  body,
  params,
  queryParams,
  responseType,
  signal,
}: ApiType<T>) => {
  const config = {
    method,
    url: URL,
    params,
    queryParams,
    headers: { ...headerParams },
    data: body,
    responseType,
    signal,
  };

  return axiosInstance(config);
};

//INFO: Use this request method from your individual services
const GET = <T>({
  URL,
  headers,
  body,
  params,
  queryParams,
  responseType,
  signal,
  version = "v1",
}: ApiType<T>) => {
  return makeApi<T>({
    URL: `${axiosInstance.getUri()}${URL}`,
    method: HttpMethodType.GET,
    headers,
    body,
    params,
    queryParams,
    responseType,
    signal,
  });
};

const POST = <T>({
  URL,
  headers,
  body,
  responseType,
  signal,
  version = "v1",
}: ApiType<T>) => {
  return makeApi<T>({
    URL: `${axiosInstance.getUri()}/${version}/${URL}`,
    method: HttpMethodType.POST,
    headers,
    body,
    responseType,
    signal,
  });
};

const PUT = <T>({ URL, headers, body, version = "v1" }: ApiType<T>) => {
  return makeApi<T>({
    URL: `${axiosInstance.getUri()}/${version}/${URL}`,
    method: HttpMethodType.PUT,
    headers,
    body,
  });
};

const DELETE = <T>({ URL, headers, body, version = "v1" }: ApiType<T>) => {
  return makeApi<T>({
    URL: `${axiosInstance.getUri()}/${version}/${URL}`,
    method: HttpMethodType.DELETE,
    headers,
    body,
  });
};

const PATCH = <T = undefined>({
  URL,
  headers,
  body,
  params,
  version = "v1",
}: ApiType<T>) => {
  return makeApi<T>({
    URL: `${axiosInstance.getUri()}/${version}/${URL}`,
    method: HttpMethodType.PATCH,
    headers,
    body,
    params,
  });
};

export { DELETE, GET, PATCH, POST, PUT };
