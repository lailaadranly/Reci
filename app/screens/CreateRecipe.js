// React
import React, { useState, useEffect } from "react";

// React Native
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Alert,
} from "react-native";
import { IconButton } from "react-native-paper";

// Redux
import { storeRecipe } from "../util/http";
import { useDispatch } from "react-redux";
import { addRecipe } from "../store/recipesSlice";

// Other Files & Components
import colors from "../config/colors";
import RecipeInput from "../components/RecipeInput";
import LoadingOverlay from "../components/LoadingOverlay";

export default function CreateRecipe({
  navigation,
  navigation: { goBack },
  route,
}) {
  let [recipeList, setRecipeList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const [recipeInvalid, setRecipeInvalid] = useState({
    name: false,
    category: false,
  });

  async function addRecipeHandler(recipe) {
    // Validate Recipe Inputs
    let { name, category, ingredients, steps } = recipe;

    const nameIsValid = name.length > 0;
    const categoryIsValid = category != "";

    if (!nameIsValid || !categoryIsValid) {
      Alert.alert(
        "Recipe Incomplete",
        "Please enter a name and category before saving."
      );
      setRecipeInvalid({
        name: !nameIsValid,
        category: !categoryIsValid,
      });
      return;
    }

    // Recipe is Valid, save to List
    setRecipeList((currentRecipeList) => [
      ...currentRecipeList,
      {
        name: recipe.name,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        category: recipe.category,
      },
    ]);
    setIsSubmitting(true);

    // POST to Firebase (Change to Google Cloud)
    const id = await storeRecipe(recipe);
    setIsSubmitting(false);

    // Store in Redux context with id from Firebase
    dispatch(addRecipe({ ...recipe, id: id }));
  }

  useEffect(() => {
    setRecipeList(route.params.list);

    if (recipeList.length > route.params.list.length) {
      navigation.navigate("MyCookbook");
    }
  }, [recipeList]);

  // Display Spinner when Fetching
  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.backgroundContainer}>
        <View style={styles.headerBanner}>
          <Text style={styles.headerTitle}>Add New Recipe</Text>
        </View>
        <RecipeInput
          onAddRecipe={addRecipeHandler}
          recipeInvalid={recipeInvalid}
        />
        <View style={styles.buttonContainer}>
          <IconButton
            size={40}
            icon="cancel"
            iconColor={colors.white}
            backgroundColor={colors.errorRed}
            onPress={() => goBack()}
          />
        </View>
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
  buttonContainer: {
    position: "absolute",
    left: 10,
    marginVertical: 683,
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
