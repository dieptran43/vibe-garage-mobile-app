import React, {useEffect, useReducer} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import AppStack from './navigators/Stack';
import {navigationRef, isReadyRef} from './navigators/RootNavigation';
import {AuthContext} from './context';
import reducers from './store/reducer';
import initialState from './store/state';

const App = () => {
  const [state, dispatch] = useReducer(reducers, initialState);

  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 3000);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.areaContainer}>
        <NavigationContainer ref={navigationRef}>
          <AppStack />
        </NavigationContainer>
      </SafeAreaView>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  areaContainer: {
    flex: 1,
  },
});
export default App;
