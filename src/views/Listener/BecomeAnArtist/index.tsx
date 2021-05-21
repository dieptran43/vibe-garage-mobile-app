import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {useIsFocused} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import DocumentPicker from 'react-native-document-picker';
import shortid from 'shortid';
import Toast from 'react-native-toast-message';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import styles from './becomeAnArtistStyle';
import {AuthContext} from '../../../context';
import {combineData} from '../../../utils/helpers';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';
import {applyToBecomeArtiste} from '../../../services/userService';

export function BecomeAnArtist({navigation}: DrawerScreenProps<{}>) {
  const {state, dispatch}: any = useContext(AuthContext);
  const token = state?.token;
  const [data, setData] = useState({
    genres: [
      {label: 'Other', value: 'Other'},
      {label: 'Afro', value: 'Afro'},
      {label: 'Gospel', value: 'Gospel'},
      {label: 'Reggae', value: 'Reggae'},
    ],
    applyToBecomeAnArtiste: {category_id: 1} as any,
    isSending: false,
  });

  const handlePickImage = async (param: any) => {
    try {
      let {applyToBecomeAnArtiste} = data as any;
      let res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      applyToBecomeAnArtiste[param] = res;
      setData(combineData(data, {applyToBecomeAnArtiste}));
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
    let {applyToBecomeAnArtiste} = data;
    if (field === 'name') {
      applyToBecomeAnArtiste.name = value;
    } else if (field === 'details') {
      applyToBecomeAnArtiste.details = value;
    } else if (field === 'genre') {
      applyToBecomeAnArtiste.genre = value;
    } else if (field === 'website') {
      applyToBecomeAnArtiste.website = value;
    }
    setData(combineData(data, {applyToBecomeAnArtiste}));
  };

  const hasFilledAllFields = () => {
    let {applyToBecomeAnArtiste} = data;
    return (
      applyToBecomeAnArtiste.name &&
      applyToBecomeAnArtiste.photo &&
      applyToBecomeAnArtiste.passport
    );
  };

  const handleSubmit = async () => {
    setData(combineData(data, {isSending: true}));

    let {applyToBecomeAnArtiste} = data;
    const payload = new FormData();
    for (let [key, value] of Object.entries(applyToBecomeAnArtiste)) {
      payload.append(key, JSON.stringify(value));
    }
    await applyToBecomeArtiste({token, payload})
      .then((response: any) => {
        console.log(response);
        if (response?.success) {
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Applied successful!',
            visibilityTime: 1000,
          });
        } else {
          setData(
            combineData(data, {isSending: false, applyToBecomeAnArtiste: {}}),
          );
        }
      })
      .catch((error) => {
        console.error(error);
        setData(combineData(data, {isSending: false}));
      });
  };

  return (
    <View style={styles.becomeAnArtistContainer}>
      <NavDrawerHeader navigation={navigation} />
      {data?.isSending ? (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <CustomText type={1} text="Please wait..." style={styles.waitText} />
        </View>
      ) : (
        <ScrollView style={styles.scrollViewContent}>
          <KeyboardAvoidingView style={styles.layoutContent}>
            <CustomText
              type={1}
              text="Become an artist"
              style={styles.becomeArtistText}
            />
            <CustomText
              type={1}
              text="Get verified, upload more songs, get more space, sell your songs,
            get a special looking profile and get famous on our platform!"
              style={styles.getVerifiedText}
            />
            <View style={styles.nameRow}>
              <MaterialIcons name="person" size={18} color="#d2d2d2" />
              <CustomText text="Name" style={styles.nameText} />
            </View>
            <TextInput
              style={styles.nameInput}
              onChangeText={(name) => handleChangeValue('name', name)}
              value={data?.applyToBecomeAnArtiste?.name}
            />
            <CustomText
              type={1}
              text="Your full name as showing on your ID"
              style={styles.showIdText}
            />
            <View style={styles.nameRow}>
              <MaterialIcons
                name="insert-drive-file"
                size={18}
                color="#d2d2d2"
              />
              <CustomText text="Upload documents" style={styles.nameText} />
            </View>
            <CustomText
              type={1}
              text="Please upload a photo with your passport / ID &amp; your distinct photo."
              style={styles.distinctPhotoText}
            />
            {data?.applyToBecomeAnArtiste?.photo ? (
              <ImageBackground
                source={{
                  uri: data?.applyToBecomeAnArtiste?.photo?.uri,
                }}
                style={styles.thumbnail}>
                <TouchableOpacity
                  style={styles.pickPhotoWrapper}
                  onPress={() => handlePickImage('photo')}>
                  <MaterialIcons
                    name="photo-camera-back"
                    color="#fff"
                    size={20}
                  />
                </TouchableOpacity>
              </ImageBackground>
            ) : (
              <TouchableOpacity
                style={styles.personalPhotoWrapper}
                onPress={() => handlePickImage('photo')}>
                <MaterialIcons name="camera-alt" size={25} color="#d2d2d2" />
                <CustomText
                  type={1}
                  text="Your Personal Photo"
                  style={styles.personalPhotoText}
                />
              </TouchableOpacity>
            )}
            {data?.applyToBecomeAnArtiste?.passport ? (
              <ImageBackground
                source={{
                  uri: data?.applyToBecomeAnArtiste?.passport?.uri,
                }}
                style={styles.thumbnail}>
                <TouchableOpacity
                  style={styles.pickPhotoWrapper}
                  onPress={() => handlePickImage('passport')}>
                  <MaterialIcons
                    name="photo-camera-back"
                    color="#fff"
                    size={20}
                  />
                </TouchableOpacity>
              </ImageBackground>
            ) : (
              <TouchableOpacity
                style={styles.personalPhotoWrapper}
                onPress={() => handlePickImage('passport')}>
                <FontAwesome5 name="id-card" size={25} color="#d2d2d2" />
                <CustomText
                  type={1}
                  text="Passport / ID card"
                  style={styles.personalPhotoText}
                />
              </TouchableOpacity>
            )}
            <View style={styles.nameRow}>
              <MaterialIcons name="sort" size={18} color="#d2d2d2" />
              <CustomText
                text="Additional details about your self (Optinal)"
                style={styles.nameText}
              />
            </View>
            <TextInput
              style={styles.additionalDetailsInput}
              onChangeText={(details) => handleChangeValue('details', details)}
              value={data?.applyToBecomeAnArtiste?.details}
            />
            <View style={styles.nameRow}>
              <MaterialCommunityIcons
                name="layers-outline"
                size={18}
                color="#d2d2d2"
              />
              <CustomText text="Genre" style={styles.nameText} />
            </View>
            <DropDownPicker
              placeholder="Genres"
              placeholderStyle={{color: '#ccc'}}
              items={data.genres}
              containerStyle={{height: 40, marginBottom: 30}}
              style={{backgroundColor: '#000', borderColor: '#000'}}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{
                backgroundColor: '#fafafa',
              }}
              arrowColor="#ccc"
              onChangeItem={(item: any) =>
                handleChangeValue('genre', item?.value)
              }
              selectedLabelStyle={{color: '#000'}}
              labelStyle={{
                color: '#ccc',
              }}
            />
            <View style={styles.nameRow}>
              <MaterialIcons name="insert-link" size={18} color="#d2d2d2" />
              <CustomText text="Website (Optional)" style={styles.nameText} />
            </View>
            <TextInput
              style={styles.nameInput}
              onChangeText={(website) => handleChangeValue('website', website)}
              value={data?.applyToBecomeAnArtiste?.website}
            />
            <Text style={styles.reviewText}>
              We will review your request within 24 hours, you'll be informed
              shourtly
            </Text>
            <View style={styles.divider}></View>
            <TouchableOpacity
              style={[
                styles.btnSend,
                hasFilledAllFields()
                  ? styles.btnSendEnabled
                  : styles.btnSendDisabled,
              ]}
              disabled={hasFilledAllFields() ? false : true}
              onPress={() => handleSubmit()}>
              <Text style={styles.btnSendText}>Send</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      )}
    </View>
  );
}
