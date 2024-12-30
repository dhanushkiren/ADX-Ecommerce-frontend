import { View, Text, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from "expo-image-picker";
// import { COLORS, FONTS } from '../Constants';
import { MaterialIcons } from "@expo/vector-icons";
// import { imagesDataURL } from '../constants.data';
import DatePicker, { getFormattedDate } from 'react-native-modern-datepicker';
import Modal from 'react-native-modal';

const EditProfile = ({ navigation }) => {
    const COLORS = {
        primary: '#1f8b3b', // example color
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
    const [name, setName] = useState("Mellisa");
    const [email, setEmail] = useState("melii@gmail.com");
    const [password, setPassword] = useState("randompassword");
    const [country, setCountry] = useState("Nigeria");
    const [openStartDatePicker, setStartDatePicker] = useState(false);

    const today = new Date();
    const startDate = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    const [selectedStartDate, setSelectedStartDate] = useState(startDate);
    const handleImageSelection = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });
    
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri); // Use result.assets[0].uri for the selected image
        }
    };
    

    const renderDatePicker = () => {
        return (
            <Modal
                isVisible={openStartDatePicker}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                onBackdropPress={() => setStartDatePicker(false)}
            >
                <View style={{
                    backgroundColor: COLORS.primary,
                    padding: 20,
                    borderRadius: 20,
                    alignItems: "center"
                }}>
                    <DatePicker
                        mode="calendar"
                        minimumDate={startDate}
                        selected={selectedStartDate}
                        onSelectedChange={(date) => setSelectedStartDate(date)}
                        options={{
                            backgroundColor: COLORS.primary,
                            textHeaderColor: "#469ab6",
                            textDefaultColor: COLORS.white,
                            mainColor: "#469ab6",
                            textSecondaryColor: COLORS.white,
                            borderColor: "rgba(122,146,165,0.1)"
                        }}
                    />
                    <TouchableOpacity onPress={() => setStartDatePicker(false)}>
                        <Text style={{ ...FONTS.body3, color: COLORS.white }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    };

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.white,
            paddingHorizontal: 22
        }}>
            <View style={{
                marginHorizontal: 12,
                flexDirection: "row",
                justifyContent: "center"
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
                <Text style={{ ...FONTS.h3 }}>Profile</Text>
            </View>

            <ScrollView>
                <View style={{ alignItems: "center", marginVertical: 22 }}>
                    <TouchableOpacity onPress={handleImageSelection}>
                    <Image
                        source={selectedImage ? { uri: selectedImage } : require('../components/pic.png')}
                        style={{
                        height: 170,
                        width: 170,
                        borderRadius: 85,
                        borderColor: COLORS.primary,
                        borderWidth: 2,
                        }}
                        />

                        <View style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 10,
                            zIndex: 9999
                        }}>
                            <MaterialIcons
                                name="photo-camera"
                                size={32}
                                color={COLORS.primary}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                <View>
                    {/* Form Fields */}
                    {["Name", "Email", "Password", "Country"].map((field, index) => (
                        <View key={index} style={{ flexDirection: "column", marginBottom: 6 }}>
                            <Text style={{ ...FONTS.h4 }}>{field}</Text>
                            <View style={{
                                height: 44,
                                width: "100%",
                                borderColor: COLORS.secondaryGray,
                                borderWidth: 1,
                                borderRadius: 4,
                                marginVertical: 6,
                                justifyContent: "center",
                                paddingLeft: 8
                            }}>
                                <TextInput
                                    value={
                                        field === "Name" ? name :
                                            field === "Email" ? email :
                                                field === "Password" ? password :
                                                    country
                                    }
                                    onChangeText={
                                        field === "Name" ? setName :
                                            field === "Email" ? setEmail :
                                                field === "Password" ? setPassword :
                                                    setCountry
                                    }
                                    secureTextEntry={field === "Password"}
                                />
                            </View>
                        </View>
                    ))}

                    {/* Date of Birth */}
                    <View style={{ flexDirection: "column", marginBottom: 6 }}>
                        <Text style={{ ...FONTS.h4 }}>Date of Birth</Text>
                        <TouchableOpacity
                            onPress={() => setStartDatePicker(true)}
                            style={{
                                height: 44,
                                width: "100%",
                                borderColor: COLORS.secondaryGray,
                                borderWidth: 1,
                                borderRadius: 4,
                                marginVertical: 6,
                                justifyContent: "center",
                                paddingLeft: 8
                            }}>
                            <Text>{selectedStartDate}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.primary,
                        height: 44,
                        borderRadius: 6,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Text style={{ ...FONTS.body3, color: COLORS.white }}>Save Changes</Text>
                </TouchableOpacity>

                {renderDatePicker()}
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditProfile;
