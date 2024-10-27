import { StyleSheet, View, Text, Button } from 'react-native';
import React, { useState } from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
// import DateTimePicker from '@react-native-community/datetimepicker';


const CustomDateTimePicker = () => {
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());
  const [valueOf, setValueOf] = useState<string>("");

  const onChange = (event, selectedDate: Date) => {
    const currentDate: Date = selectedDate;
    valueOf === "" ? setFromDate(currentDate) : setToDate(currentDate);
  };

  const showMode = (currentMode: any, valueType: string) => {
    DateTimePickerAndroid.open({
      value: valueType == "fromDate" ? fromDate : toDate,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showFromDatepicker = () => {
    showMode("datetime", "fromDate");
    setValueOf("fromDate");
  };

  const showToTimepicker = () => {
    showMode('datetime', "toDate");
    setValueOf("toDate");
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.btnContainer}>
          <Button onPress={showFromDatepicker} title="Select from date" />
        </View>
        <View style={styles.btnContainer}>
          <Button onPress={showToTimepicker} title="Select To date" />
        </View>
        <View style={styles.btnContainer}>
          <Text>From Date: {fromDate.toLocaleString()}</Text>
          <Text>To Date: {toDate.toLocaleString()}</Text>
        </View>
      </View>
    </View>

  );
}

export default CustomDateTimePicker;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 10,
  },
  btnContainer: {
    padding: 10,
  }
});