import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import Feather from 'react-native-vector-icons/Feather';
import shortid from 'shortid';
import styles from './spotLightStyle';
import SpotlightImage from '../../../assets/images/spotlight-image.png';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';

export function Spotlight({navigation}: DrawerScreenProps<{}>) {
  const [data, setData] = useState({
    spotlightMusic: [
      {
        artistImage:
          'https://musicport.com.ng/upload/photos/2019/07/pAEpOEf9lXPKbGuSjbbL_16_ece36b8b4e4de9c559ea3afed74fd09f_image.jpg',
        artistName: 'Benson Ucheowaji',
        uploadInfo: 'Uploaded a new song,',
        uploadTime: ' about a year ago',
        albumImage:
          'https://musicport.com.ng/upload/photos/2019/08/zZcIjrskTQZeSJJ61Iyi_21_7dc5d0b5ccc243186f2c751e07c0daf5_image.jpg',
        albumTitle: 'Good Time',
      },
      {
        artistImage:
          'https://musicport.com.ng/upload/photos/2020/09/oKD1z7LfaWQHzLtMK9GW_08_647b4e39becc9ababd377e4a5cf49f14_image.jpg',
        artistName: 'sunshine',
        uploadInfo: 'Uploaded a new song,',
        uploadTime: ' about a year ago',
        albumImage:
          'https://musicport.com.ng/upload/photos/2019/07/rsCrKmAd54lVQPbDGvWK_04_8f2016cffc922b67da037fe1bfc39d37_image.png',
        albumTitle: 'Casanova(Bad Idea).mp3',
      },
    ],
  });

  return (
    <View style={styles.spotlightContainer}>
      <NavDrawerHeader navigation={navigation} />
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.spotlightHeader}>
          <Image source={SpotlightImage} style={styles.spotlightImage} />
          <Text style={styles.spotlightText}>Spotlight</Text>
        </View>
        <View style={styles.spotlightContent}>
          {data?.spotlightMusic?.length ? (
            <>
              {data?.spotlightMusic.map((spotlightItem) => (
                <View
                  style={styles.singleSpotlightWrapper}
                  key={shortid.generate()}>
                  <View style={styles.spotlightRowOne}>
                    <Image
                      source={{
                        uri: spotlightItem.artistImage,
                      }}
                      style={styles.artistImage}
                    />
                    <View style={styles.artistInfo}>
                      <CustomText
                        style={styles.artistName}
                        type={1}
                        text={spotlightItem.artistName}
                        size={13}
                      />
                      <View style={styles.flexRow}>
                        <CustomText
                          type={2}
                          text={spotlightItem.uploadInfo}
                          size={12}
                        />
                        <CustomText
                          type={2}
                          text={spotlightItem.uploadTime}
                          size={12}
                        />
                      </View>
                    </View>
                    <Feather
                      name="more-horizontal"
                      color="#c3c3c6"
                      size={22}
                      style={styles.moreIcon}
                    />
                  </View>
                  <View style={styles.spotlightRowTwo}>
                    <Image
                      source={{
                        uri: spotlightItem.albumImage,
                      }}
                      style={styles.albumImage}
                    />
                    <CustomText
                      type={1}
                      text={spotlightItem.albumTitle}
                      size={17}
                    />
                  </View>
                </View>
              ))}
            </>
          ) : (
            <View style={styles.noneFoundWrapper}>
              <Text style={styles.noneFoundText}>None found</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
