/* eslint-disable @typescript-eslint/no-explicit-any */

import {baseApi} from "../../api/baseApi";

const polishApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    CreatePolishRequest: builder.mutation({
      query: polishInfo => ({
        url: "/polish-request",
        method: "POST",
        body: polishInfo,
      }),
      invalidatesTags: ["polishRequest"],
    }),
    getPolishRequests: builder.query({
      query: () => ({
        url: "/buyer-polish-requests",
        method: "GET",
      }),
      providesTags: ["polishRequest"],
    }),
    getAllPolishRequests: builder.query({
      query: () => ({
        url: "/all-polish-requests",
        method: "GET",
      }),
      providesTags: ["polishRequest"],
    }),

    UpdateStatus: builder.mutation({
      query: furnitureInfo => ({
        url: "/polish-request-status",
        method: "PUT",
        body: furnitureInfo,
      }),
      invalidatesTags: ["polishRequest"],
    }),
  }),
});

export const {
  useCreatePolishRequestMutation,
  useGetPolishRequestsQuery,
  useGetAllPolishRequestsQuery,

  useUpdateStatusMutation,
} = polishApi;
