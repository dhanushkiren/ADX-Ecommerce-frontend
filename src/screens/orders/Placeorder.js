import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';


export default function PlaceOrder({ route }) {
  // Ensure products is always an array to avoid undefined errors
  const { products = [] } = route.params || {};

  // Debugging: Log the products array
  console.log("Products Data:", products);


  const [address, setAddress] = useState({
    name: 'John Doe',
    street: '123 Main St, Apt 4B',
    city: 'Chennai 628002',
  });

  const [isModalVisible, setModalVisible] = useState(false);
  const [newAddress, setNewAddress] = useState({ ...address });
  const [cartItems, setCartItems] = useState([]); // Store API response
  const navigation = useNavigation();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('http://192.168.1.3:8080/api/cart/1'); // Replace with your actual API endpoint
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleSaveAddress = () => {
    setAddress(newAddress);
    setModalVisible(false);
  };

  // Calculate total price dynamically
  const totalAmount = products.reduce((sum, item) => sum + (item.price || 0), 0);


  return (
    <ScrollView style={styles.container}>
      {/* Order Summary */}
      <View style={styles.section}>

      <Text style={styles.sectionTitle}>Order Summary</Text>
      {products.length > 0 ? (
      products.map((item, index) => (
        <View key={index} style={styles.itemRow}>
          {/* Product Image */}
          {item.imageUrl ? (
            <Image 
            source={{ uri: item.imageUrl}} 
            style={styles.itemImage} 
          />
          
          ) : (
            <Text style={styles.noImageText}>No Image</Text>
          )}
          {/* Product Name & Price */}
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name || "No Name Available"}</Text>
            <Text style={styles.selleritemName}>{item.sellerName || "No Name Available"}</Text>
            <Text style={styles.itemPrice}>₹{item.price || "0.00"}</Text>
          </View>
        </View>
          ))
        ) : (
          <Text style={styles.emptyCartText}>No items selected</Text>
        )}

        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalPrice}>₹{totalAmount}</Text>
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
        <Text style={styles.totalAmount}>Total Amount: ₹{totalAmount}</Text>
      </View>

      {/* Place Order Button */}
      <TouchableOpacity style={styles.placeOrderButton} onPress={() => navigation.navigate('payment')}>
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
              onChangeText={(text) => setNewAddress((prev) => ({ ...prev, name: text }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Street"
              value={newAddress.street}
              onChangeText={(text) => setNewAddress((prev) => ({ ...prev, street: text }))}
            />
            <TextInput
              style={styles.input}
              placeholder="City"
              value={newAddress.city}
              onChangeText={(text) => setNewAddress((prev) => ({ ...prev, city: text }))}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleSaveAddress}>
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
    paddingTop: 40,
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
  itemContainer: {
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold', 
    color: '#333',
  },
  selleritemName: {
    fontSize: 14, 
    color: '#333',
  },
  itemImage: {
    width: 50,
    height: 50, 
    borderRadius: 8, 
    marginRight: 10,
    borderWidth: 1, 
    borderColor: '#ddd', 
  },
  itemPrice: {
    fontSize: 14,
    color: '#555',
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
  emptyCartText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#777',
    marginVertical: 10,
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

