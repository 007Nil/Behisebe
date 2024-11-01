import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { type StackNavigation } from "../../navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import PaymentCommonHeader from "../../common/PaymentCommonHeader";

const SelfTransferSuccessful = () => {
    const { navigate } = useNavigation<StackNavigation>();
    return (
        <View>
            <PaymentCommonHeader headerTitle={"Self Transfer Successful"} />
            <TouchableOpacity style={{ backgroundColor: "green", width: "100", height: "100%" }}
                onPress={() => {
                    navigate("ToSelfTransfer");
                }}
            />

        </View>
    )
}

export default SelfTransferSuccessful