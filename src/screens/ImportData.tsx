import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ToastAndroid, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { setupSignIn } from '../services/AuthServices';
import { type StackNavigation } from "../navigation/AppNavigator";
import { useNavigation } from '@react-navigation/native'
import { decryptData, getGoogleDriveFiles, restoreDatabase, restoreFromGoogleDrive } from '../services/BackupServices';

const ImportData = () => {
    const [password, setPassword] = useState<string>("");
    const [progress, setProgress] = useState(0);
    const [backupState, setBackupState] = useState<boolean>(false);
    const animation = useRef(new Animated.Value(0)).current;
    const { navigate } = useNavigation<StackNavigation>();

    const validPin = (): boolean => {
        let isValid = true
        if (password === "") {
            Alert.alert("", "PIN is emply");
            isValid = false
        } else if (password.length > 4 || password.length < 4) {
            console.log("HIT")
            Alert.alert("", "Only 4 Digit PIN Allowed");
            isValid = false
        }

        return isValid
    }

    const getBackup = async () => {
        const accessToken: string = await setupSignIn();
        ToastAndroid.show("Google Drive Authentication done", ToastAndroid.SHORT);
        // console.log(accessToken);
        const [backupData, listLength,error] = await getGoogleDriveFiles(accessToken);
        // ToastAndroid.show(error, ToastAndroid.LONG);
        if (listLength > 0) {
            ToastAndroid.show("Behisebi Database found on G Drive", ToastAndroid.SHORT);
            const encriptedData: string = await restoreFromGoogleDrive(accessToken, backupData.backup_file_id);
            ToastAndroid.show("Decrypting Database", ToastAndroid.SHORT);
            const [decryptedData, result] = await decryptData(encriptedData, password);
            if (result) {
                ToastAndroid.show("Database restore in Progress", ToastAndroid.SHORT);
                const status = await restoreDatabase(decryptedData);
                if (status) {
                    ToastAndroid.show("Database Restored", ToastAndroid.SHORT);
                    setBackupState(true);
                } else {
                    ToastAndroid.show("Error while restoring data", ToastAndroid.SHORT);
                }
            } else {
                ToastAndroid.show("Unable to decrypting Database PIN Incorrect", ToastAndroid.SHORT);
            }
        } else {
            ToastAndroid.show("Behisebi Database not found on G Drive", ToastAndroid.SHORT);
        }
    }
    return (
        <View style={styles.container}>
            <Text>The Application will fetch data Behisebe Database</Text>
            <Text>from Google Drive</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="4-digit PIN"
                keyboardType="phone-pad"
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={() => {
                const isValid = validPin();
                if (isValid) {
                    getBackup()
                }
                // navigate("RegisterDone");

            }}>
                <Text style={styles.buttonText}>Authenticate to G Drive</Text>
            </TouchableOpacity>

            <TouchableOpacity style={!backupState ? styles.button2 : styles.button}
                disabled={!backupState} onPress={() => { navigate("App"); }}>
                <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>

        </View>
    )
}

export default ImportData

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
    progressBarContainer: {
        width: '100%',
        height: 20,
        backgroundColor: '#e0e0df',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#76c7c0',
    },
    progressText: {
        marginVertical: 10,
        fontSize: 16,
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
    button2: {
        backgroundColor: "#808080",
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
