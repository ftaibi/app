import {memo} from 'react';
import {StyleSheet, Text} from 'react-native';

export const InputError = ({error}: {error?: string}) => {
  return <Text style={styles.error}>{error}</Text>;
};

export default memo(InputError);

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 12,
  },
});
