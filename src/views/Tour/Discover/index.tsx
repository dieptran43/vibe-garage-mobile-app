import React, {
  useState,
  createRef,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  BackHandler,
  Modal,
  Linking,
} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {useFocusEffect} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import shortid from 'shortid';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getVersion, getSystemName} from 'react-native-device-info';
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
import {getCarouselPlaylist} from '../../../services/storeService';
import {ISong, IAlbum} from '../../../types/interfaces';
import {AuthContext} from '../../../context';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';
import {getScreenParent} from '../../../utils/navigationHelper';
import {getAppSettings} from '../../../services/requestService';
import {authUser} from '../../../services/authService';
import {useNetwork} from '../../../hooks/useNetwork';

export function Discover({navigation}: DrawerScreenProps<{}>) {
  const {state, dispatch}: any = useContext(AuthContext);
  const [data, setData] = useState({
    carouselItems: [] as any,
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
    shouldUpdateApp: false,
    onlineAppVersion: '',
    forceAppUpdate: false,
    storeUrl: '',
    windowWidth: Dimensions?.get('window').width,
  });
  let scrollViewRef = createRef<ScrollView>();
  const {token} = state || {};
  let currentAppVersion = getVersion();
  const systemName = getSystemName();
  const [isConnected, setIsConnected] = useNetwork();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  useEffect(() => {
    handleRequests();
    handleTriggeredUpdate();
    handleCheckUser();
  }, []);

  useEffect(() => {
    Dimensions.addEventListener('change', (e) => {
      const {width, height} = e.window;
      let windowWidth = width;
      setData((data) =>
        combineData(data, {
          windowWidth,
        }),
      );
    });
  }, []);

  const handleRequests = async () => {
    await Promise.all([
      getCarouselPlaylist(),
      getRecentlyPlayed(token),
      getNewReleases(),
      getTopSongsThisWeek(),
      getRecommendedSongs(),
    ])
      .then(([response0, response1, response2, response3, response4]: any) => {
        let carouselItems: any = [],
          newReleases: any = [],
          recentlyPlayed: any = [],
          mostPopularThisWeek: any = [],
          recommended: any = [];

        if (response0 && response0?.success) {
          carouselItems = response0?.playlists;
        }
        if (response1 && response1?.success) {
          recentlyPlayed = response1?.recentlyPlayed?.data;
        }
        if (response2 && response2?.success) {
          newReleases = response2?.songs?.data;
        }
        if (response3 && response3?.success) {
          mostPopularThisWeek = response3?.songs;
        }
        if (response4 && response4?.success) {
          recommended = response4?.songs;
        }

        setData((data) =>
          combineData(data, {
            carouselItems,
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
        <Image
          source={{uri: getFromOldUrl(item?.thumbnail)}}
          style={styles.carouselImage}
        />
        <Text style={styles.carouselText}>{item?.name}</Text>
      </View>
    );
  };

  const handleScrollRecentlyPlayed = (direction: string) => {
    let recentlyPlayedScrollPosition = data?.recentlyPlayedScrollPosition;
    const viewWidth = data?.windowWidth;
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

  const handleNavigation = (route: string, params?: ISong) => {
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

  const handleTriggeredUpdate = async () => {
    await getAppSettings()
      .then((response: any) => {
        if (response?.success) {
          const androidVersion = response?.Android;
          const iosVersion = response?.iOS;
          let onlineAppVersion = '',
            forceAppUpdate = '',
            storeUrl = '';
          if (systemName === 'Android') {
            onlineAppVersion = androidVersion?.app_version;
            forceAppUpdate = androidVersion?.is_compulsory;
            storeUrl = androidVersion?.download_url;
          } else if (systemName === 'iOS' || systemName === 'iPhone OS') {
            onlineAppVersion = iosVersion?.app_version;
            forceAppUpdate = iosVersion?.is_compulsory;
            storeUrl = iosVersion?.download_url;
          }

          if (onlineAppVersion && currentAppVersion) {
            const checkVersion = onlineAppVersion.localeCompare(
              currentAppVersion,
              undefined,
              {numeric: true, sensitivity: 'base'},
            );

            if (checkVersion === 0) {
              //Versions are equal
              setData((data) => combineData(data, {shouldUpdateApp: false}));
            } else if (checkVersion === 1) {
              //onlineAppVersion is greater than currentAppVersion
              setData((data) =>
                combineData(data, {
                  shouldUpdateApp: true,
                  forceAppUpdate,
                  onlineAppVersion,
                  storeUrl,
                }),
              );
            } else if (checkVersion === -1) {
              //currentAppVersion is greater than onlineAppVersion
              setData((data) => combineData(data, {shouldUpdateApp: false}));
            }
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancelAppUpdate = () => {
    setData(
      combineData(data, {
        shouldUpdateApp: false,
        forceAppUpdate: false,
      }),
    );
  };

  const handleStartAppUpdate = () => {
    try {
      Linking.openURL(data?.storeUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckUser = async () => {
    if (token) {
      await authUser({token})
        .then(async (response: any) => {
          const user = response?.user;
          if (user && Object.entries(user)?.length && token) {
            await dispatch({
              type: 'populateUser',
              payload: {user, token, isLoggedIn: true},
            });
            await AsyncStorage.setItem(
              'userLogin',
              JSON.stringify({user, token}),
            );
          }
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  };

  return (
    <View style={styles.discoverContainer}>
      <NavDrawerHeader navigation={navigation} />
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.carouselWrapper}>
          <Carousel
            layout={'default'}
            data={data.carouselItems}
            sliderWidth={data?.windowWidth}
            itemWidth={data?.windowWidth}
            renderItem={_renderItem}
            onSnapToItem={(index: any) => console.log(index)}
            style={styles.carouselContent}
          />
        </View>
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
              {/* <View style={styles.flexRow}>
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
              </View> */}
            </View>
            <ScrollView style={{marginTop: 16}} horizontal ref={scrollViewRef}>
              {data?.recentlyPlayed ? (
                data?.recentlyPlayed.map((rPlayed: any, index: Number) => (
                  <TouchableOpacity
                    style={[
                      styles.singleCard,
                      {width: data?.windowWidth / 2.34},
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
              {/* <View style={styles.flexRow}>
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
              </View> */}
            </View>
            <ScrollView style={{marginTop: 16}} horizontal ref={scrollViewRef}>
              {data?.newReleases?.length ? (
                data?.newReleases.map((newRelease: ISong, index: Number) => (
                  <TouchableOpacity
                    style={[
                      styles.singleCard,
                      {width: data?.windowWidth / 2.34},
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
                            onPress={() =>
                              handleMoreButton(
                                index,
                                mostPopular?.song?.is_added_to_playlist,
                              )
                            }>
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
                          onPress={() =>
                            handleMoreButton(
                              index,
                              recommended?.is_added_to_playlist,
                            )
                          }>
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

      {data?.shouldUpdateApp && isConnected ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={data?.shouldUpdateApp}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.updateAvailableText}>Update Available</Text>
              <Text style={styles.newVersionText}>
                A new version of Vibe Garage is available.
              </Text>
              <Text style={styles.newVersionText}>
                Please update to version {data?.onlineAppVersion} now.
              </Text>

              <View style={styles.viewJustify}>
                {!data?.forceAppUpdate ? (
                  <TouchableOpacity style={styles.btnWrapper}>
                    <Text
                      style={[styles.commonBtn, styles.noBtn]}
                      onPress={() => handleCancelAppUpdate()}>
                      Not now
                    </Text>
                  </TouchableOpacity>
                ) : null}
                <TouchableOpacity
                  style={[
                    !data?.forceAppUpdate
                      ? styles.btnWrapper
                      : styles.btnWrapper2,
                  ]}
                  onPress={() => handleStartAppUpdate()}>
                  <Text style={[styles.commonBtn, styles.yesBtn]}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
}
