import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import shortid from 'shortid';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import styles from './browseStyle';

export function Browse({navigation}: DrawerScreenProps<{}>) {
  const [data, setData] = useState({
    tab: 'Songs',
    songs: [
      {
        title: 'Exhausted (I don tire).mp3',
        artist: 'Prince Amadi',
        duration: '3:32',
        releasedOn: '5 months ago',
        price: 200,
        isPurchased: true,
      },
      {
        title: 'MY MATTER ft KENNY ARA mp3',
        artist: 'Ebohon Tunde Tony',
        duration: '00:00:43',
        releasedOn: '7 months ago',
        price: 200,
        isPurchased: true,
      },
    ],
  });

  const handleTab = (tab: Number) => {
    setData({...data, ...tab});
  };

  return (
    <View style={styles.browseContainer}>
      <NavDrawerHeader navigation={navigation} />
      <View style={styles.browseContent}>
        <View style={styles.tabHeader}>
          <TouchableWithoutFeedback onPress={() => handleTab(1)}>
            <CustomText
              type={1}
              text="Songs"
              style={[
                styles.tabText,
                data.tab === 'Songs' && styles.activeTabText,
              ]}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => handleTab(2)}>
            <CustomText
              type={1}
              text="Albums"
              style={[
                styles.tabText,
                data.tab === 'Albums' && styles.activeTabText,
              ]}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => handleTab(3)}>
            <CustomText
              type={1}
              text="Top Seller"
              style={[
                styles.tabText,
                data.tab === 'Top Seller' && styles.activeTabText,
              ]}
            />
          </TouchableWithoutFeedback>
        </View>
        <ScrollView style={styles.scrollViewContent}>
          {data.tab === 'Songs' ? (
            <View>Songs</View>
          ) : data.tab === 'Albums' ? (
            <View>Albums</View>
          ) : data.tab === 'Top Seller' ? (
            <View>Top Seller</View>
          ) : null}
        </ScrollView>
      </View>
    </View>
  );
}
