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
import {DrawerScreenProps} from '@react-navigation/drawer';
import Feather from 'react-native-vector-icons/Feather';
import shortid from 'shortid';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import styles from './latestMusicStyle';

export function LatestMusic({navigation}: DrawerScreenProps<{}>) {
  const [data, setData] = useState({});

  return (
    <View style={styles.latestMusicContainer}>
      <NavDrawerHeader navigation={navigation} />
      <ScrollView style={styles.scrollViewContent}></ScrollView>
    </View>
  );
}
