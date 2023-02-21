// React
import React, { useEffect, useState } from "react";

// React Native
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";
import { IconButton } from "react-native-paper";

// Redux
import { fetchRecipes } from "../util/http";
import { setRecipes } from "../store/recipesSlice";
import { useDispatch } from "react-redux";

// Other Files & Components
import LoadingOverlay from "../components/LoadingOverlay";
import colors from "../config/colors";
import CategoryTile from "../components/CategoryTile";
import CreateRecipe from "../modals/CreateRecipe";

export default function MyCookbook({ navigation }) {
  // Constants
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const types = [
    { label: "All Recipes", index: 1 },
    { label: "Favorites", index: 2 },
  ];

  // Retrieve Recipes from Firebase and Set in Memory
  useEffect(() => {
    async function getRecipes() {
      setIsFetching(true);
      try {
        const recipes = await fetchRecipes();
        dispatch(setRecipes(recipes));
      } catch (error) {
        navigation.navigate("Settings");
      }
      setIsFetching(false);
    }

    void getRecipes();
  }, []);

  // Create Recipe Modal
  function startAddRecipeHandler() {
    setModalIsVisible(true);
  }

  function endAddRecipeHandler() {
    setModalIsVisible(false);
  }

  // Display Spinner when Fetching
  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <SafeAreaView style={styles.background}>
      <CreateRecipe visible={modalIsVisible} closeModal={endAddRecipeHandler} />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>My Cookbook</Text>
        <IconButton
          icon="account-circle"
          iconColor={colors.white}
          size={35}
          onPress={() => navigation.navigate("Settings")}
        />
      </View>

      <View style={styles.tileContainer}>
        <FlatList
          data={types}
          renderItem={(tileData) => {
            return <CategoryTile Title={tileData.item.label} />;
          }}
          keyExtractor={(tile, index) => {
            return tile.index;
          }}
          alwaysBounceVertical={false}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.addRecipeBanner}
          onPress={startAddRecipeHandler}
        >
          <Text style={styles.buttonLabel}>Add New Recipe</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addRecipeBanner: {
    backgroundColor: colors.white,
    width: "50%",
    height: 50,
    justifyContent: "center",
    marginVertical: 10,
    alignItems: "center",
    borderRadius: 40,
  },
  background: {
    backgroundColor: colors.base,
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  buttonContainer: { flexDirection: "row", alignItems: "center" },
  buttonLabel: {
    fontSize: 20,
    color: colors.actionLight,
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
  tileContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "90%",
    flex: 1,
    alignItems: "flex-start",
  },
});
