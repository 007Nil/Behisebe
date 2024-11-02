import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import styles from '../screens/audit/styles'
import CustomList from '../model/CustomListModel'

type CustomListProps = {
    listData: CustomList[]
}

const CustomListView = ({ listData }: CustomListProps) => {
    const [flatListData, setFlatListData] = useState<CustomList[]>([]);

    useEffect(() => {
        setFlatListData(listData);
    }, [listData]);
    return (
        <FlatList contentContainerStyle={{ marginTop: moderateVerticalScale(30) }}
            data={flatListData}
            renderItem={({ item, index }) => {
                return (
                    // <TouchableOpacity>
                    <View style={styles.transactionItem}>
                        <View>
                            <View style={styles.topLeftView}>
                                <View style={styles.iconView}>
                                    <Image source={item.catagory === "expenseDetails" ? require('../images/down-right.png') : require('../images/creadited.png')} style={styles.icon2} />

                                </View>
                                <View style={{ marginLeft: moderateScale(10) }}>
                                    <Text style={styles.paidTo}>{item.reason}</Text>
                                </View>
                            </View>
                            <Text style={styles.time}>{item.date}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.amount}>{' ₹ ' + item.amount}</Text>
                            <View style={styles.bankView}>
                                <Text style={[styles.time, { marginTop: 0 }]}>{item.catagory === "expenseDetails" ? 'debited from ' + item.fund_name : 'credited to ' + item.fund_name}</Text>
                            </View>
                        </View>
                    </View>
                    // </TouchableOpacity>
                )
            }} />
    )
}

export default CustomListView