import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import styles from "./styles";
import CommonHeader from '../../common/CommonHeader';
import { moderateVerticalScale } from 'react-native-size-matters';
import { BarChart } from 'react-native-gifted-charts';
import { CustomBarChart } from '../../component';

const ExpenseAnalyze = () => {

  const [chartType, setChartType] = useState<string>("");
  const getChartType = (type: string) => {
    setChartType(type);
  }
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
            <Text>chartType</Text>
          </View>
          : chartType === "barChart" ?
            <View>
              <Text>
                {/* <CustomBarChart/> */}
              </Text>
            </View>
            : null}
      </ScrollView>
    </View>
  )
}

export default ExpenseAnalyze