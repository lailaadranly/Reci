import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKEND_URL = "https://reci-4abfc-default-rtdb.firebaseio.com";

export async function getUser() {
  return await AsyncStorage.getItem("userId");
}
export async function getToken() {
  return await AsyncStorage.getItem("token");
}

export async function storeRecipe(recipeData) {
  const user = await getUser();
  const token = await getToken();
  const response = await axios.post(
    BACKEND_URL + `/${user}/recipes.json?auth=` + token,
    recipeData
  );

  const id = response.data.name;
  return id;
}

export async function fetchRecipes() {
  const user = await getUser();
  const token = await getToken();
  const response = await axios.get(
    BACKEND_URL + `/${user}/recipes.json?auth=` + token
  );

  const recipes = [];

  for (const key in response.data) {
    const recipeObj = {
      id: key,
      name: response.data[key].name,
      ingredients: response.data[key].ingredients,
      steps: response.data[key].steps,
      favorite: response.data[key].favorite,
      totalTime: response.data[key].totalTime,
      numServed: response.data[key].numServed,
    };
    recipes.push(recipeObj);
  }
  return recipes;
}

export async function updateRecipe(id, recipeData) {
  const user = await getUser();
  const token = await getToken();

  return axios.put(
    BACKEND_URL + `./${user}/recipes/${id}.json?auth=` + token,
    recipeData
  );
}

export async function deleteRecipe(id) {
  const user = await getUser();
  const token = await getToken();

  return axios.delete(
    BACKEND_URL + `./${user}/recipes/${id}.json?auth-` + token
  );
}
