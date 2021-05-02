import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useFocusEffect, CommonActions} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import shortid from 'shortid';
import SoundPlayer from 'react-native-sound-player';
import TrackPlayer from 'react-native-track-player';
import Toast from 'react-native-toast-message';
import RNFS, {DownloadFileOptions, downloadFile} from 'react-native-fs';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import styles from './trackStyle';
import {AuthContext} from '../../../context';
import {CustomText, AddToPlaylist} from '../../../components/Global';
import {combineData, getFromOldUrl} from '../../../utils/helpers';
import {songView, setDownload} from '../../../services/requestService';

export function Track({navigation, route}: DrawerScreenProps<{}>) {
  const track: any = route?.params;
  const {state, dispatch}: any = useContext(AuthContext);
  const {user, token} = state || {};
  const [data, setData] = useState({
    isPlaying: false,
    isPaused: false,
    hasDownloadedTrack: false,
    isDownloadingTrack: false,
    canAddToPlaylist: false,
  });

  const path = `${RNFS.DocumentDirectoryPath}/${track?.title}`;
  const track_id = track?.id;
  const album_id = track?.album;

  useEffect(() => {
    SoundPlayer.addEventListener('FinishedPlaying', ({success}: any) => {
      console.log('finished playing', success);
    });
    SoundPlayer.addEventListener(
      'FinishedLoadingURL',
      ({success, url}: any) => {
        console.log('finished loading uRL', success);
      },
    );
  }, []);

  useEffect(() => {
    checkTrackHasBeenDownloaded();
  }, []);

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

      return () =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          handleBackButtonClick,
        );
    }, []),
  );

  const handleBackButtonClick = () => {
    try {
      SoundPlayer?.stop();
      setData(combineData(data, {isPlaying: false, isPaused: false}));
      navigation?.goBack();
      return true;
    } catch (error) {
      console.error();
    }
  };

  const getNumberOfYears = (dt: any) => {
    let oldDate;
    let currentDate;
    currentDate = new Date().getFullYear() * 12 + new Date().getMonth();
    oldDate =
      new Date(`${dt}/01`).getFullYear() * 12 + new Date(`${dt}/01`).getMonth();
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

  const getHashTags = (tags: any) => {
    let arr = tags?.split(',');
    return arr;
  };

  const handleTrack = (param: any) => {
    try {
      let {isPlaying, isPaused} = data;
      if (param === 'play') {
        isPlaying = true;
        if (isPaused) {
          SoundPlayer?.play();
        } else {
          isPaused = false;
          if (!data?.hasDownloadedTrack) {
            SoundPlayer.loadUrl(getFromOldUrl(track?.audio_location));
            SoundPlayer.play();
            handleSongView();
          } else {
            SoundPlayer.loadUrl(path);
            SoundPlayer.play();
          }
        }
      } else if (param === 'pause') {
        isPlaying = false;
        isPaused = true;
        SoundPlayer?.pause();
      }
      setData(combineData(data, {isPlaying, isPaused}));
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
  };

  const handleDownload = async () => {
    try {
      setData(combineData(data, {isDownloadingTrack: true}));

      const fileUrl = getFromOldUrl(track?.audio_location);

      const headers = {
        Accept: '*/*',
      };

      const options: DownloadFileOptions = {
        fromUrl: fileUrl,
        toFile: path,
        headers: headers,
      };

      const response = await downloadFile(options);
      response.promise
        .then(async (res: any) => {
          //Transform response
          if (res && res.statusCode === 200 && res.bytesWritten > 0) {
            checkTrackHasBeenDownloaded();
            handleSetDownload();
          } else {
            Toast.show({
              type: 'error',
              position: 'bottom',
              text1: 'Download failed!',
              visibilityTime: 500,
            });
            setData((data) =>
              combineData(data, {
                hasDownloadedTrack: false,
                isDownloadingTrack: false,
              }),
            );
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
      setData(
        combineData(data, {
          hasDownloadedTrack: false,
          isDownloadingTrack: false,
        }),
      );
    }
  };

  const checkTrackHasBeenDownloaded = async () => {
    const fileExists = await RNFS.exists(path);
    let value: any;
    if (fileExists === true) {
      value = true;
    } else {
      value = false;
    }
    setData(
      combineData(data, {hasDownloadedTrack: value, isDownloadingTrack: false}),
    );
  };

  const handlePlaylist = () => {
    const track_id = track?.id;
    setData(combineData(data, {canAddToPlaylist: true}));
  };

  const handleCanAddToPlaylist = () => {
    let {canAddToPlaylist} = data;
    canAddToPlaylist = !canAddToPlaylist;
    setData(combineData(data, {canAddToPlaylist}));
  };

  const handleModified = (param: any) => {
    // console.log(param);
    if (param === 'song_added_to_playlist') {
    }
  };

  const handleSongView = async () => {
    try {
      const payload = {track_id, album_id};
      await songView({token, payload});
    } catch (e) {
      console.log(e);
    }
  };

  const handleSetDownload = async () => {
    try {
      const payload = {track_id};
      await setDownload({token, payload});
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <NavDrawerHeader navigation={navigation} />
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.layoutContent}>
          <View style={styles.row1}>
            <Image
              source={{
                uri: getFromOldUrl(track?.artist_data?.avatar),
              }}
              style={styles.artisteImage}
            />
            <View style={styles.trackCol1}>
              <CustomText
                type={1}
                text={track?.artist_data?.name}
                style={styles.artisteName}
              />
              <CustomText
                type={1}
                text={getNumberOfYears(track?.artist_data?.registered)}
                style={styles.trackUploadDate}
              />
            </View>
            {/* <TouchableOpacity style={styles.followBtn}>
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={{uri: getFromOldUrl(track?.thumbnail)}}
              style={styles.imageBg}>
              {data?.isPlaying ? (
                <TouchableOpacity onPress={() => handleTrack('pause')}>
                  <MaterialIcons
                    name="pause-circle-outline"
                    size={50}
                    color="#00bcd4"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => handleTrack('play')}>
                  <AntDesign name="playcircleo" size={50} color="#00bcd4" />
                </TouchableOpacity>
              )}
            </ImageBackground>
          </View>
          <CustomText type={1} text={track?.title} style={styles.trackTitle} />
          <View style={styles.trackActions}>
            <View style={styles.actionRow}>
              <MaterialIcons name="play-arrow" size={22} color="#1EED6C" />
              <CustomText
                type={1}
                text={track?.views_count || 0}
                style={styles.iconText}
              />
            </View>
            <View style={styles.actionRow}>
              <MaterialIcons name="favorite" size={18} color="#FF0000" />
              <CustomText type={1} text={0} style={styles.iconText} />
            </View>
            <View style={styles.actionRow}>
              <MaterialIcons name="share" size={16} color="#D4D4D4" />
              <CustomText
                type={1}
                text={track?.shares}
                style={styles.iconText}
              />
            </View>
            <View style={styles.actionRow}>
              <Ionicons name="md-chatbox-sharp" size={16} color="#D4D4D4" />
              <CustomText type={1} text={0} style={styles.iconText} />
            </View>
            <View style={styles.actionRow}>
              <MaterialIcons name="star" size={18} color="#D4D4D4" />
              <CustomText type={1} text={0} style={styles.iconText} />
            </View>
          </View>
          <View style={styles.trackDivider}></View>
          <Text style={styles.trackDescription} numberOfLines={7}>
            {track?.description}
          </Text>
          <View style={styles.tagRow}>
            {getHashTags(track?.tags)?.map((tag: any) => (
              <Text key={shortid.generate()} style={styles.tagText}>
                {`#${tag}`}
              </Text>
            ))}
          </View>
          <View style={styles.flexJustify}>
            {/* {!track?.is_added_to_playlist ? ( */}
            <TouchableOpacity
              style={styles.downloadBtn}
              onPress={() => handleCanAddToPlaylist()}>
              <Feather name="plus" size={18} color="#fff" />
              <CustomText
                type={1}
                text={'Add to Playlist'}
                style={styles.downloadText}
              />
            </TouchableOpacity>
            {/* ) : null} */}
            {data?.isDownloadingTrack ? (
              <View style={styles.downloadBtn}>
                <CustomText
                  type={1}
                  text={'Downloading...'}
                  style={styles.downloadText}
                />
                <ActivityIndicator size="small" color="#fff" />
              </View>
            ) : !data?.hasDownloadedTrack ? (
              <TouchableOpacity
                style={styles.downloadBtn}
                onPress={() => handleDownload()}>
                <MaterialIcons name="cloud-download" size={18} color="#fff" />
                <CustomText
                  type={1}
                  text={'Download'}
                  style={styles.downloadText}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </ScrollView>

      {data?.canAddToPlaylist ? (
        <AddToPlaylist
          height="65%"
          width="100%"
          track_id={track?.id}
          onClose={() => handleCanAddToPlaylist()}
          handleModified={(param: any) => handleModified(param)}
        />
      ) : null}
    </View>
  );
}
