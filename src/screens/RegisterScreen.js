import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    Alert.alert('Success', 'Account created successfully!');
    navigation.navigate('Dashboard');
  };

  const handleLoginNavigation = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TRADEZY.in</Text>
      <View style={styles.card}>
        <Text style={styles.subtitle}>Create account</Text>
        <TextInput
          style={styles.input}
          placeholder="Your name"
          value={formData.name}
          onChangeText={(value) => handleInputChange('name', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
        />
        <TextInput
          style={styles.inputpass}
          placeholder="Password"
          secureTextEntry
          value={formData.password}
          onChangeText={(value) => handleInputChange('password', value)}
        />
        <Text style={styles.inputpasstext}>Password must be at least 6 character</Text>
        <TextInput
          style={styles.inputRepass}
          placeholder="Re-enter password"
          secureTextEntry
          value={formData.confirmPassword}
          onChangeText={(value) => handleInputChange('confirmPassword', value)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Create your Tradezy account</Text>
        </TouchableOpacity>
        
        <Text style={styles.agreement}>
          By creating an account, you agree to Tradezy's{' '}
          <Text style={styles.link}>Conditions of Use</Text> and{' '}
          <Text style={styles.link}>Privacy Notice</Text>.
        </Text>
        
     
        <Text style={styles.signIn}>
          Already have an account?{' '}
          <Text style={styles.link} onPress={handleLoginNavigation}>
            Sign-in
          </Text>
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', 
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%', 
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 28,
    color: '#4c84f5',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#f7f9fc',
    borderWidth: 1,
    borderColor: '#d1d9e6',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  inputpass: {
    width: '100%',
    backgroundColor: '#f7f9fc',
    borderWidth: 1,
    borderColor: '#d1d9e6',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  inputpasstext: {
    alignSelf: 'flex-start', 
    marginBottom: 15,
    marginLeft: 10,
    fontSize: 12,
    color: '#6c757d',
  },
  inputRepass: {
    width: '100%',
    backgroundColor: '#f7f9fc',
    borderWidth: 1,
    borderColor: '#d1d9e6',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4c84f5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  agreement: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  link: {
    color: '#4c84f5',
    textDecorationLine: 'underline',
  },
  signIn: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default RegisterScreen;