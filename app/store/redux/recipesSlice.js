import { createSlice } from "@reduxjs/toolkit";

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    allRecipes: [],
  },
  reducers: {
    addRecipe: (state, action) => {
      state.allRecipes.push(action.payload);
    },
    setRecipes: (state, action) => {
      state.allRecipes = action.payload;
    },
    removeRecipe: (state, action) => {
      state.allRecipes = state.allRecipes.filter(
        (recipe) => recipe.id !== action.payload.id
      );
    },
    modifyRecipe: (state, action) => {
      const id = state.allRecipes.findIndex(
        (recipe) => recipe.id === action.payload.id
      );
      let currentRecipes = [...state.allRecipes];
      currentRecipes[id] = action.payload;

      state.allRecipes = currentRecipes;
    },
  },
});

export const addRecipe = recipesSlice.actions.addRecipe;
export const setRecipes = recipesSlice.actions.setRecipes;
export const removeRecipe = recipesSlice.actions.removeRecipe;
export const modifyRecipe = recipesSlice.actions.modifyRecipe;

export default recipesSlice.reducer;
