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
  Modal,
  TextInput,
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

export default function Upload(props, { navigation, route }) {
  let [recipeList, setRecipeList] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();

  const [recipeInvalid, setRecipeInvalid] = useState({
    name: false,
    category: false,
  });

  async function uploadRecipeHandler() {
    setIsUploading(true);
    // parse link that is uploaded

    // pass back to create recipe

    // pass to recipe input

    setIsUploading(false);

    props.closeModal();
  }

  // Display Spinner when Fetching
  if (isUploading) {
    return <LoadingOverlay />;
  }

  return (
    <Modal visible={props.visible} animationType="fade">
      <SafeAreaView style={styles.background}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
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
            <TextInput
              name="link"
              style={styles.inputSmall}
              //multiline={true}
              //onChangeText={recipeInputHandler.bind(this, "name")}
              //value={recipe.name}
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
    left: 33,
    marginVertical: 740,
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
    color: colors.white,
  },
});
