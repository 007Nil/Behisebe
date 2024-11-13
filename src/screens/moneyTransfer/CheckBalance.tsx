import {
  View
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { AddFundCustomFlatList } from "../../component";
import CommonHeader from "../../common/CommonHeader";
import { FundDetailsModel } from "../../model";
import { getValidFundDetailsService } from "../../services/FundDetailsServices";
import UPIPass from "../UPIPass";

const CheckBalance = () => {
  const [fundData, setFundData] = useState<FundDetailsModel[]>([]);
  useEffect(() => {
    getValidFundDetailsService().then(data => setFundData(data))
  }, []);
  return (
    <View style={styles.container}>
      <CommonHeader title={"Check Fund Balance"} />
      <View style={styles.card}>
        <AddFundCustomFlatList
          data={fundData}
          screenName="checkBalance" />
      </View>
     
    </View>
  )
}

export default CheckBalance