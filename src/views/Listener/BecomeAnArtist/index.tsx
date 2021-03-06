import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
// import Carousel from 'react-native-snap-carousel';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {useIsFocused} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import shortid from 'shortid';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import styles from './becomeAnArtistStyle';
import {AuthContext} from '../../../context';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';

export function BecomeAnArtist({navigation}: DrawerScreenProps<{}>) {
  const {state, dispatch}: any = useContext(AuthContext);
  const [data, setData] = useState({
    genres: [
      {label: 'Other', value: 'Other'},
      {label: 'Afro', value: 'Afro'},
      {label: 'Gospel', value: 'Gospel'},
      {label: 'Reggae', value: 'Reggae'},
    ],
    hasFilledAllFields: true,
  });
  const isFocused = useIsFocused();

  const handleChangeGenre = (value: String) => {};

  return (
    <View style={styles.becomeAnArtistContainer}>
      <NavDrawerHeader navigation={navigation} />
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
          <TextInput style={styles.nameInput} />
          <CustomText
            type={1}
            text="Your full name as showing on your ID"
            style={styles.showIdText}
          />
          <View style={styles.nameRow}>
            <MaterialIcons name="insert-drive-file" size={18} color="#d2d2d2" />
            <CustomText text="Upload documents" style={styles.nameText} />
          </View>
          <CustomText
            type={1}
            text="Please upload a photo with your passport / ID &amp; your distinct photo."
            style={styles.distinctPhotoText}
          />
          <View style={styles.personalPhotoWrapper}>
            <MaterialIcons name="camera-alt" size={25} color="#d2d2d2" />
            <CustomText
              type={1}
              text="Your Personal Photo"
              style={styles.personalPhotoText}
            />
          </View>
          <View style={styles.personalPhotoWrapper}>
            <FontAwesome5 name="id-card" size={25} color="#d2d2d2" />
            <CustomText
              type={1}
              text="Passport / ID card"
              style={styles.personalPhotoText}
            />
          </View>
          <View style={styles.nameRow}>
            <MaterialIcons name="sort" size={18} color="#d2d2d2" />
            <CustomText
              text=" Additional details about your self (Optinal)"
              style={styles.nameText}
            />
          </View>
          <TextInput style={styles.additionalDetailsInput} />
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
            onChangeItem={(item: any) => handleChangeGenre(item?.value)}
            selectedLabelStyle={{color: '#000'}}
            labelStyle={{
              color: '#ccc',
            }}
          />
          <View style={styles.nameRow}>
            <MaterialIcons name="insert-link" size={18} color="#d2d2d2" />
            <CustomText text="Website (Optional)" style={styles.nameText} />
          </View>
          <TextInput style={styles.nameInput} />
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
    </View>
  );
}
