import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileRequest } from "../redux/editprofile/slice";
import { retrieveData } from "../utils/asyncStorage";
const SearchBar = ({ routeName, name }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState(name);
  const [userId, setUserId] = useState(null);
  const userProfile = useSelector((state) => state.editProfile.originalProfile);
  
  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await retrieveData("userId");
        if (storedUserId) {
          setUserId(storedUserId);
          dispatch(fetchProfileRequest({ userId: storedUserId }));
        } else {
          Alert.alert("Error", "User ID not found in storage.");
        }
      } catch (error) {
        console.error("Error fetching userId:", error);
        Alert.alert("Error", "Failed to load user data.");
      }
    };

    getUserId();
  }, [dispatch]);

  useEffect(() => {
    console.log("User profile data:", userProfile);
  }, [userProfile]);

  const userAddress =
    userProfile?.addresses?.length > 0
      ? userProfile.addresses.filter(Boolean).join(", ")
      : " ";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.searchInput}>
          <Icon name="search" size={24} color="#ccc" style={styles.icon} />
          <TextInput
            placeholder="Search products..."
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => navigation.navigate("product", { searchQuery })}
          />
        </View>
      </View>

      <View style={styles.location}>
        <Icon name="location-on" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.locationText}>{userAddress}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6200ee",
    padding: 10,
    marginTop: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#6200ee",
    borderRadius: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#fff",
    flexDirection: "row",
    height: 40,
    marginRight: 20,
    marginLeft: 20,
    alignItems: "center",
  },
  location: {
    padding: 5,
    backgroundColor: "#8D67F1",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  locationText: {
    padding: 5,
    color: "#fff",
  },
});

export default SearchBar;