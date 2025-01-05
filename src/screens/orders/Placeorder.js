import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';

export default function Placeorder({}) {
  const [address, setAddress] = useState({
    name: 'John Doe',
    street: '123 Main St, Apt 4B',
    city: 'Chennai 628002',
  });

  const [isModalVisible, setModalVisible] = useState(false);
  const [newAddress, setNewAddress] = useState({ ...address });

  const handleSaveAddress = () => {
    setAddress(newAddress);
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>Order Checkout</Text>
      </View> */}

      {/* Order Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.itemRow}>
          <Text style={styles.itemName}>Product Name 1</Text>
          <Text style={styles.itemPrice}>₹500</Text>
        </View>
        <Text style={styles.itemQuantity}>Quantity: 1</Text>
        <View style={styles.itemRow}>
          <Text style={styles.itemName}>Product Name 2</Text>
          <Text style={styles.itemPrice}>₹1000</Text>
        </View>
        <Text style={styles.itemQuantity}>Quantity: 2</Text>
        <View style={styles.itemRow}>
          <Text style={styles.itemName}>Product Name 3</Text>
          <Text style={styles.itemPrice}>₹300</Text>
        </View>
        <Text style={styles.itemQuantity}>Quantity: 1</Text>
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalPrice}>₹1800</Text>
        </View>
      </View>

      {/* Delivery Address */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <Text style={styles.addressText}>{address.name}</Text>
        <Text style={styles.addressText}>{address.street}</Text>
        <Text style={styles.addressText}>{address.city}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.editAddress}>Edit Address</Text>
        </TouchableOpacity>
      </View>

      {/* Payment Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Details</Text>
        <Text style={styles.totalAmount}>Total Amount: ₹1800</Text>
      </View>

      {/* Place Order Button */}
      <TouchableOpacity style={styles.placeOrderButton}>
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>

      {/* Edit Address Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Address</Text>

            <TextInput
              style={styles.input}
              placeholder="Name"
              value={newAddress.name}
              onChangeText={(text) =>
                setNewAddress((prev) => ({ ...prev, name: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Street"
              value={newAddress.street}
              onChangeText={(text) =>
                setNewAddress((prev) => ({ ...prev, street: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="City"
              value={newAddress.city}
              onChangeText={(text) =>
                setNewAddress((prev) => ({ ...prev, city: text }))
              }
            />

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleSaveAddress}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 40
  },
  header: {
    backgroundColor: '#2e2e2e',
    padding: 15,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: 'white',
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  itemName: {
    fontSize: 14,
  },
  itemPrice: {
    fontSize: 14,
  },
  itemQuantity: {
    fontSize: 12,
    color: '#777',
    marginBottom: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  addressText: {
    fontSize: 14,
    marginBottom: 5,
  },
  editAddress: {
    color: '#6a0dad',
    fontSize: 14,
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  placeOrderButton: {
    backgroundColor: '#6a0dad',
    padding: 15,
    margin: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    fontSize: 14,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: '#6a0dad',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#d9534f',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 14,
  },
});
