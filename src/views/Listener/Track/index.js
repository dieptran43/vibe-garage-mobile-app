import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Image, ImageBackground} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import SoundPlayer from 'react-native-sound-player';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import styles from './trackStyle';
import {CustomText} from '../../../components/Global';
import {combineData, getFromOldUrl} from '../../../utils/helpers';
import shortid from 'shortid';

export function Track({navigation, route}) {
  const track = route?.params;

  const [data, setData] = useState({isPlaying: false, isPaused: false});

  useEffect(() => {
    SoundPlayer.addEventListener('FinishedPlaying', ({success}) => {
      console.log('finished playing', success);
    });
    SoundPlayer.addEventListener('FinishedLoadingURL', ({success, url}) => {
      // setData({...data, isPlaying: true});
    });
  });

  const getNumberOfYears = (dt) => {
    let oldDate = new Date(`2019/10/01`);
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

  const getHashTags = (tags) => {
    let arr = tags?.split(',');
    return arr;
  };

  const handleTrack = (param) => {
    try {
      let {isPlaying, isPaused} = data;
      if (param === 'play') {
        isPlaying = true;
        if (isPaused) {
          SoundPlayer.play();
        } else {
          isPaused = false;
          SoundPlayer.playUrl(getFromOldUrl(track?.audio_location));
        }
      } else if (param === 'pause') {
        isPlaying = false;
        isPaused = true;
        SoundPlayer.pause();
      }
      setData({...data, isPlaying, isPaused});
    } catch (e) {
      console.log(`cannot play the sound file`, e);
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
            <TouchableOpacity style={styles.followBtn}>
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
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
              <CustomText type={1} text={0} style={styles.iconText} />
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
            {getHashTags(track?.tags)?.map((tag) => (
              <Text key={shortid.generate()} style={styles.tagText}>
                {`#${tag}`}
              </Text>
            ))}
          </View>
          <View style={styles.flexJustify}>
            <TouchableOpacity style={styles.downloadBtn}>
              <Feather name="plus" size={18} color="#fff" />
              <CustomText
                type={1}
                text={'Add to Playlist'}
                style={styles.downloadText}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.downloadBtn}>
              <MaterialIcons name="cloud-download" size={18} color="#fff" />
              <CustomText
                type={1}
                text={'Download'}
                style={styles.downloadText}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
