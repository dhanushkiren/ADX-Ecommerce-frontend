import React, { useState, useEffect } from 'react'; 
import {
    View, Text, TextInput, TouchableOpacity, ScrollView, Image, Modal,
    FlatList, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux'; 
import { updateProfileRequest } from './slice'; 

const COUNTRIES = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
    "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica",
    "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
    "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia",
    "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary",
    "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya",
    "Kiribati", "Korea (North)", "Korea (South)", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
    "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
    "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (Burma)",
    "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norway", "Oman", "Pakistan", "Palau",
    "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia",
    "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", 
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", 
    "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "São Tomé and Príncipe", 
    "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", 
    "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", 
    "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const EditProfile = ({ navigation }) => {
    const COLORS = {
        primary: '#1f8b3b',
        secondaryGray: '#d3d3d3',
        white: '#ffffff',
        black: '#000000'
    };

    const FONTS = {
        h3: { fontSize: 24, fontWeight: 'bold' },
        h4: { fontSize: 20, fontWeight: 'bold' },
        body3: { fontSize: 16, fontWeight: 'normal' }
    };

    const [selectedImage, setSelectedImage] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [address3, setAddress3] = useState("");
    const [country, setCountry] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [countryModalVisible, setCountryModalVisible] = useState(false);

    const dispatch = useDispatch();
    const { loading, error, userId } = useSelector(state => state.auth);  // userId is in auth state

    useEffect(() => {
        if (error) {
            Alert.alert("Error", error);
        }
    }, [error]);

    const handleImageSelection = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const handleUpdateProfile = () => {
        if (!firstName || !lastName || !email || !address1 || !country || !mobileNumber || !dateOfBirth) {
            Alert.alert(
                "Incomplete Form",
                "Please fill in all the required fields.",
                [{ text: "OK" }]
            );
            return;
        }

        const profileData = {
            id: userId, 
            firstName,
            lastName,
            email,
            address: [address1, address2, address3], 
            country,
            mobileNumber,
            dateOfBirth: dateOfBirth.toISOString(),
            selectedImage
        };

        dispatch(updateProfileRequest(profileData));
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 22 }}>
            <View style={{ marginHorizontal: 12, flexDirection: "row", justifyContent: "center" }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", left: 0 }}>
                    <MaterialIcons name="keyboard-arrow-left" size={24} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={{ ...FONTS.h3 }}>Edit Profile</Text>
            </View>

            <ScrollView>
                <View style={{ alignItems: "center", marginVertical: 25 }}>
                    <TouchableOpacity onPress={handleImageSelection}>
                        <Image
                            source={selectedImage ? { uri: selectedImage } : require('./pic.png')}
                            style={{
                                height: 170,
                                width: 170,
                                borderRadius: 85,
                                borderColor: COLORS.primary,
                                borderWidth: 2,
                                marginBottom: 10
                            }}
                        />
                        <MaterialIcons
                            name="photo-camera"
                            size={32}
                            color={COLORS.primary}
                            style={{ position: 'absolute', bottom: 0, right: 10 }}
                        />
                    </TouchableOpacity>
                </View>

                <View>
                    {["First Name", "Last Name", "Email", "Mobile Number", "Address 1", "Address 2", "Address 3", "Country"].map((field, index) => (
                        <View key={index} style={{ marginBottom: 12 }}>
                            <Text style={{ ...FONTS.h4 }}>{field}</Text>
                            <View style={{
                                height: 44,
                                borderColor: COLORS.secondaryGray,
                                borderWidth: 1,
                                borderRadius: 4,
                                marginVertical: 6,
                                justifyContent: "center",
                                paddingLeft: 8,
                                backgroundColor: COLORS.white
                            }}>
                                {field === "Country" ? (
                                    <TouchableOpacity onPress={() => setCountryModalVisible(true)}>
                                        <Text style={{ ...FONTS.body3, color: COLORS.black }}>{country || "Select your country"}</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TextInput
                                        value={field === "First Name" ? firstName :
                                            field === "Last Name" ? lastName :
                                                field === "Email" ? email :
                                                    field === "Mobile Number" ? mobileNumber :
                                                        field === "Address 1" ? address1 :
                                                            field === "Address 2" ? address2 :
                                                                field === "Address 3" ? address3 : ""}
                                        onChangeText={(text) => {
                                            if (field === "First Name") setFirstName(text);
                                            if (field === "Last Name") setLastName(text);
                                            if (field === "Email") setEmail(text);
                                            if (field === "Mobile Number") setMobileNumber(text);
                                            if (field === "Address 1") setAddress1(text);
                                            if (field === "Address 2") setAddress2(text);
                                            if (field === "Address 3") setAddress3(text);
                                        }}
                                        style={{ ...FONTS.body3, color: COLORS.black }}
                                    />
                                )}
                            </View>
                        </View>
                    ))}
                </View>

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

                <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    style={{
                        height: 44,
                        borderColor: COLORS.secondaryGray,
                        borderWidth: 1,
                        borderRadius: 4,
                        marginVertical: 6,
                        justifyContent: "center",
                        paddingLeft: 8,
                        backgroundColor: COLORS.white
                    }}>
                    <Text style={{ ...FONTS.body3, color: COLORS.black }}>
                        {dateOfBirth ? dateOfBirth.toDateString() : "Select Date of Birth"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleUpdateProfile}
                    style={{
                        backgroundColor: COLORS.primary,
                        paddingVertical: 12,
                        borderRadius: 4,
                        marginTop: 20,
                    }}>
                    <Text style={{ ...FONTS.h4, color: COLORS.white, textAlign: "center" }}>
                        {loading ? "Updating..." : "Update Profile"}
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Country Modal */}
            <Modal
                visible={countryModalVisible}
                onRequestClose={() => setCountryModalVisible(false)}
                transparent={true}
                animationType="slide"
            >
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.5)"
                }}>
                    <View style={{
                        backgroundColor: COLORS.white,
                        padding: 20,
                        borderRadius: 8,
                        width: '80%',
                    }}>
                        <FlatList
                            data={COUNTRIES}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => { setCountry(item); setCountryModalVisible(false); }}>
                                    <Text style={{ padding: 10, ...FONTS.body3 }}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default EditProfile;
