import React, {useState, createRef, useContext, useEffect} from 'react';
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
  FlatList,
  ScrollViewProps,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DrawerScreenProps} from '@react-navigation/drawer';
import shortid from 'shortid';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText, AddToPlaylist} from '../../../components/Global';
import styles from './discoverStyle';
import {combineData, getFromOldUrl} from '../../../utils/helpers';
import {
  getNewReleases,
  getRecentlyPlayed,
  getTopSongsThisWeek,
  getRecommendedSongs,
} from '../../../services/songService';
import {ISong, IAlbum} from '../../../types/interfaces';
import {AuthContext} from '../../../context';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';
import {getScreenParent} from '../../../utils/navigationHelper';

export function Discover({navigation}: DrawerScreenProps<{}>) {
  const {state, dispatch}: any = useContext(AuthContext);
  const [data, setData] = useState({
    carouselItems: [
      {
        title: 'October special',
        image:
          'https://musicport.com.ng/upload/photos/2019/10/NuJHxVutEiIgT86CcFqr_06_6dfa801e8668b414c32232e7c8b93426_image.jpg',
      },
      {
        title: 'LABIS BOY_MAN OF THE YEAR.mp3',
        image:
          'https://musicport.com.ng/upload/photos/2019/10/J7qytBWEsADF5zBsC6Os_17_98885479029d3e547509c8e8ea8d1e3b_image.jpg',
      },
      {
        title: 'November TOP 5',
        image:
          'https://musicport.com.ng/upload/photos/2019/11/wbWF1rYguTq8JtKZIaM6_22_a47c1c30c1e7318a49df8de5748a9ea7_image.jpeg',
      },
      {
        title: 'Exhausted (I don tire).mp3',
        image:
          'https://musicport.com.ng/upload/photos/2020/01/MUDLnD9cXKhvkVJuUGAK_29_0c0801563af4b03dea742996a6cde2e0_image.png',
      },
    ] as any,
    recentlyPlayed: [] as any,
    recentlyPlayedScrollPosition: 0,
    newReleases: [] as any,
    newReleasesPageNo: 1,
    newReleasesScrollPosition: 0,
    mostPopularThisWeek: [] as any,
    recommended: [] as any,
    moreView: null,
    canAddToPlaylist: false,
    track_id: null,
  });
  const windowWidth = Dimensions.get('window').width;
  let scrollViewRef = createRef<ScrollView>();
  const token = state?.token;

  useEffect(() => {
    handleRequests();
  }, []);

  const handleRequests = async () => {
    let {newReleasesPageNo} = data;

    await Promise.all([
      getNewReleases(newReleasesPageNo),
      getRecentlyPlayed(token),
      getTopSongsThisWeek(),
      getRecommendedSongs(),
    ])
      .then(([response, response1, response2, response3]: any) => {
        let newReleases: any = [],
          recentlyPlayed: any = [],
          mostPopularThisWeek: any = [],
          recommended: any = [];

        if (response && response?.success) {
          newReleases = response?.songs?.data;
        }
        if (response1 && response1?.success) {
          recentlyPlayed = response1?.recentlyPlayed?.data;
        }
        if (response2 && response2?.success) {
          mostPopularThisWeek = response2?.songs;
        }
        if (response3 && response3?.success) {
          recommended = response3?.songs;
        }
        setData(
          combineData(data, {
            newReleases,
            recentlyPlayed,
            mostPopularThisWeek,
            recommended,
          }),
        );
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const _renderItem = ({item}: any) => {
    return (
      <View style={styles.carouselContainer}>
        <Image source={{uri: item?.image}} style={styles.carouselImage} />
        <Text style={styles.carouselText}>{item.title}</Text>
      </View>
    );
  };

  const handleScrollRecentlyPlayed = (direction: string) => {
    let recentlyPlayedScrollPosition = data?.recentlyPlayedScrollPosition;
    const viewWidth = windowWidth;
    if (direction === 'left') {
      recentlyPlayedScrollPosition -= viewWidth;
    } else if (direction === 'right') {
      recentlyPlayedScrollPosition += viewWidth;
    }
    scrollViewRef?.current?.scrollTo({
      x: recentlyPlayedScrollPosition,
      animated: true,
    });
    setData(combineData(data, {recentlyPlayedScrollPosition}));
  };

  const handleNavigation = (route: String, params?: ISong) => {
    setData(combineData(data, {moreView: null}));
    navigateToNestedRoute(getScreenParent(route), route, params);
  };

  const handleSetMoreView = (index: any) => {
    let {moreView} = data;
    if (moreView === index) {
      moreView = null;
    } else {
      moreView = index;
    }
    setData(combineData(data, {moreView}));
  };

  const getMoreIndex = (type: any, index: any) => {
    return `${type}-${index}`;
  };

  const handlePlaylist = (song: any) => {
    const track_id = song?.track_id;
    setData(combineData(data, {canAddToPlaylist: true, track_id}));
  };

  const handleCloseAddToPlaylist = () => {
    setData(combineData(data, {canAddToPlaylist: false, track_id: null}));
  };

  const handleModified = (param: any) => {
    // console.log(param);
    if (param === 'song_added_to_playlist') {
      const {track_id} = data;
    }
  };

  const handleMoreButton = (index: any, is_added_to_playlist: any) => {
    if (token) {
      // if(is_added_to_playlist)
      handleSetMoreView(getMoreIndex('recommended', index));
    } else {
      navigateToNestedRoute('SingleStack', 'Login', {
        screenFrom: 'Discover',
      });
    }
  };

  return (
    <View style={styles.discoverContainer}>
      <NavDrawerHeader navigation={navigation} />
      <ScrollView style={styles.scrollViewContent}>
        <Carousel
          layout={'default'}
          data={data.carouselItems}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
          renderItem={_renderItem}
          onSnapToItem={(index: any) => console.log(index)}
          style={styles.carouselContent}
        />
        <View style={styles.contentWrapper}>
          <View style={styles.contentRow}>
            <View style={styles.rowTag}>
              <View style={styles.flexRow}>
                <View style={[styles.graphBg, styles.greenBg]}>
                  <MaterialCommunityIcons
                    name="history"
                    size={22}
                    color="#fff"
                  />
                </View>
                <Text style={styles.playlistsText}>Recently Played</Text>
              </View>
              <View style={styles.flexRow}>
                <CustomText
                  type={2}
                  text="Show All"
                  style={styles.showAllText}
                />
                <TouchableOpacity
                  onPress={() => handleScrollRecentlyPlayed('left')}>
                  <View style={[styles.arrowWrapper, styles.marginRight]}>
                    <MaterialCommunityIcons
                      name="chevron-left"
                      size={30}
                      color="#000"
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleScrollRecentlyPlayed('right')}>
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
              {data?.recentlyPlayed ? (
                data?.recentlyPlayed.map((rPlayed: any, index: Number) => (
                  <TouchableOpacity
                    style={[
                      styles.singleCard,
                      {width: windowWidth / 2.34},
                      // {marginRight: 20},
                      index !== data?.recentlyPlayed?.length - 1 && {
                        marginRight: 20,
                      },
                    ]}
                    key={shortid.generate()}
                    onPress={() => handleNavigation('Track', rPlayed?.song)}>
                    <Image
                      source={{
                        uri: getFromOldUrl(rPlayed?.song?.thumbnail),
                      }}
                      style={styles.cardImage}
                    />
                    <CustomText
                      type={1}
                      text={rPlayed?.song?.title}
                      style={styles.cardText}
                    />
                    <CustomText
                      type={2}
                      text={rPlayed?.song?.artist_data?.name}
                      style={styles.cardText2}
                    />
                  </TouchableOpacity>
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
                <Text style={styles.playlistsText}>New Releases</Text>
              </View>
              <View style={styles.flexRow}>
                <CustomText
                  type={2}
                  text="Show All"
                  style={styles.showAllText}
                />
                <TouchableOpacity
                  onPress={() => handleScrollRecentlyPlayed('left')}>
                  <View style={[styles.arrowWrapper, styles.marginRight]}>
                    <MaterialCommunityIcons
                      name="chevron-left"
                      size={30}
                      color="#000"
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleScrollRecentlyPlayed('right')}>
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
              {data?.newReleases ? (
                data?.newReleases.map((newRelease: ISong, index: Number) => (
                  <TouchableOpacity
                    style={[
                      styles.singleCard,
                      {width: windowWidth / 2.34},
                      // {marginRight: 20},
                      index !== data?.newReleases?.length - 1 && {
                        marginRight: 20,
                      },
                    ]}
                    key={shortid.generate()}
                    onPress={() => handleNavigation('Track', newRelease)}>
                    <Image
                      source={{
                        uri: getFromOldUrl(newRelease?.thumbnail),
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
                      text={newRelease?.artist_data?.name}
                      style={styles.cardText2}
                    />
                  </TouchableOpacity>
                ))
              ) : (
                <Text>None found</Text>
              )}
            </ScrollView>
          </View>
          <View style={styles.contentRow}>
            <View style={styles.rowTag}>
              <View style={styles.flexRow}>
                <View style={[styles.graphBg, styles.pinkBg]}>
                  <MaterialCommunityIcons
                    name="calendar-clock"
                    size={22}
                    color="#fff"
                  />
                </View>
                <Text style={styles.playlistsText}>Most Popular This Week</Text>
              </View>
            </View>
            <View style={styles.topSongsContent}>
              {data?.mostPopularThisWeek?.length ? (
                <View style={styles.topSongsWrapper}>
                  {data.mostPopularThisWeek
                    .slice(0, 10)
                    .map((mostPopular: any, index: Number) => (
                      <TouchableOpacity
                        key={shortid.generate()}
                        style={styles.singleTopSong}
                        onPress={() =>
                          handleNavigation('Track', mostPopular?.song)
                        }>
                        <Image
                          source={{
                            uri: getFromOldUrl(mostPopular?.song?.thumbnail),
                          }}
                          style={styles.topMusicImage}
                        />
                        <View style={styles.musicTextWrapper}>
                          <Text
                            style={styles.musicTitleText}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            {mostPopular?.song?.title}
                          </Text>
                          <Text
                            style={styles.musicArtisteText}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            {mostPopular?.song?.artist_data?.name}
                          </Text>
                        </View>

                        <View style={styles.moreWrapper}>
                          <TouchableOpacity
                            onPress={() => handleMoreButton(index, mostPopular?.song?.is_added_to_playlist)}>
                            <MaterialIcons
                              name="more-horiz"
                              style={styles.musicMoreIcon}
                              color="#919191"
                              size={25}
                            />
                          </TouchableOpacity>
                          {data?.moreView ===
                          getMoreIndex('recommended', index) ? (
                            <View style={styles.moreBtnsWrapper}>
                              <TouchableOpacity
                                style={styles.moreBtn}
                                onPress={() => handlePlaylist(mostPopular)}>
                                <CustomText type={1} text="Add to Playlist" />
                              </TouchableOpacity>
                            </View>
                          ) : null}
                        </View>
                      </TouchableOpacity>
                    ))}
                </View>
              ) : null}
            </View>
          </View>
          <View style={styles.contentRow}>
            <View style={styles.rowTag}>
              <View style={styles.flexRow}>
                <View style={[styles.graphBg, styles.maroonBg]}>
                  <MaterialCommunityIcons
                    name="thumb-up"
                    size={20}
                    color="#fff"
                  />
                </View>
                <Text style={styles.playlistsText}>Recommended</Text>
              </View>
            </View>
            <View style={styles.topSongsContent}>
              {data.recommended
                .slice(0, 10)
                .map((recommended: any, index: Number) => (
                  <TouchableOpacity
                    key={shortid.generate()}
                    style={styles.singleTopSong}
                    onPress={() => handleNavigation('Track', recommended)}>
                    <Image
                      source={{
                        uri: getFromOldUrl(recommended?.thumbnail),
                      }}
                      style={styles.topMusicImage}
                    />
                    <View style={styles.musicTextWrapper}>
                      <Text
                        style={styles.musicTitleText}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {recommended?.title}
                      </Text>
                      <Text
                        style={styles.musicArtisteText}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {recommended?.artist_data?.name}
                      </Text>
                    </View>
                    {token ? (
                      <View style={styles.moreWrapper}>
                        <TouchableOpacity
                          onPress={() => handleMoreButton(index, recommended?.is_added_to_playlist)}>
                          <MaterialIcons
                            name="more-horiz"
                            style={styles.musicMoreIcon}
                            color="#919191"
                            size={25}
                          />
                        </TouchableOpacity>
                        {data?.moreView ===
                        getMoreIndex('recommended', index) ? (
                          <View style={styles.moreBtnsWrapper}>
                            <TouchableOpacity
                              style={styles.moreBtn}
                              onPress={() => handlePlaylist(recommended)}>
                              <CustomText type={1} text="Add to Playlist" />
                            </TouchableOpacity>
                          </View>
                        ) : null}
                      </View>
                    ) : null}
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        </View>
      </ScrollView>
      {data?.canAddToPlaylist ? (
        <AddToPlaylist
          height="65%"
          width="100%"
          track_id={data?.track_id}
          onClose={() => handleCloseAddToPlaylist()}
          handleModified={(param: any) => handleModified(param)}
        />
      ) : null}
    </View>
  );
}
