import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'

import styles from './styles'
import HomeCommonHeader from '../../common/HomeCommonHeader'
import { CustomDateTimePicker, CustomListView } from '../../component'
import { ExpenseModel } from '../../model'
import { prepareCustomList } from '../../services/CommonServices'
import CustomList from '../../model/CustomListModel'
// import { getExpenseDetailsService } from '../../services/ExpenseDetailsServices'

const ExpenseDetails = () => {
  const [expenseDetails, setExpenseDetails] = useState<CustomList[]>([]);
  const [totalExpense, setTotalExpense] = useState<number>(0);

  useEffect(() => {
    let totalAmount = 0;
    for (const eachExp of expenseDetails) {
      totalAmount = totalAmount + Number(eachExp.amount);
    }
    setTotalExpense(totalAmount);
  }, [expenseDetails]);

  const getExpenseDetails = async (data: ExpenseModel[]) => {
    setExpenseDetails(await prepareCustomList({
      listType: "expenseDetails",
      expenseObj: data,
      creditObj: []
    }));
  };
  const updateTotalAmount = (amount: number, openartion: string) => {
    if (openartion === "plus") {
      setTotalExpense(totalExpense + amount)
    } else {
      setTotalExpense(totalExpense - amount)
    }
  }

  return (
    <View style={styles.container}>
      <HomeCommonHeader title={"Expense Details"} />
      <View style={styles.searchBox}>
        <Image source={require('../../images/search.png')} style={styles.search} />
        <Text style={styles.searchText}>Search by Fund Name or amount</Text>
      </View>
      <View style={styles.card1}>
        <View style={styles.filtersView}>
          <CustomDateTimePicker
            datePickerScreen={"expenseDetails"}
            getExpenseDetails={getExpenseDetails}
          />
        </View>
      </View>
      <View style={styles.card}>
        <CustomListView listData={expenseDetails} updateTotalAmount={updateTotalAmount}
        />
      </View>
      <View style={styles.card3}>
        <View style={styles.filtersView}>
          <Text style={{ fontSize: 20 }}>{"Total Expense:  " + totalExpense}</Text>
        </View>
      </View>
    </View>
  )
}

export default ExpenseDetails