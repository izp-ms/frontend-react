import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../core/config";
import { PostcardData } from "../models/postcard";
import { Coordinates } from "../models/coordinates";

export const postcardDataApi = createApi({
  reducerPath: "postcardDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    postCoordinates: builder.mutation<Coordinates, PostcardData>({
      query: (body) => ({
        url: "/api/User/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { usePostCoordinatesMutation } = postcardDataApi;