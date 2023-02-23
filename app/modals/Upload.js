// React
import React, { useState } from "react";

// React Native
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { IconButton } from "react-native-paper";

// Redux
import { extractRecipe } from "../util/extractRecipe";

// Other Files & Components
import colors from "../config/colors";
import LoadingOverlay from "../components/LoadingOverlay";

export default function Upload(props) {
  const [url, setURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  async function uploadRecipeHandler() {
    setIsUploading(true);

    const recipeResponse = await extractRecipe(url);

    try {
      const recipeResponse = await extractRecipe(url);
      const extractedRecipe = {
        id: null,
        name: recipeResponse.name,
        ingredients: recipeResponse.recipeIngredient.join("\n"),
        steps: recipeResponse.recipeInstructions.join("\n"),
        favorite: false,
        totalTime: "",
        numServed: recipeResponse.recipeYield,
      };
      setIsUploading(false);
      props.uploadHandler(extractedRecipe);
    } catch (error) {
      setIsUploading(false);
      Alert.alert(
        "Upload Failed",
        "Please ensure you have a valid recipe URL."
      );
    }
  }

  // Display Spinner when Fetching
  if (isUploading) {
    return <LoadingOverlay />;
  }

  return (
    <Modal visible={props.visible} animationType="fade">
      <SafeAreaView style={styles.background}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Upload Recipe</Text>

          <IconButton
            size={35}
            icon="check-circle"
            iconColor={colors.white}
            onPress={uploadRecipeHandler}
          />
          <IconButton
            icon="arrow-left"
            iconColor={colors.white}
            size={35}
            onPress={props.closeModal}
          />
        </View>
        <View style={styles.displayContainer}>
          <View style={styles.inputContainer}>
            <Text>Link</Text>
            <Text style={{ color: colors.darkGrey, fontSize: 12 }}>
              Powered by RecipeGrabber.io.
            </Text>
            <TextInput
              name="url"
              style={styles.inputSmall}
              onChangeText={(val) => setURL(val)}
              value={url}
              inputMode="url"
            />
          </View>
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
  displayContainer: {
    backgroundColor: colors.white,
    width: "90%",
    height: "15%",
    borderRadius: 20,
  },
  inputSmall: {
    borderWidth: 1,
    backgroundColor: colors.grey,
    borderColor: colors.grey,
    padding: 8,
    width: "90%",
    borderRadius: 5,
    padding: 10,
    top: 5,
  },
  inputContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginVertical: 20,
    margin: 17,
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
