// React
import React from "react";

// React Native
import { StyleSheet, Text, View, Image, Pressable } from "react-native";

// Other Files & Components
import colors from "../config/colors";

export default function Landing({ navigation }) {
  return (
    <View style={styles.background}>
      <View style={styles.backgroundContainer}>
        <Text style={styles.title}>RECI</Text>
        <Text style={styles.subheading}>Anyone can cook.</Text>
      </View>
      <Image style={styles.logo} source={require("../assets/logo.png")}></Image>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => navigation.navigate("Login")}
          style={styles.loginBanner}
        >
          <Text style={styles.buttonLabel}>Login</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("SignUp")}
          style={styles.signUpBanner}
        >
          <Text style={styles.buttonLabel}>Sign Up</Text>
        </Pressable>
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
  backgroundContainer: {
    marginVertical: 100,
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    marginVertical: 60,
  },
  buttonLabel: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.white,
  },
  loginBanner: {
    backgroundColor: colors.actionBold,
    width: "100%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 250,
    height: 250,
    alignItems: "center",
  },
  signUpBanner: {
    backgroundColor: colors.actionLight,
    width: "100%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  subheading: {
    fontSize: 24,
    fontWeight: "bold",
    justifyContent: "center",
    color: colors.white,
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
    justifyContent: "center",
    color: colors.white,
  },
});
