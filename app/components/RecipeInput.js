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
import { IconButton } from "react-native-paper";

// Other Files & Components
import colors from "../config/colors";

// Redux
import { fetchRecipes } from "../util/http";

export default function RecipeInput({
  recipeInvalid,
  isUpdate,
  Category,
  Recipe,
  onAddRecipe,
  onUpdateRecipe,
}) {
  // Create Recipe Object
  const [recipe, setRecipe] = useState({
    id: null,
    name: "",
    ingredients: "",
    steps: "",
    category: "",
  });

  const { name: nameIsInvalid, category: categoryIsInvalid } = recipeInvalid;

  let [selectedCategory, setSelectedCategory] = useState("");

  // Set Categories
  const categories = [
    { label: "Breakfast", value: "Breakfast" },
    { label: "Lunch", value: "Lunch" },
    { label: "Dinner", value: "Dinner" },
    { label: "Snack", value: "Snack" },
    { label: "Appetizer", value: "Appetizer" },
    { label: "Dessert", value: "Dessert" },
    { label: "Drinks", value: "Drinks" },
  ];

  useEffect(() => {
    // Auto-populate inputs from selected recipe
    if (isUpdate === true) {
      async function getRecipe() {
        const recipes = await fetchRecipes();
        const id = recipes.findIndex((recipe) => recipe.id === Recipe.id);
        setRecipe(recipes[id]);
        setSelectedCategory(Category);
        recipeSelectHandler(selectedCategory);
      }

      void getRecipe();
    }
  }, []);

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
    onAddRecipe(recipe);

    setRecipe({
      id: null,
      name: "",
      ingredients: "",
      steps: "",
      category: "",
    });
  }

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
          <Text style={styles.individualLabel}>Category</Text>
          <View
            style={
              categoryIsInvalid
                ? styles.selectContainerError
                : styles.selectContainer
            }
          >
            <RNPickerSelect
              onValueChange={(value) => setSelectedCategory(value)}
              items={categories}
              onDonePress={recipeSelectHandler}
              value={selectedCategory}
              placeholder={{
                label: Category,
                value: Category,
              }}
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
      <View style={styles.buttonContainer}>
        {!isUpdate ? (
          <View>
            <IconButton
              size={40}
              icon="check"
              iconColor={colors.white}
              backgroundColor={colors.actionBold}
              onPress={addRecipeHandler}
            />
          </View>
        ) : null}
        {isUpdate ? (
          <IconButton
            size={40}
            icon="content-save"
            iconColor={colors.white}
            backgroundColor={colors.actionBold}
            onPress={updateRecipeHandler}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    marginHorizontal: 60,
    marginVertical: 593,
  },
  backgroundContainer: {
    width: "100%",
    flex: 1,
  },
  container: {
    width: "90%",
    flex: 1,
  },
  inputContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginVertical: 20,
  },
  individualLabel: {
    width: "90%",
    alignItems: "flex-start",
    marginVertical: 5,
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
  selectContainer: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.grey,
    backgroundColor: colors.grey,
    borderRadius: 5,
    color: "black",
    paddingRight: 30,
    width: "100%",
  },
  selectContainerError: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.errorRed,
    backgroundColor: colors.grey,
    borderRadius: 5,
    color: "black",
    paddingRight: 30,
    width: "100%",
  },
});
