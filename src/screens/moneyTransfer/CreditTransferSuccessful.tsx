import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import PaymentCommonHeader from '../../common/PaymentCommonHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigation } from '../../navigation/AppNavigator';

const CreditTransferSuccessful = () => {
    const { navigate } = useNavigation<StackNavigation>();

    return (
        <View>
            <PaymentCommonHeader headerTitle={"Operation Successful"} />
            <TouchableOpacity style={{ backgroundColor: "green", width: "100", height: "100%" }}
                onPress={() => {
                    navigate("AddCredit");
                }}
            />

        </View>
    )
}

export default CreditTransferSuccessful;