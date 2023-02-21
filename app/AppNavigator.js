// React
import React, { useState, useEffect } from "react";

// React Navigation
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Redux
import { Provider } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "./store/authSlice";
import { store } from "./store/store";

// Local Storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Other Files & Components
import AppLoading from "expo-app-loading";
import MyCookbook from "./screens/MyCookbook";
import CreateRecipe from "./modals/CreateRecipe";
import RecipeDetail from "./screens/RecipeDetail";
import RecipeList from "./screens/RecipeList";
import Landing from "./screens/Landing";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Settings from "./screens/Settings";

const { Navigator, Screen } = createStackNavigator();

function AuthStack() {
  return (
    <Navigator initialRouteName="Landing">
      <Screen
        name="Landing"
        component={Landing}
        options={{ headerMode: "none" }}
      />
      <Screen name="Login" component={Login} options={{ headerMode: "none" }} />
      <Screen
        name="SignUp"
        component={SignUp}
        options={{ headerMode: "none" }}
      />
    </Navigator>
  );
}
function AuthenticatedStack() {
  return (
    <Navigator initialRouteName="MyCookbook">
      <Screen
        name="MyCookbook"
        component={MyCookbook}
        options={{ headerMode: "none" }}
      />
      <Screen
        name="Settings"
        component={Settings}
        options={{ headerMode: "none" }}
      />
      <Screen
        name="RecipeList"
        component={RecipeList}
        options={{ headerMode: "none" }}
      />
      <Screen
        name="RecipeDetail"
        component={RecipeDetail}
        options={{ headerMode: "none" }}
      />
    </Navigator>
  );
}

function Navigation() {
  const auth = useSelector((state) => state.authenticated);

  return (
    <NavigationContainer>
      {!auth.isAuthenticated && <AuthStack />}
      {auth.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      const storedUser = await AsyncStorage.getItem("userId");

      if (storedToken) {
        dispatch(authenticate({ token: storedToken, userId: storedUser }));
      }
      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    <AppLoading />;
  }

  return <Navigation />;
}

export default function AppNavigator() {
  return (
    <>
      <Provider store={store}>
        <Root />
      </Provider>
    </>
  );
}
