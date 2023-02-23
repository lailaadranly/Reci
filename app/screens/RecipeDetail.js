// React
import React, { useEffect } from "react";
import { useState } from "react";

// React Native
import { StyleSheet, Text, View, SafeAreaView, Alert } from "react-native";
import { IconButton } from "react-native-paper";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";
import { removeRecipe, modifyRecipe } from "../store/recipesSlice";
import { fetchRecipes, updateRecipe, deleteRecipe } from "../util/http";

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
  const [recipe, setRecipe] = useState({
    id: route.params.showRecipe.id,
    name: "",
    ingredients: "",
    steps: "",
    favorite: null,
    totalTime: "",
    numServed: "",
  });

  const [recipeInvalid, setRecipeInvalid] = useState({
    name: false,
    totalTime: false,
    numServed: false,
  });

  // Setup
  const dispatch = useDispatch();
  const [isUpdating, setIsUpdating] = useState(true);

  // Constants
  const [isUpdate, setIsUpdate] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    void getRecipe();
  }, []);

  async function getRecipe() {
    const recipes = await fetchRecipes();
    const id = recipes.findIndex((rec) => rec.id === recipe.id);
    setRecipe(recipes[id]);
    setIsFavorite(recipes[id].favorite);
    setIsUpdating(false);
  }

  function toggleEditRecipe() {
    if (isUpdate === true) {
      setIsUpdate(false);
    } else {
      setIsUpdate(true);
    }
  }

  async function updateRecipeHandler(recipe) {
    let { name, ingredients, steps, favorite, totalTime, numServed } = recipe;

    const nameIsValid = name.length > 0;
    const timeIsValid = totalTime.length > 0;
    const numServedIsValid = numServed.length > 0;

    if (!nameIsValid || !timeIsValid || !numServedIsValid) {
      Alert.alert(
        "Recipe Incomplete",
        "Please enter a name, total time, and number served before saving."
      );
      setRecipeInvalid({
        name: !nameIsValid,
        totalTime: !timeIsValid,
        numServed: !numServedIsValid,
      });
      return;
    }

    // Recipe is Valid, Update
    setIsUpdating(true);
    // Update in Redux
    dispatch(modifyRecipe(recipe));
    // Post update to Firebase
    await updateRecipe(recipe.id, recipe);
    void getRecipe();
    setIsUpdate(false);
    setIsUpdating(false);
  }

  async function deleteRecipeHandler() {
    // Update in Redux
    dispatch(removeRecipe(recipe));
    // Post update to Firebase (convert to Google Cloud later)
    await deleteRecipe(recipe.id);
    navigation.goBack();
  }

  // Update Favorite Status
  async function changeFavoriteStatusHandler() {
    if (isFavorite) {
      dispatch(removeFavorite(recipe));
      setIsFavorite(false);
    } else {
      dispatch(addFavorite(recipe));
      setIsFavorite(true);
    }

    // Update the recipe with favorite status
    setRecipe((currentInputValues) => {
      return {
        ...currentInputValues,
        favorite: isFavorite,
      };
    });

    dispatch(modifyRecipe(recipe));

    await updateRecipe(recipe.id, recipe);
  }

  // Display Spinner when Updating
  if (isUpdating) {
    return <LoadingOverlay />;
  }

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>
          {recipe.name.length >= 21
            ? recipe.name.slice(0, 20) + "..."
            : recipe.name}
        </Text>

        <IconButton
          icon="arrow-left"
          iconColor={colors.white}
          size={35}
          onPress={() => goBack()}
        />
      </View>

      <View style={styles.displayContainer}>
        {!isUpdate ? <RecipeReadOnly Recipe={recipe} /> : null}
        {isUpdate ? (
          <RecipeInput
            Recipe={recipe}
            isUpdate={isUpdate}
            onUpdateRecipe={updateRecipeHandler}
            recipeInvalid={recipeInvalid}
          />
        ) : null}
      </View>

      <View style={styles.buttonContainer}>
        {!isUpdate ? (
          <IconButton
            size={35}
            icon="square-edit-outline"
            iconColor={colors.white}
            onPress={toggleEditRecipe}
          />
        ) : null}
        {isUpdate ? (
          <IconButton
            size={35}
            icon="cancel"
            iconColor={colors.white}
            onPress={toggleEditRecipe}
          />
        ) : null}
        <IconButton
          icon="trash-can"
          iconColor={colors.white}
          onPress={deleteRecipeHandler}
          size={35}
        />
        <IconButton
          icon={isFavorite ? "star" : "star-outline"}
          iconColor="white"
          onPress={changeFavoriteStatusHandler}
          size={35}
        />
      </View>
    </SafeAreaView>
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
  buttonContainer: {
    flexDirection: "row",
  },
  displayContainer: {
    backgroundColor: colors.white,
    width: "90%",
    height: "85%",
    borderRadius: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
  },
});
