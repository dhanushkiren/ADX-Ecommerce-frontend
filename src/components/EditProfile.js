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
import Resizer from "react-image-file-resizer";


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

const EditProfile = ({ navigation }) => {
  const userId = useSelector((state) => state.editProfile.userId);
  const dispatch = useDispatch();
  const { originalProfile: profile, error, loading } = useSelector((state) => state.editProfile);

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

  useEffect(() => {
    if (userId) {
      dispatch(fetchProfileRequest({ userId }));
    } else {
      Alert.alert("Error", "User ID is required.");
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (profile) {
    
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
        

       // ✅ Dynamically remove '/api/' from BASE_URL
       const BASE_URL = API_BASE_URL.endsWith("/") 
       ? API_BASE_URL.slice(0, -1).replace("/api", "")
       : API_BASE_URL.replace("/api", "");
 
     let finalImageUrl = null;
 
     // ✅ Check if the backend image is a valid base64 string
     const isValidBase64 = (str) => {
      const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
      return base64Regex.test(str);
    };
 
     // ✅ Check if the backend image is a valid URL (Basic Check)
     const isValidUrl = (str) => {
       try {
         new URL(str);
         return true;
       } catch (_) {
         return false;
       }
     };
     if (profile.image && isValidBase64(profile.image)) {
      // ✅ Valid Base64 Image
      finalImageUrl = `data:image/jpeg;base64,${profile.image}`;
  
      const shortBase64 = profile.image.substring(0, 20) + "..." + profile.image.slice(-20); // Shorten Base64
  
      console.log("✅ Fetched image is a valid base64:", shortBase64);
  } 
  else if (profile.image_url && typeof profile.image_url === "string" && profile.image_url.trim() !== "") {
      // ✅ Construct Full URL and Validate
      const constructedUrl = `${BASE_URL}${profile.image_url.startsWith("/") ? profile.image_url : `/${profile.image_url}`}`;
      
      if (isValidUrl(constructedUrl)) {
          finalImageUrl = constructedUrl;
          console.log("✅ Fetched image is a valid URL:", finalImageUrl);
      } else {
          console.log("❌ Invalid Image URL from backend:", profile.image_url);
          finalImageUrl = null;
      }
  } 
  else {
      console.log("❌ No valid image found. Using default.");
      finalImageUrl = null;
  }
  
 setImage(finalImageUrl);
  
  // Show shortened Base64 for console if it's Base64
  const logImage = (finalImageUrl && typeof finalImageUrl === "string" && finalImageUrl.startsWith("data:image/jpeg;base64,"))
    ? finalImageUrl.substring(0, 40) + "..." + finalImageUrl.slice(-20)
    : finalImageUrl || "No Image Found";

  
  console.log("Final image after validation:", logImage);
  }
  
}, [profile]);

useEffect(() => {
  console.log("🚀 Image state updated:", image);
}, [image]);


  const handleConfirmDate = (date) => {
    setDatePickerVisibility(false);
    setDateOfBirth(date);
  };
  

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

      console.log("🖼️ Image Picker Result:", result);
  
      if (!result.canceled) {
        const { uri } = result.assets[0];

        let resizedImage;
        let fileImage;

        if (Platform.OS === "web") {
          // ✅ For Web: Resize More & Convert to File
          resizedImage = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 200, height: 200 } }], // Resize more for Web
            { compress: 0.2, format: ImageManipulator.SaveFormat.JPEG }
          );
  
          const response = await fetch(resizedImage.uri);
          const blob = await response.blob();
          fileImage = new File([blob], "profile.jpg", { type: "image/jpeg" });

          console.log("Resized Image from WEB:",fileImage);

        } else {
          // ✅ For Mobile: Use existing logic
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
  
        // ✅ Update both image and imageFile for consistency
        setImage(resizedImage.uri);
        setImageFile(fileImage);
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
  
 // ✅ Corrected base64 to file conversion for MOBILE
 const base64ToFile = async (base64String, fileName = "profile.jpg") => {
  try {
    if (!base64String || !base64String.startsWith("data:image")) {
      console.error("❌ Invalid base64 string");
      return null;
    }

    const fileUri = FileSystem.cacheDirectory + fileName;

    await FileSystem.writeAsStringAsync(fileUri, base64String.split(",")[1], {
      encoding: FileSystem.EncodingType.Base64,
    });

    return {
      uri: fileUri,
      type: "image/jpeg",
      name: fileName,
    };
  } catch (error) {
    console.error("❌ Error converting base64 to File:", error);
    return null;
  }
};

 // ✅ Corrected base64 to file conversion for WEB
 const base64ToBlob = (base64String, fileName = "profile.jpg") => {
  try {
    if (!base64String || !base64String.includes(",")) {
      console.error("❌ Invalid base64 string, cannot convert.");
      return null;
    }

    // ✅ Remove extra spaces or newlines in base64 string
    base64String = base64String.trim().replace(/\s/g, "");

    const [meta, base64Data] = base64String.split(",");
    const mimeMatch = meta.match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : "image/jpeg"; 

    // ✅ Convert base64 to binary (optimized)
    const byteArray = Uint8Array.from(atob(base64Data), (char) => char.charCodeAt(0));

    // ✅ Create a Blob and File object
    const blob = new Blob([byteArray], { type: mime });

    console.log("✅ Successfully converted base64 to Blob:", blob);
    return new File([blob], fileName, { type: mime });
  } catch (error) {
    console.error("❌ Error converting base64 to Blob:", error);
    return null;
  }
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

    const formattedDateOfBirth = dateOfBirth
    ? moment(dateOfBirth).format("DD/MM/YYYY")
    : "";
  
  console.log("📅 Final formatted date:", formattedDateOfBirth);
  

    const profileData = {
      id: Number(userId),
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      addresses: [address1, address2, address3].filter(addr => addr.trim() !== "").join(","),
      country: country || "",
      mobile: mobile || "",
      date_of_birth: formattedDateOfBirth,
     
    };

    console.log("🔍 isEqual result:", isEqual(profile, profileData));

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

      console.log("🖼️ NEW SELECTED Image File Before Appending to FormData:", imageFile);

      let imageToSend = null;

      if (imageFile) {
        // ✅ If user selects a new image, use it directly
        imageToSend = imageFile;
      } else if (image && image.startsWith("data:image")) {
        if (Platform.OS === "web") {
          // ✅ Convert base64 to Blob for web
          imageToSend = base64ToBlob(image, "profile.jpg");
        } else {
          // ✅ Convert base64 to file for mobile
          imageToSend = await base64ToFile(image, "existingProfileImage.jpg");
        }
      }

      if (imageToSend) {
        if (Platform.OS === "web") {
          console.log("📸 Web Image Data Before Append:", imageToSend);
          console.log("📸 Type:", typeof imageToSend);
          console.log("📸 Instance of Blob:", imageToSend instanceof Blob);
          console.log("📸 Instance of File:", imageToSend instanceof File);
          
          if (!(imageToSend instanceof Blob || imageToSend instanceof File)) {
            console.error("🛑 Image is NOT a valid Blob or File! Converting...");
            imageToSend = base64ToBlob(image, "profile.jpg"); // Convert again just in case
          }
      
          formData.append("image", imageToSend, "profile.jpg"); // Ensure correct format
        } else {
          formData.append("image", {
            uri: imageToSend.uri,
            type: imageToSend.type || "image/jpeg",
            name: imageToSend.name || "profileImage.jpg",
          });
        }
      } else {
        console.log("🛑 No valid image found. Removing image field.");
      }
      

      console.log("📦 Final FormData:");
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      if (formData.has("image")) {
        console.log("✅ Image field is present in FormData:", formData.get("image"));
      } else {
        console.log("🛑 Image field is missing in FormData, ensuring it’s properly handled.");
      }

      dispatch(updateProfileRequest({ id: profileData.id, profileData: formData }));
      console.log("✅ Dispatch Triggered Successfully!");
    } else {
      Alert.alert("No Changes", "No modifications detected.");
    }

  } catch (error) {
    console.error("❌ Error in handleUpdateProfile:", error);
    Alert.alert("Update Failed", "An unexpected error occurred.");
  }
};
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
