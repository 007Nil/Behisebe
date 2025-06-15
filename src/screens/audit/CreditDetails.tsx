import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'

import styles from './styles'
import HomeCommonHeader from '../../common/HomeCommonHeader'
import { CustomDateTimePicker, CustomListView } from '../../component'
import { CreditModel } from '../../model'
import { prepareCustomList } from '../../services/CommonServices'
import CustomList from '../../model/CustomListModel'

const CreditDetails = () => {
  const [creditDetails, setCreditDetails] = useState<CustomList[]>([]);
  const [totalCredit, setTotalCredit] = useState<number>(0);


  useEffect(() => {
    let totalAmount = 0;
    for (const eachCredit of creditDetails) {
      totalAmount = totalAmount + Number(eachCredit.amount);
    }
    setTotalCredit(totalAmount);
  }, [creditDetails]);

  const updateTotalAmount = (amount: number, openartion: string) => {
    if (openartion === "plus") {
      setTotalCredit(totalCredit + amount)
    } else {
      setTotalCredit(totalCredit - amount)
    }
  }


  const getCreditDetails = async (data: CreditModel[]) => {
    let creditDetails = (await prepareCustomList({
      listType: "creditDetails",
      expenseObj: [],
      creditObj: data
    }));
    // Exclude self-tranfer as credit
    // It will be in account statement
    const filterCreditDetails = creditDetails.filter(
      credit => credit.reason_id !== 1);
    setCreditDetails(filterCreditDetails);
};
return (
  <View style={styles.container}>
    <HomeCommonHeader title={"Credit Details"} />
    <View style={styles.searchBox}>
      <Image source={require('../../images/search.png')} style={styles.search} />
      <Text style={styles.searchText}>Search by Fund Name or amount</Text>
    </View>
    <View style={styles.card1}>
      <View style={styles.filtersView}>
        <CustomDateTimePicker
          getCreditDetails={getCreditDetails}
          datePickerScreen={"creditDetails"}
        />
      </View>
    </View>
    <View style={styles.card}>
      <CustomListView
        listData={creditDetails}
        updateTotalAmount={updateTotalAmount}
      />
    </View>
    <View style={styles.card3}>
      <View style={styles.filtersView}>
        <Text style={{ fontSize: 20 }}>{"Total Credit:  " + totalCredit}</Text>
      </View>
    </View>

  </View>
)
}

export default CreditDetails