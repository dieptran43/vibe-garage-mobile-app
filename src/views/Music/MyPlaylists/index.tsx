import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {useIsFocused} from '@react-navigation/native';
import shortid from 'shortid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import styles from './myPlaylistsStyle';
import {AuthContext} from '../../../context';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';
import {getMyPlaylist} from '../../../services/playlistService';
import {combineData, getImage} from '../../../utils/helpers';

export function MyPlaylists({navigation}: DrawerScreenProps<{}>) {
  const {state, dispatch}: any = useContext(AuthContext);
  const [data, setData] = useState({
    myPlaylist: [] as any,
    moreView: null,
  });
  const isFocused = useIsFocused();
  const token = state?.token;

  useEffect(() => {
    handleCheckLogin();
  }, [isFocused]);

  const handleCheckLogin = () => {
    if (!state?.isLoggedIn) {
      navigateToNestedRoute('SingleStack', 'Login', {
        screenFrom: 'MyPlaylists',
      });
    } else {
      handleMyPlaylist();
    }
  };

  const handleMyPlaylist = async () => {
    try {
      await getMyPlaylist(token)
        .then((response: any) => {
          let myPlaylist = [];
          if (response && response?.success) {
            myPlaylist = response?.playlists?.data;
          }
          setData(combineData(data, {myPlaylist}));
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
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

  return (
    <View style={styles.myPlaylistsContainer}>
      <NavDrawerHeader navigation={navigation} />
      <View style={styles.playlistsHeader}>
        <View style={styles.flexRow}>
          <View style={styles.graphBg}>
            <MaterialCommunityIcons
              name="playlist-music"
              size={25}
              color="#fff"
            />
          </View>
          <Text style={styles.playlistsText}>Playlists</Text>
        </View>
      </View>
      <View style={styles.flexRowJustify}>
        {data?.myPlaylist?.length ? (
          <CustomText
            type={1}
            text={`You currently have ${data?.myPlaylist?.length} playlists.`}
            style={styles.noOfmyPlaylist}
          />
        ) : null}
        <TouchableOpacity style={styles.btnCreatePlaylist}>
          <MaterialCommunityIcons name="playlist-plus" size={25} color="#fff" />
          <CustomText type={1} text="Create" style={styles.createText} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.myPlaylistsContent}>
          {data?.myPlaylist.map((playlist: any, index: Number) => (
            <TouchableOpacity
              style={styles.singlePlayList}
              key={shortid.generate()}>
              <Image
                source={{
                  uri: getImage(playlist?.thumbnail),
                }}
                style={styles.playlistImage}
              />
              <View style={styles.playlistInfoWrapper}>
                <CustomText
                  type={1}
                  text={playlist?.name}
                  style={styles.playlistName}
                />
                <View style={styles.iconWrapper}>
                  <MaterialCommunityIcons
                    name="music"
                    size={20}
                    color="#8d8d8d"
                    style={styles.playlistIcon}
                  />
                  <CustomText type={2} text="5 songs" />
                </View>
                <View style={styles.iconWrapper}>
                  <MaterialCommunityIcons
                    name="earth"
                    size={20}
                    color="#8d8d8d"
                    style={styles.playlistIcon}
                  />
                  <CustomText type={2} text="Public" />
                </View>
              </View>
              <View style={styles.moreWrapper}>
                <TouchableOpacity onPress={() => handleSetMoreView(index)}>
                  <MaterialIcons name="more-horiz" size={25} color="#8d8d8d" />
                </TouchableOpacity>
                {data?.moreView === index ? (
                  <View style={styles.moreBtns}>
                    <TouchableOpacity style={{marginBottom: 10}}>
                      <CustomText
                        type={1}
                        text="Edit Playlist"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <CustomText
                        type={1}
                        text="Delete Playlist"
                      />
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
