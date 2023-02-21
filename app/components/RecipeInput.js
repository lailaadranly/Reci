// React
import { useEffect, useState } from "react";

// React Native
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DropDownPicker from "react-native-dropdown-picker";
import { IconButton } from "react-native-paper";

// Other Files & Components
import colors from "../config/colors";

// Redux
import { fetchRecipes } from "../util/http";

export default function RecipeInput({
  recipeInvalid,
  onAddRecipe,
  isUpdate,
  Recipe,
  onUpdateRecipe,
}) {
  // Constants
  // Create Recipe Object
  let [recipe, setRecipe] = useState({
    id: null,
    name: "",
    ingredients: "",
    steps: "",
    favorite: false,
    totalTime: "",
    numServed: "",
  });

  const {
    name: nameIsInvalid,
    totalTime: timeIsInvalid,
    numServed: numServedInvalid,
  } = recipeInvalid;

  useEffect(() => {
    // Auto-populate inputs from selected recipe
    if (isUpdate === true) {
      async function getRecipe() {
        const recipes = await fetchRecipes();
        const id = recipes.findIndex((recipe) => recipe.id === Recipe.id);
        setRecipe(recipes[id]);
      }

      void getRecipe();
    }
  }, []);

  // Gather input for recipe
  function recipeInputHandler(inputIdentifier, enteredValue) {
    setRecipe((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  // Add Recipe (Callback to Create Recipe)
  function addRecipeHandler() {
    onAddRecipe(recipe);

    setRecipe({
      id: null,
      name: "",
      ingredients: "",
      steps: "",
      totalTime: "",
      numServed: "",
      favorite: false,
    });
  }

  // Update Recipe (Callback to Create Recipe)
  function updateRecipeHandler() {
    onUpdateRecipe(recipe);
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
              style={nameIsInvalid ? styles.inputSmallError : styles.inputSmall}
              multiline={true}
              onChangeText={recipeInputHandler.bind(this, "name")}
              value={recipe.name}
              inputMode="text"
              maxLength={35}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>Total Time (Minutes)</Text>
            <TextInput
              name="totalTime"
              style={timeIsInvalid ? styles.inputSmallError : styles.inputSmall}
              multiline={false}
              onChangeText={recipeInputHandler.bind(this, "totalTime")}
              value={recipe.totalTime}
              inputMode="numeric"
              maxLength={35}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>Number of People Served / Quantity</Text>
            <TextInput
              name="numServed"
              style={
                numServedInvalid ? styles.inputSmallError : styles.inputSmall
              }
              multiline={false}
              onChangeText={recipeInputHandler.bind(this, "numServed")}
              value={recipe.numServed}
              inputMode="numeric"
              maxLength={35}
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

      {!isUpdate ? (
        <IconButton
          size={60}
          icon="check-circle"
          iconColor={colors.actionBold}
          onPress={addRecipeHandler}
          style={{
            left: 130,
          }}
        />
      ) : null}

      {isUpdate ? (
        <IconButton
          size={50}
          icon="check-circle"
          iconColor={colors.actionBold}
          onPress={updateRecipeHandler}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    width: "100%",
  },
  backgroundContainer: {
    width: "90%",
    flex: 1,
    height: "85%",
    backgroundColor: colors.white,
  },
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginVertical: 20,
  },
  inputLarge: {
    borderWidth: 1,
    backgroundColor: colors.grey,
    borderColor: colors.grey,
    padding: 8,
    width: "100%",
    height: 200,
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
  inputSmallError: {
    borderWidth: 1,
    backgroundColor: colors.grey,
    borderColor: colors.errorRed,
    padding: 8,
    width: "100%",
    borderRadius: 5,
    padding: 10,
    top: 5,
    alignItems: "center",
  },
});
