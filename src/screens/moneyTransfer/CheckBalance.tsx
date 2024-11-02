import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import styles from "./styles";
import { AddFundCustomFlatList } from "../../component";
import CommonHeader from "../../common/CommonHeader";
import { FundDetailsModel } from "../../model";
import { getAllFundDetailsService, getValidFundDetailsService } from "../../services/FundDetailsServices";

const CheckBalance = () => {
  const [fundData, setFundData] = useState<FundDetailsModel[]>([]);
  useEffect(() => {
    getValidFundDetailsService().then( data => setFundData(data))
  },[]);
  return (
    <View style={styles.container}>
    <CommonHeader title={"Check Fund Balance"} />
    <View style={styles.card}>
      <AddFundCustomFlatList
        data={fundData}
        screenName="checkBalance"/>
    </View>
  </View>
  )
}

export default CheckBalance