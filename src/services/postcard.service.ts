import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../core/config";
import { PaginationResponse, Postcard, PostcardWithImage } from "../models/postcard";
import { Coordinates } from "../models/coordinates";
import { getTokenFromSessionStorage } from "../hooks/useToken";


export interface Pagination {
  pageNumber: number;
  pageSize: number;
}
export interface FiltersPostcard {
  userId: number;
}

export interface PostcardPayload{
  pagination: Pagination;
  filters:FiltersPostcard;
}

export const postcardApi = createApi({
  reducerPath: "postcardApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: API_URL,
    prepareHeaders: (header) => {
      header.set("Authorization", `Bearer ${getTokenFromSessionStorage()}`);
      return header;
    },}),
  endpoints: (builder) => ({
    getPaginatedPostard: builder.query<PaginationResponse, PostcardPayload>({
      query: (params) => ({
        url: `/api/Postcard?PageNumber=1&PageSize=10&UserId=1024`,
      }),
    }),
  }),
});



export const { useGetPaginatedPostardQuery } = postcardApi;
