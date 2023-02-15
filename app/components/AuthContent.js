// React
import { useEffect, useState } from "react";

// React Native
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Other Files & Components
import colors from "../config/colors";
import AuthForm from "./AuthForm";

// Redux

export default function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.navigate("SignUp");
    } else {
      navigation.navigate("Login");
    }
  }

  function submitHandler(credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.backgroundContainer}
        enabled
        keyboardVerticalOffset={100}
      >
        <AuthForm
          isLogin={isLogin}
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
        />
        <View style={styles.buttonContainer}>
          <Button
            color={colors.actionLight}
            onPress={switchAuthModeHandler}
            title={isLogin ? "Sign up instead" : "Login here"}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    marginVertical: 445,
    marginHorizontal: 70,
    flexDirection: "row",
    alignItems: "center",
  },
  backgroundContainer: {
    width: "100%",
    flex: 1,
  },
  container: {
    width: "90%",
    flex: 1,
  },
  inputContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginVertical: 20,
  },
  individualLabel: {
    width: "90%",
    alignItems: "flex-start",
    marginVertical: 5,
  },
  inputLarge: {
    borderWidth: 1,
    backgroundColor: colors.grey,
    borderColor: colors.grey,
    padding: 8,
    width: "100%",
    height: 150,
    borderRadius: 5,
    padding: 10,
    top: 5,
  },
  inputSmall: {
    borderWidth: 1,
    backgroundColor: colors.grey,
    borderColor: colors.grey,
    padding: 8,
    width: "100%",
    borderRadius: 5,
    padding: 10,
    top: 5,
    alignItems: "center",
  },
  selectContainer: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.grey,
    backgroundColor: colors.grey,
    borderRadius: 5,
    color: "black",
    paddingRight: 30,
    width: "100%",
  },
});
