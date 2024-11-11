import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import { useState, useEffect } from "react";
import CommonHeader from "../../common/CommonHeader";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from "react-native-size-matters";

import Modal from "react-native-modal";

import styles from "./styles";

const AllExpense = () => {
  return (
    <View style={styles.container}>
      <CommonHeader title={"All Expense"} />
      <Text style={{textAlign: 'center', padding: 100, fontSize: 30}}> Will Implement</Text>
    </View>
  )
}

export default AllExpense