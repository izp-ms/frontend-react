import { userApi } from "./user.service";

export const apiReducers = {
  [userApi.reducerPath]: userApi.reducer,
};

export const apiMiddlewares = [userApi.middleware];
