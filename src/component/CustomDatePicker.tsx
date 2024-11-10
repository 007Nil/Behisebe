import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { dateConvert } from '../utils/AllUtils';

type DatePickerPropes = {
    getUpdatedDate(selectedDate: string): void
}

const CustomDatePicker = ({ getUpdatedDate }: DatePickerPropes) => {
    const [date, setDate] = useState<Date>(new Date());
    const onChange = (event, selectedDate: Date) => {
        const currentDate: Date = selectedDate;
        setDate(currentDate);
    };

    const showMode = (currentMode: any, dateMode1: string) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };
    const showDate = () => {
        showMode("date", "toDate");
    };

    useEffect(() => {
        if (date.toLocaleDateString() === new Date().toLocaleDateString()) {
            getUpdatedDate("");
        } else {
            let dateTime: string = date.toLocaleString().split(",")[1];
            getUpdatedDate(dateConvert(date) + dateTime);
        }
    });

    return (
        <View>
            <Text><Button onPress={showDate} title="Change Date" /></Text>
        </View>
    )
}

export default CustomDatePicker;