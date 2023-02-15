import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { isSearchBarAvailableForCurrentPlatform } from "react-native-screens";

const BACKEND_URL = "https://reci-4abfc-default-rtdb.firebaseio.com";

export async function getUser() {
  return await AsyncStorage.getItem("userId");
}

export async function storeRecipe(recipeData) {
  const user = await getUser();
  const response = await axios.post(
    BACKEND_URL + `/${user}/recipes.json`,
    recipeData
  );

  const id = response.data.name;
  return id;
}

export async function fetchRecipes() {
  const user = await getUser();
  const response = await axios.get(BACKEND_URL + `/${user}/recipes.json`);

  const recipes = [];

  for (const key in response.data) {
    const recipeObj = {
      id: key,
      name: response.data[key].name,
      ingredients: response.data[key].ingredients,
      steps: response.data[key].steps,
    };
    recipes.push(recipeObj);
  }
  return recipes;
}

export async function updateRecipe(id, recipeData) {
  const user = await getUser();
  return axios.put(BACKEND_URL + `./${user}/recipes/${id}.json`, recipeData);
}

export async function deleteRecipe(id) {
  const user = await getUser();
  return axios.delete(BACKEND_URL + `./${user}/recipes/${id}.json`);
}
