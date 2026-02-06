import {memo} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {InputError} from '../InputError/InputError';

const FormTextInput = ({
  error,
  placeholder,
  value,
  onChangeText,
}: {
  error?: string;
  placeholder: string;
  value?: string;
  onChangeText: (text: string) => void;
}) => {
  return (
    <>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
      <InputError error={error} />
    </>
  );
};

export default memo(FormTextInput);

const styles = StyleSheet.create({
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginLeft: 10,
  },
});
