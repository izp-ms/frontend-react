import { userApi } from "./user.service";
import { postcardApi } from "./postcard.service";


export const apiReducers = {
  [userApi.reducerPath]: userApi.reducer,
  [postcardApi.reducerPath]: postcardApi.reducer,
};

export const apiMiddlewares = [userApi.middleware, postcardApi.middleware];
