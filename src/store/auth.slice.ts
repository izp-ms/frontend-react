import { createSlice } from "@reduxjs/toolkit";
import { removeJwtToken } from "../services/auth.service";
import { CurrentUser } from "../models/user";

const auth = createSlice({
  name: "auth",
  initialState: {
    user: undefined as CurrentUser | undefined,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      removeJwtToken();
      state.user = undefined;
    },
  },
});

export const { setUser, logout } = auth.actions;
export default auth.reducer;
