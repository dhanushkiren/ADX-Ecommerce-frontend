import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const OTPResetScreen = () => {
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91'); // Default to India (+91)
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(''); // Store the generated OTP
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);

  // Function to generate a random 6-digit OTP
  const otpGenerator = (digit) => {
    let num = '0123456789';
    let otp = '';
    for (let i = 0; i < digit; i++) {
      otp += num[Math.floor(Math.random() * num.length)];
    }
    return otp;
  };

  // Simulate sending OTP
  const sendOTP = () => {
    const newOtp = otpGenerator(6); // Generate 6-digit OTP
    setGeneratedOtp(newOtp);
    console.log('Generated OTP:', newOtp); // Simulating SMS
    Alert.alert('OTP Sent', 'Check console for OTP (simulating SMS)');
    setStep(2);
  };

  // Simulate verifying OTP
  const verifyOTP = () => {
    if (otp === generatedOtp) { 
      Alert.alert('Success', 'OTP Verified');
      setStep(3);
    } else {
      Alert.alert('Error', 'Invalid OTP');
    }
  };

  // Simulate resetting password
  const resetPassword = () => {
    Alert.alert('Success', 'Password Reset Successfully');
    setStep(1);
    setPhone('');
    setOtp('');
    setPassword('');
    setGeneratedOtp(''); // Clear OTP after reset
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {step === 1 && (
          <>
            <Text style={styles.title}>Enter Phone Number</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={countryCode}
                onChangeText={setCountryCode}
              />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                keyboardType='number-pad'
                value={phone}
                onChangeText={setPhone}
              />
            </View>
            <TouchableOpacity onPress={sendOTP} style={styles.button}>
              <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.title}>Enter OTP</Text>
            <TextInput
              style={styles.largeInput}
              keyboardType='number-pad'
              value={otp}
              onChangeText={setOtp}
            />
            <TouchableOpacity onPress={verifyOTP} style={styles.button}>
              <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 3 && (
          <>
            <Text style={styles.title}>Enter New Password</Text>
            <TextInput
              style={styles.largeInput}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={resetPassword} style={[styles.button, { backgroundColor: 'green' }]}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  box: {
    width: 350,
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    marginRight: 5,
    width: 100,
    fontSize: 16,
  },
  largeInput: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
    fontSize: 18,
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OTPResetScreen;
