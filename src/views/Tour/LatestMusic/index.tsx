import React, {useState, createRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import Feather from 'react-native-vector-icons/Feather';
import shortid from 'shortid';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import styles from './latestMusicStyle';
import {
  getBestNewReleases,
  getLatestMusic,
} from '../../../services/songService';
import {getImage, combineData} from '../../../utils/helpers';

export function LatestMusic({navigation}: DrawerScreenProps<{}>) {
  const [data, setData] = useState({
    bestNewReleases: [] as any,
    bestNewReleasesPageNo: 1,
    bestNewReleasesScrollPosition: 0,
    latestMusic: [] as any,
    latestMusicPageNo: 1,
  });

  const windowWidth = Dimensions.get('window').width;

  let scrollViewRef = createRef<ScrollView>();

  useEffect(() => {
    handleRequests();
  }, []);

  const handleRequests = async () => {
    let {bestNewReleasesPageNo, latestMusicPageNo} = data;

    await Promise.all([
      getBestNewReleases(bestNewReleasesPageNo),
      getLatestMusic(latestMusicPageNo),
    ])
      .then(([response, response1]: any) => {
        let bestNewReleases: any = [],
          latestMusic: any = [];

        if (response && response?.success) {
          bestNewReleases = response?.songs?.data;
        }
        if (response1 && response1?.success) {
          latestMusic = response1?.songs?.data;
        }
        setData(combineData(data, {bestNewReleases, latestMusic}));
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleBestNewReleases = (direction: string) => {
    try {
      let bestNewReleasesScrollPosition = data?.bestNewReleasesScrollPosition;
      const viewWidth = windowWidth;
      if (direction === 'left') {
        bestNewReleasesScrollPosition -= viewWidth;
      } else if (direction === 'right') {
        bestNewReleasesScrollPosition += viewWidth;
      }
      scrollViewRef?.current?.scrollTo({
        x: bestNewReleasesScrollPosition,
        animated: true,
      });
      setData(combineData(data, {bestNewReleasesScrollPosition}));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.latestMusicContainer}>
      <NavDrawerHeader navigation={navigation} />
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.contentWrapper}>
          <View style={styles.contentRow}>
            <View style={styles.rowTag}>
              <View style={styles.flexRow}>
                <View style={[styles.graphBg, styles.blueBg]}>
                  <MaterialCommunityIcons
                    name="bookmark-music"
                    size={22}
                    color="#fff"
                  />
                </View>
                <Text style={styles.playlistsText}>Best New Releases</Text>
              </View>
              <View style={styles.flexRow}>
                <TouchableOpacity onPress={() => handleBestNewReleases('left')}>
                  <View style={[styles.arrowWrapper, styles.marginRight]}>
                    <MaterialCommunityIcons
                      name="chevron-left"
                      size={30}
                      color="#000"
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleBestNewReleases('right')}>
                  <View style={styles.arrowWrapper}>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={30}
                      color="#000"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView style={{marginTop: 16}} horizontal ref={scrollViewRef}>
              {data?.bestNewReleases ? (
                data?.bestNewReleases.map((newRelease: any, index: Number) => (
                  <View
                    style={[
                      styles.singleCard,
                      {width: windowWidth / 2.34},
                      index !== data?.bestNewReleases?.length - 1 && {
                        marginRight: 20,
                      },
                    ]}
                    key={shortid.generate()}>
                    <Image
                      source={{
                        uri: getImage(newRelease?.thumbnail),
                      }}
                      style={styles.cardImage}
                    />
                    <CustomText
                      type={1}
                      text={newRelease.title}
                      style={styles.cardText}
                    />
                    <CustomText
                      type={2}
                      text={newRelease.artiste}
                      style={styles.cardText2}
                    />
                  </View>
                ))
              ) : (
                <Text>None found</Text>
              )}
            </ScrollView>
          </View>
          <View style={styles.contentRow}>
            <View style={styles.rowTag}>
              <View style={styles.flexRow}>
                <View style={[styles.graphBg, styles.blueBg]}>
                  <MaterialIcons name="music-note" size={22} color="#fff" />
                </View>
                <Text style={styles.playlistsText}>Latest Music</Text>
              </View>
            </View>
            <View style={styles.topSongsContent}>
              {data?.latestMusic?.length ? (
                <>
                  <View style={styles.topAlbumsWrapper}>
                    {data.latestMusic.map((album: any, index: Number) => (
                      <View
                        key={shortid.generate()}
                        style={styles.singleTopAlbum}>
                        <Image
                          source={{
                            uri: getImage(album.thumbnail),
                          }}
                          style={styles.topAlbumImage}
                        />
                        <Text
                          style={styles.musicTitleText}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {album?.title}
                        </Text>
                        <Text
                          style={styles.musicArtisteText}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {album?.artist_data?.name}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <Text style={styles.seeAllTopSongsText}>Load More</Text>
                </>
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
