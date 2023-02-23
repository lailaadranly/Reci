import axios from "axios";
import { MY_API_KEY } from "../config/config";

export async function extractRecipe(link) {
  const options = {
    method: "GET",
    url: "https://recipe-grabber.p.rapidapi.com/v1/recipes/extract",
    params: {
      url: link,
    },
    headers: {
      "X-RapidAPI-Key": MY_API_KEY,
      "X-RapidAPI-Host": "recipe-grabber.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);

    return response.data.recipe;
  } catch (error) {
    console.error(error);
  }
}
