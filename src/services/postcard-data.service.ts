import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../core/config";
import { getTokenFromSessionStorage } from "../hooks/useToken";
import { Pagination } from "../models/pagination";
//import { Coordinates } from "../models/coordinates";
import { PostcardData } from "../models/postcard-data";
import { PostcardDataFilter } from "../models/filters";

const queryBuilder = (postcardDataFilter: PostcardDataFilter) => {
  let queryUrl = "";

  const params = new URLSearchParams(postcardDataFilter.searchParams);

  queryUrl = params.toString();

  return queryUrl;
};
export const postcardDataApi = createApi({
  reducerPath: "postcardDataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (header) => {
      header.set("Authorization", `Bearer ${getTokenFromSessionStorage()}`);
      return header;
    },
  }),
  endpoints: (builder) => ({
    // postCoordinates: builder.mutation<Coordinates, PostcardData>({
    //   query: (body) => ({
    //     url: "/api/User/login",
    //     method: "POST",
    //     body,
    //   }),
    // }),
    getPostcardsData: builder.query<Pagination<PostcardData>, PostcardDataFilter>({
      query: (postcardDataFilter) => {
        const queryUrl = queryBuilder(postcardDataFilter);
        return {
          url: `/api/PostcardData?${queryUrl}`,
          method: "GET",
        };
      },
    }),
    updatePostcardData: builder.mutation<PostcardData, PostcardData>({
      query: (body) => ({
        url: "/api/PostcardData",
        method: "PUT",
        body,
      }),
    }),
    postPostcardData: builder.mutation<PostcardData, PostcardData>({
      query: (body) => ({
        url: "/api/PostcardData",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { 
  
  useGetPostcardsDataQuery,
  useUpdatePostcardDataMutation, 
  usePostPostcardDataMutation } = postcardDataApi;
