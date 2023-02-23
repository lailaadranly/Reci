// React
import React, { useState, useEffect, useCallback } from "react";

// React Native
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Modal,
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
import Upload from "../modals/Upload";

export default function CreateRecipe(props) {
  // Constants
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  let [recipeList, setRecipeList] = useState([]);
  const [recipeInvalid, setRecipeInvalid] = useState({
    name: false,
  });
  const [uploadedRecipe, setUploadedRecipe] = useState({
    id: null,
    name: "",
    ingredients: "",
    steps: "",
    favorite: false,
    totalTime: "",
    numServed: "",
  });
  const [isUpload, setIsUpload] = useState(false);

  useEffect(() => {
    // Reset Recipe Input
    if (props.visible === true) {
      setUploadedRecipe({
        id: null,
        name: "",
        ingredients: "",
        steps: "",
        favorite: false,
        totalTime: "",
        numServed: "",
      });
    }
  }, [props.visible]);

  // Add Recipe in Database and Store in Memory
  async function addRecipeHandler(recipe) {
    // Validate Recipe Inputs
    let { name, ingredients, steps, favorite, totalTime, numServed } = recipe;

    const nameIsValid = name.length > 0;
    const timeIsValid = totalTime.length > 0;
    const numServedIsValid = numServed.length > 0;

    if (!nameIsValid || !timeIsValid || !numServedIsValid) {
      Alert.alert(
        "Recipe Incomplete",
        "Please enter a name, total time, and number served before saving."
      );
      setRecipeInvalid({
        name: !nameIsValid,
        totalTime: !timeIsValid,
        numServed: !numServedIsValid,
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
        favorite: recipe.favorite,
        totalTime: recipe.totalTime,
        numServed: recipe.numServed,
      },
    ]);
    setIsSubmitting(true);

    // Post to Firebase
    const id = await storeRecipe(recipe);
    setIsSubmitting(false);

    // Store in Redux context with id from Firebase
    dispatch(addRecipe({ ...recipe, id: id }));

    props.closeModal();
  }

  // Set Create Recipe Modal Visibility
  function startUploadRecipeHandler() {
    setModalIsVisible(true);
  }

  function closeUploadRecipeHandler() {
    setModalIsVisible(false);
  }

  function uploadRecipeHandler(recipe) {
    setUploadedRecipe(recipe);
    setIsUpload(true);
    setModalIsVisible(false);
  }

  // Display Spinner when Fetching
  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <Modal visible={props.visible} animationType="slide" avoidKeyboard={true}>
      <SafeAreaView style={styles.background}>
        <Upload
          visible={modalIsVisible}
          uploadHandler={uploadRecipeHandler}
          closeModal={closeUploadRecipeHandler}
        />

        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Add New Recipe</Text>
          <IconButton
            size={35}
            icon="upload"
            iconColor={colors.white}
            onPress={startUploadRecipeHandler}
          />
        </View>

        <View style={styles.displayContainer}>
          <RecipeInput
            onAddRecipe={addRecipeHandler}
            recipeInvalid={recipeInvalid}
            Recipe={uploadedRecipe}
            isUpload={isUpload}
            closeModal={props.closeModal}
          />
        </View>
      </SafeAreaView>
    </Modal>
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
  displayContainer: {
    backgroundColor: colors.white,
    width: "90%",
    height: "93%",
    borderRadius: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
  },
});
