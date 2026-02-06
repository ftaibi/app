import RNDateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import moment from 'moment';
import React, {memo} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DateTimePickerProps} from './types';

/**
 * Cross-platform date/time picker: inline on iOS, Android opens native modal(s).
 * On Android we use separate date and time triggers because mode: 'datetime' is not supported.
 */
const DateTimePicker = ({
  setValue,
  value,
  maximumDate,
  minimumDate = moment().subtract(100, 'years').toDate(),
  showTime = true,
  showDate = true,
  mode = 'datetime',
  display = 'default',
}: DateTimePickerProps) => {
  if (Platform.OS === 'ios')
    return (
      <RNDateTimePicker
        display={display}
        value={value}
        mode={mode}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        onChange={(_event, date) => {
          setValue(date);
        }}
      />
    );
  return (
    <View style={styles.dateAndTimeContainer}>
      {showDate && (
        <TouchableOpacity
          style={styles.dateTime}
          onPress={() => {
            DateTimePickerAndroid.open({
              value: value,
              onChange: (_event, date) => {
                setValue(date);
              },
              maximumDate,
              minimumDate,
              mode: 'date',
            });
          }}>
          <Text style={styles.dateTimeText}>
            {moment(value ?? new Date()).format('ll')}
          </Text>
        </TouchableOpacity>
      )}

      {showTime && (
        <TouchableOpacity
          style={styles.dateTime}
          onPress={() => {
            DateTimePickerAndroid.open({
              value: value,
              onChange: (_event, date) => {
                setValue(date);
              },
              minimumDate,
              maximumDate,
              mode: 'time',
            });
          }}>
          <Text style={styles.dateTimeText}>
            {moment(value ?? new Date()).format('LT')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(DateTimePicker);

const styles = StyleSheet.create({
  dateAndTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dateTime: {
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
    marginLeft: 10,
  },
  dateTimeText: {
    fontSize: 16,
  },
});
