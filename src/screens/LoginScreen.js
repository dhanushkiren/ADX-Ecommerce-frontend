import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { CheckBox } from 'react-native-elements';


const LoginScreen = ({navigation})=> {
  const [isChecked, setChecked] = useState(false);
  const gotoRegister = () =>{
    navigation.navigate('Register')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>TRADEZY.in</Text>
      <StatusBar style="auto" />

      <View style={styles.card}>
        <Text style={styles.heading}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email or mobile phone number"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.checkboxContainer}>
          <CheckBox
           checked={isChecked}
            onPress={() => setChecked(!isChecked)}
          />
          <Text style={{fontWeight:'bold',marginLeft:-15}}>Keep me signed in.</Text>
          <TouchableOpacity>
            <Text style={styles.details}>Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.newAccount}>
        <View style={styles.newAccount}>
        <View style={styles.textWithLines}>
          <View style={styles.line} />
          <Text style={styles.newAccountText}>New to Tradezy?</Text>
          <View style={styles.line} />
        </View>
        <TouchableOpacity  onPress={gotoRegister} style={styles.createAccountButton}>
          <Text style={styles.createAccountText}>
            Create your Tradezy account
          </Text>
        </TouchableOpacity>
      </View>
      </View>
      </View>

      <View style={styles.footer}>
  <TouchableOpacity>
    <Text style={styles.footerLink}>Condition of use</Text>
  </TouchableOpacity>
  <TouchableOpacity>
    <Text style={styles.footerLink}>Privacy Notice</Text>
  </TouchableOpacity>
  <TouchableOpacity>
    <Text style={styles.footerLink}>Help</Text>
  </TouchableOpacity>
</View>
<Text style={styles.copyright}>
  © 1996-2017, Tradezy.com, Inc. or its affiliates
</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff', 
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  logo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4c84f5', 
    marginBottom: 30,
    textAlign: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333', // Dark gray heading
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginVertical: 12,
    backgroundColor: '#f9f9f9', // Slightly off-white background
    fontSize: 16,
    color: '#333',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#4c84f5',
    fontSize: 14,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#4c84f5',
    width: '100%',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'flex-start',
  },
  details: {
    color: '#4c84f5',
    fontSize: 14,
    marginLeft: 8,
  },
  newAccount: {
    alignItems: 'center',
    marginTop: 0,
  },
  textWithLines: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  newAccountText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginHorizontal: 8,
  },
  createAccountButton: {
    backgroundColor: '#4c84f5',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  createAccountText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    flexWrap:'wrap',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%', // Ensures even spacing within a fixed width
  },
  
  footerLink: {
    color: '#4c84f5',
    fontSize: 14,
    marginVertical: 5,
  },
  copyright: {
    fontSize: 12,
    color: '#777',
    marginTop: 10,
    textAlign: 'center',
  },
});
export default LoginScreen;