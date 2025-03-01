import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; 
import { clearAsyncStorage, retrieveData } from "../utils/asyncStorage";

const UserDashboard = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await retrieveData("token"); // Retrieve the token
      setIsLoggedIn(!!token); // If token exists, set isLoggedIn to true
    };

    checkToken();
  }, []);

  const handleAuthAction = async () => {
    if (isLoggedIn) {
      await clearAsyncStorage(); // Clear token
      setIsLoggedIn(false); // Update state
      navigation.replace("login"); // Redirect to login
    } else {
      navigation.navigate("login"); // Navigate to login
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <FontAwesome name="arrow-left" size={24} color="#2C2929" />
        </TouchableOpacity>
        <Text style={styles.headerText}>USER DASHBOARD</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>ORDERS</Text>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("history")}
        >
          <Text style={styles.optionText}>Order History</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("OrderStatus")}
          >
        <Text style={styles.optionText}>Order Status</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("PaymentStatus")}
          >
        <Text style={styles.optionText}>Payment Status</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("Transaction")}
          >
        <Text style={styles.optionText}>Transaction Records</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("Deliverystatus")}
          >
        <Text style={styles.optionText}>Delivery Status</Text>
        </TouchableOpacity>
      
        <Text style={styles.title}>PAYMENT OPTIONS</Text>

        <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("Paymentmanager")}
          >
        <Text style={styles.optionText}>Payment Manager</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("Paymentmethod")}
          >
        <Text style={styles.optionText}>Payment Method</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("Receipt")}
          >
        <Text style={styles.optionText}>Receipt</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("Refund")}
          >
        <Text style={styles.optionText}>Refund Tracking</Text>
        </TouchableOpacity>

        {/* Login/Logout Button */}
        <TouchableOpacity style={styles.authButton} onPress={handleAuthAction}>
          <Text style={styles.authText}>{isLoggedIn ? "Logout" : "Login"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f9f9f9",
    paddingBottom: 60,
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
    flex: 1, 
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
  authButton: {
    padding: 15,
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  authText: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
  },
});

export default UserDashboard;
