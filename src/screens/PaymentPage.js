import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Animated,
} from "react-native";
import axios from "axios";
import * as Linking from "expo-linking";
import { useRoute , useNavigation} from "@react-navigation/native";

const PaymentPage = () => {
  const route = useRoute();
  const { products = [] } = route.params || {}; // Get products data from navigation params
  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();

  // Calculate total amount dynamically
  const totalAmount = products.reduce(
    (sum, item) => sum + (item.price || 0),
    0
  );

  const [stripeVisible, setStripeVisible] = useState(false);
  const animatedHeight = new Animated.Value(stripeVisible ? 100 : 0);

  // Handle Stripe Payment
  const handleStripePayment = async () => {
    try {
     const response = await axios.post(`${API_BASE_URL}payment/checkout`, {
          name: products.map((item) => item.productName).join(", "),
          amount: totalAmount * 100, // Convert ₹ to paise
          currency: "INR",
          quantity: products.length,
        }
      );

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

  const navigation = useNavigation();
  const toggleStripeDropdown = () => {
    Animated.timing(animatedHeight, {
      toValue: stripeVisible ? 0 : 100,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setStripeVisible(!stripeVisible);
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
        <Text style={styles.amountValue}>₹{totalAmount}</Text>
      </View>

      <View style={styles.paymentMethods}>
        {/* Stripe Payment (Dropdown) */}
        <View style={styles.method}>
          <TouchableOpacity
            style={styles.methodHeader}
            onPress={toggleStripeDropdown}
          >
            <Text style={styles.methodHeaderText}>💳 Pay with Stripe</Text>
            <Text style={styles.arrow}>{stripeVisible ? "▲" : "▼"}</Text>
          </TouchableOpacity>
          {selectedOption === "stripe" && (
            <View style={styles.methodBody}>
              <TouchableOpacity
                style={styles.payButton}
                onPress={handleStripePayment}
              >
                <Text style={styles.payButtonText}>Pay with Stripe</Text>
              </TouchableOpacity>
            )}
          </Animated.View>
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
  paymentMethods: {
    marginTop: 20,
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
    backgroundColor: "#6a0dad",
    alignItems: "center",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  methodHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  arrow: {
    fontSize: 18,
    color: "white",
  },
  methodBody: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  payButton: {
    backgroundColor: "#00008B",
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    width: "90%",
    alignItems: "center",
  },
  payButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  unavailableText: {
    fontSize: 14,
    color: "#888",
    fontStyle: "italic",
    padding: 10,
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default PaymentPage;
