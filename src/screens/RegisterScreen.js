import React, { useState, useEffect } from 'react'; 
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest } from '../redux/auth/authSlice'; // Import Redux action

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, registerError, registerSuccessMessage } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '', // Change email to username
    password: '',
    confirmPassword: '',
    mobile: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    const { firstName, lastName, username, password, confirmPassword, mobile } = formData;

    if (!firstName || !lastName || !username || !password || !confirmPassword || !mobile) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    // Dispatch Redux action to handle registration
    dispatch(registerRequest({ username, firstName, lastName, password, mobile }));
  };

  useEffect(() => {
    // Log the error and success message for debugging
    console.log("registerSuccessMessage", registerSuccessMessage);
    console.log("registerError", registerError);

    // Show success alert and navigate to Login
    if (registerSuccessMessage) {
      Alert.alert('Success', registerSuccessMessage, [
        { text: 'OK', onPress: () => navigation.navigate('login') },
      ]);
    }

    // Show error alert when registration fails
    if (registerError) {
      Alert.alert('Registration Failed', registerError);
    }
  }, [registerSuccessMessage, registerError, navigation]); // Add error to dependencies

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TRADEZY.in</Text>
      <View style={styles.card}>
        <Text style={styles.subtitle}>Create account</Text>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={formData.firstName}
          onChangeText={(value) => handleInputChange('firstName', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={formData.lastName}
          onChangeText={(value) => handleInputChange('lastName', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={formData.username}
          onChangeText={(value) => handleInputChange('username', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile"
          keyboardType="numeric"
          value={formData.mobile}
          onChangeText={(value) => handleInputChange('mobile', value)}
        />
        <TextInput
          style={styles.inputpass}
          placeholder="Password"
          secureTextEntry
          value={formData.password}
          onChangeText={(value) => handleInputChange('password', value)}
        />
        <Text style={styles.inputpasstext}>Password must be at least 6 characters</Text>
        <TextInput
          style={styles.inputRepass}
          placeholder="Re-enter password"
          secureTextEntry
          value={formData.confirmPassword}
          onChangeText={(value) => handleInputChange('confirmPassword', value)}
        />

        {/* Use registerError instead of error */}
        {registerError ? <Text style={styles.errorText}>{registerError}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Create Account</Text>}
        </TouchableOpacity>

        <Text style={styles.agreement}>
          By creating an account, you agree to Tradezy's{' '}
          <Text style={styles.link}>Conditions of Use</Text> and{' '}
          <Text style={styles.link}>Privacy Notice</Text>.
        </Text>

        <Text style={styles.signIn}>
          Already have an account?{''}
          <Text style={styles.link} onPress={() => navigation.navigate('login')}>
            Sign-in
          </Text>
        </Text>
      </View>
    </View>
  );
};
// Styles remain unchanged
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
  errorText: {
    color: 'red',
    marginBottom: 10,
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
