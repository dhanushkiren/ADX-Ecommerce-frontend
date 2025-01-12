import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const MenuOptions = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate("faq")}
      >
        <Text style={styles.optionText}>FAQ</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate("CustomerService")}
      >
        <Text style={styles.optionText}>Customer Service</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate("ManageAccount")}
      >
        <Text style={styles.optionText}>Manage Account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate("Orders")}
      >
        <Text style={styles.optionText}>Orders</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  option: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    marginBottom: 10,
    borderRadius: 5,
  },
  optionText: { fontSize: 16, color: "#333" },
});

export default MenuOptions;
