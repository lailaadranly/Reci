import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";

import colors from "../config/colors";

export default function RecipeDetail({ navigation: { goBack }, route }) {
  let recipe = route.params.showRecipe;
  console.log(recipe);
  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.backgroundContainer}>
        <View style={styles.headerBanner}>
          <Text style={styles.headerTitle}>{recipe.name}</Text>
        </View>
        <View style={styles.displayContainer}>
          <Text style={styles.textHeader}>Ingredients</Text>
          <Text>{recipe.ingredients}</Text>
        </View>
        <View style={styles.displayContainer}>
          <Text style={styles.textHeader}>Steps</Text>
          <Text>{recipe.steps}</Text>
        </View>
        <TouchableHighlight style={styles.backBanner} onPress={() => goBack()}>
          <Text style={styles.backLabel}>Back to My Cookbook</Text>
        </TouchableHighlight>
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
  backBanner: {
    backgroundColor: colors.readLight,
    width: "100%",
    height: 50,
    margin: 20,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  backLabel: {
    fontSize: 24,
    fontWeight: "bold",
    justifyContent: "center",
    color: colors.white,
    bottom: 10,
  },
  displayContainer: {
    backgroundColor: colors.white,
    width: "90%",
    height: "20%",
    alignItems: "flex-start",
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
  textHeader: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
