import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import PaymentCommonHeader from '../../common/PaymentCommonHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigation } from '../../navigation/AppNavigator';
import styles from "./styles";
import { moderateScale } from "react-native-size-matters";
import Ionicons from '@expo/vector-icons/Ionicons';

const CreditTransferSuccessful = () => {
    const { navigate } = useNavigation<StackNavigation>();

    return (
        <View>
            <PaymentCommonHeader headerTitle={"Operation Successful"} />
            <Text style={{ textAlign: "center", justifyContent: "center", paddingTop: moderateScale(200), }}>
                <Ionicons name="checkmark-circle" size={100} color="green" />
            </Text>
            <View style={styles.mainView}>
                <TouchableOpacity style={[styles.confirmPayNow2]}
                    onPress={() => {
                        navigate("AddCredit");
                    }}
                >
                    <Text style={styles.payNowText}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CreditTransferSuccessful;