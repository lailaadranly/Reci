import { configureStore } from "@reduxjs/toolkit";

import favoritesReducer from "./favoritesSlice";
import recipeReducer from "./recipesSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    recipes: recipeReducer,
    authenticated: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
