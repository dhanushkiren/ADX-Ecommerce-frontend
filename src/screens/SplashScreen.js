import { Image, StyleSheet, View } from "react-native";
import Icon from "../../assets/logo.jpeg";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image source={Icon} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
});
