import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import RecipeItem from "../components/RecipeItem";

import colors from "../config/colors";

export default function MyCookbook({ navigation, route }) {
  let recipeList = route.params.list;

  useEffect(() => {
    if (route.params.prev === "Login") {
      recipeList = [];
    }
  }, []);

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
          <Text style={styles.addRecipeLabel}>Add New Recipe</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  addRecipeBanner: {
    backgroundColor: colors.actionLight,
    width: "60%",
    height: 40,
    justifyContent: "flex-end",
    marginVertical: 10,
    alignItems: "center",
    borderRadius: 40,
  },
  addRecipeLabel: {
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    color: colors.white,
    bottom: 8,
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
    position: "absolute",
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
