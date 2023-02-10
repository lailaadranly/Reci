import axios from "axios";

const BACKEND_URL = "https://reci-4abfc-default-rtdb.firebaseio.com";

export async function storeRecipe(recipeData) {
  const response = await axios.post(BACKEND_URL + "/recipes.json", recipeData);
  const id = response.data.name;
  return id;
}

export async function fetchRecipes() {
  const response = await axios.get(BACKEND_URL + "/recipes.json");

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

export function updateRecipe(id, recipeData) {
  return axios.put(BACKEND_URL + `./recipes/${id}.json`, recipeData);
}

export function deleteRecipe(id) {
  return axios.delete(BACKEND_URL + `./recipes/${id}.json`);
}
