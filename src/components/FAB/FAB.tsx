import Ionicons from '@expo/vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStackParamList} from '../../navigation/types';

const FAB = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {bottom} = useSafeAreaInsets();

  const handleAddActivity = () => {
    navigation.navigate('AddActivity');
  };
  return (
    <TouchableOpacity
      style={[styles.container, {bottom: 24 + bottom}]}
      onPress={handleAddActivity}>
      <Ionicons name="add-circle" size={60} color="black" />
    </TouchableOpacity>
  );
};

export default memo(FAB);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
  },
});
