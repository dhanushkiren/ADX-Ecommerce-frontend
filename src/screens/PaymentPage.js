import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import * as Linking from "expo-linking";
import { API_BASE_URL } from "../utils/constants";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const PaymentPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation(); // Initialize navigation

  const handleStripePayment = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}payment/checkout`, {
        name: "Sample Product",
        amount: 202500, // Amount in paise (₹2025.00)
        currency: "INR",
        quantity: 1,
      });

      if (response.data.status === "SUCCESS") {
        const sessionUrl = response.data.sessionUrl;
        Linking.openURL(sessionUrl); // Open Stripe checkout in browser
      } else {
        Alert.alert("Payment Error", response.data.message);
      }
    } catch (error) {
      Alert.alert("Error", "Unable to process payment. Please try again.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()} // Go back to previous page
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payments</Text>
        <Text style={styles.secure}>🔒 100% Secure</Text>
      </View>

      <View style={styles.amountSection}>
        <Text style={styles.amountTitle}>Total Amount</Text>
        <Text style={styles.amountValue}>₹2025</Text>
      </View>

      <View style={styles.paymentMethods}>
        {/* Stripe Payment (Available) */}
        <View style={styles.method}>
          <TouchableOpacity
            style={styles.methodHeader}
            onPress={() => setSelectedOption("stripe")}
          >
            <Text style={styles.methodHeaderText}>Stripe Payment</Text>
          </TouchableOpacity>
          {selectedOption === "stripe" && (
            <View style={styles.methodBody}>
              <TouchableOpacity
                style={styles.payButton}
                onPress={handleStripePayment}
              >
                <Text style={styles.payButtonText}>Pay with Stripe</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Unavailable Payment Methods */}
        {["UPI Payment", "Credit / Debit Card", "Wallets", "Cash on Delivery"].map(
          (method) => (
            <View key={method} style={styles.method}>
              <TouchableOpacity style={styles.methodHeader}>
                <Text style={styles.methodHeaderText}>{method}</Text>
              </TouchableOpacity>
              <View style={styles.methodBody}>
                <Text style={styles.unavailableText}>Currently Not Available</Text>
              </View>
            </View>
          )
        )}
      </View>

      <View style={styles.footer}>
        <Text>35 Crore happy Customers and Counting! 😊</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40,
    backgroundColor: "#f9f9f9",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
    position: "absolute",
    left: 7,
    bottom: 1,
  },
  backButtonText: {
    fontSize: 38,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  secure: {
    fontSize: 14,
    color: "green",
    position: "absolute",
    right: 10,
  },
  amountSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  amountTitle: {
    fontSize: 16,
    color: "#888",
  },
  amountValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  method: {
    marginBottom: 15,
    backgroundColor: "white",
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
    overflow: "hidden",
  },
  methodHeader: {
    padding: 10,
    backgroundColor: "#eee",
  },
  methodHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  methodBody: {
    padding: 10,
    alignItems: "center",
  },
  payButton: {
    backgroundColor: "#6a0dad",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  payButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  unavailableText: {
    fontSize: 14,
    color: "red",
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default PaymentPage;
