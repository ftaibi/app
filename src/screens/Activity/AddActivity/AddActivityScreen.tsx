import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ActivityForm from '../../../components/ActivityForm/ActivityForm';

const AddActivityScreen = () => {
  const {bottom} = useSafeAreaInsets();
  return (
    <View style={[styles.container, {paddingBottom: bottom}]}>
      <Text style={styles.header}>Add Activity</Text>
      <ActivityForm />
    </View>
  );
};

export default AddActivityScreen;

const styles = StyleSheet.create({
  container: {margin: 10},
  header: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 10,
  },
});
