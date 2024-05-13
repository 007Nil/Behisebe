import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const Dropdown = () => {
  const [selectedFundValue, setSelectedFundValue] = useState("Select a Fund");
  return (
    <Picker
      selectedValue={selectedFundValue}
      onValueChange={(itemValue, itemIndex) => setSelectedFundValue(itemValue)}
      style={styles.picker}
    >
      <Picker.Item label="FUND1" value="java" />
      <Picker.Item label="FUND2" value="js" />
      <Picker.Item label="FUND3" value="python" />
      <Picker.Item label="FUND4" value="csharp" />
      <Picker.Item label="FUND5" value="ruby" />
    </Picker>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  picker: {
    height: 50,
    width: 300,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default Dropdown;
