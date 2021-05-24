import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import shortid from 'shortid';
import styles from './spotLightStyle';
import SpotlightImage from '../../../assets/images/spotlight-image.png';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import {getSpotlight} from '../../../services/songService';
import {combineData, getFromOldUrl} from '../../../utils/helpers';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';
import {getScreenParent} from '../../../utils/navigationHelper';

export function Spotlight({navigation}: DrawerScreenProps<{}>) {
  const [data, setData] = useState({
    spotlightMusic: [] as any,
  });

  useEffect(() => {
    handleSpotlight();
  }, []);

  const handleSpotlight = async () => {
    try {
      await getSpotlight()
        .then((response: any) => {
          let spotlightMusic = [];
          if (response && response?.spotlight) {
            spotlightMusic = response?.spotlight;
          }
          setData(combineData(data, {spotlightMusic}));
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigation = (route: string, params: any) => {
    navigateToNestedRoute(getScreenParent(route), route, params);
  };

  return (
    <View style={styles.spotlightContainer}>
      <NavDrawerHeader navigation={navigation} />
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.spotlightHeader}>
          <Image source={SpotlightImage} style={styles.spotlightImage} />
          <Text style={styles.spotlightText}>Spotlight</Text>
        </View>
        <View style={styles.spotlightContent}>
          {/* {data?.spotlightMusic?.length ? (
            <> */}
          {data?.spotlightMusic.map((spotlightItem: any) => (
            <View
              style={styles.singleSpotlightWrapper}
              key={shortid.generate()}>
              <View style={styles.spotlightRowOne}>
                <Image
                  source={{
                    uri: getFromOldUrl(spotlightItem?.artist_data?.avatar),
                  }}
                  style={styles.artistImage}
                />
                <View style={styles.artistInfo}>
                  <CustomText
                    style={styles.artistName}
                    type={1}
                    text={spotlightItem?.artist_data?.name}
                  />
                  <View style={styles.flexRow}>
                    <CustomText
                      type={2}
                      text={spotlightItem.uploadInfo}
                      style={{fontSize: 12}}
                    />
                    <CustomText
                      type={2}
                      text={spotlightItem.uploadTime}
                      style={{fontSize: 12}}
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
              <TouchableOpacity
                style={styles.spotlightRowTwo}
                onPress={() => handleNavigation('Track', spotlightItem)}>
                <Image
                  source={{
                    uri: getFromOldUrl(spotlightItem?.thumbnail),
                  }}
                  style={styles.albumImage}
                />
                <CustomText
                  type={1}
                  text={spotlightItem.title}
                  size={17}
                  style={styles.albumName}
                />
                <View style={styles.songDuration}>
                  <MaterialIcons name="history" color="#919191" size={18} />
                  <CustomText
                    type={2}
                    text={spotlightItem?.duration}
                    style={styles.historyIcon}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ))}
          {/* </>
          ) : (
            <View style={styles.noneFoundWrapper}>
              <Text style={styles.noneFoundText}>None found</Text>
            </View>
          )} */}
        </View>
      </ScrollView>
    </View>
  );
}
