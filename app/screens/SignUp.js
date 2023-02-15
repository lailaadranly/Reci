// React
import React, { useState } from "react";

// React Native
import { StyleSheet, Text, View, Alert } from "react-native";

// Redux
import { useDispatch } from "react-redux";
import { createUser } from "../util/auth";
import { authenticate } from "../store/authSlice";

// Other Files & Components
import colors from "../config/colors";
import AuthContent from "../components/AuthContent";
import LoadingOverlay from "../components/LoadingOverlay";

export default function SignUp({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const response = await createUser(email, password);
      dispatch(
        authenticate({ token: response.token, userId: response.userId })
      );
    } catch (error) {
      Alert.alert(
        "Authentication Failed",
        "Could not create user, please check your inputs and try again."
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>RECI</Text>
        <Text style={styles.subheading}>Let's get started.</Text>
        <View style={styles.backgroundContainer}>
          <AuthContent onAuthenticate={signupHandler} />
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
