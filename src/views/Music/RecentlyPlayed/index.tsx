import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  BackHandler,
} from 'react-native';
// import Carousel from 'react-native-snap-carousel';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import shortid from 'shortid';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import styles from './recentlyPlayedStyle';
import {AuthContext} from '../../../context';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';

export function RecentlyPlayed({navigation}: DrawerScreenProps<{}>) {
  const {state, dispatch}: any = useContext(AuthContext);
  const [data, setData] = useState({});
  const isFocused = useIsFocused();

  useEffect(() => {
    handleCheckLogin();
  }, [isFocused]);

  const handleCheckLogin = () => {
    if (!state?.isLoggedIn) {
      navigateToNestedRoute('Auth', 'Login');
    }
  };

  const handleBackButtonClick = () => {
    if (!state?.isLoggedIn) {
      navigateToNestedRoute('Drawer', 'Discover');
    }
    return true;
  };

  return (
    <View style={styles.recentlyPlayedContainer}>
      <NavDrawerHeader navigation={navigation} />
      <ScrollView style={styles.scrollViewContent}>
        <Text>Hey</Text>
      </ScrollView>
    </View>
  );
}
