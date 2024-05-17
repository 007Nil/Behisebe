import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";

const Dropdown = (props) => {
  const [selecteddropDownValues, setselecteddropDownValues] = useState(
    "Select a value"
  );
  useEffect(() => {
    if (props.dropDownType === "expenseReasonDetails")
      props.getExpenseReason(selecteddropDownValues);
  });

  return (
    <Picker
      selectedValue={selecteddropDownValues}
      onValueChange={(itemValue, itemIndex) =>
        setselecteddropDownValues(itemValue)
      }
      style={styles.picker}
    >
      {/* <Picker.Item label="Select a value" value="Select a value" /> */}
      {props.dropDownValues.map((item, index) => {
        if (props.dropDownType === "fundDetails") {
          return (
            <Picker.Item
              key={item._id}
              label={item.fund_name}
              value={item.fund_name}
            />
          );
        } else if (props.dropDownType === "expenseReasonDetails") {
          return (
            <Picker.Item
              key={item._id}
              label={item.expense_reason}
              value={item.expense_reason}
            />
          );
        } else if (props.dropDownType === "creditReasonDetails") {
          return (
            <Picker.Item
              key={item._id}
              label={item.credit_reason}
              value={item.credit_reason}
            />
          );
        } else if (props.dropDownType === "personDetails") {
          return (
            <Picker.Item key={item._id} label={item.name} value={item.name} />
          );
        }
      })}
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
