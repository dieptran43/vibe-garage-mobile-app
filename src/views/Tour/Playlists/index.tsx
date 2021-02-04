import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import shortid from 'shortid';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import styles from './playlistsStyle';
import {getRecentlyPublicPlaylist} from '../../../services/playlistService';
import {combineData, getImage} from '../../../utils/helpers';

export function Playlists({navigation}: DrawerScreenProps<{}>) {
  const [data, setData] = useState({
    publicPlaylist: [] as any,
  });
  useEffect(() => {
    handlePublicPlaylist();
  }, []);

  const handlePublicPlaylist = async () => {
    try {
      await getRecentlyPublicPlaylist()
        .then((response: any) => {
          let publicPlaylist = [];
          if (response && response?.success) {
            publicPlaylist = response?.playlists?.data;
          }
          setData(combineData(data, {publicPlaylist}));
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.playlistsContainer}>
      <NavDrawerHeader navigation={navigation} />
      <View style={styles.playlistsHeader}>
        <View style={styles.flexRow}>
          <View style={styles.graphBg}>
            <MaterialCommunityIcons
              name="playlist-play"
              size={25}
              color="#fff"
            />
          </View>
          <Text style={styles.playlistsText}>Playlists</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.playlistsItems}>
          {data.publicPlaylist?.length
            ? data.publicPlaylist.map((playlist: any) => (
                <TouchableWithoutFeedback key={shortid.generate()}>
                  <View style={styles.singlePlaylist}>
                    <View style={styles.singlePlaylistRowOne}>
                      <View style={styles.flexRow}>
                        <Image
                          source={{
                            uri: getImage(playlist?.artist_data?.avatar),
                          }}
                          style={styles.playlistImage}
                        />
                        <CustomText
                          style={styles.playlistTitle1}
                          type={1}
                          text={playlist?.artist_data?.name}
                        />
                      </View>
                      <CustomText
                        style={styles.playlistTitle2}
                        type={1}
                        text={playlist?.name}
                      />
                      <View style={styles.albumNumberRow}>
                        <Fontisto name="music-note" color="#c3c3c6" size={15} />
                        <CustomText
                          style={styles.albumNumberText}
                          type={1}
                          text={playlist?.songs_total_count}
                        />
                      </View>
                    </View>
                    <View style={styles.imageBackgroundWrapper}>
                      <Image
                        source={{
                          uri: getImage(playlist?.thumbnail),
                        }}
                        style={styles.imageBackground}
                      />
                      <AntDesign
                        name="play"
                        color="#fff"
                        size={30}
                        style={styles.playButton}
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              ))
            : null}
        </View>
      </ScrollView>
    </View>
  );
}
