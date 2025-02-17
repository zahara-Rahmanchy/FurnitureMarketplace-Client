/* eslint-disable @typescript-eslint/no-explicit-any */

import {baseApi} from "../../api/baseApi";

const furnitureApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    GetAllFurnitures: builder.query({
      query: arg => ({
        url: `/sellerproducts`,
        method: "GET",
        params: {...arg},
      }),
      providesTags: ["Furnitures"],
    }),
    GetAllFurnituresMenu: builder.query({
      query: () => ({
        url: `/products`,
        method: "GET",
        // params: {...arg},
      }),
      providesTags: ["Furnitures"],
    }),
    GetAllFurnituresData: builder.query({
      query: arg => ({
        url: `/products`,
        method: "GET",
        params: {...arg},
      }),
      providesTags: ["Furnitures"],
    }),
    AddFurniture: builder.mutation({
      query: FurnitureInfo => ({
        url: "/product",
        method: "POST",
        body: FurnitureInfo,
      }),
      invalidatesTags: ["Furnitures"],
    }),
    UpdateFurniture: builder.mutation({
      query: sendProductData => ({
        url: `/updateproduct/${sendProductData.id}`,
        method: "PUT",
        body: sendProductData.FurnitureInfo,
      }),
      invalidatesTags: ["Furnitures"],
    }),

    DeleteFurniture: builder.mutation({
      query: id => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Furnitures"],
    }),
    BulkDeleteFurniture: builder.mutation({
      query: productIds => ({
        url: "/products/bulk-delete",
        method: "DELETE",
        body: productIds,
      }),
      invalidatesTags: ["Furnitures"],
    }),

    VerifyFurniture: builder.query({
      query: arg => ({
        url: `/verify-products/${arg.productId}`,
        method: "GET",
      }),
      providesTags: ["Furnitures"],
    }),

    sellerFurnitures: builder.query({
      query: () => ({
        url: `/sellerproducts`,
        method: "GET",
      }),
      providesTags: ["Furnitures"],
    }),
  }),
});

export const {
  useGetAllFurnituresQuery,
  useSellerFurnituresQuery,
  useGetAllFurnituresDataQuery,
  useAddFurnitureMutation,
  useUpdateFurnitureMutation,
  useGetAllFurnituresMenuQuery,
  useDeleteFurnitureMutation,
  useBulkDeleteFurnitureMutation,
  useVerifyFurnitureQuery,
} = furnitureApi;
