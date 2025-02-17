/* eslint-disable @typescript-eslint/no-explicit-any */

import {baseApi} from "../../api/baseApi";

const saleApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    GetSalesHistory: builder.query({
      query: arg => ({
        url: `/salesHistory`,
        method: "GET",
        params: {...arg},
      }),
      providesTags: ["Sales"],
    }),

    AddSale: builder.mutation({
      query: sendSaleData => ({
        url: `/addSalesData/${sendSaleData.id}`,
        method: "POST",
        body: sendSaleData.saleData,
      }),
      invalidatesTags: ["Sales", "Furnitures"],
    }),
  }),
});

export const {useAddSaleMutation, useGetSalesHistoryQuery} = saleApi;
