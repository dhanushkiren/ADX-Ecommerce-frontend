import AsyncStorage from "@react-native-async-storage/async-storage";

//store data
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    // console.log(`Data stored successfully with key: ${key} ${value}`);
  } catch (error) {
    console.error("Error storing data:", error);
  }
};

//retreieve data
export const retrieveData = async (key) => {
  try {
    const storedValue = await AsyncStorage.getItem(key);
    if (storedValue !== null) {
      const parsedValue = JSON.parse(storedValue);
      // console.log(
      //   `Data retrieved successfully with key: ${key} ${parsedValue}`,
      // );
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

// clear storage
export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    // console.log('AsyncStorage cleared successfully.');
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error);
  }
};
