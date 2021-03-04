import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import shortid from 'shortid';
import Feather from 'react-native-vector-icons/Feather';
import GraphImage from '../../../assets/icons/graph-icon.png';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import styles from './browseStyle';
import {combineData, getFromOldUrl} from '../../../utils/helpers';
import {getTopSongs} from '../../../services/songService';
import {getTopAlbums} from '../../../services/albumService';

export function Browse({navigation}) {
  const [data, setData] = useState({
    tab: 'Songs',
    songs: [],
    albums: [],
    topSeller: [],
  });

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleTab = (tab) => {
    setData(combineData(data, {tab}));
  };

  const handleFetchData = async () => {
    try {
      Promise.all([getTopSongs(), getTopAlbums()])
        .then(([topMusicResponse, topAlbumsResponse]) => {
          let songs = [],
            albums = [];
          if (topMusicResponse && topMusicResponse?.success) {
            songs = topMusicResponse?.songs?.data;
          }
          if (topAlbumsResponse && topAlbumsResponse?.success) {
            albums = topAlbumsResponse?.albums?.data;
            console.log(albums);
          }
          setData(combineData(data, {songs, albums}));
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getNumberOfYears = (dt) => {
    let oldDate = new Date(`${dt}/01`);
    let currentDate = new Date();
    currentDate = currentDate.getFullYear() * 12 + currentDate.getMonth();
    oldDate = oldDate.getFullYear() * 12 + oldDate.getMonth();
    let difference = currentDate - oldDate;
    let range;
    if (difference < 12) {
      range = difference > 1 ? 'months' : 'month';
    } else {
      difference = Math.ceil(difference / 12);
      range = difference > 1 ? 'years' : 'year';
    }
    return `${difference} ${range} ago`;
  };

  return (
    <View style={styles.browseContainer}>
      <NavDrawerHeader navigation={navigation} />
      <View style={styles.browseContent}>
        <View style={styles.tabHeader}>
          <TouchableWithoutFeedback onPress={() => handleTab('Songs')}>
            <View
              style={[
                styles.tabTextWrapper,
                data.tab === 'Songs' && styles.activeTabTextWrapper,
              ]}>
              <CustomText
                type={1}
                text="Songs"
                style={[
                  styles.tabText,
                  data.tab === 'Songs' && styles.activeTabText,
                ]}
              />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => handleTab('Albums')}>
            <View
              style={[
                styles.tabTextWrapper,
                data.tab === 'Albums' && styles.activeTabTextWrapper,
              ]}>
              <CustomText
                type={1}
                text="Albums"
                style={[
                  styles.tabText,
                  data.tab === 'Albums' && styles.activeTabText,
                ]}
              />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => handleTab('Top Seller')}>
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
          </TouchableWithoutFeedback>
        </View>
        <ScrollView style={styles.scrollViewContent}>
          {data.tab === 'Songs' ? (
            <View>
              {data?.songs?.map((song) => (
                <View style={styles.singleSongWrapper} key={shortid.generate()}>
                  <Image
                    source={{uri: getFromOldUrl(song?.thumbnail)}}
                    style={styles.singleSongAvatar}
                  />
                  <View style={styles.sectionOne}>
                    <View style={styles.songOwner}>
                      <CustomText text={song?.title} type={1} />
                      <CustomText text={song?.artist_data?.name} />
                    </View>
                    {song?.isPurchased ? (
                      <CustomText
                        size={12}
                        text="You have bought this track."
                        style={styles.boughtTrackText}
                      />
                    ) : (
                      <View style={styles.purchaseWrapper}>
                        <CustomText
                          type={1}
                          size={14}
                          text={`₦${song?.price}`}
                          style={styles.priceText}
                        />
                        <TouchableWithoutFeedback>
                          <Text style={styles.purchaseText}>Purchase</Text>
                        </TouchableWithoutFeedback>
                      </View>
                    )}
                    <View style={styles.songBottomRow}>
                      <CustomText type={1} text={song?.duration} />
                      <CustomText
                        type={1}
                        text={getNumberOfYears(song?.registered)}
                      />
                      <Feather name="more-horizontal" size={20} color="#fff" />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : data.tab === 'Albums' ? (
            <View>
              {data?.albums?.map((album) => (
                <View style={styles.singleSongWrapper} key={shortid.generate()}>
                  <Image
                    source={{uri: getFromOldUrl(album?.thumbnail)}}
                    style={styles.singleSongAvatar}
                  />
                  <View style={styles.sectionOne}>
                    <View style={styles.songOwner}>
                      <CustomText text={album?.title} type={1} />
                      <CustomText text={album?.artistName} />
                    </View>
                    {album?.isPurchased ? (
                      <CustomText
                        size={12}
                        text="You have bought this track."
                        style={styles.boughtTrackText}
                      />
                    ) : (
                      <View style={styles.purchaseWrapper}>
                        <CustomText
                          type={1}
                          size={14}
                          text={`₦${album?.price}`}
                          style={styles.priceText}
                        />
                        <TouchableWithoutFeedback>
                          <Text style={styles.purchaseText}>Purchase</Text>
                        </TouchableWithoutFeedback>
                      </View>
                    )}
                    <View style={styles.songBottomRow}>
                      <CustomText
                        type={1}
                        text={getNumberOfYears(album?.registered)}
                      />
                      <Feather name="more-horizontal" size={20} color="#fff" />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : data.tab === 'Top Seller' ? (
            <View>
              <View style={styles.flexHeader}>
                <View style={styles.graphBg}>
                  <Image source={GraphImage} style={styles.graphImage} />
                </View>
                <Text style={styles.topMusicText}>Top Songs</Text>
              </View>
            </View>
          ) : null}
        </ScrollView>
      </View>
    </View>
  );
}
