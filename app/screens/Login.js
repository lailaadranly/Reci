// React
import React from "react";
import { useState } from "react";

// React Native
import { StyleSheet, Text, View, Alert } from "react-native";

// Redux
import { useDispatch } from "react-redux";
import { authenticate } from "../store/authSlice";
import { login } from "../util/auth";

// Other Files & Components
import colors from "../config/colors";
import AuthContent from "../components/AuthContent";
import LoadingOverlay from "../components/LoadingOverlay";

export default function Login({ navigation }) {
  // Constants
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();

  // Login
  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const response = await login(email, password);
      dispatch(
        authenticate({ token: response.token, userId: response.userId })
      );
    } catch (error) {
      Alert.alert(
        "Authentication Failed",
        "Could not log you in, plese try again with valid credentials."
      );
      setIsAuthenticating(false);
    }
  }

  // Spinner while Authenticating
  if (isAuthenticating) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>RECI</Text>
        <Text style={styles.subheading}>Login here.</Text>
        <View style={styles.backgroundContainer}>
          <AuthContent isLogin={true} onAuthenticate={loginHandler} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.base,
    flex: 1,
    alignItems: "center",
  },
  container: {
    marginVertical: 100,
    width: "100%",
    alignItems: "center",
  },
  backgroundContainer: {
    alignItems: "center",
    backgroundColor: colors.white,
    width: "90%",
    height: "80%",
    borderRadius: 20,
  },
  subheading: {
    fontSize: 24,
    fontWeight: "bold",
    justifyContent: "center",
    color: colors.white,
    margin: 10,
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
    justifyContent: "center",
    color: colors.white,
  },
});
