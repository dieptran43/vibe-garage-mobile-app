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
import {MenuProvider} from 'react-native-popup-menu';
import Toast from 'react-native-toast-message';
import AppStack from './navigators/Stack';
import {navigationRef} from './navigators/RootNavigation';
import {AuthContext} from './context';
import reducers from './store/reducer';
import initialState from './store/state';

const App = () => {
  const [state, dispatch] = useReducer(reducers, initialState);

  useEffect(() => {
    checkUserLogin();
  }, []);

  const checkUserLogin = async () => {
    let response: any = await AsyncStorage.getItem('userLogin');
    const credentials = await Keychain.getGenericPassword();
    if (response && Object.entries(response) && credentials) {
      response = JSON.parse(response);
      const user = response?.user;
      const token = response?.token;
      await dispatch({
        type: 'populateUser',
        payload: {user, token, isLoggedIn: true},
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
      <MenuProvider>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.areaContainer}>
          <NavigationContainer ref={navigationRef}>
            <AppStack />
          </NavigationContainer>
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
      </MenuProvider>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  areaContainer: {
    flex: 1,
  },
});
export default App;
