import React from 'react';
import {View, Text, ScrollView, Image, ImageBackground} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import styles from './trackStyle';
import {CustomText} from '../../../components/Global';
import {combineData, getImage} from '../../../utils/helpers';

export function Track({navigation, route}: any) {
  const track = route?.params;

  return (
    <View style={styles.container}>
      <NavDrawerHeader navigation={navigation} />
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.layoutContent}>
          <View style={styles.row1}>
            <Image
              source={{
                uri: getImage(track?.artist_data?.avatar),
              }}
              style={styles.artisteImage}
            />
            <View style={styles.trackCol1}>
              <CustomText
                type={1}
                text={track?.artist_data?.name}
                style={styles.artisteName}
              />
              {/* <CustomText
                type={1}
                text="2 months ago"
                style={styles.trackUploadDate}
              /> */}
            </View>
            <TouchableOpacity style={styles.followBtn}>
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={{uri: getImage(track?.thumbnail)}}
              style={styles.imageBg}>
              <TouchableOpacity>
                <AntDesign name="playcircleo" size={40} color="#00bcd4" />
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <CustomText
            type={1}
            text={track?.title}
            style={styles.tracktitle}
          />
        </View>
      </ScrollView>
    </View>
  );
}
