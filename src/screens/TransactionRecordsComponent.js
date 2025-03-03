import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';

// Sample data - you can fetch this dynamically from your backend
const transactionRecordsData = [
  { id: 'TRX001', date: '2025-02-25', amount: '$120.00', method: 'Credit Card', status: 'Success' },
  { id: 'TRX002', date: '2025-02-24', amount: '$45.50', method: 'UPI', status: 'Pending' },
  { id: 'TRX003', date: '2025-02-23', amount: '$250.00', method: 'Net Banking', status: 'Failed' },
];

// Icon handler for payment method
const getPaymentIcon = (method) => {
  switch (method) {
    case 'Credit Card':
      return <FontAwesome name="credit-card" size={24} color="#7041EE" />;
    case 'UPI':
      return <MaterialIcons name="qr-code" size={24} color="#7041EE" />;
    case 'Net Banking':
      return <Ionicons name="globe-outline" size={24} color="#7041EE" />;
    default:
      return <Ionicons name="wallet-outline" size={24} color="#7041EE" />;
  }
};

// Status badge colors
const getStatusBadgeStyle = (status) => {
  switch (status) {
    case 'Success':
      return { backgroundColor: '#e6ffed', color: '#28a745' };
    case 'Pending':
      return { backgroundColor: '#fff3cd', color: '#ff9800' };
    case 'Failed':
      return { backgroundColor: '#fdecea', color: '#dc3545' };
    default:
      return { backgroundColor: '#f0f0f0', color: '#666' };
  }
};

// Individual transaction row (horizontal card)
const renderTransactionRecord = ({ item }) => {
  const statusStyle = getStatusBadgeStyle(item.status);

  return (
    <View style={styles.card}>
      {/* Left Section - Icon */}
      <View style={styles.iconContainer}>
        {getPaymentIcon(item.method)}
      </View>

      {/* Middle Section - Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.transactionId}>{item.id}</Text>
        <Text style={styles.date}>Date: {item.date}</Text>
        <Text style={styles.method}>Method: {item.method}</Text>
      </View>

      {/* Right Section - Amount & Status */}
      <View style={styles.statusContainer}>
        <Text style={styles.amount}>{item.amount}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor }]}>
          <Text style={[styles.statusText, { color: statusStyle.color }]}>{item.status}</Text>
        </View>
      </View>
    </View>
  );
};

const TransactionRecordsComponent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#2C2929" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction Records</Text>
      </View>

      {/* List of transactions */}
      <FlatList
        data={transactionRecordsData}
        renderItem={renderTransactionRecord}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0e8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  transactionId: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  method: {
    fontSize: 12,
    color: '#666',
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 6,
    color: '#333',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  statusText: {
    fontWeight: '600',
    fontSize: 12,
    textTransform: 'uppercase',
  },
});

export default TransactionRecordsComponent;
