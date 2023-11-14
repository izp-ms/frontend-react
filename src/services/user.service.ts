import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../core/config";
import {
  CurrentUser,
  LoginResponse,
  User,
  UserData,
  UserRegister,
  UserUpdate,
} from "../models/user";
import { getTokenFromSessionStorage } from "../hooks/useToken";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (header) => {
      header.set("Authorization", `Bearer ${getTokenFromSessionStorage()}`);
      return header;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, User>({
      query: (body) => ({
        url: "/api/User/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation<CurrentUser, UserRegister>({
      query: (body) => ({
        url: "/api/User/register",
        method: "POST",
        body,
      }),
    }),
    getUserData: builder.query<UserData, string>({
      query: (id: string) => ({
        url: `/api/User/${id}`,
        method: "GET",
      }),
    }),
    updateUserData: builder.mutation<UserUpdate, UserUpdate>({
      query: (body) => ({
        url: "/api/User",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserDataQuery,
  useUpdateUserDataMutation,
} = userApi;
