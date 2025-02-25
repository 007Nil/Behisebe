import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import styles from "./styles";
import CommonHeader from '../../common/CommonHeader';
import { moderateVerticalScale } from 'react-native-size-matters';
import { BarChart } from 'react-native-gifted-charts';
import { CustomBarChart, CustomDateTimePicker } from '../../component';
import CustomList from '../../model/CustomListModel';
import { prepareCustomList } from '../../services/CommonServices';
import { ExpenseModel } from '../../model';
import BarChartModel from '../../model/BarChartModel';
import { generateBarChartData } from '../../services/ChartsServices';

const ExpenseAnalyze = () => {
  const [expenseDetails, setExpenseDetails] = useState<CustomList[]>([]);
  const [chartType, setChartType] = useState<string>("");
  const [barChartData, setBarChartData] = useState<BarChartModel[]>();

  const getChartType = (type: string) => {
    setChartType(type);
  }

  const getExpenseDetails = async (data: ExpenseModel[]) => {
    setExpenseDetails(await prepareCustomList({
      listType: "expenseDetails",
      expenseObj: data,
      creditObj: []
    }));
    setBarChartData(await generateBarChartData(data))
  };


  return (
    <View style={styles.container}>
      <CommonHeader title={"Expense Analyzer"} />
      <ScrollView>
        <View
          style={[
            styles.moneyTransferCard,
            {
              marginBottom: moderateVerticalScale(10),
              marginTop: moderateVerticalScale(20),
            },
          ]}
        >
          <Text style={styles.heading}>Expense Charts</Text>
          <View style={styles.transferView}>

            <TouchableOpacity style={styles.transferTab}
              onPress={() => {
                getChartType("barChart");
              }}
            >
              <View style={styles.transferCard}>
                <Image
                  source={require("../../images/bank2.png")}
                  style={styles.icons}
                />
              </View>
              <Text style={styles.tranferText}>{"Expense \n Bar Chart"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.transferTab}
              onPress={() => {
                getChartType("pieChart");
              }}
            >
              <View style={styles.transferCard}>
                <Image
                  source={require("../../images/reload.png")}
                  style={styles.icons}
                />
              </View>
              <Text style={styles.tranferText}>{"Expense \n Pie chart"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {chartType === "pieChart" ?
          <View>
            <View style={styles.card1}>
              <View style={styles.filtersView}>
                <CustomDateTimePicker
                  datePickerScreen={"expenseDetails"}
                  getExpenseDetails={getExpenseDetails}
                />
              </View>
            </View>
          </View>
          : chartType === "barChart" ?
            <View>
              <View style={styles.card1}>
                <View style={styles.filtersView}>
                  <CustomDateTimePicker
                    datePickerScreen={"expenseDetails"}
                    getExpenseDetails={getExpenseDetails}
                  />
                </View>
              </View>
              <View
                style={[
                  styles.rechargeAndBills1,
                  { marginBottom: moderateVerticalScale(10) },
                ]}
              >
                <CustomBarChart barChartData={barChartData} xwidth={200} />
              </View>
            </View>

            : null}
      </ScrollView>
    </View>
  )
}

export default ExpenseAnalyze