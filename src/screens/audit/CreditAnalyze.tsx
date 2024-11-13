import { View, Text } from 'react-native'
import React from 'react'

import styles from "./styles";
import CommonHeader from '../../common/CommonHeader';
const CreditAnalyze = () => {
  return (
    <View style={styles.container}>
      <CommonHeader title={"Credit Analyzer"} />
      <Text style={{textAlign: 'center', padding: 100, fontSize: 30}}> Will Implement</Text>
    </View>
  )
}

export default CreditAnalyze