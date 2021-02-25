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
  ImageBackground,
} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import shortid from 'shortid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import styles from './myPlatformStyle';
import {AuthContext} from '../../../context';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';
import BannerImage from '../../../assets/images/d-cover.jpg';
import ArtisteImage from '../../../assets/images/d-avatar.jpg';

export function MyPlatform({navigation}: DrawerScreenProps<{}>) {
  const {state, dispatch}: any = useContext(AuthContext);
  const [data, setData] = useState({});
  const user = state?.user;

  return (
    <View style={styles.myPlatformContainer}>
      <NavDrawerHeader navigation={navigation} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.myPlatformContent}>
          <ImageBackground
            source={BannerImage}
            style={styles.bannerImage}
            imageStyle={styles.bannerImageBackground}></ImageBackground>
          <View style={styles.artisteImageContainer}>
            <Image source={ArtisteImage} style={styles.artisteImage} />
          </View>
          <View style={styles.myPlatformWrapper}>
            <View style={styles.artisteInfoWrapper}>
              <CustomText
                type={1}
                text={user?.name}
                style={styles.artisteNameText}
              />
              <View style={styles.artisteFollowWrapper}>
                <CustomText
                  type={2}
                  text="0 Followers"
                  style={styles.artisteFollowText}
                />
                <CustomText
                  type={2}
                  text="."
                  style={styles.artisteFollowBullet}
                />
                <CustomText
                  type={2}
                  text="0 Following"
                  style={styles.artisteFollowText}
                />
              </View>
              <TouchableOpacity style={styles.editProfileWrapper}>
                <MaterialCommunityIcons
                  name="account-edit"
                  size={20}
                  color="#fff"
                />
                <CustomText
                  type={1}
                  text="Edit Profile"
                  style={styles.editProfileText}
                />
              </TouchableOpacity>
            </View>
            
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
