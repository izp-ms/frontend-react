import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../core/config";
import { getTokenFromSessionStorage } from "../hooks/useToken";
import { UserData } from "../models/user";
import { FriendFilter } from "../models/filters";
import { Pagination } from "../models/pagination";
import { FollowFriend, Friend } from "../models/user-friends";
const queryBuilder = (postcardFilter: FriendFilter) => {
  let queryUrl = "";

  const params = new URLSearchParams(postcardFilter.searchParams);

  queryUrl = params.toString();

  return queryUrl;
};

export const friendApi = createApi({
  reducerPath: "friendApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (header) => {
      header.set("Authorization", `Bearer ${getTokenFromSessionStorage()}`);
      return header;
    },
  }),
  endpoints: (builder) => ({
    getFriends: builder.query<Pagination<UserData>, FriendFilter>({
      query: (postcardFilter) => {
        const queryUrl = queryBuilder(postcardFilter);
        return {
          url: `/api/User?${queryUrl}`,
          method: "GET",
        };
      },
    }),
    getFollowers: builder.query<Pagination<UserData>, FriendFilter>({
      query: (postcardFilter) => {
        const queryUrl = queryBuilder(postcardFilter);
        return {
          url: `/api/UserFriends/Followers?${queryUrl}`,
          method: "GET",
        };
      },
    }),
    getFollowing: builder.query<Pagination<UserData>, FriendFilter>({
      query: (postcardFilter) => {
        const queryUrl = queryBuilder(postcardFilter);
        return {
          url: `/api/UserFriends/Following?${queryUrl}`,
          method: "GET",
        };
      },
    }),
    getIsFollowing: builder.query<boolean, number>({
      query: (id) => ({
        url: `/api/UserFriends/isFollowing/${id}`,
        method: "GET",
      }),
    }),
    postFollowFriend: builder.mutation<Friend, FollowFriend>({
        query: (body) => ({
          url: "/api/UserFriends",
          method: "POST",
          body,
        }),
      }),
      deleteFollowFriend: builder.mutation<Friend, FollowFriend>({
        query: (body) => ({
          url: "/api/UserFriends",
          method: "DELETE",
          body,
        }),
      }),
  }),
});

export const {
  useGetFriendsQuery,
  useGetFollowersQuery,
  useGetFollowingQuery,
  useGetIsFollowingQuery,
  usePostFollowFriendMutation,
  useDeleteFollowFriendMutation,
} = friendApi;
