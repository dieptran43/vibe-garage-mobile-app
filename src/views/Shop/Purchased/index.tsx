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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import shortid from 'shortid';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import styles from './purchasedStyle';
import {AuthContext} from '../../../context';
import {combineData, getFromOldUrl} from '../../../utils/helpers';
import {getPurchases} from '../../../services/storeService';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';
import {getScreenParent} from '../../../utils/navigationHelper';
import {ISong} from '../../../types/interfaces';

export function Purchased({navigation}: DrawerScreenProps<{}>) {
  const {state, dispatch}: any = useContext(AuthContext);
  const [data, setData] = useState({purchases: [] as any});
  const isFocused = useIsFocused();
  const token = state?.token;

  useEffect(() => {
    handleCheckLogin();
  }, [isFocused]);

  const handleCheckLogin = () => {
    if (!state?.isLoggedIn) {
      navigateToNestedRoute('SingleStack', 'Login', {
        screenFrom: 'Purchased',
      });
    } else {
      handlePurchases();
    }
  };

  const handlePurchases = async () => {
    let purchases: any = [];
    getPurchases(token)
      .then((response: any) => {
        if (response?.success) {
          purchases = response?.purchases?.data;
        }
        setData(combineData(data, {purchases}));
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleNavigation = (route: String, params: ISong) => {
    navigateToNestedRoute(getScreenParent(route), route, params);
  };

  return (
    <View style={styles.purchaseContainer}>
      <NavDrawerHeader navigation={navigation} />
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.topSongsHeader}>
          <View style={styles.flexRow}>
            <View style={styles.graphBg}>
              <MaterialCommunityIcons
                name="shopping-music"
                color="#fff"
                size={23}
              />
            </View>
            <Text style={styles.topMusicText}>My Purchases</Text>
          </View>
        </View>
        <View style={styles.topSongsWrapper}>
          {data.purchases.map((music: any) => (
            <TouchableOpacity
              key={shortid.generate()}
              style={styles.singleTopSong}
              onPress={() => handleNavigation('Track', music?.song)}>
              {music?.song?.favourite ? (
                <MaterialIcons name="star" color="rgb(255, 153, 0)" size={30} />
              ) : (
                <MaterialIcons name="star-border" color="#fff" size={30} />
              )}
              <View style={styles.musicTextWrapper}>
                <CustomText
                  type={1}
                  text={music?.song?.title}
                  style={styles.musicTitleText}
                />
              </View>
              <TouchableOpacity style={styles.moreBtn}>
                <MaterialIcons name="more-horiz" size={25} color="#8d8d8d" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
