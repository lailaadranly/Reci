// React
import React from "react";

// React Native
import { StyleSheet, Text, View, Image, Pressable } from "react-native";

// Other Files & Components
import colors from "../config/colors";

export default function Login({ navigation }) {
  return (
    <View style={styles.background}>
      <View style={styles.backgroundContainer}>
        <Text style={styles.title}>RECI</Text>
        <Text style={styles.subheading}>Anyone can cook.</Text>
      </View>
      <Image style={styles.logo} source={require("../assets/logo.png")}></Image>
      <Pressable
        style={styles.loginButton}
        onPress={() => navigation.navigate("MyCookbook", { prev: "Login" })}
      >
        <Text style={styles.buttonLabel}>Get Started</Text>
      </Pressable>
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
  buttonLabel: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.white,
    bottom: 25,
  },
  loginButton: {
    backgroundColor: colors.actionBold,
    width: "100%",
    height: 90,
    justifyContent: "flex-end",
    margin: 100,
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 250,
    alignItems: "center",
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
