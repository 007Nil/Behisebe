import { View, Text } from 'react-native'
import React from 'react'
import CommonHeader from '../../common/CommonHeader';
import styles from "./styles";
import { moderateScale } from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from '@ant-design/react-native';

const UpdateProfile = () => {
  return (
    <View style={styles.container}>
      <CommonHeader title={"User Settings"} />
      <View style={styles.transactionItem}>
        <View>
          <View style={styles.topLeftView}>
            <View style={{ margin: moderateScale(10) }}>
              <View>
                <Text style={styles.paidTo}>User Name</Text>
                <Text style={styles.paidTo}>PIN</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.topLeftView}>
            <View style={{ margin: moderateScale(10) }}>
              <View>
                <Text style={styles.paidTo}>User Name</Text>
                <Text style={styles.paidTo}>* * * *</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.topLeftView}>
          <TouchableOpacity><Text>Update Username</Text></TouchableOpacity>
        </View>
        <View style={styles.topLeftView}>
          <TouchableOpacity><Text>Update PIN</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default UpdateProfile;