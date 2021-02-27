import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {useIsFocused} from '@react-navigation/native';
import shortid from 'shortid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import styles from './recentlyPlayedStyle';
import {AuthContext} from '../../../context';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';
import {CustomText} from '../../../components/Global';
import {getRecentlyPlayed} from '../../../services/songService';
import {combineData, getFromOldUrl} from '../../../utils/helpers';

export function RecentlyPlayed({navigation}: DrawerScreenProps<{}>) {
  const {state, dispatch}: any = useContext(AuthContext);
  const token = state?.token;
  const [data, setData] = useState({
    recentlyPlayed: [] as any,
    isLoading: true,
  });
  const isFocused = useIsFocused();

  useEffect(() => {
    handleCheckLogin();
  }, [isFocused]);

  const handleCheckLogin = () => {
    if (!state?.isLoggedIn) {
      navigateToNestedRoute('SingleStack', 'Login', {
        screenFrom: 'RecentlyPlayed',
      });
    } else {
      handleRecentlyPlayed();
    }
  };

  const handleRecentlyPlayed = async () => {
    try {
      await getRecentlyPlayed(token)
        .then((response: any) => {
          let recentlyPlayed = [];
          if (response && response?.success) {
            recentlyPlayed = response?.recentlyPlayed?.data;
            console.log(recentlyPlayed);
          }
          setData(combineData(data, {recentlyPlayed, isLoading: false}));
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.recentlyPlayedContainer}>
      <NavDrawerHeader navigation={navigation} />
      <View style={styles.recentlyPlayedHeader}>
        <View style={styles.flexRow}>
          <View style={styles.graphBg}>
            <MaterialCommunityIcons name="history" size={25} color="#fff" />
          </View>
          <Text style={styles.recentlyPlayedText}>Recently Played</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.recentlyPlayedContent}>
          {data?.recentlyPlayed?.length ? (
            <>
              <View style={styles.topAlbumsWrapper}>
                {data.recentlyPlayed.map((rPlayed: any, index: Number) => (
                  <View key={shortid.generate()} style={styles.singleTopAlbum}>
                    <Image
                      source={{
                        uri: getFromOldUrl(rPlayed?.song?.thumbnail),
                      }}
                      style={styles.topAlbumImage}
                    />
                    <Text
                      style={styles.musicTitleText}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {rPlayed?.song?.title}
                    </Text>
                    <Text
                      style={styles.musicArtisteText}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {rPlayed?.song?.artist_data?.name}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          ) : data?.recentlyPlayed?.length && !data?.isLoading ? (
            <CustomText type={1} text="No tracks found, try to listen more?" />
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}
