import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
  email: string;
  password: string;
}

export interface ResponseLogin {
  token: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7275" }),
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
