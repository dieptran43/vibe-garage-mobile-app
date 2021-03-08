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
  TouchableWithoutFeedback,
} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import shortid from 'shortid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import styles from './myPlatformStyle';
import {AuthContext} from '../../../context';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';
import BannerImage from '../../../assets/images/d-cover.jpg';
import ArtisteImage from '../../../assets/images/d-avatar.jpg';
import {combineData, getFromOldUrl} from '../../../utils/helpers';

export function MyPlatform({navigation}: DrawerScreenProps<{}>) {
  const {state, dispatch}: any = useContext(AuthContext);
  const user = state?.user;

  const [data, setData] = useState({
    tab: 'My Songs',
    mySongs: [],
    myAlbums: [],
  });

  const handleTab = (tab: any) => {
    setData(combineData(data, {tab}));
  };

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
              <View style={styles.checkRow}>
                <CustomText
                  type={1}
                  text={user?.name}
                  style={styles.artisteNameText}
                />
                {user?.verified ? (
                  <View style={styles.checkBg}>
                    <Feather name="check-circle" size={20} color="#fff" />
                  </View>
                ) : null}
              </View>
              <CustomText
                text={`@${user?.username}`}
                style={styles.artisteUsername}
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
            <View style={styles.tabHeader}>
              <TouchableWithoutFeedback onPress={() => handleTab('My Songs')}>
                <View
                  style={[
                    styles.tabTextWrapper,
                    data.tab === 'My Songs' && styles.activeTabTextWrapper,
                  ]}>
                  <CustomText
                    type={1}
                    text="My Songs"
                    style={[
                      styles.tabText,
                      data.tab === 'My Songs' && styles.activeTabText,
                    ]}
                  />
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => handleTab('My Albums')}>
                <View
                  style={[
                    styles.tabTextWrapper,
                    data.tab === 'My Albums' && styles.activeTabTextWrapper,
                  ]}>
                  <CustomText
                    type={1}
                    text="My Albums"
                    style={[
                      styles.tabText,
                      data.tab === 'My Albums' && styles.activeTabText,
                    ]}
                  />
                </View>
              </TouchableWithoutFeedback>

              {/* <TouchableWithoutFeedback onPress={() => handleTab('Top Seller')}>
                <View
                  style={[
                    styles.tabTextWrapper,
                    data.tab === 'Top Seller' && styles.activeTabTextWrapper,
                  ]}>
                  <CustomText
                    type={1}
                    text="Top Seller"
                    style={[
                      styles.tabText,
                      data.tab === 'Top Seller' && styles.activeTabText,
                    ]}
                  />
                </View>
              </TouchableWithoutFeedback> */}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
