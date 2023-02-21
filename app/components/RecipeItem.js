// React
import { useState } from "react";

// React Native
import { View, StyleSheet, Pressable, Text } from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

// Other Files & Components
import colors from "../config/colors";

export default function RecipeItem({ Recipe, onDeleteRecipe }) {
  const navigation = useNavigation();
  const [showDelete, setShowDelete] = useState(false);

  function deleteRecipeHandler() {
    onDeleteRecipe(Recipe);
  }

  function displayDelete() {
    if (showDelete) {
      setShowDelete(false);
    } else {
      setShowDelete(true);
    }
  }

  return (
    <View>
      <Pressable
        onPress={() =>
          navigation.navigate("RecipeDetail", {
            showRecipe: Recipe,
          })
        }
        onLongPress={displayDelete}
        style={styles.recipeContainer}
      >
        <View style={styles.recipe}>
          <Text style={styles.recipeText}>{Recipe.name}</Text>
        </View>
        {showDelete ? (
          <View style={styles.iconContainer}>
            <IconButton
              icon="trash-can"
              size={24}
              iconColor={colors.white}
              onPress={deleteRecipeHandler}
            />
          </View>
        ) : null}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  recipeContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  iconContainer: {
    height: 40,
    width: 40,
    backgroundColor: colors.errorRed,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 4,
    right: 0.1,
    borderRadius: 4,
  },
  recipe: {
    backgroundColor: colors.offWhite,
    height: 40,
    width: "100%",
    borderRadius: 4,
    alignItems: "flex-start",
    margin: 4,
    borderColor: colors.white,
    borderWidth: 2,
  },
  recipeText: {
    marginLeft: 10,
    marginVertical: 11,
    maxWidth: 260,
  },
});
