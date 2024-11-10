import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { type StackNavigation } from "../../navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import PaymentCommonHeader from "../../common/PaymentCommonHeader";
import styles from "./styles";
import { moderateScale } from "react-native-size-matters";
import Ionicons from '@expo/vector-icons/Ionicons';

const SelfTransferSuccessful = () => {
    const { navigate } = useNavigation<StackNavigation>();
    return (
        <View style={styles.container}>
            <PaymentCommonHeader headerTitle={"Self Transfer Successful"} />
            <Text style={{ textAlign: "center", justifyContent: "center", paddingTop: moderateScale(200), }}>
                <Ionicons name="checkmark-circle" size={100} color="green" />
            </Text>
            <View style={styles.mainView}>
                <TouchableOpacity style={[styles.confirmPayNow2]}
                    onPress={() => {
                        navigate("ToSelfTransfer");
                    }}
                >
                    <Text style={styles.payNowText}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SelfTransferSuccessful