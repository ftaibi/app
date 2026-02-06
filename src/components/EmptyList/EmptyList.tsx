import {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const EmptyList = () => {
  return (
    <View style={styles.container}>
      <Text>No activities found</Text>
    </View>
  );
};

export default memo(EmptyList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
