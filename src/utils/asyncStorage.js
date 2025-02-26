import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode

// Store data
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log(`Data stored successfully with key: ${key} ${value}`);
  } catch (error) {
    console.error("Error storing data:", error);
  }
};

// Retrieve data
export const retrieveData = async (key) => {
  try {
    const storedValue = await AsyncStorage.getItem(key);
    if (storedValue !== null) {
      const parsedValue = JSON.parse(storedValue);
      // console.log(`Data retrieved successfully with key: ${key} ${parsedValue}`);
      return parsedValue;
    } else {
      // console.log(`No data found with key: ${key}`);
      return null;
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    return null;
  }
};

// Clear storage
export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage cleared successfully.');
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error);
  }


 

};


// Store user ID from token
export const storeUserIdFromToken = async (token) => {
  try {
    const decodedToken = jwtDecode(token);
    console.log("Decoded Token:", decodedToken); // Debugging
    const userId = decodedToken?.userId; // Use optional chaining to prevent crashes
    if (!userId) throw new Error("User ID not found in token");

    await storeData("userId", userId);
    console.log("User ID stored successfully:", userId);
  } catch (error) {
    console.error("Error extracting user ID from token:", error);
  }
};

// Retrieve user ID
export const retrieveUserId = async () => {
  return await retrieveData("userId");
};

// Automatically store user ID when token is received
export const handleTokenReceived = async (token) => {
  if (token) {
    await storeUserIdFromToken(token);
  } else {
    console.error("No token received.");
  }
};
