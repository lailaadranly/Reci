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
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

// Other Files & Components
import colors from "../config/colors";

// Redux

export default function AuthForm({ onSubmit, isLogin, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "confirmEmail":
        setEnteredConfirmEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.inputContainer}>
        <Text>Email Address</Text>
        <TextInput
          style={emailIsInvalid ? styles.inputSmallError : styles.inputSmall}
          multiline={true}
          onChangeText={updateInputValueHandler.bind(this, "email")}
          value={enteredEmail}
          inputMode="email"
        />
      </View>
      {!isLogin ? (
        <View style={styles.inputContainer}>
          <Text>Confirm Email Address</Text>
          <TextInput
            style={emailsDontMatch ? styles.inputSmallError : styles.inputSmall}
            multiline={true}
            onChangeText={updateInputValueHandler.bind(this, "confirmEmail")}
            value={enteredConfirmEmail}
            inputMode="email"
          />
        </View>
      ) : null}
      <View style={styles.inputContainer}>
        <Text>Password</Text>
        {!isLogin ? (
          <Text style={{ color: colors.darkGrey, fontSize: 12 }}>
            Must be greater than 6 characters.
          </Text>
        ) : null}
        <TextInput
          style={passwordIsInvalid ? styles.inputSmallError : styles.inputSmall}
          onChangeText={updateInputValueHandler.bind(this, "password")}
          value={enteredPassword}
          inputMode="text"
          secureTextEntry={true}
        />
      </View>
      {!isLogin ? (
        <View style={styles.inputContainer}>
          <Text>Confirm Password</Text>
          <TextInput
            style={
              passwordsDontMatch ? styles.inputSmallError : styles.inputSmall
            }
            onChangeText={updateInputValueHandler.bind(this, "confirmPassword")}
            value={enteredConfirmPassword}
            inputMode="text"
            secureTextEntry={true}
          />
        </View>
      ) : null}
      <View style={styles.buttonContainer}>
        <View>
          <IconButton
            size={60}
            icon="check-circle"
            iconColor={colors.actionBold}
            onPress={submitHandler}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    marginHorizontal: -10,
    marginVertical: 420,
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
  inputSmallError: {
    borderWidth: 1,
    backgroundColor: colors.grey,
    borderColor: colors.errorRed,
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
  labelInvalid: {
    color: colors.errorRed,
  },
});
