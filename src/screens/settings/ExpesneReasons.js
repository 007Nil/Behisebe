import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CommonHeader from "../../common/CommonHeader";
const ExpesneReasons = () => {
  return (
    <View style={styles.container}>
      <CommonHeader title={"Expense Reason Settings"}/>
    </View>
  );
};

export default ExpesneReasons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
});
