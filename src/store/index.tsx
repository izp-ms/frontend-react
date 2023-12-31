import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { userApi } from "../services/user.service";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import auth from "./auth.slice";
import favouritesPostcards from "./favouritesPostcards.slice";
import { apiReducers } from "../services";
import { postcardApi } from "../services/postcard.service";
import { postcardDataApi } from "../services/postcard-data.service";
import { friendApi } from "../services/friend.service";

const storeReducers = {
  auth,
  favouritesPostcards,
};

export const rootReducer = combineReducers({
  ...apiReducers,
  ...storeReducers,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      postcardApi.middleware,
      postcardDataApi.middleware,
      friendApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
