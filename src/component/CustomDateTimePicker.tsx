import { StyleSheet, View, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { ExpenseModel } from '../model';

// Services
import { getExpenseByDateService } from '../services/ExpenseDetailsServices';

type DatePickerProps = {
  datePickerScreen: string
  getExpenseDetails?(expsneObj: ExpenseModel[]): void
}

const CustomDateTimePicker = ({ getExpenseDetails, datePickerScreen }: DatePickerProps) => {
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());
  let dateMode: string;
  useEffect(() => {
    (async () => {
      if (datePickerScreen === "expenseDetails") {
        const expenseDetails = await getExpenseByDateService(fromDate.toLocaleString().split(",")[0], toDate.toLocaleString().split(",")[0]);
        getExpenseDetails(expenseDetails);
      }
    })();
  }, [fromDate,toDate]);

  const onChange = (event, selectedDate: Date) => {
    const currentDate: Date = selectedDate;
    // console.log(valueOf)
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
    // setValueOf("");
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