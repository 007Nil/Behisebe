import { View, Text, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from "./styles";
import { useNavigation } from '@react-navigation/native'
import HomeCommonHeader from "../common/HomeCommonHeader";
import { type StackNavigation } from "../navigation/AppNavigator";
import { ExpenseModel, MoneyRepayModel } from '../model';
import { getMoneyRepayDetailsService } from '../services/MoneyReplayServices';
import { FlatList } from 'react-native-gesture-handler';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const Repay = () => {
  const { navigate } = useNavigation<StackNavigation>();

  const [btnPressValue, setBtnPressValue] = useState<string>("");
  const [dbMoneyReplayDetails, setDbMoneyReplayDetails] = useState<MoneyRepayModel[]>();

  const getBorrowMoneyInfo = () => {
    setBtnPressValue("getBorrowInfo");
  }

  const getMoneyLendInfo = async () => {
    setBtnPressValue("getLendInfo");
    setDbMoneyReplayDetails(await getMoneyRepayDetailsService("getLendInfo"))
  }

  const viewDetails = () => {
  }
  const updateDate = () => {
    
  }
  return (
    <View style={styles.container}>
      <HomeCommonHeader title={"Replay"} />
      <View style={styles.container}>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ padding: 10 }}>
            <Button onPress={getBorrowMoneyInfo} title="Borrow Money Details" />
          </View>
          <View style={{ padding: 10 }}>
            <Button onPress={getMoneyLendInfo} title="Lend Money Details" />
          </View>
        </View>
        <View style={styles.card}>
          <View style={{ height: '77%' }}>
            <FlatList
              contentContainerStyle={{ marginTop: moderateVerticalScale(30) }}
              data={dbMoneyReplayDetails}
              renderItem={({ item }) => {
                return (
                  <View style={styles.transactionItem}>
                    <View>
                      <View style={styles.topLeftView}>
                        <View style={{ marginLeft: moderateScale(10) }}>
                          <View>
                            <Text style={styles.paidTo}>{"Money Lend To"}</Text>
                            <Text style={styles.paidTo}>{item.personName}</Text>
                            <Text style={styles.paidTo}>{"Amount"}</Text>
                            <Text style={styles.paidTo}>{item.amount}</Text>
                            <Text style={styles.paidTo}>{"Date"}</Text>
                            <Text style={styles.paidTo}>{item.date}</Text>
                            <Text style={styles.paidTo}>{"Already paid"}</Text>
                            <Text style={styles.paidTo}>{item.paid_amount}</Text>
                            {item.message !== ""?
                            <View>
                            <Text style={styles.paidTo}>{"Message"}</Text>
                            <Text style={styles.paidTo}>{item.message}</Text>
                            </View>: null
                            }
                            
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={{ alignItems: "flex-end", padding:10 }}>
                      <TouchableOpacity  onPress={viewDetails}>
                        <Text style={styles.amount}>{"View Details"}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={updateDate}>
                        <Text style={styles.amount}>{"Update Data"}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default Repay