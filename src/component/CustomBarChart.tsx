import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";
import styles from './styles';
import { generateWeeklyBarChartData } from '../services/ChartsServices';
import BarChartModel from '../model/BarChartModel';

type BarChartProps = {
  barChartData: BarChartModel[]
}

const CustomBarChart = ({barChartData}: BarChartProps) => {


  return (
    <View style={styles.cardView}>
      <BarChart
        // yAxisOffset={100}
        barWidth={20}
        noOfSections={6}
        barBorderRadius={2}
        frontColor="lightgray"
        data={barChartData}
        yAxisThickness={0}
        xAxisThickness={0}
        yAxisTextNumberOfLines={1}
        yAxisLabelWidth={60}
      />
    </View>
  )
}

export default CustomBarChart;