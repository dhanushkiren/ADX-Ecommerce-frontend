import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const SmallMenu = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("home")}
      >
        <MaterialCommunityIcons name="home" size={30} color="#fff" />
        <Text style={styles.menuLabel}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("profile")}
      >
        <MaterialCommunityIcons name="account" size={30} color="#fff" />
        <Text style={styles.menuLabel}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("cart")}
      >
        <MaterialCommunityIcons name="cart" size={30} color="#fff" />
        <Text style={styles.menuLabel}>Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("product")}
      >
        <MaterialCommunityIcons name="wallet" size={30} color="#fff" />
        <Text style={styles.menuLabel}>Product</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("UserDashboard")}
      >
        <MaterialCommunityIcons name="menu" size={30} color="#fff" />
        <Text style={styles.menuLabel}>Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#8D67F1",
    paddingVertical: 10,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999, // Keep the menu bar on top of other components
  },
  menuItem: {
    alignItems: "center",
  },
  menuLabel: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default SmallMenu;
