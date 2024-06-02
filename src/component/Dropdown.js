import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";

const Dropdown = (props) => {
  const [selecteddropDownValues, setselecteddropDownValues] = useState("");
  useEffect(() => {
    if (props.dropDownType === "expenseReasonDetails") {
      props.getExpenseReason(selecteddropDownValues);
    } else if (props.dropDownType === "fundDetails") {
      props.getFundDetails(selecteddropDownValues);
    } else if (props.dropDownType === "personDetails") {
      props.getPersonDetails(selecteddropDownValues);
    } else if (props.dropDownType === "creditReason") {
      props.getCreditReason(selecteddropDownValues);
    }
  });
  return (
    <View style={styles.dropdownButtonStyle}>
      <SelectDropdown
        data={props.dropDownValues}
        search={true}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem);
          setselecteddropDownValues(selectedItem);
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem &&
                  (props.dropDownType === "expenseReasonDetails"
                    ? selectedItem.expense_reason
                    : props.dropDownType === "personDetails"
                    ? selectedItem.name
                    : props.dropDownType === "creditReason"
                    ? selectedItem.credit_reason
                    : selectedItem.fund_name)) ||
                  (props.dropDownType === "expenseReasonDetails"
                    ? "Select Expense Reason"
                    : props.dropDownType === "personDetails"
                    ? "Select Person name"
                    : props.dropDownType === "creditReason"
                    ? "Select Credit Reason"
                    : "Select a Fund")}
              </Text>
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && { backgroundColor: "#D2D9DF" }),
              }}
            >
              <Text style={styles.dropdownItemTxtStyle}>
                {props.dropDownType === "expenseReasonDetails"
                  ? item.expense_reason
                  : props.dropDownType === "personDetails"
                  ? item.name
                  : props.dropDownType === "creditReason"
                  ? item.credit_reason
                  : item.fund_name}
              </Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: "100%",
    height: 30,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    width: "100%",
    flex: 1,
    fontSize: 15,
    fontWeight: "400",
    color: "#151E26",
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
});
