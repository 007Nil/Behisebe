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
        backgroundColor: "#f2f2f2",
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
    bankView1: {
        flexDirection: 'row',
        marginTop: moderateVerticalScale(10)
    },
    icons: {
        width: scale(22),
        height: scale(22),
        tintColor: "white",
    },
    updateCard: {
        width: "90%",
        height: verticalScale(100),
        borderRadius: moderateScale(10),
        alignSelf: "center",
        marginTop: moderateVerticalScale(10),
        shadowRadius: 10,
        shadowColor: "rgba(0,0,0,.5)",
        backgroundColor: "#f2f2f2",
        // shadowOffset: { x: 0, y: 1 },
    },
    updateTopView: {
        flexDirection: "row",
        width: "100%",
        paddingLeft: moderateScale(15),
        paddingRight: moderateScale(15),
        marginTop: moderateVerticalScale(20),
    },
    logo: {
        width: scale(30),
        height: scale(30),
    },
    updateTitle: {
        fontSize: moderateScale(20),
        fontWeight: "600",
        marginLeft: moderateScale(10),
    },
    updateMsg: {
        fontSize: 14,
        width: "70%",
        marginLeft: moderateScale(10),
        color: "#6e6e6e",
    },
    updateBtnView: {
        alignSelf: "flex-end",
        flexDirection: "row",
        marginTop: moderateVerticalScale(20),
        marginBottom: moderateVerticalScale(15),
        alignItems: "center",
        marginRight: moderateScale(20),
    },
    later: {
        color: "purple",
        fontWeight: "600",
        fontSize: moderateScale(16),
    },
    update: {
        backgroundColor: "purple",
        paddingBottom: moderateScale(10),
        paddingTop: moderateScale(10),
        paddingLeft: moderateScale(20),
        paddingRight: moderateScale(20),
        borderRadius: moderateScale(20),
        marginLeft: moderateScale(20),
    },
    updateText: {
        color: "white",
        fontWeight: "600",
        fontSize: moderateScale(16),
    },
    banner: {
        width: "94%",
        height: verticalScale(100),
        alignSelf: "center",
        marginTop: moderateVerticalScale(10),
        borderRadius: moderateScale(10),
    },
    moneyTransferCard: {
        width: "94%",
        height: verticalScale(130),
        backgroundColor: "white",
        alignSelf: "center",
        marginTop: moderateVerticalScale(10),
        borderRadius: moderateScale(10),
    },
    heading: {
        fontSize: moderateScale(16),
        fontWeight: "600",
        marginLeft: moderateScale(15),
        marginTop: moderateVerticalScale(15),
    },
    transferView: {
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        marginTop: moderateScale(20),
    },
    transferTab: {
        width: "25%",
        justifyContent: "center",
        alignItems: "center",
    },
    transferCard: {
        width: scale(36),
        height: scale(36),
        borderRadius: moderateScale(10),
        backgroundColor: "purple",
        justifyContent: "center",
        alignItems: "center",
    },
    tranferText: {
        marginTop: moderateScale(5),
        textAlign: "center",
    },
    otherOptions: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "94%",
        marginTop: moderateScale(10),
        alignSelf: "center",
    },
    otherOptionTab: {
        width: "31%",
        height: verticalScale(60),
        backgroundColor: "#277be8",
        borderRadius: moderateScale(18),
        justifyContent: "center",
        alignItems: "center",
    },
    otherOptionText: {
        color: "white",
        fontWeight: "600",
        marginTop: moderateScale(10),
    },
    rechargeAndBills: {
        backgroundColor: "white",
        borderRadius: moderateScale(5),
        marginTop: moderateVerticalScale(10),
        alignSelf: "center",
        height: verticalScale(200),
        width: "94%",
    },
    transactionItem: {
        width: '94%',
        height: 150,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    mainView: {
        backgroundColor: "white",
        width: "100%",
        position: "absolute",
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
    backIcon: {
        width: scale(24),
        height: scale(24),
        tintColor: "white",
    },
    divider: {
        width: "100%",
        height: verticalScale(0.5),
        backgroundColor: "#929292",
        marginTop: moderateVerticalScale(20),
        opacity: 0.4,
    },
    bankView: {
        flexDirection: "row",
        marginTop: moderateVerticalScale(20),
    },
    bankLeftView: {
        flexDirection: "row",
        alignItems: "center",
    },
    upi_view: {
        flexDirection: "row",
        alignItems: "center",
    },
    bankAccount: {
        color: "#929292",
        fontSize: moderateScale(12),
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
    title: {
        color: "white",
        fontSize: moderateScale(20),
    },
    topLeftView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: moderateScale(10)
    },
    paidTo: {
        color: 'black',
        fontSize: moderateScale(16)
    },
    card: {
        width: '94%',
        height: '15%',
        backgroundColor: 'white',
        marginTop: moderateVerticalScale(15),
        alignSelf: 'center',
        borderRadius: moderateScale(10),
        shadowOpacity: .1,
        shadowColor: 'rgba(0,0,0,.5)',
        shadowOffset: {
            width: 1,
            height: 1
        }
    },
    card2: {
        width: '94%',
        height: '68%',
        backgroundColor: 'white',
        marginTop: moderateVerticalScale(15),
        alignSelf: 'center',
        borderRadius: moderateScale(10),
        shadowOpacity: .1,
        shadowColor: 'rgba(0,0,0,.5)',
        shadowOffset: {
            width: 1,
            height: 1
        }
    },
    amount: {
        fontWeight: '500',
        fontSize: 14,
    },
    amount1: {
        fontWeight: '500',
        fontSize: 14,
        alignItems: "flex-start"
    },
});

export default styles;