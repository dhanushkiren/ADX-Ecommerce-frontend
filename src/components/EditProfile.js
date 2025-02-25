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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileRequest, updateProfileRequest,updateProfileSuccess } from "../redux/editprofile/slice";
import { isEqual } from "lodash";
import moment from "moment";
import { Platform } from 'react-native';
import {API_BASE_URL} from '../utils/constants'
import ImageResizer from "react-native-image-resizer"; 
import * as FileSystem from 'expo-file-system';
import { retrieveData } from "../utils/asyncStorage";

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
  "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica",
  "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (Swaziland)", "Ethiopia",
  "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
  "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
  "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
  "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
  "Mozambique", "Myanmar (Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria",
  "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay",
  "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
  "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia",
  "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
  "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand",
  "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine",
  "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela",
  "Vietnam", "Yemen", "Zambia", "Zimbabwe"
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
  // const { userId } = route.params || {};
  const [userId, setUserId] = useState(null);

  const dispatch = useDispatch();
  const {
    originalProfile: profile,
    error,
    loading,
  } = useSelector((state) => state.editProfile);


  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Track modified image file
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [country, setCountry] = useState("");
  const [mobile, setMobile] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [role, setRole] = useState(""); // ✅ Ensure role is defined

  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await retrieveData("userId");
        console.log("dkdkdk ", storedUserId);
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
    if (!profile) return;

    setFirstName(profile.firstName || "");
    setLastName(profile.lastName || "");
    setEmail(profile.email || "");

    // ✅ Process addresses
    let addresses = [];
    if (Array.isArray(profile.addresses)) {
        addresses = profile.addresses.length === 1 && typeof profile.addresses[0] === "string" && profile.addresses[0].includes(",") 
            ? profile.addresses[0].split(",").map(addr => addr.trim()) 
            : profile.addresses;
    } else if (typeof profile.addresses === "string") {
        addresses = profile.addresses.split(",").map(addr => addr.trim());
    }

    setAddress1(addresses[0] || "");
    setAddress2(addresses[1] || "");
    setAddress3(addresses[2] || "");
    setCountry(profile.country || "");
    setMobile(profile.mobile || "");
    setDateOfBirth(profile.date_of_birth ? new Date(profile.date_of_birth) : null);

    // ✅ Normalize BASE_URL (Remove trailing '/' or '/api/')
    const BASE_URL = API_BASE_URL.replace(/\/$/, "").replace(/\/api$/, "");

    let finalImageUrl = null;

    // ✅ Helper Functions
    const isValidBase64 = (str) => /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(str);

    const constructFullUrl = (path) => {
        return path.startsWith("http") ? path : `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
    };

    // ✅ Log API Response for Debugging
    console.log("📢 Full Profile Response:", JSON.stringify(profile, null, 2));

    // ✅ Image Handling
    if (profile.image && isValidBase64(profile.image)) {
        finalImageUrl = `data:image/jpeg;base64,${profile.image}`;
        console.log("✅ Base64 Image Detected");
    } else if (profile.image_url && typeof profile.image_url === "string" && profile.image_url.trim() !== "") {
        const constructedUrl = constructFullUrl(profile.image_url);
        console.log("🔗 Constructed Image URL:", constructedUrl);
        finalImageUrl = constructedUrl;
    } else {
        console.log("❌ No valid image found. Using default.");
    }

    setImage(finalImageUrl);

}, [profile]);

// ✅ Log Image Updates
useEffect(() => {
    console.log("🚀 Image state updated:", image);
}, [image]);
useEffect(() => {
  if (!profile) return;

  setFirstName(profile.firstName || "");
  setLastName(profile.lastName || "");
  setEmail(profile.email || "");

  // ✅ Process addresses
  let addresses = Array.isArray(profile.addresses)
      ? profile.addresses
      : typeof profile.addresses === "string"
      ? profile.addresses.split(",").map(addr => addr.trim())
      : [];

  setAddress1(addresses[0] || "");
  setAddress2(addresses[1] || "");
  setAddress3(addresses[2] || "");
  setCountry(profile.country || "");
  setMobile(profile.mobile || "");
  setDateOfBirth(profile.date_of_birth ? new Date(profile.date_of_birth) : null);

  // ✅ Normalize BASE_URL
  const BASE_URL = API_BASE_URL.replace(/\/$/, "").replace(/\/api$/, "");

  let finalImageUrl = null;

  // ✅ Helper Functions
  const constructFullUrl = (path) => 
      path.startsWith("http") ? path : `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  // ✅ Log API Response for Debugging
  console.log("📢 Full Profile Response:", JSON.stringify(profile, null, 2));

  // ✅ Image Handling
  if (profile.imageUrls && typeof profile.imageUrls === "string" && profile.imageUrls.trim() !== "") {
      const constructedUrl = constructFullUrl(profile.imageUrls);
      console.log("🔗 Constructed Image URL:", constructedUrl);
      finalImageUrl = constructedUrl;
  } else {
      console.log("❌ No valid image found. Using default.");
  }

  setImage(finalImageUrl);

}, [profile]);

// ✅ Log Image Updates
useEffect(() => {
  console.log("🚀 Image state updated:", image);
}, [image]);




  const handleConfirmDate = (date) => {
    setDatePickerVisibility(false);
    setDateOfBirth(date);
  };
  

  const handleImageSelection = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log(permission);
      if (permission.status !== "granted") {
        Alert.alert("Permission Denied", "We need permission to access your media library.");
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ Use correct media type
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0.5,
      });
  
      console.log("🖼️ Image Picker Result:", result);
  
      if (!result.canceled) {
        const { uri } = result.assets[0];
  
        let resizedImage;
        let fileImage;
  
        if (Platform.OS === "web") {
          // ✅ Convert Blob to File for Web
          resizedImage = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 200, height: 200 } }],
            { compress: 0.2, format: ImageManipulator.SaveFormat.JPEG }
          );
  
          const response = await fetch(resizedImage.uri);
          const blob = await response.blob();
          fileImage = new File([blob], "profile.jpg", { type: "image/jpeg" });
  
          console.log("✅ Resized Image (Web):", fileImage);
        } else {
          // ✅ Mobile: Use existing logic
          resizedImage = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 500, height: 500 } }],
            { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
          );
  
          fileImage = {
            uri: resizedImage.uri,
            type: "image/jpeg",
            name: "profile.jpg",
          };
        }
  
        console.log("✅ Final Image File:", fileImage);
  
        setImage(resizedImage.uri);
        setImageFile(fileImage);
      }
    } catch (err) {
      console.error("❌ Image Selection Error:", err);
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
  };
  
  
  
  
  const validateProfileData = () => {
    if (!firstName || firstName.trim() === "") return "First name is required.";
    if (!lastName || lastName.trim() === "") return "Last name is required.";
    if (!mobile || mobile.trim() === "") return "Mobile number is required.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return "A valid email is required.";
    }
    return null; // ✅ No validation errors
  };
  const handleUpdateProfile = async () => {
    try {
        console.log("🚀 Starting Profile Update...");
  
        const validationError = validateProfileData();
        if (validationError) {
            Alert.alert("Validation Error", validationError);
            return;
        }
  
        if (!dateOfBirth) {
            Alert.alert("Error", "Please select a date of birth.");
            return;
        }

        // ✅ Convert date to backend expected format: "dd/MM/yyyy"
        const formattedDateOfBirth = moment(dateOfBirth).format("DD/MM/YYYY");

        // ✅ Create an array for addresses
        const addresses = [address1, address2, address3].filter(Boolean);

        // ✅ Retrieve password from AsyncStorage
        const storedPassword = await retrieveData("password");
        if (!storedPassword) {
            console.warn("⚠ No stored password found! Using dummy password.");
        }

        // ✅ Create FormData object
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName || "");
        formData.append("email", email);
        formData.append("mobile", mobile);
        formData.append("date_of_birth", formattedDateOfBirth);
        formData.append("country", country);
        formData.append("role", role || ""); 
        formData.append("addresses", addresses.length > 0 ? addresses.join(",") : "");

        // ✅ Always send password to avoid backend resetting it
        formData.append("password", storedPassword || "DUMMY_PASSWORD");

        // ✅ Ensure image is formatted correctly
        if (imageFile) {
            console.log("📸 Selected Image File:", imageFile);
  
            let fileToUpload;
            if (Platform.OS === "web") {
                const response = await fetch(imageFile.uri);
                const blob = await response.blob();
                fileToUpload = new File([blob], "profile.jpg", { type: "image/jpeg" });
            } else {
                fileToUpload = {
                    uri: imageFile.uri,
                    type: "image/jpeg",
                    name: "profile.jpg",
                };
            }

            formData.append("image", fileToUpload);
        } else {
            console.warn("⚠ No Image Selected");
        }

        // ✅ Determine API URL & Method
        const url = userId 
            ? `http://localhost:8080/api/users/${userId}` 
            : `http://localhost:8080/api/users`;
        const method = userId ? "PUT" : "POST";

        console.log("📤 FormData Entries:");
        for (let pair of formData.entries()) {
            console.log("➡", pair[0], ":", pair[1]);
        }

        const response = await fetch(url, {
            method: method,
            headers: {
                "Authorization": `Bearer ${await retrieveData("token")}`,
            },
            body: formData,
        });

        const textResponse = await response.text();
        console.log("📢 Raw API Response:", textResponse);

        try {
            const jsonResponse = JSON.parse(textResponse);
            console.log("✅ Converted JSON:", jsonResponse);
            Alert.alert("Success", "Profile updated successfully!");
        } catch (error) {
            console.error("❌ JSON Parsing Error:", error);
            Alert.alert("Error", "Invalid response from server.");
        }
    } catch (error) {
        console.error("❌ Error in handleUpdateProfile:", error);
        Alert.alert("Update Failed", "An unexpected error occurred.");
    }
};



useEffect(() => {
  const debugToken = async () => {
    const storedToken = await retrieveData("token");
    console.log("📢 Debugging: Token in AsyncStorage after update:", storedToken);
  };
  debugToken();
}, []);

      

  if (loading) {
    return <Text>Loading...</Text>;
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
              Platform.OS === "web" ? (
                // ✅ Web: Use native <input type="date">
                <input
                    type="date"
                    value={dateOfBirth ? moment(dateOfBirth).format("YYYY-MM-DD") : ""}
                    onChange={(e) => {
                      const selectedDate = new Date(e.target.value); // Store as Date object
                      console.log("Selected Date (Web - Raw):", selectedDate);
                      setDateOfBirth(selectedDate);
                    }}
                    style={styles.webDateInput}
                  />
                ) : (
                // ✅ Mobile: Use React Native Date Picker
                <>
                  <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={styles.datePicker}>
                    <Text style={styles.datePickerText}>
                      {dateOfBirth ? moment(dateOfBirth).format("DD/MM/YYYY") : "Select Date of Birth"}
                    </Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirmDate}
                    onCancel={() => setDatePickerVisibility(false)}
                  />
                </>
              )
            ) : (
              <TextInput value={field.value} onChangeText={field.onChange} style={styles.textInput} />
            )}
          </View>
        ))}
       
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
            {Platform.OS === "web" ? (
              <ScrollView style={{ maxHeight: 300 }} keyboardShouldPersistTaps="handled">
                {COUNTRIES.map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => {
                      setCountry(item);
                      setCountryModalVisible(false);
                    }}
                    style={styles.countryItem}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
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
            )}
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
  webDateInput: { backgroundColor: COLORS.white,borderWidth: 1, padding: 10, borderRadius: 8, width: "100%", fontSize: 16 },
  updateButton: { backgroundColor: COLORS.primary, paddingVertical: 15, borderRadius: 8, alignItems: "center" },
  updateButtonText: { color: COLORS.white, fontSize: 16, fontWeight: "bold" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
  modalContent: { backgroundColor: COLORS.white, width: "80%", padding: 20, borderRadius: 10 },
  countryItem: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.secondaryGray },
});

export default EditProfile;