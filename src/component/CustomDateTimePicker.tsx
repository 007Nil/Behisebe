import { StyleSheet, View, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { CreditModel, ExpenseModel } from '../model';

// Services
import { getExpenseByDateService } from '../services/ExpenseDetailsServices';
import { getCreditByDateService } from '../services/CreditDetailsServices';
import { dateConvert } from '../utils/AllUtils';

type DatePickerProps = {
  datePickerScreen: string
  getExpenseDetails?(expsneObj: ExpenseModel[]): void
  getCreditDetails?(creditObj: CreditModel[]): void
  getTransactionHistory?([expenseObj, creditObj]: [ExpenseModel[],CreditModel[]]): void
}

const CustomDateTimePicker = ({ datePickerScreen, getExpenseDetails, getCreditDetails,getTransactionHistory }: DatePickerProps) => {
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());
  let dateMode: string;
  useEffect(() => {
    (async () => {
      if (datePickerScreen === "expenseDetails") {
        const expenseDetails = await getExpenseByDateService(dateConvert(fromDate).toLocaleString(), dateConvert(toDate).toLocaleString());
        getExpenseDetails(expenseDetails);
      }
      else if (datePickerScreen === "creditDetails") {
        const creditDetails = await getCreditByDateService(dateConvert(fromDate).toLocaleString(), dateConvert(toDate).toLocaleString());
        getCreditDetails(creditDetails);
      }
      else if (datePickerScreen === "transactionHistory") {
        const expenseDetails = await getExpenseByDateService(dateConvert(fromDate), dateConvert(toDate).toLocaleString());
        const creditDetails = await getCreditByDateService(dateConvert(fromDate), dateConvert(toDate).toLocaleString());
        getTransactionHistory([expenseDetails,creditDetails]);
      }
    })();

  }, [fromDate, toDate]);

  const onChange = (event, selectedDate: Date) => {
    const currentDate: Date = selectedDate;
    dateMode === "fromDate" ? setFromDate(currentDate) : setToDate(currentDate);
  };

  const showMode = (currentMode: any, dateMode1: string) => {
    DateTimePickerAndroid.open({
      value: dateMode1 == "fromDate" ? fromDate : toDate,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
    dateMode = dateMode1;
  };

  const showFromDatepicker = () => {
    showMode("date", "fromDate");
  };

  const showToTimepicker = () => {
    showMode("date", "toDate");
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ padding: 10 }}>
          <Button onPress={showFromDatepicker} title="Select from date" />
        </View>
        <View style={{ padding: 10 }}>
          <Button onPress={showToTimepicker} title="Select To date" />
        </View>
      </View>
      <View>
        <View style={[styles.btnContainer, { flexDirection: 'column', padding: 10, alignSelf: 'center' }]}>
          <Text>From Date: {fromDate.toLocaleString().split(",")[0]}</Text>
          <Text>To Date: {toDate.toLocaleString().split(",")[0]}</Text>
        </View>
      </View>
    </View>

  );
}

export default CustomDateTimePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f2f2f2',
  },
  btnContainer: {
    padding: 10,
  }
});