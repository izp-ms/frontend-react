import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
  name: "auth",
  initialState: {
    user: {
      id: "",
      email: "",
      name: "",
      role: "",
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {
        id: "",
        email: "",
        name: "",
        role: "",
      };
    },
  },
});

export const { setUser, logout } = auth.actions;
export default auth.reducer;
