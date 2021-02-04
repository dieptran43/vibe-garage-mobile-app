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
} from 'react-native';
// import Carousel from 'react-native-snap-carousel';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {useIsFocused} from '@react-navigation/native';
import shortid from 'shortid';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import styles from './mySongsStyle';
import {AuthContext} from '../../../context';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';

export function MySongs({navigation}: DrawerScreenProps<{}>) {
  const {state, dispatch}: any = useContext(AuthContext);
  const [data, setData] = useState({});
  const isFocused = useIsFocused();

  return (
    <View style={styles.mySongsContainer}>
      <NavDrawerHeader navigation={navigation} />
      <ScrollView style={styles.scrollViewContent}>
        <Text>mySongs</Text>
      </ScrollView>
    </View>
  );
}
