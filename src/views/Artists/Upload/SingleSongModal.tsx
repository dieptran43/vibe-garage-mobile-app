import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import shortid from 'shortid';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import DropDownPicker from 'react-native-dropdown-picker';
import {CustomText} from '../../../components/Global';
import styles from './uploadStyle';

export default function SingleSongModal({
  handlePickImage,
  handleChangeValue,
  data,
  hasFilledAllFields,
  handleSubmitSong
}: any) {
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
            source={{uri: data?.singleSong?.thumbnail?.uri}}
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
          Attention!! kindly Note that if you do not select a price, your song
          will be published as a free song..
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
  );
}
