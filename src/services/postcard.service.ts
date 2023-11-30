import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../core/config";
import { getTokenFromSessionStorage } from "../hooks/useToken";
import { Pagination } from "../models/pagination";
import { Postcard, PostcardCollection } from "../models/postcard";
import { PostcardFilter } from "../models/filters";

const queryBuilder = (postcardFilter: PostcardFilter) => {
  let queryUrl = "";

  const params = new URLSearchParams(postcardFilter.searchParams);

  queryUrl = params.toString();

  return queryUrl;
};

export const postcardApi = createApi({
  reducerPath: "postcardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (header) => {
      header.set("Authorization", `Bearer ${getTokenFromSessionStorage()}`);
      return header;
    },
  }),
  endpoints: (builder) => ({
    getPostcards: builder.query<Pagination<Postcard>, PostcardFilter>({
      query: (postcardFilter) => {
        const queryUrl = queryBuilder(postcardFilter);
        return {
          url: `/api/Postcard?${queryUrl}`,
          method: "GET",
        };
      },
    }),

    getFavouritePostcards: builder.query<Postcard[], string>({
      query: (id: string) => ({
        url: `api/FavouritePostcard?userId=${id}`,
        method: "GET",
      }),
    }),

    getPostcardCollection: builder.query<PostcardCollection, string>({
      query: (id: string) => ({
        url: `api/PostcardCollection?userId=${id}`,
        method: "GET",
      }),
    }),

    // updateFavoritePostcards: builder.mutation<FavoritePostcardUpdate, FavoritePostcardUpdate>({
    //   query: (body) => ({
    //     url: "api/FavouritePostcard",
    //     method: "PUT",
    //     body,
    //   }),
    // }),
  }),
});

export const { useGetPostcardsQuery, useGetFavouritePostcardsQuery, useGetPostcardCollectionQuery } =
  postcardApi;
