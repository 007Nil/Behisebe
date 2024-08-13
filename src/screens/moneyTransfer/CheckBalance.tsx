import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from "react-native-size-matters";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import Dropdown from "../../component/Dropdown";

const CheckBalance = () => {
  return (
    <View>
      <Text>CheckBalance</Text>
    </View>
  )
}

export default CheckBalance