import React, {useEffect, useReducer} from 'react';
import {SafeAreaView, StyleSheet, View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MenuProvider} from 'react-native-popup-menu';
import Toast from 'react-native-toast-message';
import admob, {MaxAdContentRating} from '@react-native-firebase/admob';
import {
  InterstitialAd,
  RewardedAd,
  BannerAd,
  TestIds,
  BannerAdSize,
} from '@react-native-firebase/admob';
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

  try {
    admob()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
      })
      .then(() => {
        // Request config successfully set!
      });
  } catch (error) {
    console.error(error);
  }

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
          <View style={styles.bottomContainer}>
            <BannerAd
              unitId={TestIds.BANNER}
              size={BannerAdSize.ADAPTIVE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
              onAdLoaded={() => {}}
              onAdFailedToLoad={() => {}}
              onAdOpened={() => {}}
              onAdClosed={() => {}}
              onAdLeftApplication={() => {}}
            />
          </View>
        </SafeAreaView>
      </MenuProvider>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  areaContainer: {
    flex: 1,
    position: 'relative',
    paddingBottom: 50
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
  },
});
export default App;
