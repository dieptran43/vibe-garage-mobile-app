import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import shortid from 'shortid';
import styles from './topMusicStyle';
import GraphImage from '../../../assets/icons/graph-icon.png';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {getTopSongs} from '../../../services/songService';
import {getTopAlbums} from '../../../services/albumService';
import {combineData, getFromOldUrl} from '../../../utils/helpers';
import {ISong, IAlbum} from '../../../types/interfaces';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';
import {getScreenParent} from '../../../utils/navigationHelper';
import {AuthContext} from '../../../context';
import {CustomText, AddToPlaylist} from '../../../components/Global';

export function TopMusic({navigation}: DrawerScreenProps<{}>) {
  const [data, setData] = useState({
    topMusic: [],
    topAlbums: [],
    moreView: null,
    canAddToPlaylist: false,
    track_id: null,
  });

  const {state, dispatch}: any = useContext(AuthContext);
  const token = state?.token;

  useEffect(() => {
    handleTopMusic();
  }, []);

  const handleTopMusic = async () => {
    let topMusic: any = [],
      topAlbums: any = [];
    Promise.all([getTopSongs(), getTopAlbums()])
      .then(([topMusicResponse, topAlbumsResponse]: any) => {
        if (topMusicResponse && topMusicResponse?.success) {
          topMusic = topMusicResponse?.songs?.data;
        }
        if (topAlbumsResponse && topAlbumsResponse?.success) {
          topAlbums = topAlbumsResponse?.albums?.data;
        }
        setData(combineData(data, {topMusic, topAlbums}));
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleNavigation = (route: string, params: ISong) => {
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

  const handleMoreButton = (index: any, is_added_to_playlist: any) => {
    if (token) {
      // if(is_added_to_playlist)
      handleSetMoreView(index);
    } else {
      navigateToNestedRoute('SingleStack', 'Login', {
        screenFrom: 'TopMusic',
      });
    }
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

  return (
    <View style={styles.topMusicContainer}>
      <NavDrawerHeader navigation={navigation} />
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.topMusicContent}>
          <View style={styles.topSongsHeader}>
            <View style={styles.flexRow}>
              <View style={styles.graphBg}>
                <Image source={GraphImage} style={styles.graphImage} />
              </View>
              <Text style={styles.topMusicText}>Top Music</Text>
            </View>
            {/* <Text style={styles.showAllText}>SHOW ALL</Text> */}
          </View>
          <View style={styles.topSongsContent}>
            {data?.topMusic?.length ? (
              <>
                <View style={styles.topSongsWrapper}>
                  {data.topMusic.slice(0, 10).map((music: ISong, index) => (
                    <TouchableOpacity
                      key={shortid.generate()}
                      style={styles.singleTopSong}
                      onPress={() => handleNavigation('Track', music)}>
                      <Image
                        source={{
                          uri: getFromOldUrl(music?.thumbnail),
                        }}
                        style={styles.topMusicImage}
                      />
                      <View style={styles.musicTextWrapper}>
                        <Text
                          style={styles.musicTitleText}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {music.title}
                        </Text>
                        <Text
                          style={styles.musicArtisteText}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {music?.artist_data?.name}
                        </Text>
                      </View>
                      <View style={styles.moreWrapper}>
                        <TouchableOpacity
                          onPress={() =>
                            handleMoreButton(index, music?.is_added_to_playlist)
                          }>
                          <MaterialIcons
                            name="more-horiz"
                            style={styles.musicMoreIcon}
                            color="#919191"
                            size={25}
                          />
                        </TouchableOpacity>
                        {data?.moreView === index ? (
                          <View style={styles.moreBtnsWrapper}>
                            <TouchableOpacity
                              style={styles.moreBtn}
                              onPress={() => handlePlaylist(music)}>
                              <CustomText type={1} text="Add to Playlist" />
                            </TouchableOpacity>
                          </View>
                        ) : null}
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
                {data?.topMusic?.length > 10 ? (
                  <Text style={styles.seeAllTopSongsText}>See More</Text>
                ) : null}
              </>
            ) : (
              <View style={styles.noneFoundWrapper}>
                {/* <Text style={styles.noneFoundText}>None found</Text> */}
              </View>
            )}
          </View>
          <View style={styles.topSongsHeader}>
            <View style={styles.flexRow}>
              <View style={styles.graphBg}>
                <Image source={GraphImage} style={styles.graphImage} />
              </View>
              <Text style={styles.topMusicText}>Top Albums</Text>
            </View>
          </View>
          <View style={styles.topSongsContent}>
            {data?.topAlbums?.length ? (
              <>
                <View style={styles.topAlbumsWrapper}>
                  {data.topAlbums.map((album: IAlbum, index) => (
                    <View key={index} style={styles.singleTopAlbum}>
                      <Image
                        source={{
                          uri: getFromOldUrl(album?.thumbnail),
                        }}
                        style={styles.topAlbumImage}
                      />
                      <Text
                        style={styles.musicTitleText}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {album.title}
                      </Text>
                      <Text
                        style={styles.musicArtisteText}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {album.album_name}
                      </Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.seeAllTopSongsText}>See More</Text>
              </>
            ) : (
              <View style={styles.noneFoundWrapper}>
                {/* <Text style={styles.noneFoundText}>None found</Text> */}
              </View>
            )}
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
