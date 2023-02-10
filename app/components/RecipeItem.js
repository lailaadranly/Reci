// React
import { useState } from "react";

// React Native
import { View, StyleSheet, Pressable, Text } from "react-native";
import { IconButton } from "react-native-paper";

// Other Files & Components
import colors from "../config/colors";

export default function RecipeItem(props) {
  const [showDelete, setShowDelete] = useState(false);

  function deleteRecipeHandler() {
    props.onDeleteRecipe(props.recipe);
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
          props.navigation.navigate("RecipeDetail", {
            showRecipe: props.recipe,
          })
        }
        onLongPress={displayDelete}
        style={styles.recipeContainer}
      >
        <View style={styles.recipe}>
          <Text style={styles.recipeText}>
            {props.recipe.name.length >= 38
              ? props.recipe.name.slice(0, 37) + "..."
              : props.recipe.name}
          </Text>
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
    top: 5,
    right: 16,
    borderRadius: 4,
  },
  recipe: {
    backgroundColor: colors.offWhite,
    height: 40,
    width: "90%",
    borderRadius: 4,
    alignItems: "flex-start",
    margin: 5,
  },
  recipeText: {
    marginLeft: 10,
    marginVertical: 11,
    maxWidth: 260,
  },
});
