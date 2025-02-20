/* eslint-disable @typescript-eslint/no-explicit-any */

import {baseApi} from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    AddToCartRequest: builder.mutation({
      query: cartdata => ({
        url: "/addToCart",
        method: "POST",
        body: cartdata,
      }),
      invalidatesTags: ["cartData"],
    }),
    getCartItems: builder.query({
      query: () => ({
        url: "/getCartItems",
        method: "GET",
      }),
      providesTags: ["cartData"],
    }),
  }),
});

export const {useGetCartItemsQuery, useAddToCartRequestMutation} = cartApi;
