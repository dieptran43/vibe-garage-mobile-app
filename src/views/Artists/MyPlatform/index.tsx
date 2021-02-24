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
// import Carousel from 'react-native-snap-carousel';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {useIsFocused} from '@react-navigation/native';
import shortid from 'shortid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import styles from './myPlatformStyle';
import {AuthContext} from '../../../context';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';
import CoverImage from '../../../assets/images/d-cover.jpg';
import CoverAvatar from '../../../assets/images/d-avatar.jpg';

export function MyPlatform({navigation}: DrawerScreenProps<{}>) {
  const {state, dispatch}: any = useContext(AuthContext);
  const [data, setData] = useState({});
  const isFocused = useIsFocused();

  return (
    <View style={styles.myPlatformContainer}>
      <NavDrawerHeader navigation={navigation} />
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.myPlatformContent}>
          <ImageBackground source={CoverImage}></ImageBackground>
          <Image source={CoverAvatar} />
          <View>
            <CustomText
              type={1}
              text="John Smith"
              style={styles.usernameText}
            />

            <View>
              <View>
                <Text>0</Text>
                <Text>Followers</Text>
              </View>
              <View>
                <Text>0</Text>
                <Text>Following</Text>
              </View>
            </View>
            <View>
              <MaterialCommunityIcons name="account-edit" color="#fff" />
              <Text>Edit Profile</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
