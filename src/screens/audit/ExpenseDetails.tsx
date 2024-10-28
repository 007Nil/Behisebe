import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'

import styles from './styles'
import HomeCommonHeader from '../../common/HomeCommonHeader'
import { CustomDateTimePicker, CustomListView } from '../../component'
import { ExpenseModel } from '../../model'
import { prepareCustomList } from '../../services/CommonServices'
import CustomList from '../../model/CustomListModel'
// import { getExpenseDetailsService } from '../../services/ExpenseDetailsServices'

const ExpenseDetails = () => {
  const [expenseDetails, setExpenseDetails] = useState<CustomList[]>([]);
  // const []

  const getExpenseDetails = async (data: ExpenseModel[]) => {
    setExpenseDetails(await prepareCustomList("expenseDetails", data));

  };

  // useEffect(() => {
  //   setExpenseDetails(expenseDetails);
  //   console.log(expenseDetails);
  // }, [expenseDetails]);
  return (
    <View style={styles.container}>
      <HomeCommonHeader title={"Expense Details"} />
      <View style={styles.searchBox}>
        <Image source={require('../../images/search.png')} style={styles.search} />
        <Text style={styles.searchText}>Search by Fund Name or amount</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.filtersView}>
          <CustomDateTimePicker
            getExpenseDetails={getExpenseDetails}
            datePickerScreen={"expenseDetails"}
          />
        </View>
        <CustomListView listData={expenseDetails}
        />

      </View>
    </View>
  )
}

export default ExpenseDetails