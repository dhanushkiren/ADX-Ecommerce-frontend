import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';

const paymentMethods = [
  {
    id: '1',
    type: 'Credit Card',
    cardNumber: '**** **** **** 1234',
    expiry: '08/27',
    brand: 'visa',
  },
  {
    id: '2',
    type: 'UPI',
    cardNumber: 'user@upi',
    brand: 'google',
  },
  {
    id: '3',
    type: 'Debit Card',
    cardNumber: '**** **** **** 5678',
    expiry: '04/26',
    brand: 'mastercard',
  },
];

const PaymentManagerComponent = ({ navigation }) => {
  const renderMethod = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.iconRow}>
        <FontAwesome5
          name={getPaymentIcon(item.brand)}
          size={24}
          color="#7041EE"
          style={styles.paymentIcon}
        />
        <View>
          <Text style={styles.type}>{item.type}</Text>
          <Text style={styles.cardNumber}>{item.cardNumber}</Text>
          {item.expiry && <Text style={styles.expiry}>Expiry: {item.expiry}</Text>}
        </View>
      </View>

      <TouchableOpacity style={styles.deleteButton}>
        <FontAwesome name="trash" size={18} color="#e74c3c" />
      </TouchableOpacity>
    </View>
  );

  const getPaymentIcon = (brand) => {
    switch (brand) {
      case 'visa':
        return 'cc-visa';
      case 'mastercard':
        return 'cc-mastercard';
      case 'google':
        return 'google-wallet';
      default:
        return 'credit-card';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#2C2929" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Manager</Text>
      </View>

      {/* Payment List */}
      <FlatList
        data={paymentMethods}
        renderItem={renderMethod}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      {/* Add Payment Method Button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add New Payment Method</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
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
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    marginRight: 15,
  },
  type: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardNumber: {
    fontSize: 14,
    color: '#666',
  },
  expiry: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    padding: 10,
  },
  addButton: {
    backgroundColor: '#7041EE',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 20,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default PaymentManagerComponent;
