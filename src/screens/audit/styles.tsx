import { StyleSheet } from "react-native";
import {
    moderateScale,
    moderateVerticalScale,
    scale,
    verticalScale,
} from "react-native-size-matters";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    searchBox: {
        width: '94%',
        height: verticalScale(40),
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: moderateVerticalScale(10),
        borderRadius: moderateScale(10),
        borderWidth: .5,
        borderColor: '#929292',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: moderateScale(15)
    },
    search: {
        width: scale(15),
        height: scale(15)
    }, searchText: {
        marginLeft: moderateScale(20),
        color: '#929292',
        fontSize: moderateScale(16)
    },
    card: {
        width: '94%',
        backgroundColor: 'white',
        marginTop: moderateVerticalScale(15),
        alignSelf: 'center',
        borderRadius: moderateScale(10),
        shadowOpacity: .1,
        shadowColor: 'rgba(0,0,0,.5)',
        shadowOffset: {
            x: 1,
            y: 1
        }
    },
    filtersView: {
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: moderateVerticalScale(15),
        flexDirection: 'row',
        alignSelf: 'center'
    },
    dropdownView:
    {


        borderWidth: 1,
        borderRadius: moderateScale(10),
        paddingLeft: moderateScale(10),
        paddingRight: moderateScale(10),
        paddingBottom: moderateVerticalScale(5),
        paddingTop: moderateVerticalScale(5),
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        marginLeft: moderateScale(10),
        width: scale(8),
        height: scale(8)
    },
    transactionItem: {
        width: '94%',
        height: 100,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    topLeftView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: moderateScale(15)
    },
    iconView: {
        width: scale(36),
        height: scale(36),
        backgroundColor: 'purple',
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon2: {
        width: scale(16),
        height: scale(16),
        tintColor: 'white'
    },
    paidTo: {
        color: 'black',
        fontSize: moderateScale(16)
    },
    name: {
        color: '#4f4f4f',
        fontSize: moderateScale(16)
    },
    time: {
        marginLeft: moderateScale(20),
        marginTop: moderateVerticalScale(20),
        color: '#929292'
    },
    amount: {
        fontWeight: '700',
        fontSize: 18
    },
    bankView: {
        flexDirection: 'row',
        marginTop: moderateVerticalScale(20)
    },
    logo: {
        width: scale(12),
        height: scale(12),
        marginLeft: moderateScale(15)
    }
})

export default styles;