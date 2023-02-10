import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import MyCookbook from "./screens/MyCookbook";
import CreateRecipe from "./screens/CreateRecipe";
import RecipeDetail from "./screens/RecipeDetail";
import Login from "./screens/Login";

import { store } from "./store/redux/store";

const { Navigator, Screen } = createStackNavigator();

export default function AppNavigator() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator initialRouteName="Login">
          <Screen
            name="Login"
            component={Login}
            options={{ headerMode: "none" }}
          />
          <Screen
            name="MyCookbook"
            component={MyCookbook}
            options={{ headerMode: "none" }}
          />
          <Screen
            name="CreateRecipe"
            component={CreateRecipe}
            options={{ headerMode: "none" }}
          />
          <Screen
            name="RecipeDetail"
            component={RecipeDetail}
            options={{ headerMode: "none" }}
          />
        </Navigator>
      </NavigationContainer>
    </Provider>
  );
}
