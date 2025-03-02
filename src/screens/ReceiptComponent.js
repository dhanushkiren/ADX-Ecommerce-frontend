import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Sample order items
const orderItems = [
  { id: '1', product: 'Wireless Headphones', quantity: 1, price: 1500 },
  { id: '2', product: 'Smartwatch', quantity: 1, price: 3000 },
  { id: '3', product: 'Phone Case', quantity: 2, price: 500 },
];

const ReceiptComponent = ({ navigation }) => {
  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleDownload = () => {
    Alert.alert("Download", "Receipt PDF will be downloaded (Functionality can be added here).");
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Text style={styles.itemName}>{item.product}</Text>
      <Text style={styles.itemQty}>x{item.quantity}</Text>
      <Text style={styles.itemPrice}>₹{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#2C2929" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Receipt</Text>
      </View>

      {/* Receipt Details */}
      <View style={styles.receiptDetails}>
        <Text style={styles.orderId}>Order ID: ORD123456</Text>
        <Text style={styles.date}>Date: 2025-03-01</Text>
      </View>

      {/* Itemized List */}
      <FlatList
        data={orderItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.itemList}
      />

      {/* Total Section */}
      <View style={styles.totalSection}>
        <Text style={styles.totalLabel}>Total Amount:</Text>
        <Text style={styles.totalAmount}>₹{calculateTotal()}</Text>
      </View>

      {/* Payment Method */}
      <View style={styles.paymentMethod}>
        <Text style={styles.paymentLabel}>Payment Method:</Text>
        <Text style={styles.paymentValue}>Credit Card (**** 5678)</Text>
      </View>

      {/* Download Button */}
      <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
        <Text style={styles.downloadButtonText}>Download Receipt</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
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
    color: '#2C2929',
    marginLeft: 10,
  },
  receiptDetails: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 3,
  },
  orderId: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  itemList: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 3,
    marginBottom: 15,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemName: {
    fontWeight: 'bold',
    flex: 1,
  },
  itemQty: {
    textAlign: 'center',
    width: 30,
  },
  itemPrice: {
    fontWeight: 'bold',
    textAlign: 'right',
    width: 80,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 3,
    marginBottom: 15,
  },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalAmount: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#7041EE',
  },
  paymentMethod: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  paymentLabel: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  paymentValue: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  downloadButton: {
    backgroundColor: '#7041EE',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
  },
  downloadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ReceiptComponent;
