import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import RecipeInput from "../components/RecipeInput";
import colors from "../config/colors";

export default function CreateRecipe({
  navigation,
  navigation: { goBack },
  route,
}) {
  let [recipeList, setRecipeList] = useState([]);

  function addRecipeHandler(recipe) {
    setRecipeList((currentRecipeList) => [
      ...currentRecipeList,
      {
        name: recipe.name,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        category: recipe.category,
        id: Math.random().toString(),
      },
    ]);
  }

  useEffect(() => {
    setRecipeList(route.params.list);

    if (recipeList.length > route.params.list.length) {
      navigation.navigate("MyCookbook", {
        list: recipeList,
      });
    }
  }, [recipeList]);

  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.backgroundContainer}>
        <View style={styles.headerBanner}>
          <Text style={styles.headerTitle}>Add New Recipe</Text>
        </View>
        <RecipeInput onAddRecipe={addRecipeHandler} />
        <Pressable style={styles.cancelBanner} onPress={() => goBack()}>
          <Text style={styles.cancelLabel}>Cancel</Text>
        </Pressable>
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
  cancelBanner: {
    backgroundColor: colors.errorRed,
    width: "100%",
    height: 50,
    justifyContent: "flex-end",
    alignItems: "center",
    bottom: 10,
  },
  cancelLabel: {
    fontSize: 24,
    fontWeight: "bold",
    justifyContent: "center",
    color: colors.white,
    bottom: 10,
  },
  headerBanner: {
    backgroundColor: colors.actionLight,
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
});
