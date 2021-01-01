import React, {useState} from 'react';
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
import shortid from 'shortid';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import styles from './purchasedStyle';

export function Purchased({navigation}: DrawerScreenProps<{}>) {
  const [data, setData] = useState({});

  return (
    <View style={styles.purchaseContainer}>
      <NavDrawerHeader navigation={navigation} />
      <ScrollView style={styles.scrollViewContent}>
        
      </ScrollView>
    </View>
  );
}
