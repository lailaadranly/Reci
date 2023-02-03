import {
  TouchableHighlight,
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

import { useState } from "react";

import colors from "../config/colors";

export default function RecipeInput(props, { navigation }) {
  // Create Recipe Object
  const [recipe, setRecipe] = useState({
    id: null,
    name: "",
    ingredients: "",
    steps: "",
    category: "",
  });

  // Set Categories
  const categories = [
    { key: "1", value: "Breakfast" },
    { key: "2", value: "Lunch" },
    { key: "3", value: "Dinner" },
    { key: "4", value: "Snack" },
    { key: "5", value: "Appetizer" },
    { key: "6", value: "Dessert" },
    { key: "7", value: "Drinks" },
  ];
  let [selectedCategory, setSelectedCategory] = useState("");

  function recipeInputHandler(inputIdentifier, enteredValue) {
    setRecipe((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  function recipeSelectHandler() {
    setRecipe((currentInputValues) => {
      return {
        ...currentInputValues,
        category: selectedCategory,
      };
    });
  }

  function addRecipeHandler() {
    props.onAddRecipe(recipe);
    setRecipe({
      id: null,
      name: "",
      ingredients: "",
      steps: "",
      category: "",
    });
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.backgroundContainer}
        enabled
        keyboardVerticalOffset={100}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.inputContainer}>
            <Text>Name</Text>
            <TextInput
              name="name"
              style={styles.inputSmall}
              multiline={true}
              onChangeText={recipeInputHandler.bind(this, "name")}
              value={recipe.name}
              inputMode="text"
            />
          </View>
          <View style={styles.selectContainer}>
            <Text>Category</Text>
            <SelectList
              setSelected={(val) => setSelectedCategory(val)}
              data={categories}
              save="value"
              boxStyles={styles.inputSmall}
              dropdownStyles={styles.inputLarge}
              dropdownTextStyles={{ left: -10 }}
              placeholder="Select Category"
              onSelect={recipeSelectHandler}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>Ingredients</Text>
            <TextInput
              name="ingredients"
              style={styles.inputLarge}
              multiline={true}
              onChangeText={recipeInputHandler.bind(this, "ingredients")}
              value={recipe.ingredients}
              inputMode="text"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>Steps</Text>
            <TextInput
              style={styles.inputLarge}
              multiline={true}
              name="steps"
              onChangeText={recipeInputHandler.bind(this, "steps")}
              value={recipe.steps}
              inputMode="text"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <TouchableHighlight
        style={styles.createBanner}
        onPress={addRecipeHandler}
      >
        <Text style={styles.createLabel}>Create</Text>
      </TouchableHighlight>
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
    width: "100%",
    flex: 1,
  },
  container: {
    backgroundColor: colors.white,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flex: 1,
  },
  createBanner: {
    backgroundColor: colors.actionBold,
    width: "100%",
    height: 50,
    justifyContent: "flex-end",
    marginVertical: 30,
    alignItems: "center",
  },
  createLabel: {
    fontSize: 24,
    fontWeight: "bold",
    justifyContent: "center",
    color: colors.white,
    bottom: 10,
  },
  inputContainer: {
    backgroundColor: colors.white,
    width: "90%",
    alignItems: "flex-start",
    marginVertical: 20,
    left: 20,
  },
  inputLarge: {
    borderWidth: 1,
    backgroundColor: colors.grey,
    borderColor: colors.grey,
    padding: 8,
    width: "100%",
    height: 150,
    borderRadius: 5,
    padding: 10,
    top: 5,
  },
  inputSmall: {
    borderWidth: 1,
    backgroundColor: colors.grey,
    borderColor: colors.grey,
    padding: 8,
    width: "100%",
    borderRadius: 5,
    padding: 10,
    top: 5,
    alignItems: "center",
  },
  selectContainer: {
    width: "90%",
    left: 20,
  },
});
