// React
import React from "react";
import { useState } from "react";

// React Native
import { StyleSheet, Text, View, SafeAreaView, Alert } from "react-native";
import { IconButton } from "react-native-paper";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";
import { removeRecipe, modifyRecipe } from "../store/recipesSlice";
import { updateRecipe, deleteRecipe } from "../util/http";

// Other Files & Components
import colors from "../config/colors";
import RecipeInput from "../components/RecipeInput";
import RecipeReadOnly from "../components/RecipeReadOnly";
import LoadingOverlay from "../components/LoadingOverlay";

export default function RecipeDetail({
  navigation: { goBack },
  navigation,
  route,
}) {
  let recipe = route.params.showRecipe;

  const [recipeInvalid, setRecipeInvalid] = useState({
    name: false,
    category: false,
  });

  // Setup
  const dispatch = useDispatch();
  const [isUpdating, setIsUpdating] = useState(false);

  // Favorite Setup
  const favoriteRecipeIds = useSelector((state) => state.favoriteRecipes.ids);
  const recipeIsFavorite = favoriteRecipeIds.includes(recipe.id);

  // Constants
  const [isUpdate, setIsUpdate] = useState(false);

  function editRecipeHandler() {
    setIsUpdate(true);
  }

  async function updateRecipeHandler(recipe) {
    let { name, category, ingredients, steps } = recipe;

    const nameIsValid = name.length > 0;
    const categoryIsValid = category != "";

    if (!nameIsValid || !categoryIsValid) {
      Alert.alert(
        "Recipe Incomplete",
        "Please enter a name and category before saving."
      );
      setRecipeInvalid({
        name: !nameIsValid,
        category: !categoryIsValid,
      });
      return;
    }

    // Recipe is Valid, Update
    setIsUpdating(true);
    // Update in Redux
    dispatch(modifyRecipe(recipe));
    // Post update to Firebase (conver to Google Cloud later)
    await updateRecipe(recipe.id, recipe);
    setIsUpdating(false);

    navigation.goBack();
  }

  async function deleteRecipeHandler() {
    // Update in Redux
    dispatch(removeRecipe(recipe));
    // Post update to Firebase (convert to Google Cloud later)
    await deleteRecipe(recipe.id);
    navigation.goBack();
  }

  function changeFavoriteStatusHandler() {
    if (recipeIsFavorite) {
      dispatch(removeFavorite({ id: recipe.id }));
    } else {
      dispatch(addFavorite({ id: recipe.id }));
    }
  }

  // Display Spinner when Updating
  if (isUpdating) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.backgroundContainer}>
        <View style={styles.headerBanner}>
          <Text style={styles.headerTitle}>
            {recipe.name.length >= 22
              ? recipe.name.slice(0, 21) + "..."
              : recipe.name}
          </Text>
          <IconButton
            style={{ left: 5 }}
            icon={recipeIsFavorite ? "star" : "star-outline"}
            iconColor="white"
            onPress={changeFavoriteStatusHandler}
          />
        </View>
        {!isUpdate ? <RecipeReadOnly Recipe={recipe} /> : null}
        {isUpdate ? (
          <RecipeInput
            Recipe={recipe}
            isUpdate={isUpdate}
            onUpdateRecipe={updateRecipeHandler}
            Category={recipe.category}
            recipeInvalid={recipeInvalid}
          />
        ) : null}
        <View style={styles.buttonContainer}>
          {!isUpdate ? (
            <IconButton
              size={40}
              icon="square-edit-outline"
              iconColor={colors.white}
              backgroundColor={colors.actionBold}
              onPress={editRecipeHandler}
            />
          ) : null}
          <IconButton
            size={40}
            icon="trash-can"
            iconColor={colors.white}
            backgroundColor={colors.errorRed}
            onPress={deleteRecipeHandler}
          />
          <IconButton
            size={40}
            icon="book-open-variant"
            iconColor={colors.white}
            backgroundColor={colors.readLight}
            onPress={() => goBack()}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    position: "absolute",
  },
  buttonContainer: {
    flexDirection: "row",
    position: "absolute",
    marginVertical: 683,
    right: 70,
  },
  headerBanner: {
    backgroundColor: colors.readBold,
    width: "100%",
    height: 50,
    marginVertical: 20,
    justifyContent: "center",
    flexDirection: "row",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    top: 10,
  },
});
