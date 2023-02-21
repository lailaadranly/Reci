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
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

// Other Files & Components
import colors from "../config/colors";

export default function Settings({ navigation, navigation: { goBack } }) {
  // Constants
  const dispatch = useDispatch();

  // Logout
  function logoutHandler() {
    dispatch(logout());
  }

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Settings</Text>
        <IconButton
          icon="arrow-left"
          iconColor={colors.white}
          size={35}
          onPress={() => goBack()}
        />
      </View>

      <Pressable style={styles.buttonBanner} onPress={logoutHandler}>
        <Text style={styles.buttonLabel}>Sign Out</Text>
      </Pressable>
      <Pressable style={styles.buttonBanner} onPress={logoutHandler}>
        <Text style={styles.buttonLabel}>Profile</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.base,
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  buttonBanner: {
    backgroundColor: colors.white,
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "flex-start",
    borderColor: colors.grey,
    borderWidth: 1,
  },
  buttonLabel: {
    fontSize: 18,
    color: colors.black,
    left: 15,
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
});
