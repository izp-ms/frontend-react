import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { userApi } from "../services/user.service";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import auth from "./auth.slice";
import { apiReducers } from "../services";
import { postcardApi } from "../services/postcard.service";
import { postcardDataApi } from "../services/postcard-data.service";

const storeReducers = {
  auth,
};

export const rootReducer = combineReducers({
  ...apiReducers,
  ...storeReducers,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, postcardApi.middleware, postcardDataApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
