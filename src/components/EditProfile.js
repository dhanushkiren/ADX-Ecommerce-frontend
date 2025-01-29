import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileRequest, updateProfileRequest } from "../redux/editprofile/slice";
import { isEqual } from "lodash";
import { API_BASE_URL } from "../utils/constants";
import moment from "moment";
import ImageResizer from "react-native-image-resizer"; 

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon"
];

const COLORS = {
  primary: "#1f8b3b",
  secondaryGray: "#d3d3d3",
  white: "#ffffff",
  black: "#000000",
};

const FONTS = {
  h3: { fontSize: 24, fontWeight: "bold" },
  h4: { fontSize: 20, fontWeight: "bold" },
  body3: { fontSize: 16, fontWeight: "normal" },
};

const EditProfile = ({ route, navigation }) => {
  const { userId } = route.params || {};

  const dispatch = useDispatch();
  const { originalProfile: profile, error, loading } = useSelector((state) => state.editProfile);

  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [country, setCountry] = useState("");
  const [mobile, setMobile] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [countryModalVisible, setCountryModalVisible] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(fetchProfileRequest({ userId }));
    } else {
      Alert.alert("Error", "User ID is required.");
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (profile) {
      console.log("Fetched image is available:", profile.image ? "Available" : "no Image Available");
      setFirstName(profile.firstName || "");
      setLastName(profile.lastName || "");
      setEmail(profile.email || "");
  
      let addresses = [];
      if (Array.isArray(profile.addresses)) {
        if (profile.addresses.length === 1 && typeof profile.addresses[0] === "string" && profile.addresses[0].includes(",")) {
          addresses = profile.addresses[0].split(",").map((addr) => addr.trim());
        } else {
          addresses = profile.addresses;
        }
      } else if (typeof profile.addresses === "string") {
        addresses = profile.addresses.split(",").map((addr) => addr.trim());
      }
  
      setAddress1(addresses[0] || "");
      setAddress2(addresses[1] || "");
      setAddress3(addresses[2] || "");
  
      setCountry(profile.country || "");
      setMobile(profile.mobile || "");
      setDateOfBirth(profile.date_of_birth ? new Date(profile.date_of_birth) : null);
  
      // Improved Base64 image handling
      if (profile.image) {
       
  
        // Validate the Base64 string
        const isValidBase64 = (str) => {
          const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
          return base64Regex.test(str);
        };
  
        if (isValidBase64(profile.image)) {
          // Generate the image URI
          const imageUri = `data:image/jpeg;base64,${profile.image}`;
          setImage(imageUri); // Save the URI to state
        
        } else {
          console.warn("Invalid Base64 string for image");
          setImage(null); // Set a fallback if the string is invalid
        }
      } else {
        console.warn("No image data available in profile");
        setImage(null); // Set a fallback for missing image
      }
    }
  }, [profile]);
  

  const handleImageSelection = async () => { 
    try {
      // Check and request permissions
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log(permission);
      if (permission.status !== "granted") {
        Alert.alert("Permission Denied", "We need permission to access your media library.");
        return;
      }
  
      // Launch the image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0.5,
      });
      console.log(result);
  
      if (!result.canceled) {
        const { uri } = result.assets[0];
  
        // Resize the image using expo-image-manipulator
        const resizedImage = await ImageManipulator.manipulateAsync(
          uri,
          [{ resize: { width: 500, height: 500 } }], // Resize dimensions
          { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
        );
  
        // Convert to base64 to check the image size before proceeding
        const imageBase64 = await ImageManipulator.manipulateAsync(
          resizedImage.uri,
          [],
          { base64: true }
        );
        console.log("Resized Image Uri:",resizedImage.uri);
        console.log("Base64 Image Size:", imageBase64.base64.length);

  
        const maxSize = 1000000; // 1MB max size (adjust as needed)
        const imageSize = imageBase64.base64.length;
  
        // Check image size and ensure it's within the max size
        if (imageSize > maxSize) {
          Alert.alert("Image is too large", "Please choose a smaller image.");
          return;
        }
  
        // Set resized image URI for use in the profile update
        setImage(resizedImage.uri); // Set resized image URI
      } else {
        Alert.alert("Cancelled", "Image selection was cancelled.");
      }
    } catch (err) {
      console.error("Image selection error:", err);
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
  };
  
  const validateProfileData = () => {
    if (!firstName.trim()) return "First name is required.";
    if (!lastName.trim()) return "Last name is required.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return "A valid email is required.";
    }
    return null;
  };
  
  const formatDateForBackend = (date) => moment(date).format('DD/MM/YYYY');

  const handleUpdateProfile = () => {
    const validationError = validateProfileData();
    if (validationError) {
      Alert.alert("Validation Error", validationError);
      return;
    }
  
    if (!dateOfBirth) {
      Alert.alert("Error", "Please select a date of birth.");
      return;
    }
  
    const formattedDateOfBirth = formatDateForBackend(dateOfBirth);
  
    const profileData = {
      id: userId,
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      addresses: [address1, address2, address3].filter(addr => addr.trim() !== "").join(","),
      country: country || "",
      mobile: mobile || "",
      date_of_birth: formattedDateOfBirth,
      image: image || profile.image || "",
    };
  
    if (!isEqual(profile, profileData)) {
      const formData = new FormData();
      formData.append("id", profileData.id);
      formData.append("firstName", profileData.firstName);
      formData.append("lastName", profileData.lastName);
      formData.append("email", profileData.email);
      formData.append("addresses", profileData.addresses);
      formData.append("country", profileData.country);
      formData.append("mobile", profileData.mobile);
      formData.append("date_of_birth", profileData.date_of_birth);

      if (profile.image || image) {
        if (profile.image && profile.image === image) {
          // Case 1: Fetched image not modified
          if (profile.image.startsWith("data:image")) {
            try {
              // Convert base64 to File
              const base64String = profile.image.split(",")[1];
              const byteCharacters = atob(base64String);
              const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0));
              const byteArray = new Uint8Array(byteNumbers);
              const blob = new Blob([byteArray], { type: "image/jpeg" });
      
              // Create a new File object from the Blob (using file name and type)
              const imageName = "profileImage.jpg";
              const imageFile = new File([blob], imageName, { type: "image/jpeg" });
      
              // Append the file to FormData
              formData.append("image", imageFile);
            } catch (error) {
              console.error("Error converting base64 to File:", error);
            }
          } else if (profile.image.startsWith("http")) {
            // Handle HTTP URL case for unmodified image
            const imageFile = {
              uri: profile.image,
              type: "image/jpeg",
              name: profile.image.split("/").pop() || "profileImage.jpg",
            };
            formData.append("image", imageFile);
          } else {
            console.error("Invalid image format for unmodified profile image.");
          }
        } else if (image) {
          // Case 2: Fetched image modified
          const imageUri = image;
          const imageName = imageUri.split("/").pop() || "profileImage.jpg";
          const imageFile = {
            uri: imageUri,
            type: "image/jpeg",
            name: imageName,
          };
          formData.append("image", imageFile);
        }
      } else {
        // Case 3: Fetched image is null
        formData.append("image", ""); // Send empty image
      }
      
      // Log formData to see the content before the request
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value instanceof File ? value.name : value.uri || "Invalid");
      }
      
      dispatch(updateProfileRequest({ id: profileData.id, profileData: formData }));
      
    } else {
      Alert.alert("No Changes", "No modifications detected.");
    }
  };
  

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!profile) {
    return <Text>No profile data available.</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="keyboard-arrow-left" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>
      <ScrollView>
        <View style={styles.imageSection}>
          <TouchableOpacity onPress={handleImageSelection}>
            <Image
               source={image ? { uri:image} : require("./pic.png")}
               style={styles.profileImage}
            />
            <MaterialIcons name="photo-camera" size={32} color={COLORS.primary} style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>
        {[{ label: "First Name", value: firstName, onChange: setFirstName },
          { label: "Last Name", value: lastName, onChange: setLastName },
          { label: "Email", value: email, onChange: setEmail },
          { label: "Mobile Number", value: mobile, onChange: setMobile },
          { label: "Address 1", value: address1, onChange: setAddress1 },
          { label: "Address 2", value: address2, onChange: setAddress2 },
          { label: "Address 3", value: address3, onChange: setAddress3 },
          { label: "Country", value: country, onChange: setCountry, isCountryField: true },
          { label: "Date of Birth", value: dateOfBirth, onChange: setDateOfBirth, isDateField: true }]
          .map((field, index) => (
            <View key={index} style={styles.fieldContainer}>
              <Text style={styles.label}>{field.label}</Text>
              {field.isCountryField ? (
                <TouchableOpacity onPress={() => setCountryModalVisible(true)} style={styles.textInput}>
                  <Text style={styles.textInputText}>{country || "Select Country"}</Text>
                </TouchableOpacity>
              ) : field.isDateField ? (
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
                  <Text style={styles.datePickerText}>
                    {dateOfBirth ? dateOfBirth.toDateString() : "Select Date of Birth"}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TextInput value={field.value} onChangeText={field.onChange} style={styles.textInput} />
              )}
            </View>
          ))}
        {showDatePicker && (
          <DateTimePicker
            value={dateOfBirth || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              setDateOfBirth(selectedDate || dateOfBirth);
            }}
          />
        )}
        <TouchableOpacity onPress={handleUpdateProfile} style={styles.updateButton}>
          <Text style={styles.updateButtonText}>{loading ? "Updating..." : "Update Profile"}</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal
        visible={countryModalVisible}
        onRequestClose={() => setCountryModalVisible(false)}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={COUNTRIES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setCountry(item);
                    setCountryModalVisible(false);
                  }}
                  style={styles.countryItem}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: "bold", flex: 1, textAlign: "center" },
  imageSection: { justifyContent: "center", alignItems: "center", marginBottom: 20 },
  profileImage: { width: 120, height: 120, borderRadius: 60 },
  cameraIcon: { position: "absolute", bottom: 10, right: 10 },
  fieldContainer: { marginBottom: 15 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
  textInput: { borderWidth: 1, borderColor: COLORS.secondaryGray, borderRadius: 8, padding: 10 },
  textInputText: { fontSize: 16, color: COLORS.black },
  datePicker: { borderWidth: 1, borderColor: COLORS.secondaryGray, borderRadius: 8, padding: 10 },
  datePickerText: { fontSize: 16, color: COLORS.black },
  updateButton: { backgroundColor: COLORS.primary, paddingVertical: 15, borderRadius: 8, alignItems: "center" },
  updateButtonText: { color: COLORS.white, fontSize: 16, fontWeight: "bold" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
  modalContent: { backgroundColor: COLORS.white, width: "80%", padding: 20, borderRadius: 10 },
  countryItem: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.secondaryGray },
});

export default EditProfile;
