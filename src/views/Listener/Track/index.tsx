import React from 'react';
import {View, Text, ScrollView, Image, ImageBackground} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
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
          <CustomText type={1} text={track?.title} style={styles.trackTitle} />
          <View style={styles.trackActions}>
            <View style={styles.actionRow}>
              <MaterialIcons name="play-arrow" size={18} color="#d2d2d2" />
              <CustomText type={1} text={3} style={styles.trackTitle} />
            </View>
            <View style={styles.actionRow}>
              <MaterialIcons name="favorite" size={18} color="#d2d2d2" />
              <CustomText type={1} text={3} style={styles.trackTitle} />
            </View>
            <View style={styles.actionRow}>
              <MaterialIcons name="share" size={18} color="#d2d2d2" />
              <CustomText type={1} text={3} style={styles.trackTitle} />
            </View>
            <View style={styles.actionRow}>
              <Ionicons name="md-chatbox-sharp" size={18} color="#d2d2d2" />
              <CustomText type={1} text={3} style={styles.trackTitle} />
            </View>
            <View style={styles.actionRow}>
              <MaterialIcons name="star" size={18} color="#d2d2d2" />
              <CustomText type={1} text={3} style={styles.trackTitle} />
            </View>
          </View>
          <View style={styles.trackDivider}></View>
          <CustomText
            style={styles.trackDescription}
            text={`Yes, you want good song, sounds. Here is a single from Ice Bee letting you know that love is the greater key to life, and he called this one Good Loving Prod. by SamzBeat `}
          />
          <View style={styles.flexJustify}>
            <TouchableOpacity style={styles.downloadBtn}>
              <Feather name="plus" size={18} color="#fff" />
              <CustomText
                type={1}
                text={'Add to Playlist'}
                style={styles.downloadText}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.downloadBtn}>
              <MaterialIcons name="cloud-download" size={18} color="#fff" />
              <CustomText
                type={1}
                text={'Download'}
                style={styles.downloadText}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
