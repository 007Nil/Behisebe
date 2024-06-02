import { View, Text, TouchableOpacity } from "react-native";
import { React, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const TransferSuccessful = () => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity style={{backgroundColor: "red", width:"100", height: "100%"}}
        onPress={() => {
          navigation.navigate("AddExpense");
        }}
      />
    </View>
  );
};

export default TransferSuccessful;
