import { View, StyleSheet, Pressable, Text } from "react-native";

import colors from "../config/colors";

export default function RecipeItem(props) {
  return (
    <Pressable
      onPress={() =>
        props.navigation.navigate("RecipeDetail", {
          showRecipe: props.recipe,
        })
      }
    >
      <View style={styles.recipe}>
        <Text style={styles.recipeText}>{props.recipe.name}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  recipe: {
    backgroundColor: colors.offWhite,
    height: 40,
    width: 300,
    borderRadius: 4,
    margin: 10,
  },
  recipeText: {
    marginLeft: 10,
    marginVertical: 11,
  },
});
