import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";
import styles from './styles';
import { generateWeeklyBarChartData } from '../services/ChartsServices';
import BarChartModel from '../model/BarChartModel';

const CustomBarChart = () => {
  const [barChartData, setBarChartData] = useState<BarChartModel[]>();
  useEffect(() => {
    (async () => {
      setBarChartData(await generateWeeklyBarChartData());
    }
    )()
  }, []);

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