import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const MenuBar = ({ navigation }) => {
  const menuItems = [
    { name: "Home", icon: "home", route: "home" },
    { name: "Profile", icon: "person", route: "profile" },
    { name: "Cart", icon: "shopping-cart", route: "product" },
    { name: "Payment", icon: "payment", route: "payment" },
    { name: "Menu", icon: "menu", route: "faq" },
  ];

  return (
    <View style={styles.container}>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={() => navigation.navigate(item.route)}
        >
          <Icon name={item.icon} size={24} color="#fff" />
          <Text style={styles.menuText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#7041EE", // Customize the background color
    height: 60,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  menuItem: {
    alignItems: "center",
  },
  menuText: {
    fontSize: 12,
    color: "#fff",
    marginTop: 4,
  },
});

export default MenuBar;
