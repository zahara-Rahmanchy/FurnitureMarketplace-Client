/* eslint-disable @typescript-eslint/no-explicit-any */

import {baseApi} from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    placeOrder: builder.mutation({
      query: orderdata => ({
        url: "/place-order",
        method: "POST",
        body: orderdata,
      }),
      invalidatesTags: ["orderData"],
    }),
    getOrderItems: builder.query({
      query: () => ({
        url: "/get-orders",
        method: "GET",
      }),
      providesTags: ["orderData"],
    }),
    
    updateOrderStatus: builder.mutation({
        query: orderStatus => ({
        url: `/update-orders-status`,
        method: "PUT",
        body:  orderStatus,
      }),
      invalidatesTags: ["orderData"],
    })

  }),
});

export const {useGetOrderItemsQuery, usePlaceOrderMutation,useUpdateOrderStatusMutation} = orderApi;
