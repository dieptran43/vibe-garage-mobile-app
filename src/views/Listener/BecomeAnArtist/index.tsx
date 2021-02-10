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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import shortid from 'shortid';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import styles from './becomeAnArtistStyle';
import {AuthContext} from '../../../context';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';

export function BecomeAnArtist({navigation}: DrawerScreenProps<{}>) {
  const {state, dispatch}: any = useContext(AuthContext);
  const [data, setData] = useState({});
  const isFocused = useIsFocused();

  return (
    <View style={styles.becomeAnArtistContainer}>
      <NavDrawerHeader navigation={navigation} />
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.layoutContent}>
          <CustomText
            type={1}
            text="Become an artist"
            style={styles.becomeArtistText}
          />
          <CustomText
            type={1}
            text="Get verified, upload more songs, get more space, sell your songs,
            get a special looking profile and get famous on our platform!"
            style={styles.getVerifiedText}
          />
          <View style={styles.nameRow}>
            <MaterialIcons name="person" size={20} />
            <CustomText text="Name" />
          </View>
          <TextInput style={styles.nameInput} />
          <CustomText
            type={1}
            text="Your full name as showing on your ID"
            style={styles.showIdText}
          />
          <View style={styles.nameRow}>
            <MaterialIcons name="insert-drive-file" size={20} />
            <CustomText text="Upload documents" />
          </View>
          <CustomText
            type={1}
            text="Please upload a photo with your passport / ID &amp; your distinct photo."
            style={styles.distinctPhotoText}
          />
          <View>
            <CustomText
              type={1}
              text="Your Personal Photo"
              style={styles.personalPhotoText}
            />
            <MaterialIcons name="camera-alt" size={20} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
