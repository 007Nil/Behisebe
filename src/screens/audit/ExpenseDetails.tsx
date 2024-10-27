import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'

import styles from './styles'
import HomeCommonHeader from '../../common/HomeCommonHeader'
import { CustomDateTimePicker, CustomListView } from '../../component'

const ExpenseDetails = () => {
  return (
    <View style={styles.container}>
       <HomeCommonHeader title={"Expense Details"}/>
       <View style={styles.searchBox}>
        <Image source={require('../../images/search.png')} style={styles.search} />
        <Text style={styles.searchText}>Search by Fund Name or amount</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.filtersView}>
        <CustomDateTimePicker/>
        </View>
        {/* <CustomListView/> */}

      </View>
    </View>
  )
}

export default ExpenseDetails