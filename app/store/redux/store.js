import { configureStore } from "@reduxjs/toolkit";

import favoritesReducer from "./favorites";
import recipeReducer from "./recipesSlice";

export const store = configureStore({
  reducer: {
    favoriteRecipes: favoritesReducer,
    recipes: recipeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
