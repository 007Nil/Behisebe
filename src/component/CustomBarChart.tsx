import { View, Text } from 'react-native'
import React from 'react'
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";


const CustomBarChart = () => {
    const data=[ {value:50}, {value:80} ]
  return (
    <View>
      <PieChart data = {data} />
    </View>
  )
}

export default CustomBarChart;