import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import shortid from 'shortid';
import {CustomText} from '../CustomText';
import {CustomModal} from '../CustomModal';
import {getMyPlaylist} from '../../../services/playlistService';
import {AuthContext} from '../../../context';
import {combineData, getFromOldUrl} from '../../../utils/helpers';

export function AddToPlaylist({height, width, onClose}: any) {
  const {state, dispatch}: any = useContext(AuthContext);
  const [data, setData] = useState({
    myPlaylist: [] as any,
    isLoading: true,
  });
  const token = state?.token;

  useEffect(() => {
    handleMyPlaylist();
  }, []);

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

  const customContent = () => {
    return !data?.myPlaylist ? (
      <View style={styles.alignCenter}>
        {data?.isLoading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <CustomText type={1} color="#fff" />
        )}
      </View>
    ) : (
      <ScrollView style={styles.scrollViewContent}>
        <View>
          {data?.myPlaylist.map((playlist: any, index: Number) => (
            <TouchableOpacity
              style={styles.singlePlayList}
              key={shortid.generate()}>
              <Image
                source={{
                  uri: getFromOldUrl(playlist?.thumbnail),
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
                    size={16}
                    color="#8d8d8d"
                    style={styles.playlistIcon}
                  />
                  <CustomText type={2} text="5 songs" style={styles.playlistName}/>
                </View>
                <View style={styles.iconWrapper}>
                  <MaterialCommunityIcons
                    name="earth"
                    size={16}
                    color="#8d8d8d"
                    style={styles.playlistIcon}
                  />
                  <CustomText type={2} text="Public"style={styles.playlistName} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <CustomModal
      height={height}
      width={width}
      title="Add to Playlist"
      onModalClose={() => onClose()}
      customContent={() => customContent()}></CustomModal>
  );
}

const styles = StyleSheet.create({
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContent: {
    height: '100%',
    paddingTop: 30
  },
  singlePlayList: {
    borderColor: 'rgba(210,210,210, 0.22)',
    borderWidth: 1,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 30,
  },
  playlistImage: {
    height: 60,
    width: 60,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  playlistInfoWrapper: {
    width: '60%',
    paddingHorizontal: 10,

  },
  playlistName: {
    marginTop: 2,
    fontSize: 12,
  },
  iconWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  playlistIcon: {
    marginRight: 5,
  },
});
