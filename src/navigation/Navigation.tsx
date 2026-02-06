import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListActivityScreen from '../screens/Activity/ListActivity/ListActivityScreen';
import AddActivityScreen from '../screens/Activity/AddActivity/AddActivityScreen';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Activity">
      <Stack.Screen name="Activity" component={ListActivityScreen} />

      <Stack.Screen
        name="AddActivity"
        component={AddActivityScreen}
        options={{
          presentation: 'formSheet',
          headerShown: false,
          sheetAllowedDetents: 'fitToContents',
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
