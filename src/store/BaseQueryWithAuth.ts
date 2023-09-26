import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { RootState } from "./store";
import { setToken } from "./AuthSlice";

interface MessageData {
  message: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/v2",
  prepareHeaders: (headers, api) => addDefaultHeaders(headers, api),
});
const BaseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    api.dispatch(setToken(null));
  }
  if (result.error !== undefined) {
    let message: string = (result.error.data as MessageData).message;
    console.error(message);
  }
  return result;
};

function addDefaultHeaders(headers: Headers, api: { getState: () => unknown }) {
  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");
  const token: any = (api.getState() as RootState).authSlice.token;
  if (token !== "") {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return headers;
}

export default BaseQueryWithAuth;
