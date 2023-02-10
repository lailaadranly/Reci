// React
import React, { useEffect, useState } from "react";

// React Native
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";

// Redux
import { fetchRecipes, deleteRecipe } from "../util/http";
import { setRecipes, removeRecipe } from "../store/redux/recipesSlice";
import { useDispatch, useSelector } from "react-redux";

// Other Files & Components
import RecipeItem from "../components/RecipeItem";
import LoadingOverlay from "../components/LoadingOverlay";
import colors from "../config/colors";

export default function MyCookbook({ navigation, route }) {
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // GET data from Firebase
    async function getRecipes() {
      setIsFetching(true);
      const recipes = await fetchRecipes();
      setIsFetching(false);
      dispatch(setRecipes(recipes));
    }

    void getRecipes();
  }, []);

  const recipeList = useSelector((state) => state.recipes.allRecipes);

  async function deleteRecipeHandler(recipe) {
    dispatch(removeRecipe(recipe));
    await deleteRecipe(recipe.id);
  }

  // Display Spinner when Fetching
  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.backgroundContainer}>
        <View style={styles.headerBanner}>
          <Text style={styles.headerTitle}>My Cookbook</Text>
        </View>
        <Text style={styles.subheading}>All Recipes</Text>
        <FlatList
          data={recipeList}
          renderItem={(recipeData) => {
            return (
              <RecipeItem
                recipe={recipeData.item}
                navigation={navigation}
                list={recipeList}
                onDeleteRecipe={deleteRecipeHandler}
              />
            );
          }}
          keyExtractor={(recipe, index) => {
            return recipe.id;
          }}
          alwaysBounceVertical={false}
        />

        <Pressable
          style={styles.addRecipeBanner}
          onPress={() =>
            navigation.navigate("CreateRecipe", { list: recipeList })
          }
        >
          <Text style={styles.buttonLabel}>Add New Recipe</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  addRecipeBanner: {
    backgroundColor: colors.actionLight,
    width: "60%",
    height: 50,
    margin: 10,
    justifyContent: "flex-end",
    marginVertical: 10,
    alignItems: "center",
    borderRadius: 40,
  },
  editBanner: {
    backgroundColor: colors.actionBold,
    width: "40%",
    height: 40,
    justifyContent: "flex-end",
    marginVertical: 10,
    alignItems: "center",
    borderRadius: 40,
  },
  buttonLabel: {
    fontSize: 24,
    fontWeight: "bold",
    justifyContent: "center",
    color: colors.white,
    bottom: 10,
  },
  background: {
    backgroundColor: colors.base,
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  backgroundContainer: {
    backgroundColor: colors.white,
    width: "90%",
    height: "90%",
    marginVertical: 60,
    borderRadius: 20,
    alignItems: "center",
  },
  headerBanner: {
    backgroundColor: colors.readBold,
    width: "100%",
    height: 50,
    marginVertical: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    justifyContent: "center",
    color: colors.white,
    top: 10,
  },
  subheading: {
    fontWeight: "bold",
    fontSize: 14,
  },
});
