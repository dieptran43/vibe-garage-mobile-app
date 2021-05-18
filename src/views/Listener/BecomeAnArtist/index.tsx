import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
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
    hasFilledAllFields: true,
    applyToBecomeAnArtiste: {} as any,
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
    } else if (field === 'additional_details') {
      applyToBecomeAnArtiste.additional_details = value;
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
      applyToBecomeAnArtiste.title &&
      applyToBecomeAnArtiste.genre &&
      applyToBecomeAnArtiste.availability &&
      applyToBecomeAnArtiste.age_restriction !== null
    );
  };

  const handleSubmitSong = async () => {
    setData(combineData(data, {isSending: true}));

    let {applyToBecomeAnArtiste} = data;
    const payload = new FormData();
    for (let [key, value] of Object.entries(applyToBecomeAnArtiste)) {
      payload.append(key, JSON.stringify(value));
    }
    await applyToBecomeArtiste({token, payload})
      .then((response: any) => {
        if (response?.success) {
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Applied successful!',
            visibilityTime: 1000,
          });
        } else {
          setData(combineData(data, {isSending: false}));
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
              onChangeText={(title) => handleChangeValue('name', title)}
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
            <TouchableOpacity style={styles.personalPhotoWrapper}>
              <MaterialIcons name="camera-alt" size={25} color="#d2d2d2" />
              <CustomText
                type={1}
                text="Your Personal Photo"
                style={styles.personalPhotoText}
                onPress={() => handlePickImage('photo')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.personalPhotoWrapper}>
              <FontAwesome5 name="id-card" size={25} color="#d2d2d2" />
              <CustomText
                type={1}
                text="Passport / ID card"
                style={styles.personalPhotoText}
                onPress={() => handlePickImage('id_card')}
              />
            </TouchableOpacity>
            <View style={styles.nameRow}>
              <MaterialIcons name="sort" size={18} color="#d2d2d2" />
              <CustomText
                text="Additional details about your self (Optinal)"
                style={styles.nameText}
              />
            </View>
            <TextInput
              style={styles.additionalDetailsInput}
              onChangeText={(title) =>
                handleChangeValue('additional_details', title)
              }
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
              onChangeText={(title) => handleChangeValue('website', title)}
            />
            <Text style={styles.reviewText}>
              We will review your request within 24 hours, you'll be informed
              shourtly
            </Text>
            <View style={styles.divider}></View>
            <TouchableOpacity
              style={[
                styles.btnSend,
                data.hasFilledAllFields
                  ? styles.btnSendEnabled
                  : styles.btnSendDisabled,
              ]}
              disabled={data.hasFilledAllFields ? false : true}>
              <Text style={styles.btnSendText}>Send</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      )}
    </View>
  );
}
