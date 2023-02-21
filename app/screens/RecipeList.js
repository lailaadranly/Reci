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
  Image,
} from "react-native";
import { IconButton } from "react-native-paper";

// Redux
import { fetchRecipes, deleteRecipe } from "../util/http";
import { setRecipes, removeRecipe } from "../store/recipesSlice";
import { useDispatch, useSelector } from "react-redux";

// Other Files & Components
import RecipeItem from "../components/RecipeItem";
import LoadingOverlay from "../components/LoadingOverlay";
import CreateRecipe from "../modals/CreateRecipe";
import colors from "../config/colors";

export default function RecipeList({ navigation: { goBack }, route }) {
  let type = route.params.Type;

  // Constants
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(true);
  const [displayRecipes, setDisplayRecipes] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  // Retrieve Recipes from Firebase based on Type and Set in Memory
  useEffect(() => {
    async function getRecipes() {
      setIsFetching(true);
      const recipes = await fetchRecipes();
      if (type === "Favorites") {
        const filteredRecipes = recipes.filter(
          (recipe) => recipe.favorite === true
        );
        setDisplayRecipes(filteredRecipes);
      } else {
        setDisplayRecipes(recipes);
      }

      dispatch(setRecipes(recipes));
      setIsFetching(false);
    }

    void getRecipes();
  }, []);

  // Delete Recipe in Database and in Memory
  async function deleteRecipeHandler(recipe) {
    dispatch(removeRecipe(recipe));
    await deleteRecipe(recipe.id);
  }

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
        <Text style={styles.headerTitle}>{type}</Text>
        <IconButton
          icon="arrow-left"
          iconColor={colors.white}
          size={35}
          onPress={() => goBack()}
        />
      </View>

      <View style={styles.tileContainer}>
        {displayRecipes.length === 0 ? (
          <Text style={styles.infoText}>
            Let's get Started! Click "Add New Recipe" to create and favorite a
            recipe.
          </Text>
        ) : (
          <FlatList
            data={displayRecipes}
            renderItem={(recipeData) => {
              return (
                <RecipeItem
                  Recipe={recipeData.item}
                  onDeleteRecipe={deleteRecipeHandler}
                />
              );
            }}
            keyExtractor={(recipe, index) => {
              return recipe.id;
            }}
            alwaysBounceVertical={false}
          />
        )}
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
  infoText: {
    fontSize: 20,
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
