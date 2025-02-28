// LoginScreen.js
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../redux/auth/authSlice";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = ({ navigation }) => {
  const [isChecked, setChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { loading, error, token } = useSelector((state) => state.auth);

  const gotoRegister = () => {
    navigation.navigate("register");
  };

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Please enter username and password",
        });
        return;
      }

      const userData = { username, password };
      dispatch(loginRequest(userData));

      // Check if login was successful
      setTimeout(() => {
        if (token) {
          Toast.show({
            type: "success",
            text1: "Login Success",
            text2: "You have successfully logged in",
          });
          navigation.navigate("home");
        } else if (error) {
          Toast.show({
            type: "error",
            text1: "Login Failed",
            text2: "Server Error, Try again later",
          });
        }
      }, 1000); // Wait for Redux state update
    } catch (err) {
      console.error("Login error:", err);

    }
    dispatch(loginRequest({ username, password }));
  };

  return (
    <View style={styles.container}>
      {/* Toast Container */}
      <View style={styles.toastStyle}>
        <Toast />
      </View>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.logo}>TRADEZY.in</Text>
      <StatusBar style="auto" />

      <View style={styles.card}>
        <Text style={styles.heading}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email or mobile phone number"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>

        <View style={styles.checkboxContainer}>
          <CheckBox checked={isChecked} onPress={() => setChecked(!isChecked)} />
          <Text style={{ fontWeight: "bold", marginLeft: -15 }}>
            Keep me signed in.
          </Text>
          <TouchableOpacity>
            <Text style={styles.details}>Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.newAccount}>
          <View style={styles.textWithLines}>
            <View style={styles.line} />
            <Text style={styles.newAccountText}>New to Tradezy?</Text>
            <View style={styles.line} />
          </View>
          <TouchableOpacity onPress={gotoRegister} style={styles.createAccountButton}>
            <Text style={styles.createAccountText}>
              Create your Tradezy account
            </Text>
          </TouchableOpacity>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  toastStyle: {
    zIndex: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 0,
  },
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  logo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4c84f5",
    marginBottom: 30,
    textAlign: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginVertical: 12,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    color: "#333",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    color: "#4c84f5",
    fontSize: 14,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#4c84f5",
    width: "100%",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "flex-start",
  },
  details: {
    color: "#4c84f5",
    fontSize: 14,
    marginLeft: 8,
  },
  newAccount: {
    alignItems: "center",
    marginTop: 0,
  },
  textWithLines: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  newAccountText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
    marginHorizontal: 8,
  },
  createAccountButton: {
    backgroundColor: "#4c84f5",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  createAccountText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  footerLink: {
    color: "#4c84f5",
    fontSize: 14,
    marginVertical: 5,
  },
  copyright: {
    fontSize: 12,
    color: "#777",
    marginTop: 10,
    textAlign: "center",
  },
});

export default LoginScreen;