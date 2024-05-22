import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CommonHeader from "../../common/CommonHeader";
const CreditReasons = () => {
  return (
    <View style={styles.container}>
      <CommonHeader title={"Credit Reason Settings"}/>
    </View>
  );
};

export default CreditReasons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
});
