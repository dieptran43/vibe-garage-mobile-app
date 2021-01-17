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
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStack from './navigators/Stack';
import {navigationRef, isReadyRef} from './navigators/RootNavigation';
import {AuthContext} from './context';
import reducers from './store/reducer';
import initialState from './store/state';

const App = () => {
  const [state, dispatch] = useReducer(reducers, initialState);

  useEffect(() => {
    checkUserLogin();
  }, []);

  const checkUserLogin = async () => {
    let user = await AsyncStorage.getItem('userLogin');
    const credentials = await Keychain.getGenericPassword();
    if (user && Object.entries(user) && credentials) {
      user = JSON.parse(user);
      await dispatch({
        type: 'populateUser',
        payload: {user, isLoggedIn: true},
      });
    }
    RNBootSplash.hide({fade: true});
  };

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
