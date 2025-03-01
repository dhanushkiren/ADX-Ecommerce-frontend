import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Sample payment status data - replace with real data if needed
const paymentStatusData = [
  { transactionId: 'TXN1001', product: 'Wireless Headphones', status: 'Paid', date: '2025-02-20', amount: '$99.99' },
  { transactionId: 'TXN1002', product: 'Smartphone Case', status: 'Pending', date: '2025-02-19', amount: '$19.99' },
  { transactionId: 'TXN1003', product: 'Laptop Stand', status: 'Failed', date: '2025-02-18', amount: '$49.99' },
  { transactionId: 'TXN1004', product: 'Bluetooth Speaker', status: 'Paid', date: '2025-02-17', amount: '$29.99' },
];

// Function to get border color based on payment status
const getStatusBorderColor = (status) => {
  switch (status) {
    case 'Paid':
      return '#28a745'; // Green
    case 'Pending':
      return '#ff9800'; // Orange
    case 'Failed':
      return '#dc3545'; // Red
    default:
      return '#ccc'; // Default
  }
};

// Function to render each payment item
const renderPayment = ({ item }) => (
  <View style={[styles.card, { borderLeftColor: getStatusBorderColor(item.status) }]}>
    <View style={styles.cardHeader}>
      <Text style={styles.transactionId}>{item.transactionId}</Text>
      <Text style={[styles.status, { color: getStatusBorderColor(item.status) }]}>{item.status}</Text>
    </View>
    <Text style={styles.product}>{item.product}</Text>
    <Text style={styles.date}>Date: {item.date}</Text>
    <Text style={styles.amount}>Amount: <Text style={styles.amountValue}>{item.amount}</Text></Text>
  </View>
);

const PaymentStatusComponent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#2C2929" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Status</Text>
      </View>

      {/* Payment Status List */}
      <FlatList
        data={paymentStatusData}
        renderItem={renderPayment}
        keyExtractor={(item) => item.transactionId}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#2C2929',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 6, // Left border to show status color
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  transactionId: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  product: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#444',
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
  },
  amountValue: {
    color: '#000',
  },
});

export default PaymentStatusComponent;
