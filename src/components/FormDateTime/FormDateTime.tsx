import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DateTimePicker from '../DateTimePicker/DateTimePicker';
import {InputError} from '../InputError/InputError';

const FormDateTime = ({
  value,
  onChange,
  label,
  error,
  maximumDate,
  minimumDate,
}: {
  value: Date;
  onChange: (_date?: Date) => void;
  label: string;
  error?: string;
  maximumDate?: Date;
  minimumDate?: Date;
}) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <DateTimePicker
          value={value}
          setValue={onChange}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
      </View>
      <InputError error={error} />
    </>
  );
};

export default memo(FormDateTime);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
