import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { CreditReasonModel, ExpenseReasonModel, FundDetailsModel, PersonModel } from "../model";

type DropDownType = {
  dropDownValues: FundDetailsModel[] | ExpenseReasonModel[] | PersonModel[]
  dropDownType: string
  getExpenseReason?(expenseReasonObj: ExpenseReasonModel): void
  getFundDetails?(fundObj: FundDetailsModel): void
  getPersonDetails?(personObj: PersonModel): void
  getCreditReason?(creditReasonObj: CreditReasonModel): void
}

const Dropdown = ({dropDownValues,dropDownType,getExpenseReason,getFundDetails,getPersonDetails,getCreditReason}: DropDownType) => {
  const [selecteddropDownValues, setselecteddropDownValues] = useState<any>("");
  useEffect(() => {
    if (dropDownType === "expenseReasonDetails") {
      getExpenseReason(selecteddropDownValues);
    } else if (dropDownType === "fundDetails") {
      getFundDetails(selecteddropDownValues);
    } else if (dropDownType === "personDetails") {
      getPersonDetails(selecteddropDownValues);
    } else if (dropDownType === "creditReason") {
      getCreditReason(selecteddropDownValues);
    }
  });
  return (
    <View style={styles.dropdownButtonStyle}>
      <SelectDropdown
        data={dropDownValues}
        search={true}
        onSelect={(selectedItem, index) => {
          setselecteddropDownValues(selectedItem);
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem &&
                  (dropDownType === "expenseReasonDetails"
                    ? selectedItem.expense_reason_name
                    : dropDownType === "personDetails"
                    ? selectedItem.person_name
                    : dropDownType === "creditReason"
                    ? selectedItem.credit_reason_name
                    : selectedItem.fund_name)) ||
                  (dropDownType === "expenseReasonDetails"
                    ? "Select Expense Reason"
                    : dropDownType === "personDetails"
                    ? "Select Person name"
                    : dropDownType === "creditReason"
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
                {dropDownType === "expenseReasonDetails"
                  ? item.expense_reason_name
                  : dropDownType === "personDetails"
                  ? item.person_name
                  : dropDownType === "creditReason"
                  ? item.credit_reason_name
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
