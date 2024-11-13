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
import { type StackNavigation } from "../navigation/AppNavigator";
import { useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { moderateScale } from "react-native-size-matters";
const RegisterDone = () => {
    const { navigate } = useNavigation<StackNavigation>();
    return (
        <View style={styles.container}>
            <Text style={{ textAlign: "center", justifyContent: "center", paddingTop: moderateScale(200), }}>
                <Ionicons name="checkmark-circle" size={100} color="green" />
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => {
                // registerUser();
                navigate("App");
            }}>
                <Text style={styles.buttonText}>Let's Be Hisebi</Text>
            </TouchableOpacity>
        </View>
    )
}

export default RegisterDone

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
        marginTop: hp("10%"),
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