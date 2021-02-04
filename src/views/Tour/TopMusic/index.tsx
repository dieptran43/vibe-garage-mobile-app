import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import shortid from 'shortid';
import styles from './topMusicStyle';
import GraphImage from '../../../assets/icons/graph-icon.png';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {getTopSongs} from '../../../services/songService';
import {getTopAlbums} from '../../../services/albumService';
import {combineData, getImage} from '../../../utils/helpers';
import {ISong, IAlbum} from '../../../types/interfaces';

export function TopMusic({navigation}: DrawerScreenProps<{}>) {
  const [data, setData] = useState({
    topMusic: [],
    topAlbums: [],
  });

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
          console.log(topAlbums);
        }
        setData(combineData(data, {topMusic, topAlbums}));
      })
      .catch((error: any) => {
        console.log(error);
      });
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
            <Text style={styles.showAllText}>SHOW ALL</Text>
          </View>
          <View style={styles.topSongsContent}>
            {data?.topMusic?.length ? (
              <>
                <View style={styles.topSongsWrapper}>
                  {data.topMusic.slice(0, 10).map((music: ISong, index) => (
                    <View key={shortid.generate()} style={styles.singleTopSong}>
                      <Image
                        source={{
                          uri: getImage(music?.thumbnail),
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
                      <MaterialIcons
                        name="more-horiz"
                        style={styles.musicMoreIcon}
                        color="#919191"
                        size={25}
                      />
                    </View>
                  ))}
                </View>
                {data?.topMusic?.length > 10 ? (
                  <Text style={styles.seeAllTopSongsText}>See All</Text>
                ) : null}
              </>
            ) : (
              <View style={styles.noneFoundWrapper}>
                <Text style={styles.noneFoundText}>None found</Text>
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
                          uri: getImage(album?.thumbnail),
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
                <Text style={styles.seeAllTopSongsText}>See All</Text>
              </>
            ) : (
              <View style={styles.noneFoundWrapper}>
                <Text style={styles.noneFoundText}>None found</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
