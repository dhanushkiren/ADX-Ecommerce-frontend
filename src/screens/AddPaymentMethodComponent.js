import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const AddPaymentMethodComponent = ({ navigation }) => {
  const [paymentType, setPaymentType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [upiId, setUpiId] = useState('');

  const handleSave = () => {
    if (paymentType === 'Card' && (!cardNumber || !expiry)) {
      Alert.alert('Error', 'Please enter complete card details');
      return;
    }

    if (paymentType === 'UPI' && !upiId) {
      Alert.alert('Error', 'Please enter UPI ID');
      return;
    }

    // Normally you'd save this to your backend or state management
    Alert.alert('Success', 'Payment method added successfully!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#2C2929" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Payment Method</Text>
      </View>

      {/* Payment Type Selection */}
      <Text style={styles.label}>Payment Type</Text>
      <View style={styles.paymentTypeContainer}>
        <TouchableOpacity
          style={[
            styles.paymentTypeButton,
            paymentType === 'Card' && styles.selectedPaymentType,
          ]}
          onPress={() => setPaymentType('Card')}
        >
          <FontAwesome5 name="credit-card" size={18} color="#7041EE" />
          <Text style={styles.paymentTypeText}>Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.paymentTypeButton,
            paymentType === 'UPI' && styles.selectedPaymentType,
          ]}
          onPress={() => setPaymentType('UPI')}
        >
          <FontAwesome5 name="google-wallet" size={18} color="#7041EE" />
          <Text style={styles.paymentTypeText}>UPI</Text>
        </TouchableOpacity>
      </View>

      {/* Card Details */}
      {paymentType === 'Card' && (
        <>
          <Text style={styles.label}>Card Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter card number"
            keyboardType="number-pad"
            value={cardNumber}
            onChangeText={setCardNumber}
            maxLength={16}
          />

          <Text style={styles.label}>Expiry Date (MM/YY)</Text>
          <TextInput
            style={styles.input}
            placeholder="MM/YY"
            value={expiry}
            onChangeText={setExpiry}
          />
        </>
      )}

      {/* UPI Details */}
      {paymentType === 'UPI' && (
        <>
          <Text style={styles.label}>UPI ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter UPI ID"
            value={upiId}
            onChangeText={setUpiId}
          />
        </>
      )}

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Payment Method</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 20,
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
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  paymentTypeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  paymentTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedPaymentType: {
    borderColor: '#7041EE',
    backgroundColor: '#EAE6FD',
  },
  paymentTypeText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#7041EE',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddPaymentMethodComponent;
