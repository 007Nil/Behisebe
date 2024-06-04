import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import React from "react";

const CustomButton = (props) => {
  const handleOnPress = () => {
    if (props.pressEvent === "add_fund") {
      props.getModalopen(true);
    }
  };
  return (
    <TouchableOpacity style={[styles.proceedToPay]} onPress={handleOnPress}>
      <Text style={styles.payNowText}>{"Add Fund"}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  proceedToPay: {
    width: "100%",
    height: verticalScale(60),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "green",
    bottom: 0,
  },
  payNowText: {
    color: "white",
    fontSize: moderateScale(18),
    fontWeight: "600",
  },
});
