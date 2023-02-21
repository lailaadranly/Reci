import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favoriteRecipes: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      state.favoriteRecipes.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favoriteRecipes = state.favoriteRecipes.filter(
        (fav) => fav.id !== action.payload.id
      );
    },
  },
});

export const addFavorite = favoritesSlice.actions.addFavorite;
export const removeFavorite = favoritesSlice.actions.removeFavorite;
export default favoritesSlice.reducer;
