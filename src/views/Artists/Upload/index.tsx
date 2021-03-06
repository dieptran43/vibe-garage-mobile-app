import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {DrawerScreenProps} from '@react-navigation/drawer';
import shortid from 'shortid';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentPicker from 'react-native-document-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText, CustomModal} from '../../../components/Global';
import styles from './uploadStyle';
import {AuthContext} from '../../../context';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';
import {combineData} from '../../../utils/helpers';

export function Upload({navigation}: DrawerScreenProps<{}>) {
  const {state, dispatch}: any = useContext(AuthContext);
  const [data, setData] = useState({
    uploadType: '',
    singleSong: {} as any,
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
    hasFilledAllFields: true,
  });

  const handleUpload = async (type: String) => {
    try {
      let res;
      if (type === 'song') {
        let {singleSong} = data;
        res = await DocumentPicker.pick({
          type: [DocumentPicker.types.audio],
        });
        singleSong.song = res?.uri;
        singleSong.title = res?.name;
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
      singleSong.thumbnail = res.uri;
      setData(combineData(data, {singleSong}));
    } catch (err) {
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
      singleSong.genres = value;
    } else if (field === 'songAvailability') {
      singleSong.availability = value;
    } else if (field === 'songAgeRegistration') {
      singleSong.age_registration = value;
    } else if (field === 'songPrice') {
      singleSong.price = value;
    }
    setData(combineData(data, {singleSong}));
  };

  const SingleSongModal = () => {
    return (
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.modalContent}>
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
            <Image
              source={{uri: data?.singleSong?.thumbnail}}
              style={styles.thumbnail}
            />
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
            <CustomText type={1} text="Description" style={styles.titleText} />
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
            <CustomText type={1} text="Availability" style={styles.titleText} />
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
            }}
          />
          <View style={styles.row}>
            <MaterialIcons name="shopping-bag" size={18} color="#d2d2d2" />
            <CustomText type={1} text=" Price" style={styles.titleText} />
          </View>
          <View>
            {data?.prices?.map((price) => (
              <RadioButton
                key={shortid.generate()}
                value={`₦${price}`}
                status={
                  data?.singleSong?.price === price ? 'checked' : 'unchecked'
                }
                onPress={() => handleChangeValue('songPrice', price)}
                color="#fff"
              />
            ))}
          </View>
        </View>
      </ScrollView>
    );
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
              onModalClose={() => {}}
              customContent={() => SingleSongModal()}></CustomModal>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}
