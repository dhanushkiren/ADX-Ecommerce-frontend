import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";

const { width, height } = Dimensions.get("window");

const MenuOptions = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.menuContainer}>
        {/* Menu items */}
        <View style={styles.menuContent}>
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
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("UserDashboard")}
          >
            <Text style={styles.optionText}>User Dashboard</Text>
          </TouchableOpacity>
          {/* New Customer Support Button */}
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("ChatBot")} // Navigate to ChatBot screen
          >
            <Text style={styles.optionText}>Customer Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    paddingHorizontal: width * 0.05, // Dynamic padding for responsiveness
  },
  menuContainer: {
    alignItems: "center",
    justifyContent: "flex-start", // Adjusted to align items from the top
    paddingTop: 50, // Added padding to prevent content from being too close to top
  },
  menuContent: {
    width: "100%", // Full width for the menu content
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  option: {
    paddingVertical: 15,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "rgb(141, 103, 241)", // Updated color
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  optionText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default MenuOptions;
