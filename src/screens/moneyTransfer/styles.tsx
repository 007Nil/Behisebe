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
        alignItems: "center",
    },
    input: {
        width: "100%",
        height: 40,
        paddingHorizontal: 10,
        opacity: 0.5, // Optional: you can adjust opacity to visually indicate that the input is disabled
    },
    Checkedinput: {
        width: "100%",
        paddingHorizontal: 10,
        opacity: 1,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#000",
        marginRight: 10,
    },
    checked: {
        backgroundColor: "#000",
    },
    header: {
        width: "100%",
        height: verticalScale(85),
        backgroundColor: "purple",
        justifyContent: "flex-end",
    },
    subHeader: {
        width: "100%",
        height: verticalScale(50),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: moderateScale(10),
        paddingRight: moderateScale(15),
    },
    backBtn: {
        width: scale(50),
        height: scale(50),
        justifyContent: "center",
        alignItems: "center",
    },
    backIcon: {
        width: scale(24),
        height: scale(24),
        tintColor: "white",
    },
    title: {
        color: "white",
        fontSize: moderateScale(20),
    },
    cardView: {
        width: "94%",
        alignSelf: "center",
        backgroundColor: "white",
        marginTop: moderateVerticalScale(10),
        borderRadius: moderateScale(5),
    },
    topView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: moderateScale(15),
    },
    leftView: {
        flexDirection: "row",
        alignItems: "center",
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
    proceedToPay: {
        width: "100%",
        height: verticalScale(60),
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
    },
    payNowText: {
        color: "white",
        fontSize: moderateScale(18),
        fontWeight: "600",
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
    bankView: {
        width: "100%",
        height: verticalScale(50),
        backgroundColor: "#f2f2f2",
        alignSelf: "center",
        marginTop: moderateVerticalScale(15),
        flexDirection: "row",
        justifyContent: "space-between",
    },
    bankLeftView: {
        flexDirection: "row",
        alignItems: "center",
    },
    bankRightView: {
        flexDirection: "row",
        alignItems: "center",
    },
    logo: {
        width: scale(20),
        height: scale(20),
        resizeMode: "contain",
        marginLeft: moderateScale(10),
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
});

export default styles;