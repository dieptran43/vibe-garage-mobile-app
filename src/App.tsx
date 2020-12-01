import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Stack from './navigators/Stack';
import {navigationRef, isReadyRef} from './navigators/RootNavigation';
import {Login} from './views';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.areaContainer}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <NavigationContainer ref={navigationRef}>
            <Stack />
          </NavigationContainer>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  areaContainer: {
    flex: 1,
  },
});
export default App;
