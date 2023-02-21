// React

// React Native
import { View, StyleSheet, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Other Files & Components
import colors from "../config/colors";

export default function CategoryTile({ Title }) {
  const navigation = useNavigation();

  return (
    <View>
      <Pressable
        onPress={() => navigation.navigate("RecipeList", { Type: Title })}
      >
        <View style={styles.tile}>
          <Text style={styles.recipeText}>{Title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: colors.offWhite,
    height: 80,
    borderRadius: 4,
    margin: 5,
    justifyContent: "center",
    borderColor: colors.white,
    borderWidth: 5,
  },
  recipeText: {
    marginLeft: 10,
    marginVertical: 11,
    maxWidth: 260,
    fontWeight: "bold",
  },
});
