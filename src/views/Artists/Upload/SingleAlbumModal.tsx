import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-toast-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import shortid from 'shortid';
import {AuthContext} from '../../../context';
import {combineData} from '../../../utils/helpers';
import {submitAlbum} from '../../../services/albumService';
import styles from './uploadStyle';
import {CustomText} from '../../../components/Global';

export default function SingleAlbumModal({onClose}: any) {
  const {state, dispatch}: any = useContext(AuthContext);
  const token = state?.token;

  const [data, setData] = useState({
    singleAlbum: {} as any,
    genres: [
      {label: 'Other', value: 'Other'},
      {label: 'Afro', value: 'Afro'},
      {label: 'Gospel', value: 'Gospel'},
      {label: 'Reggae', value: 'Reggae'},
    ],
    prices: [100, 200, 300, 500],
    isCreatingAlbum: false,
    canAddSong: false,
    album_id: null
  });

  const handlePickImage = async () => {
    try {
      let {singleAlbum} = data;
      let res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      singleAlbum.thumbnail = res;
      setData(combineData(data, {singleAlbum}));
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
    let {singleAlbum} = data;
    if (field === 'albumTitle') {
      singleAlbum.title = value;
    } else if (field === 'albumDescription') {
      singleAlbum.description = value;
    } else if (field === 'albumGenres') {
      singleAlbum.genre = value;
    } else if (field === 'albumPrice') {
      singleAlbum.price = value;
    }
    setData(combineData(data, {singleAlbum}));
  };

  const hasFilledAllFields = () => {
    let {singleAlbum} = data;
    return singleAlbum.title && singleAlbum.genre;
  };

  const handleSubmitAlbum = async () => {
    setData(combineData(data, {isUploadingSong: true}));

    let {singleAlbum} = data;
    const payload = new FormData();
    for (let [key, value] of Object.entries(singleAlbum)) {
      payload.append(key, JSON.stringify(value));
    }
    await submitAlbum({token, payload})
      .then((response) => {
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Album created successfully!',
          visibilityTime: 1000,
        });
        onClose();
      })
      .catch((error) => {
        console.error(error);
        onClose();
      });
  };

  return (
    <>
      {data?.isCreatingAlbum ? (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <CustomText type={1} text="Please wait..." style={styles.waitText} />
        </View>
      ) : (
        <ScrollView style={styles.scrollViewContent}>
          <View style={styles.modalContent}>
            <View style={styles.row}>
              <MaterialIcons name="music-note" color="#c3c3c6" size={20} />
              <CustomText
                type={1}
                text=" Album Title"
                style={styles.titleText}
              />
            </View>
            <TextInput
              style={styles.titleInput}
              onChangeText={(title) => handleChangeValue('albumTitle', title)}
            />
            <CustomText
              type={1}
              text="Your album title, 2 - 55 characters"
              style={styles.titleInfo}
            />
            {data?.singleAlbum?.thumbnail ? (
              <ImageBackground
                source={{uri: data?.singleAlbum?.thumbnail?.uri}}
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
                text="Album Description"
                style={styles.titleText}
              />
            </View>
            <TextInput
              style={styles.descriptionInput}
              onChangeText={(description) =>
                handleChangeValue('albumDescription', description)
              }
            />
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
                handleChangeValue('albumGenres', item?.value)
              }
              selectedLabelStyle={{color: '#000'}}
              labelStyle={{
                color: '#ccc',
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
                  onPress={() => handleChangeValue('albumPrice', price)}>
                  <View
                    style={[
                      styles.markerView,
                      data?.singleAlbum?.price === price
                        ? styles.markerSelected
                        : null,
                    ]}>
                    {data?.singleAlbum?.price === price ? (
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
              album will be published as a free album..
            </Text>
            <TouchableOpacity
              style={[
                styles.btnSend,
                hasFilledAllFields()
                  ? styles.btnSendEnabled
                  : styles.btnSendDisabled,
              ]}
              disabled={hasFilledAllFields() ? false : true}
              onPress={() => handleSubmitAlbum()}>
              <Text style={styles.btnSendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </>
  );
}
