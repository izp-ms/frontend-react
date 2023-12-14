import { createSlice } from "@reduxjs/toolkit";

const friends = createSlice({
  name: "friends",
  initialState: {
    friendId: undefined as number | undefined,
  },
  reducers: {
    setFriendId: (state, action) => {
      console.log(action);
      state.friendId = action.payload;
    },
  },
});

export const { setFriendId } = friends.actions;
export default friends.reducer;
