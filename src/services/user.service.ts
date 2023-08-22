import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../core/config";

export interface User {
  email: string;
  password: string;
}

export interface ResponseLogin {
  token: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getUsers: builder.query<{ hello: string }, void>({
      query: () => "/api/User",
    }),
    login: builder.mutation<ResponseLogin, User>({
      query: (body) => ({
        url: "/api/User/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useLoginMutation } = userApi;
