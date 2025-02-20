import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "../store";
// "http://localhost:5000
const url = import.meta.env.VITE_BACKEND_URL;
// console.log("url: ", url);
const baseQuery = fetchBaseQuery({
  baseUrl: url,
  credentials: "include",
  prepareHeaders: (headers, {getState}) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `${token}`);
    }

    return headers;
  },
});
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["Furnitures", "Sales", "polishRequest", "cartData"],
  endpoints: () => ({}),
});
