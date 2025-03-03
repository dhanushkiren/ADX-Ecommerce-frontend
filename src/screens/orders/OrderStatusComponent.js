import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // For back arrow icon

// Sample data - replace this with real API data if needed
const orderStatusData = [
  { orderId: 'ORD12345', product: 'Wireless Headphones', status: 'Shipped', date: '2025-02-20' },
  { orderId: 'ORD12346', product: 'Smartphone Case', status: 'Pending', date: '2025-02-19' },
  { orderId: 'ORD12347', product: 'Laptop Stand', status: 'Delivered', date: '2025-02-15' },
  { orderId: 'ORD12348', product: 'Bluetooth Speaker', status: 'Cancelled', date: '2025-02-12' },
];

// Function to style the status text
const getStatusStyle = (status) => {
  switch (status) {
    case 'Pending':
      return { color: 'orange' };
    case 'Shipped':
      return { color: 'blue' };
    case 'Delivered':
      return { color: 'green' };
    case 'Cancelled':
      return { color: 'red' };
    default:
      return { color: 'black' };
  }
};

// Function to render each order item
const renderOrder = ({ item }) => (
  <View style={styles.card}>
    <Text style={styles.orderId}>Order ID: {item.orderId}</Text>
    <Text style={styles.productName}>Product: {item.product}</Text>
    <Text style={styles.date}>Date: {item.date}</Text>
    <Text style={[styles.status, getStatusStyle(item.status)]}>
      Status: {item.status}
    </Text>
  </View>
);

const OrderStatusComponent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#2C2929" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Status</Text>
      </View>

      {/* Order List */}
      <FlatList
        data={orderStatusData}
        renderItem={renderOrder}
        keyExtractor={(item) => item.orderId}
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
    marginBottom: 10,
    elevation: 2,
  },
  orderId: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  productName: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  status: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default OrderStatusComponent;
