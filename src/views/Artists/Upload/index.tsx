import React, {useState, useContext, useEffect} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DocumentPicker from 'react-native-document-picker';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText, CustomModal} from '../../../components/Global';
import SingleSongModal from './SingleSongModal';
import styles from './uploadStyle';
import {AuthContext} from '../../../context';
import {combineData} from '../../../utils/helpers';
import {submitSong} from '../../../services/songService';

export function Upload({navigation}: DrawerScreenProps<{}>) {
  const {state, dispatch}: any = useContext(AuthContext);
  const token = state?.token;

  const [data, setData] = useState({
    uploadType: '',
    singleSong: {category_id: 0} as any,
    genres: [
      {label: 'Other', value: 'Other'},
      {label: 'Afro', value: 'Afro'},
      {label: 'Gospel', value: 'Gospel'},
      {label: 'Reggae', value: 'Reggae'},
    ],
    availability: [
      {label: 'Public', value: 'Public'},
      {label: 'Private', value: 'Private'},
    ],
    age_restriction: [
      {label: 'All ages can listen this song', value: 0},
      {label: 'Only +18', value: 1},
    ],
    prices: [100, 200, 300, 500],
    isUploadingSong: false,
  });

  const handleUpload = async (type: String) => {
    try {
      let res;
      if (type === 'song') {
        let {singleSong} = data;
        res = await DocumentPicker.pick({
          type: [DocumentPicker.types.audio],
        });
        singleSong.song = res;
        setData(combineData(data, {uploadType: 'song', singleSong}));
      } else {
        const results = await DocumentPicker.pickMultiple({
          type: [DocumentPicker.types.audio],
        });
        for (const res of results) {
          console.log(
            res.uri,
            res.type, // mime type
            res.name,
            res.size,
          );
        }
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const handlePickImage = async () => {
    try {
      let {singleSong} = data;
      let res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      singleSong.thumbnail = res;
      setData(combineData(data, {singleSong}));
    } catch (err) {
      console.error(err);
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const handleChangeValue = (field: any, value: any) => {
    let {singleSong} = data;
    if (field === 'songTitle') {
      singleSong.title = value;
    } else if (field === 'songDescription') {
      singleSong.description = value;
    } else if (field === 'songTags') {
      singleSong.tags = value;
    } else if (field === 'songGenres') {
      singleSong.genre = value;
    } else if (field === 'songAvailability') {
      singleSong.availability = value;
    } else if (field === 'songAgeRegistration') {
      singleSong.age_restriction = value;
    } else if (field === 'songPrice') {
      singleSong.price = value;
    }
    setData(combineData(data, {singleSong}));
  };

  const hasFilledAllFields = () => {
    let {singleSong} = data;
    return (
      singleSong.title &&
      singleSong.genre &&
      singleSong.availability &&
      singleSong.age_restriction !== null
    );
  };

  const handleSubmitSong = async () => {
    let {singleSong} = data;
    const payload = new FormData();
    for (let [key, value] of Object.entries(singleSong)) {
      payload.append(key, JSON.stringify(value));
    }
    await submitSong({token, payload})
      .then((response) => {
        console.log('here');
        console.log(response);
      })
      .catch((error) => console.error(error));
  };

  return (
    <View style={styles.uploadContainer}>
      <NavDrawerHeader navigation={navigation} />
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.layoutContent}>
          <TouchableOpacity
            style={styles.singleCard}
            onPress={() => handleUpload('song')}>
            <View style={styles.iconWrapper}>
              <MaterialIcons name="music-note" color="#fff" size={30} />
            </View>
            <CustomText
              type={1}
              text="Upload single song"
              style={styles.uploadSingleSongText}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.singleCard}
            onPress={() => handleUpload('album')}>
            <View style={styles.iconWrapper}>
              <MaterialIcons name="library-music" color="#fff" size={30} />
            </View>
            <CustomText
              type={1}
              text="Upload an album"
              style={styles.uploadSingleSongText}
            />
          </TouchableOpacity>
          {data?.uploadType === 'song' ? (
            <CustomModal
              height="80%"
              width="100%"
              title="Add to Playlist"
              onModalClose={() => {
                setData(combineData(data, {uploadType: null}));
              }}
              customContent={() => (
                <SingleSongModal
                  handlePickImage={handlePickImage}
                  handleChangeValue={handleChangeValue}
                  data={data}
                  hasFilledAllFields={hasFilledAllFields}
                  handleSubmitSong={handleSubmitSong}
                />
              )}></CustomModal>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}
