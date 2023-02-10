// React
import React from "react";

// React Native
import { StyleSheet, Text, View, ScrollView } from "react-native";

// Other Files & Components
import colors from "../config/colors";

export default function RecipeReadOnly(props) {
  let recipeData = props.recipe;
  return (
    <View style={styles.displayContainer}>
      <ScrollView>
        <View style={styles.readOnlyText}>
          <Text style={styles.textHeader}>Category</Text>
          <Text>{recipeData.category}</Text>
        </View>
        <View style={styles.readOnlyText}>
          <Text style={styles.textHeader}>Ingredients</Text>
          <Text>{recipeData.ingredients}</Text>
        </View>
        <View style={styles.readOnlyText}>
          <Text style={styles.textHeader}>Steps</Text>
          <Text>{recipeData.steps}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  displayContainer: {
    backgroundColor: colors.white,
    width: "90%",
    height: "78%",
  },
  readOnlyText: {
    margin: 8,
  },
  textHeader: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
