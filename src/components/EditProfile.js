import React, { useState } from 'react'; 
import {
    View, Text, TextInput, TouchableOpacity, ScrollView, Image, Modal,
    FlatList, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';

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

        console.log({
            firstName,
            lastName,
            email,
            address1,
            address2,
            address3,
            country,
            mobileNumber,
            dateOfBirth: dateOfBirth.toISOString(),
            selectedImage
        });

        Alert.alert(
            "Profile Updated",
            "Your profile has been successfully updated.",
            [{ text: "OK" }]
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 22 }}>
            <View style={{
                marginHorizontal: 12,
                flexDirection: "row",
                justifyContent: "center",
            }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        position: "absolute",
                        left: 0
                    }}>
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={24}
                        color={COLORS.black}
                    />
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
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 10,
                            }}
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
                                                                field === "Address 3" ? address3 : state}
                                        onChangeText={text => {
                                            if (field === "First Name") setFirstName(text);
                                            else if (field === "Last Name") setLastName(text);
                                            else if (field === "Email") setEmail(text);
                                            else if (field === "Mobile Number") setMobileNumber(text);
                                            else if (field === "Address 1") setAddress1(text);
                                            else if (field === "Address 2") setAddress2(text);
                                            else if (field === "Address 3") setAddress3(text);
                                        }}
                                        placeholder={`Enter your ${field.toLowerCase()}`}
                                        style={{ fontSize: 16 }}
                                    />
                                )}
                            </View>
                        </View>
                    ))}

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ ...FONTS.h4 }}>Date of Birth</Text>
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
                            }}
                        >
                            <Text style={{ ...FONTS.body3, color: COLORS.black }}>
                                {dateOfBirth ? dateOfBirth.toDateString() : "Select your date of birth"}
                            </Text>
                        </TouchableOpacity>
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
                    </View>

                    <TouchableOpacity
                        style={{
                            backgroundColor: COLORS.primary,
                            height: 44,
                            borderRadius: 4,
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 20
                        }}
                        onPress={handleUpdateProfile}
                    >
                        <Text style={{ ...FONTS.body3, color: COLORS.white }}>Update Profile</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Country Modal */}
            <Modal
                visible={countryModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setCountryModalVisible(false)}
            >
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}>
                    <View style={{
                        backgroundColor: COLORS.white,
                        width: '80%',
                        borderRadius: 10,
                        padding: 20,
                        elevation: 5
                    }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Select Country</Text>
                        <FlatList
                            data={COUNTRIES}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setCountry(item);
                                        setCountryModalVisible(false);
                                    }}
                                >
                                    <Text style={{ paddingVertical: 10 }}>{item}</Text>
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
