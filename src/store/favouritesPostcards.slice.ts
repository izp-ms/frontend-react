import { createSlice } from "@reduxjs/toolkit";

const favouritesPostcards = createSlice({
  name: "favouritesPostcards",
  initialState: {
    favouritesPostcards: [] as number[],
  },
  reducers: {
    addNewFavouritePostcard: (state, action) => {
      state.favouritesPostcards.push(action.payload);
    },
    removeFavouritePostcard: (state, action) => {
      state.favouritesPostcards = state.favouritesPostcards.filter(
        (id) => id !== action.payload
      );
    },
  },
});

export const { addNewFavouritePostcard, removeFavouritePostcard} =
  favouritesPostcards.actions;
export default favouritesPostcards.reducer;
