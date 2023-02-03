import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as SecureStore from "expo-secure-store";

import AppNavigator from "./app/AppNavigator";
import RecipeDetails from "./app/screens/CreateRecipe";

export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
