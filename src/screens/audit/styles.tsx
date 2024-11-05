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
    input: {
        backgroundColor: "#f2f2f2",
        width: "100%",
        height: 40,
        paddingHorizontal: 10,
        opacity: 1, // Optional: you can adjust opacity to visually indicate that the input is disabled
    },
    Checkedinput: {
        width: "50%",
        marginRight: 10,
        paddingHorizontal: 10,
        backgroundColor: "#f2f2f2",
        opacity: 1,
    },
    confirmPayNow: {
        width: "94%",
        height: verticalScale(40),
        backgroundColor: "purple",
        borderRadius: moderateScale(30),
        alignSelf: "center",
        marginTop: moderateVerticalScale(20),
        marginBottom: moderateVerticalScale(40),
        justifyContent: "center",
        alignItems: "center",
    },
    delete: {
        width: "94%",
        height: verticalScale(40),
        backgroundColor: "red",
        borderRadius: moderateScale(30),
        alignSelf: "center",
        marginTop: moderateVerticalScale(20),
        marginBottom: moderateVerticalScale(40),
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        color: "white",
        fontSize: moderateScale(20),
    },
    amountView: {
        width: "94%",
        height: verticalScale(45),
        borderWidth: 0.5,
        alignSelf: "center",
        borderColor: "#929292",
        borderRadius: moderateScale(5),
        flexDirection: "row",
        paddingLeft: moderateScale(10),
        paddingRight: moderateScale(10),
        alignItems: "center",
        marginTop: moderateVerticalScale(20),
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
        width: "94%",
        height: "50%",
        backgroundColor: "white",
        marginTop: moderateVerticalScale(10),

        alignSelf: "center",
        borderRadius: moderateScale(10),
        shadowOpacity: 0.1,
        shadowColor: "rgba(0,0,0,.5)",
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
    card1: {
        width: "94%",
        height: "18%",
        backgroundColor: "white",
        marginTop: moderateVerticalScale(10),

        alignSelf: "center",
        borderRadius: moderateScale(10),
        shadowOpacity: 0.1,
        shadowColor: "rgba(0,0,0,.5)",
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
    card3: {
        width: "94%",
        height: "8%",
        backgroundColor: "white",
        marginTop: moderateVerticalScale(10),
        flexDirection: "column",
        alignSelf: "center",
        borderRadius: moderateScale(10),
        shadowOpacity: 0.1,
        shadowColor: "rgba(0,0,0,.5)",
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
    proceedToPay: {
        width: "100%",
        height: verticalScale(60),
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        backgroundColor: "green",
        bottom: 0,
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
        height: 150,
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
        marginTop: moderateVerticalScale(10),
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
    bankView1: {
        flexDirection: 'row',
        marginTop: moderateVerticalScale(10)
    },
    bankView3: {
        flexDirection: 'row',
        marginTop: moderateVerticalScale(10)
    },
    appButtonText: {
        fontSize: 12,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 12
    },
    appButtonContainerDelete: {
        elevation: 8,
        backgroundColor: "red",
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 12
    },
    logo: {
        width: scale(12),
        height: scale(12),
        marginLeft: moderateScale(15)
    },
    modaView: {
        margin: 0,
    },
    mainView: {
        backgroundColor: "white",
        width: "100%",
        position: "absolute",
        bottom: 0,
        borderTopLeftRadius: moderateScale(20),
        borderTopRightRadius: moderateScale(20),
        padding: moderateScale(10),
    },
    modalTopView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: moderateScale(10),
    },
    payable: {
        fontWeight: "700",
        color: "black",
        fontSize: moderateScale(16),
    },
    modalTopRightView: {
        flexDirection: "row",
        alignItems: "center",
    },
    confirmAmount: {
        fontSize: 30,
        fontWeight: "600",
        color: "black",
        marginRight: moderateScale(20),
    },
    divider: {
        width: "100%",
        height: verticalScale(0.5),
        backgroundColor: "#929292",
        marginTop: moderateVerticalScale(20),
        opacity: 0.4,
    },
    backIcon: {
        width: scale(24),
        height: scale(24),
        tintColor: "white",
    },
    bankLeftView: {
        flexDirection: "row",
        alignItems: "center",
    },
    bankRightView: {
        flexDirection: "row",
        alignItems: "flex-end",
    },
    upi_view: {
        flexDirection: "row",
        alignItems: "center",
    },
    bankAccount: {
        color: "#929292",
        fontSize: moderateScale(12),
    },
})

export default styles;