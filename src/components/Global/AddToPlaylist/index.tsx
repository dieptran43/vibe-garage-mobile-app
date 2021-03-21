import React, {useEffect, useState, useContext} from 'react';
import {
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  ImageBackground,
  TextInput,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import shortid from 'shortid';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import DocumentPicker from 'react-native-document-picker';
import styles from './addToPlayListStyle';
import {CustomText} from '../CustomText';
import {CustomModal} from '../CustomModal';
import {
  getMyPlaylist,
  addToPlaylist,
  createPlaylist,
} from '../../../services/playlistService';
import {AuthContext} from '../../../context';
import {combineData, getFromOldUrl} from '../../../utils/helpers';

export function AddToPlaylist({
  height,
  width,
  onClose,
  track_id,
  handleModified,
}: any) {
  const {state, dispatch}: any = useContext(AuthContext);
  const [data, setData] = useState({
    myPlaylist: [] as any,
    isLoading: true,
    playlist_id: null,
    canCreateNew: false,
    thumbnail: null as any,
    privacy: 0 as any,
    name: '',
  });
  const token = state?.token;

  useEffect(() => {
    handleMyPlaylist();
  }, []);

  const handleMyPlaylist = async () => {
    try {
      await getMyPlaylist(token)
        .then((response: any) => {
          let myPlaylist = [] as any;
          if (response && response?.success) {
            myPlaylist = response?.playlists?.data;
          }
          setData(combineData(data, {myPlaylist, isLoading: false}));
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChoosePlayList = (playlist_id: any) => {
    setData(combineData(data, {playlist_id}));
  };

  const handleCanCreate = (canCreateNew: any) => {
    let {thumbnail} = data;
    if (!canCreateNew) {
      thumbnail = null;
    }
    setData(combineData(data, {canCreateNew, thumbnail, privacy: 0, name: ''}));
  };

  const handleChangePrivacy = (privacy: any) => {
    setData(combineData(data, {privacy}));
  };

  const handleChangeName = (name: any) => {
    setData(combineData(data, {name}));
  };

  const handlePickImage = async () => {
    try {
      let {thumbnail} = data;
      let res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      thumbnail = res;
      setData(combineData(data, {thumbnail}));
    } catch (err) {
      console.error(err);
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const handleSave = async () => {
    try {
      let {
        playlist_id,
        canCreateNew,
        name,
        thumbnail,
        privacy,
        myPlaylist,
      } = data;
      setData(combineData(data, {isLoading: true}));

      if (canCreateNew) {
        const createPlayListData = {name, thumbnail, privacy} as any;
        const payload = new FormData();
        for (let [key, value] of Object.entries(createPlayListData)) {
          payload.append(key, JSON.stringify(value));
        }

        await createPlaylist({token, payload})
          .then((response: any) => {
            console.log(response);
            if (response && response?.success) {
              myPlaylist = [...myPlaylist, ...response?.playlist];
            }
            setData(combineData(data, {isLoading: false}));
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const payload = `track_id=${track_id}&playlist_id=${playlist_id}`;
        await addToPlaylist({token, payload})
          .then((response: any) => {
            if (response && response?.success) {
              const updatedPlaylist = response?.playlist;
              myPlaylist = myPlaylist.map((playlist: any) => {
                if (playlist.id === playlist_id) {
                  // playlist.songs_total_count =
                  //   Number(playlist.songs_total_count) + 1;
                  playlist.songs_total_count =
                    updatedPlaylist?.songs_total_count;
                }
                return playlist;
              });
              handleModified('added_to_playlist');
            }
            setData(combineData(data, {myPlaylist, isLoading: false}));
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const customContent = () => {
    return data?.isLoading ? (
      <View style={styles.alignCenter}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    ) : (
      <KeyboardAvoidingView style={styles.container}>
        {!data?.canCreateNew ? (
          <View style={styles.rightContent}>
            <TouchableOpacity
              onPress={() => handleCanCreate(true)}
              style={styles.btnWrapperOutline}>
              <Text style={styles.btnNew}>Create New</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.rightContent}>
            <TouchableOpacity
              onPress={() => handleCanCreate(false)}
              style={styles.btnCancelWrapperBg}>
              <Text style={styles.btnCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
        {!data?.canCreateNew ? (
          <View style={styles.scrollViewContainer}>
            <ScrollView
              style={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}>
              <View>
                {data?.myPlaylist?.map((playlist: any, index: Number) => (
                  <TouchableOpacity
                    style={[
                      styles.singlePlayList,
                      data?.playlist_id === playlist?.id
                        ? styles.activePlaylist
                        : null,
                    ]}
                    key={shortid.generate()}
                    onPress={() => handleChoosePlayList(playlist?.id)}>
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
                        <CustomText
                          type={2}
                          text={`${playlist?.songs_total_count} ${
                            playlist?.songs_total_count > 1 ? 'songs' : 'song'
                          }`}
                          style={styles.playlistName}
                        />
                      </View>
                      <View style={styles.iconWrapper}>
                        <MaterialCommunityIcons
                          name="earth"
                          size={16}
                          color="#8d8d8d"
                          style={styles.playlistIcon}
                        />
                        <CustomText
                          type={2}
                          text={`${
                            playlist?.privacy === '1' ? 'Public' : 'Private'
                          }`}
                          style={styles.playlistName}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        ) : (
          <View style={styles.createPlaylistWrapper}>
            <View style={styles.oneWidth}>
              {data?.thumbnail ? (
                <ImageBackground
                  source={{uri: data?.thumbnail?.uri}}
                  style={styles.thumbnail}>
                  <TouchableOpacity
                    style={styles.pickPhotoWrapper}
                    onPress={() => handlePickImage()}>
                    <MaterialCommunityIcons
                      name="camera"
                      color="#fff"
                      size={20}
                    />
                  </TouchableOpacity>
                </ImageBackground>
              ) : (
                <TouchableOpacity
                  style={styles.thumbnailPicker}
                  onPress={() => handlePickImage()}>
                  <MaterialCommunityIcons
                    name="camera"
                    color="#fff"
                    size={30}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.twoWidth}>
              <TextInput
                style={styles.titleInput}
                placeholder="Playlist name"
                placeholderTextColor="#c3c3c6"
                onChangeText={(name) => handleChangeName(name)}
              />
              <TouchableOpacity
                style={styles.flexRowPrice}
                onPress={() => handleChangePrivacy(0)}>
                <View
                  style={[
                    styles.markerView,
                    data?.privacy === 0 ? styles.markerSelected : null,
                  ]}>
                  {data?.privacy === 0 ? (
                    <Octicons name="primitive-dot" color="#fff" size={14} />
                  ) : null}
                </View>
                <CustomText type={1} text="Public" style={styles.titleText} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.flexRowPrice}
                onPress={() => handleChangePrivacy(1)}>
                <View
                  style={[
                    styles.markerView,
                    data?.privacy === 1 ? styles.markerSelected : null,
                  ]}>
                  {data?.privacy === 1 ? (
                    <Octicons name="primitive-dot" color="#fff" size={14} />
                  ) : null}
                </View>
                <CustomText type={1} text="Privacy" style={styles.titleText} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={styles.bottomWrapper}>
          <TouchableOpacity
            style={styles.btnSaveWrapperBg}
            onPress={() => handleSave()}>
            <Text style={styles.btnAdd}>
              {!data?.canCreateNew ? 'Save' : 'Create'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  };

  return (
    <CustomModal
      height={height}
      width={width}
      title="Playlists"
      onModalClose={() => onClose()}
      customContent={() => customContent()}
    />
  );
}
