import { postcardApi } from "./postcard.service";
import { userApi } from "./user.service";
import { postcardDataApi } from "../services/postcard-data.service";

export const apiReducers = {
  [userApi.reducerPath]: userApi.reducer,
  [postcardApi.reducerPath]: postcardApi.reducer,
  [postcardDataApi.reducerPath]: postcardDataApi.reducer,
};

export const apiMiddlewares = [
  userApi.middleware,
  postcardApi.middleware,
  postcardDataApi.middleware,
];
