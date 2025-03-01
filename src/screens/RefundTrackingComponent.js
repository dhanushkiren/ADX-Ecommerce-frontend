import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const refundData = [
  {
    id: '1',
    orderId: 'ORD1001',
    product: 'Bluetooth Speaker',
    amount: '₹2,000',
    status: 'Processing',
    date: '2025-02-25',
  },
  {
    id: '2',
    orderId: 'ORD1002',
    product: 'Running Shoes',
    amount: '₹3,500',
    status: 'Completed',
    date: '2025-02-20',
  },
  {
    id: '3',
    orderId: 'ORD1003',
    product: 'Gaming Mouse',
    amount: '₹1,200',
    status: 'Rejected',
    date: '2025-02-18',
  },
];

const RefundTrackingComponent = ({ navigation }) => {
  const renderRefundItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.product}>{item.product}</Text>
        <Text style={styles.amount}>{item.amount}</Text>
      </View>
      <Text style={styles.orderId}>Order ID: {item.orderId}</Text>
      <Text style={styles.date}>Requested on: {item.date}</Text>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        {['Requested', 'Processing', 'Completed'].map((step, index) => {
          const isCompleted = step === 'Requested' ||
            (step === 'Processing' && item.status !== 'Requested') ||
            (step === 'Completed' && item.status === 'Completed');

          return (
            <View key={index} style={styles.progressStep}>
              {/* Horizontal Line */}
              {index > 0 && (
                <View style={[styles.progressLine, isCompleted && styles.completedLine]} />
              )}

              {/* Circle */}
              <View style={[styles.progressCircle, isCompleted && styles.completedCircle]}>
                {isCompleted ? (
                  <FontAwesome name="check" size={12} color="#fff" />
                ) : (
                  <FontAwesome name="circle-o" size={12} color="#bbb" />
                )}
              </View>

              {/* Step Label */}
              <Text style={[styles.progressText, isCompleted && styles.completedText]}>{step}</Text>
            </View>
          );
        })}
      </View>

      {/* Refund Status */}
      <View style={styles.statusRow}>
        {getStatusIcon(item.status)}
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </View>
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing':
        return <Ionicons name="time-outline" size={20} color="#f39c12" />;
      case 'Completed':
        return <Ionicons name="checkmark-circle-outline" size={20} color="#27ae60" />;
      case 'Rejected':
        return <Ionicons name="close-circle-outline" size={20} color="#e74c3c" />;
      default:
        return <Ionicons name="help-circle-outline" size={20} color="#555" />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#2C2929" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Refund Tracking</Text>
      </View>

      <FlatList
        data={refundData}
        renderItem={renderRefundItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
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
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  product: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  orderId: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressStep: {
    alignItems: 'center',
    position: 'relative',
    width: '33.3%',
  },
  progressCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    zIndex: 1,
  },
  completedCircle: {
    backgroundColor: '#7041EE',
    borderColor: '#7041EE',
  },
  progressLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#bbb',
    width: '100%',
    top: 10,
    left: '-50%',
    zIndex: 0,
  },
  completedLine: {
    backgroundColor: '#7041EE',
  },
  progressText: {
    fontSize: 10,
    color: '#bbb',
    marginTop: 5,
  },
  completedText: {
    color: '#333',
    fontWeight: 'bold',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  statusText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default RefundTrackingComponent;
