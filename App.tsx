import {NavigationContainer} from '@react-navigation/native';
import {RealmProvider} from '@realm/react';
import {default as realm, default as realmDB} from './src/db/realmDB';
import RootStack from './src/navigation/Navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  console.log('Realm path:', realm.path);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RealmProvider realm={realmDB}>
          <RootStack />
        </RealmProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
