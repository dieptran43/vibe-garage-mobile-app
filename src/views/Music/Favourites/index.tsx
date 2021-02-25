import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {useIsFocused} from '@react-navigation/native';
import shortid from 'shortid';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getFavourites} from '../../../services/songService';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import styles from './favouritesStyle';
import {AuthContext} from '../../../context';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';
import {combineData, getImage} from '../../../utils/helpers';

export function Favourites({navigation}: DrawerScreenProps<{}>) {
  const {state, dispatch}: any = useContext(AuthContext);
  const [data, setData] = useState({favourites: []});
  const isFocused = useIsFocused();
  const token = state?.token;

  useEffect(() => {
    handleCheckLogin();
  }, [isFocused]);

  const handleCheckLogin = () => {
    if (!state?.isLoggedIn) {
      navigateToNestedRoute('SingleStack', 'Login', {
        screenFrom: 'Favourites',
      });
    } else {
      handleFavourites();
    }
  };

  const handleFavourites = async () => {
    let favourites: any = [];
    getFavourites(token)
      .then((response: any) => {
        if (response?.success) {
          favourites = response?.fav?.data;
        }
        setData(combineData(data, {favourites}));
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.favouritesContainer}>
      <NavDrawerHeader navigation={navigation} />
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.topMusicContent}>
          <View style={styles.topSongsHeader}>
            <View style={styles.flexRow}>
              <View style={styles.graphBg}>
                <MaterialIcons name="star-outline" color="#fff" size={23} />
              </View>
              <Text style={styles.topMusicText}>Favourites</Text>
            </View>
          </View>
          <View style={styles.divider}></View>

          {data?.favourites?.length ? (
            <CustomText
              type={1}
              text={`You currently have ${data?.favourites?.length} favourite songs`}
              style={styles.noOfFavourites}
            />
          ) : null}
          <View style={styles.topSongsWrapper}>
            {data.favourites.map((music: any, index) => (
              <View key={shortid.generate()} style={styles.singleTopSong}>
                <Image
                  source={{
                    uri: getImage(music?.song?.thumbnail),
                  }}
                  style={styles.topMusicImage}
                />
                <View style={styles.musicTextWrapper}>
                  <CustomText
                    type={1}
                    text={music?.song?.title}
                    style={styles.musicTitleText}
                  />
                  <CustomText
                    type={2}
                    text={music?.song?.artist_data?.name}
                    style={styles.musicArtisteText}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
