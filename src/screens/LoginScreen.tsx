import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { UserModel } from "../model";
import { convertToMD5 } from "../utils/AllUtils";
import { saveUserData } from "../repository/UsersRepo";
import { type StackNavigation } from "../navigation/AppNavigator";
import { useNavigation } from '@react-navigation/native'
const LoginScreen = () => {
    const { navigate } = useNavigation<StackNavigation>();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const registerUser = (): boolean => {
        let isValid = true
        if (userName === "") {
            alert("Username is Empty!")
            isValid = false
        } else if (password === "") {
            alert("PIN is emply");
            isValid = false
        } else if (password.length > 4) {
            alert("Only 4 Digit PIN Allowed");
            isValid = false
        }

        const userObj: UserModel = {
            username: userName,
            passwd: convertToMD5(password)
        }
        if (isValid) {
            saveUserData(userObj);
        }
        return isValid;
    }

    return (
        <View style={styles.container}>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={setUserName}
                    value={userName}
                    placeholder="User Name"
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="4-digit PIN"
                    keyboardType="phone-pad"
                    secureTextEntry={!passwordVisible}
                />
                <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    style={styles.eyeIcon}
                >
                    <Ionicons
                        name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                        size={24}
                        color="grey"
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => {
                const isValid = registerUser();
                if (isValid) {
                    navigate("RegisterDone");
                }
            }}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: wp("4%"),
        backgroundColor: "#fff",
    },
    title: {
        fontSize: wp("6%"),
        marginBottom: hp("3%"),
        fontWeight: "bold",
    },
    logo: {
        marginBottom: hp("6%"),
    },
    input: {
        height: hp("7%"),
        width: "100%",
        marginVertical: hp("1%"),
        borderWidth: 1,
        padding: wp("2.5%"),
        borderRadius: 5,
        borderColor: "#ddd",
    },
    button: {
        backgroundColor: "#01a5fc",
        borderRadius: 25,
        padding: wp("3%"),
        alignItems: "center",
        marginTop: hp("2.5%"),
        width: '100%',
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: wp("4%"),
    },
    forgotPassword: {
        color: "#0ed1c0",
        marginTop: hp("2.5%"),
        fontSize: wp("3.5%"),
    },
    signupContainer: {
        flexDirection: "row",
        marginTop: hp("2.5%"),
    },
    signupText: {
        color: "#0ed1c0",
        marginLeft: wp("1%"),
        fontSize: wp("3.5%"),
    },
    logoIcon: {
        width: wp("30%"),
        height: wp("30%"),
        marginTop: hp("1%"),
        marginBottom: hp("4%"),
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
    input: {
        flex: 1,
        height: 50,
        marginVertical: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: "#ddd",
    },
    eyeIcon: {
        position: "absolute",
        right: wp("2.5%"),
        padding: wp("2.5%"),
    },
    phoneIcon: {
        position: "absolute",
        right: wp("2.5%"),
        padding: wp("2.5%"),
    },
});

export default LoginScreen;