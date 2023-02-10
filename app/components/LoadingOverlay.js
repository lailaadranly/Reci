// React Native
import { View, ActivityIndicator, StyleSheet } from "react-native";

// Other Files & Components
import colors from "../config/colors";

function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white"></ActivityIndicator>
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: colors.base,
  },
});
