// React
import React from "react";

// React Native
import { StyleSheet, Text, View, ScrollView } from "react-native";

// Other Files & Components
import colors from "../config/colors";

export default function RecipeReadOnly({ Recipe }) {
  return (
    <View>
      <ScrollView>
        <View style={styles.readOnlyText}>
          <Text style={styles.smallHeader}>
            Takes {Recipe.totalTime} for {Recipe.numServed}
          </Text>
        </View>
        <View style={styles.readOnlyText}>
          <Text style={styles.largeHeader}>Ingredients</Text>
          <Text>{Recipe.ingredients}</Text>
        </View>
        <View style={styles.readOnlyText}>
          <Text style={styles.largeHeader}>Steps</Text>
          <Text>{Recipe.steps}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  displayContainer: {
    backgroundColor: colors.white,
    width: "90%",
    height: "85%",
    borderRadius: 20,
  },
  readOnlyText: {
    margin: 15,
  },
  largeHeader: {
    fontWeight: "bold",
    fontSize: 18,
  },
  smallHeader: {
    //fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 16,
  },
});
