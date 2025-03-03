import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

// Sample data for delivery stages
const deliveryStages = [
  { id: '1', stage: 'Order Placed', date: '2025-02-20', status: 'Completed' },
  { id: '2', stage: 'Shipped', date: '2025-02-21', status: 'Completed' },
  { id: '3', stage: 'Out for Delivery', date: '2025-02-23', status: 'In Progress' },
  { id: '4', stage: 'Delivered', date: '2025-02-23', status: 'Pending' },
];

// Get icon & color for each stage
const getStageIcon = (stage, status) => {
  let icon = 'clockcircleo';
  let color = '#aaa';

  switch (stage) {
    case 'Order Placed':
      icon = 'shopping-cart';
      color = status === 'Completed' ? '#4caf50' : '#aaa';
      break;
    case 'Shipped':
      icon = 'truck';
      color = status === 'Completed' ? '#4caf50' : '#aaa';
      break;
    case 'Out for Delivery':
      icon = 'motorcycle';
      color = status === 'In Progress' ? '#ff9800' : '#aaa';
      break;
    case 'Delivered':
      icon = 'check-circle';
      color = status === 'Pending' ? '#aaa' : '#4caf50';
      break;
    default:
      icon = 'info';
  }

  return { icon, color };
};

// Render individual delivery step
const renderDeliveryStep = ({ item, index }) => {
  const { icon, color } = getStageIcon(item.stage, item.status);
  const isLast = index === deliveryStages.length - 1;

  return (
    <View style={styles.timelineRow}>
      <View style={styles.timelineIconContainer}>
        <FontAwesome name={icon} size={22} color={color} />
        {!isLast && <View style={styles.timelineLine} />}
      </View>
      <View style={styles.timelineContent}>
        <Text style={styles.stage}>{item.stage}</Text>
        <Text style={styles.date}>Date: {item.date}</Text>
        <Text style={[styles.status, { color: color }]}>{item.status}</Text>
      </View>
    </View>
  );
};

const DeliveryStatusComponent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#2C2929" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery Status</Text>
      </View>

      {/* Order Info */}
      <View style={styles.orderInfo}>
        <Text style={styles.orderId}>Order ID: ORD123456</Text>
        <Text style={styles.expectedDate}>Expected Delivery: 2025-02-23</Text>
      </View>

      {/* Delivery Timeline */}
      <FlatList
        data={deliveryStages}
        renderItem={renderDeliveryStep}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 15,
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
  orderInfo: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  orderId: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  expectedDate: {
    fontSize: 14,
    color: '#666',
  },
  timelineRow: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  timelineIconContainer: {
    alignItems: 'center',
    width: 40,
    position: 'relative',
  },
  timelineLine: {
    width: 2,
    height: 50,
    backgroundColor: '#ccc',
    position: 'absolute',
    top: 25,
    left: 10,
  },
  timelineContent: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    elevation: 2,
    marginLeft: 8,
  },
  stage: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginVertical: 3,
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default DeliveryStatusComponent;
