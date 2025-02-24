import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // To use FontAwesome icons
import { clearAsyncStorage } from "../utils/asyncStorage";

const UserDashboard = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <FontAwesome name="arrow-left" size={24} color="#2C2929" />
        </TouchableOpacity>
        <Text style={styles.headerText}>USER DASHBOARD</Text>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <Text style={styles.title}>ORDERS</Text>

        {/* Dashboard Options */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("order checkout")}
        >
          <Text style={styles.optionText}>Order History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Order Status</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Payment Status</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Transaction Records</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Delivery Status</Text>
        </TouchableOpacity>

        <Text style={styles.title}>PAYMENT OPTIONS</Text>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Payment Manager</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Payment Method</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Receipt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Refund Tracking</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={async () => {
            await clearAsyncStorage(); // Clear AsyncStorage
            navigation.replace("login"); // Navigate to Login screen
          }}
        >
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    paddingBottom: 20, // To provide space at the bottom when scrolling
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  backButton: {
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C2929",
    marginLeft: 10,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 20,
  },
  option: {
    padding: 15,
    backgroundColor: "#7041EE",
    marginBottom: 10,
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default UserDashboard;
