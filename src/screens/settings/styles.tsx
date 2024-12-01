// 'use strict';
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
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  searchBox: {
    width: "94%",
    height: verticalScale(40),
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: moderateVerticalScale(10),
    borderRadius: moderateScale(10),
    borderWidth: 0.5,
    borderColor: "#929292",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: moderateScale(15),
  },
  search: {
    width: scale(15),
    height: scale(15),
  },
  searchText: {
    marginLeft: moderateScale(20),
    color: "#929292",
    fontSize: moderateScale(16),
  },
  card: {
    width: "94%",
    height: "70%",
    backgroundColor: "white",
    marginTop: moderateVerticalScale(15),

    alignSelf: "center",
    borderRadius: moderateScale(10),
    shadowOpacity: 0.1,
    shadowColor: "rgba(0,0,0,.5)",
    shadowOffset: {
      x: 1,
      y: 1,
    },
  },
  filtersView: {
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: moderateVerticalScale(15),
    flexDirection: "row",
    alignSelf: "center",
  },
  dropdownView: {
    borderWidth: 1,
    borderRadius: moderateScale(10),
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
    paddingBottom: moderateVerticalScale(5),
    paddingTop: moderateVerticalScale(5),
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: moderateScale(10),
    width: scale(8),
    height: scale(8),
  },
  transactionItem: {
    width: "94%",
    height: 100,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  topLeftView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: moderateScale(15),
  },
  iconView: {
    width: scale(36),
    height: scale(36),
    backgroundColor: "purple",
    borderRadius: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
  },
  icon2: {
    width: scale(16),
    height: scale(16),
    tintColor: "white",
  },
  paidTo: {
    color: "black",
    fontSize: moderateScale(16),
  },
  name: {
    color: "#4f4f4f",
    fontSize: moderateScale(16),
  },
  time: {
    marginLeft: moderateScale(20),
    marginTop: moderateVerticalScale(20),
    color: "#929292",
  },
  amount: {
    marginTop: scale(15),
    fontWeight: "400",
    fontSize: 15,
  },
  bankView: {
    flexDirection: "row",
    marginTop: moderateVerticalScale(20),
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