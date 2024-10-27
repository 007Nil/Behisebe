import { View, Text, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import styles from '../screens/audit/styles'
import CustomList from '../model/CustomListModel'


const CustomListView = (listData: CustomList[]) => {
    const [flatListData, setFlatListData] = useState<CustomList[]>([]);

    useEffect(() => {
        setFlatListData(listData);
    }, [listData]);
    return (
        <FlatList contentContainerStyle={{ marginTop: moderateVerticalScale(30) }} 
        data={flatListData}
        renderItem={({ item, index }) => {
            return (
                <View style={styles.transactionItem}>
                    <View>
                        <View style={styles.topLeftView}>
                            <View style={styles.iconView}>
                                <Image source={index % 2 == 0 ? require('../images/down-right.png') : require('../images/creadited.png')} style={styles.icon2} />

                            </View>
                            <View style={{ marginLeft: moderateScale(10) }}>
                                <Text style={styles.paidTo}>{item.catagory}</Text>
                                <Text style={styles.name}>{item.fund_name}</Text>
                            </View>
                        </View>
                        <Text style={styles.time}>Yesterday</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.amount}>{' ₹ '+item.amount}</Text>
                        <View style={styles.bankView}>
                            <Text style={[styles.time, { marginTop: 0 }]}>{index % 2 == 0 ? 'debited from' : 'credited to'}</Text>
                            <Image source={require('../images/bank_logo.png')} style={styles.logo} />
                        </View>
                    </View>
                </View>
            )
        }} />
    )
}

export default CustomListView