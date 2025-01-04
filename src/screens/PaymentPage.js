import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const PaymentPage = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [upiMethod, setUpiMethod] = useState(null); // For UPI selection

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("home")}
        >
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payments</Text>
        <Text style={styles.secure}>🔒 100% Secure</Text>
      </View>

      <View style={styles.amountSection}>
        <Text style={styles.amountTitle}>Total Amount</Text>
        <Text style={styles.amountValue}>₹2025</Text>
      </View>

      <View style={styles.paymentMethods}>
        {/* UPI Payment */}
        <View style={styles.method}>
          <TouchableOpacity
            style={styles.methodHeader}
            onPress={() => setSelectedOption("upi")}
          >
            <Text style={styles.methodHeaderText}>UPI Payment</Text>
          </TouchableOpacity>
          {selectedOption === "upi" && (
            <View style={styles.methodBody}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  upiMethod === "googlePay" && styles.selectedRadio,
                ]}
                onPress={() => setUpiMethod("googlePay")}
              >
                <Text
                  style={[
                    styles.radioText,
                    upiMethod === "googlePay" && styles.selectedText,
                  ]}
                >
                  Google Pay
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  upiMethod === "phonePe" && styles.selectedRadio,
                ]}
                onPress={() => setUpiMethod("phonePe")}
              >
                <Text
                  style={[
                    styles.radioText,
                    upiMethod === "phonePe" && styles.selectedText,
                  ]}
                >
                  PhonePe
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  upiMethod === "amazonPay" && styles.selectedRadio,
                ]}
                onPress={() => setUpiMethod("amazonPay")}
              >
                <Text
                  style={[
                    styles.radioText,
                    upiMethod === "amazonPay" && styles.selectedText,
                  ]}
                >
                  Amazon Pay
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.payButton}>
                <Text style={styles.payButtonText}>Pay ₹2025</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Credit / Debit Card */}
        <View style={styles.method}>
          <TouchableOpacity
            style={styles.methodHeader}
            onPress={() => setSelectedOption("card")}
          >
            <Text style={styles.methodHeaderText}>Credit / Debit Card</Text>
          </TouchableOpacity>
          {selectedOption === "card" && (
            <View style={styles.methodBody}>
              <TextInput
                style={styles.input}
                placeholder="Card Number"
                keyboardType="numeric"
              />
              <TextInput style={styles.input} placeholder="Valid Thru" />
              <TextInput
                style={styles.input}
                placeholder="CVV"
                secureTextEntry={true}
              />
              <TouchableOpacity style={styles.payButton}>
                <Text style={styles.payButtonText}>Pay ₹2025</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Wallets */}
        <View style={styles.method}>
          <TouchableOpacity
            style={styles.methodHeader}
            onPress={() => setSelectedOption("wallets")}
          >
            <Text style={styles.methodHeaderText}>Wallets</Text>
          </TouchableOpacity>
          {selectedOption === "wallets" && (
            <View style={styles.methodBody}>
              <Text>Wallet options coming soon...</Text>
            </View>
          )}
        </View>

        {/* Cash on Delivery */}
        <View style={styles.method}>
          <TouchableOpacity
            style={styles.methodHeader}
            onPress={() => setSelectedOption("cod")}
          >
            <Text style={styles.methodHeaderText}>Cash on Delivery</Text>
          </TouchableOpacity>
          {selectedOption === "cod" && (
            <View style={styles.methodBody}>
              <TouchableOpacity style={styles.payButton}>
                <Text style={styles.payButtonText}>Place Order</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
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
    left: 10,
  },
  backButtonText: {
    fontSize: 18,
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
  paymentMethods: {},
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
  },
  radioButton: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: "#f1f1f1",
    borderRadius: 30, // Circular shape
    justifyContent: "center",
    alignItems: "center",
  },
  selectedRadio: {
    backgroundColor: "#6a0dad", // Same as the pay button color
  },
  radioText: {
    fontSize: 16,
  },
  selectedText: {
    color: "white", // Text color for the selected radio button
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
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
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default PaymentPage;
