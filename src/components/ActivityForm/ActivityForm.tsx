import { memo } from 'react';
import { Controller } from 'react-hook-form';
import { Button, StyleSheet, View } from 'react-native';
import moment from 'moment';
import FormDateTime from '../FormDateTime/FormDateTime';
import FormTextInput from '../FormTextInput/FormTextInput';
import useActivityForm from './hooks/useActivityForm';

const ActivityForm = () => {
  const {handleAddActivity, handleCancel, control, startDate} =
    useActivityForm();

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="title"
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <FormTextInput
            placeholder="Name"
            error={error?.message}
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="note"
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <FormTextInput
            placeholder="Note"
            error={error?.message}
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="startDate"
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <FormDateTime
            value={value ?? moment().toDate()}
            onChange={onChange}
            label="Start Date"
            error={error?.message}
            maximumDate={moment().toDate()}
          />
        )}
      />
      <Controller
        control={control}
        name="endDate"
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <FormDateTime
            value={value ?? moment().toDate()}
            onChange={onChange}
            label="End Date"
            error={error?.message}
            minimumDate={startDate}
          />
        )}
      />
      <Button title="Create Activity" onPress={handleAddActivity} />
      <Button title="Cancel" onPress={handleCancel} />
    </View>
  );
};

export default memo(ActivityForm);

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
});
