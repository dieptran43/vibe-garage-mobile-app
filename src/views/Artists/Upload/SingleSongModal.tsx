import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import shortid from 'shortid';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import DocumentPicker from 'react-native-document-picker';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {CustomText} from '../../../components/Global';
import styles from './uploadStyle';
import {AuthContext} from '../../../context';
import {combineData} from '../../../utils/helpers';
import {submitSong} from '../../../services/songService';

export default function SingleSongModal({onClose, album_id, genres}: any) {
  const {state, dispatch}: any = useContext(AuthContext);
  const token = state?.token;
  const isFocused = useIsFocused();

  const [data, setData] = useState({
    singleSong: {category_id: 0, album_id} as any,
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

  useEffect(() => {
    handlePickSong();
  }, [isFocused]);

  const handlePickSong = async () => {
    try {
      let res,
        {singleSong} = data;
      res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });
      singleSong.song = res;
      setData(combineData(data, {uploadType: 'song', singleSong}));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
      // onClose();
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
    setData(combineData(data, {isUploadingSong: true}));

    let {singleSong} = data;
    const payload = new FormData();
    for (let [key, value] of Object.entries(singleSong)) {
      payload.append(key, JSON.stringify(value));
    }
    await submitSong({token, payload})
      .then((response: any) => {
        if (response?.success) {
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Upload successful!',
            visibilityTime: 1000,
          });
          onClose();
        } else {
          setData(combineData(data, {isUploadingSong: false}));
        }
      })
      .catch((error) => {
        console.error(error);
        setData(combineData(data, {isUploadingSong: false}));
      });
  };

  return (
    <>
      {data?.isUploadingSong ? (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <CustomText type={1} text="Please wait..." style={styles.waitText} />
        </View>
      ) : (
        <ScrollView style={styles.scrollViewContent}>
          <View style={styles.modalContent}>
            <View style={styles.row}>
              <FontAwesome name="file-audio-o" color="#c3c3c6" size={17} />
              <CustomText type={1} text="Song" style={styles.titleText} />
            </View>
            <TouchableOpacity onPress={() => handlePickSong()}>
              <Text style={styles.songText}>
                {data?.singleSong?.song?.name}
              </Text>
            </TouchableOpacity>
            <View style={styles.row}>
              <MaterialIcons name="music-note" color="#c3c3c6" size={20} />
              <CustomText type={1} text="Title" style={styles.titleText} />
            </View>
            <TextInput
              style={styles.titleInput}
              onChangeText={(title) => handleChangeValue('songTitle', title)}
            />
            <CustomText
              type={1}
              text="Your song title, 2 - 55 characters"
              style={styles.titleInfo}
            />
            {data?.singleSong?.thumbnail ? (
              <ImageBackground
                source={{uri: data?.singleSong?.thumbnail?.uri}}
                style={styles.thumbnail}>
                <TouchableOpacity
                  style={styles.pickPhotoWrapper}
                  onPress={() => handlePickImage()}>
                  <MaterialIcons
                    name="photo-camera-back"
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
                  name="image-plus"
                  color="#8d8d8d"
                  size={60}
                />
              </TouchableOpacity>
            )}
            <View style={styles.row}>
              <MaterialIcons name="sort" color="#c3c3c6" size={20} />
              <CustomText
                type={1}
                text="Description"
                style={styles.titleText}
              />
            </View>
            <TextInput
              style={styles.descriptionInput}
              onChangeText={(description) =>
                handleChangeValue('songDescription', description)
              }
            />
            <View style={styles.row}>
              <MaterialCommunityIcons
                name="tag-multiple"
                color="#c3c3c6"
                size={20}
              />
              <CustomText type={1} text="Tags" style={styles.titleText} />
            </View>
            <TextInput
              style={styles.titleInput}
              onChangeText={(tags) => handleChangeValue('songTags', tags)}
            />
            <Text style={styles.titleInfo}>
              Add tags separated by commas "," to describe more about your track
            </Text>
            <View style={styles.row}>
              <MaterialCommunityIcons
                name="layers-outline"
                size={18}
                color="#d2d2d2"
              />
              <CustomText type={1} text="Genre" style={styles.titleText} />
            </View>
            <DropDownPicker
              placeholderStyle={{color: '#ccc'}}
              items={data?.genres}
              containerStyle={{height: 40, marginBottom: 30, marginTop: 10}}
              style={{
                backgroundColor: '#000',
                borderColor: '#000',
              }}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{
                backgroundColor: '#000',
                borderColor: '#000',
              }}
              arrowColor="#fff"
              onChangeItem={(item: any) =>
                handleChangeValue('songGenres', item?.value)
              }
              selectedLabelStyle={{color: '#000'}}
              labelStyle={{
                color: '#ccc',
              }}
            />
            <View style={styles.row}>
              <MaterialCommunityIcons name="earth" size={18} color="#d2d2d2" />
              <CustomText
                type={1}
                text="Availability"
                style={styles.titleText}
              />
            </View>
            <DropDownPicker
              placeholderStyle={{color: '#ccc'}}
              items={data?.availability}
              containerStyle={{height: 40, marginBottom: 30, marginTop: 10}}
              style={{
                backgroundColor: '#000',
                borderColor: '#000',
              }}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{
                backgroundColor: '#000',
                borderColor: '#000',
              }}
              arrowColor="#ccc"
              onChangeItem={(item: any) =>
                handleChangeValue('songAvailability', item?.value)
              }
              selectedLabelStyle={{color: '#000'}}
              labelStyle={{
                color: '#ccc',
              }}
            />
            <View style={styles.row}>
              <MaterialCommunityIcons name="earth" size={18} color="#d2d2d2" />
              <CustomText
                type={1}
                text="Age Registration"
                style={styles.titleText}
              />
            </View>
            <DropDownPicker
              placeholderStyle={{color: '#ccc'}}
              items={data?.age_restriction}
              containerStyle={{height: 40, marginBottom: 30, marginTop: 10}}
              style={{
                backgroundColor: '#000',
                borderColor: '#000',
              }}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{
                backgroundColor: '#000',
                borderColor: '#000',
              }}
              arrowColor="#ccc"
              onChangeItem={(item: any) =>
                handleChangeValue('songAgeRegistration', item?.value)
              }
              selectedLabelStyle={{color: '#000'}}
              labelStyle={{
                color: '#ccc',
                fontSize: 16
              }}
            />
            <View style={styles.row}>
              <MaterialIcons name="shopping-bag" size={18} color="#d2d2d2" />
              <CustomText type={1} text="Price" style={styles.titleText} />
            </View>
            <View style={styles.radioBtnsWrapper}>
              {data?.prices?.map((price: any) => (
                <TouchableOpacity
                  key={shortid.generate()}
                  style={styles.flexRowPrice}
                  onPress={() => handleChangeValue('songPrice', price)}>
                  <View
                    style={[
                      styles.markerView,
                      data?.singleSong?.price === price
                        ? styles.markerSelected
                        : null,
                    ]}>
                    {data?.singleSong?.price === price ? (
                      <Octicons name="primitive-dot" color="#fff" size={14} />
                    ) : null}
                  </View>
                  <CustomText
                    type={1}
                    text={`₦${price}`}
                    style={styles.titleText}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.attentionText}>
              Attention!! kindly Note that if you do not select a price, your
              song will be published as a free song..
            </Text>
            <TouchableOpacity
              style={[
                styles.btnSend,
                hasFilledAllFields()
                  ? styles.btnSendEnabled
                  : styles.btnSendDisabled,
              ]}
              disabled={hasFilledAllFields() ? false : true}
              onPress={() => handleSubmitSong()}>
              <Text style={styles.btnSendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </>
  );
}
