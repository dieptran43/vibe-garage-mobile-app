import React, {useState, createRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import Feather from 'react-native-vector-icons/Feather';
import shortid from 'shortid';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import styles from './latestMusicStyle';

export function LatestMusic({navigation}: DrawerScreenProps<{}>) {
  const [data, setData] = useState({
    bestNewReleases: [
      {
        _id: '253tt3s38832absjjkdkk',
        title: 'Follow-Me-Nuels+iPraiz_Prod_Nuels.mp3',
        image:
          'https://musicport.com.ng/upload/photos/2020/12/QlWlWRCTHgmtUzCaS15V_25_c1388101c2d06d65fc383e0c8f8dae27_image.jpg',
        artiste: 'Nuels',
      },
      {
        _id: '253tt3s38832absjjkdkk',
        title: 'Nuels Sunday-Ima-Abisi.mp3',
        image:
          'https://musicport.com.ng/upload/photos/2020/12/iJodKj89pN23qhg6hDPG_02_9684b0c99e584ce72eae8c74ac1fd243_image.jpeg',
        artiste: 'Nuels',
      },
      {
        _id: '253tt3s38832absjjkdkk',
        title: 'Follow-Me-Nuels+iPraiz_Prod_Nuels.mp3',
        image:
          'https://musicport.com.ng/upload/photos/2020/12/QlWlWRCTHgmtUzCaS15V_25_c1388101c2d06d65fc383e0c8f8dae27_image.jpg',
        artiste: 'Nuels',
      },
      {
        _id: '253tt3s38832absjjkdkk',
        title: 'Nuels Sunday-Ima-Abisi.mp3',
        image:
          'https://musicport.com.ng/upload/photos/2020/12/iJodKj89pN23qhg6hDPG_02_9684b0c99e584ce72eae8c74ac1fd243_image.jpeg',
        artiste: 'Nuels',
      },
    ],
    bestNewReleasesScrollPosition: 0,
    topMusic: [
      {
        image:
          'https://musicport.com.ng/upload/photos/2020/04/3PdAmcAZOAxYhm75N3hu_01_67c4720aac05022fef9a4ba47653d165_image.jpeg',
        title: 'FRISKY',
        artiste: 'Emmanuel Jackson',
      },
      {
        image:
          'https://musicport.com.ng/upload/photos/2020/04/3PdAmcAZOAxYhm75N3hu_01_67c4720aac05022fef9a4ba47653d165_image.jpeg',
        title: 'FRISKY',
        artiste: 'Emmanuel Jackson',
      },
      {
        image:
          'https://musicport.com.ng/upload/photos/2020/04/3PdAmcAZOAxYhm75N3hu_01_67c4720aac05022fef9a4ba47653d165_image.jpeg',
        title: 'FRISKY',
        artiste: 'Emmanuel Jackson',
      },
      {
        image:
          'https://musicport.com.ng/upload/photos/2020/04/3PdAmcAZOAxYhm75N3hu_01_67c4720aac05022fef9a4ba47653d165_image.jpeg',
        title: 'FRISKY',
        artiste: 'Emmanuel Jackson',
      },
      {
        image:
          'https://musicport.com.ng/upload/photos/2020/04/3PdAmcAZOAxYhm75N3hu_01_67c4720aac05022fef9a4ba47653d165_image.jpeg',
        title: 'FRISKY',
        artiste: 'Emmanuel Jackson',
      },
      {
        image:
          'https://musicport.com.ng/upload/photos/2020/04/3PdAmcAZOAxYhm75N3hu_01_67c4720aac05022fef9a4ba47653d165_image.jpeg',
        title: 'FRISKY',
        artiste: 'Emmanuel Jackson',
      },
      {
        image:
          'https://musicport.com.ng/upload/photos/2020/04/3PdAmcAZOAxYhm75N3hu_01_67c4720aac05022fef9a4ba47653d165_image.jpeg',
        title: 'FRISKY',
        artiste: 'Emmanuel Jackson',
      },
      {
        image:
          'https://musicport.com.ng/upload/photos/2020/04/3PdAmcAZOAxYhm75N3hu_01_67c4720aac05022fef9a4ba47653d165_image.jpeg',
        title: 'FRISKY',
        artiste: 'Emmanuel Jackson',
      },
      {
        image:
          'https://musicport.com.ng/upload/photos/2020/04/3PdAmcAZOAxYhm75N3hu_01_67c4720aac05022fef9a4ba47653d165_image.jpeg',
        title: 'FRISKY',
        artiste: 'Emmanuel Jackson',
      },
      {
        image:
          'https://musicport.com.ng/upload/photos/2020/04/3PdAmcAZOAxYhm75N3hu_01_67c4720aac05022fef9a4ba47653d165_image.jpeg',
        title: 'FRISKY',
        artiste: 'Emmanuel Jackson',
      },
      {
        image:
          'https://musicport.com.ng/upload/photos/2020/04/3PdAmcAZOAxYhm75N3hu_01_67c4720aac05022fef9a4ba47653d165_image.jpeg',
        title: 'FRISKY',
        artiste: 'Emmanuel Jackson',
      },
      {
        image:
          'https://musicport.com.ng/upload/photos/2020/04/3PdAmcAZOAxYhm75N3hu_01_67c4720aac05022fef9a4ba47653d165_image.jpeg',
        title: 'FRISKY',
        artiste: 'Emmanuel Jackson',
      },
      {
        image:
          'https://musicport.com.ng/upload/photos/2020/04/3PdAmcAZOAxYhm75N3hu_01_67c4720aac05022fef9a4ba47653d165_image.jpeg',
        title: 'FRISKY',
        artiste: 'Emmanuel Jackson',
      },
    ],
  });

  const windowWidth = Dimensions.get('window').width;

  let scrollViewRef = createRef<ScrollView>();

  const handleScrollRecentlyPlayed = (direction: string) => {};

  return (
    <View style={styles.latestMusicContainer}>
      <NavDrawerHeader navigation={navigation} />
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.contentWrapper}>
          <View style={styles.contentRow}>
            <View style={styles.rowTag}>
              <View style={styles.flexRow}>
                <View style={[styles.graphBg, styles.blueBg]}>
                  <MaterialCommunityIcons
                    name="bookmark-music"
                    size={22}
                    color="#fff"
                  />
                </View>
                <Text style={styles.playlistsText}>Best New Releases</Text>
              </View>
              <View style={styles.flexRow}>
                <TouchableOpacity
                  onPress={() => handleScrollRecentlyPlayed('left')}>
                  <View style={[styles.arrowWrapper, styles.marginRight]}>
                    <MaterialCommunityIcons
                      name="chevron-left"
                      size={30}
                      color="#000"
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleScrollRecentlyPlayed('right')}>
                  <View style={styles.arrowWrapper}>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={30}
                      color="#000"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView style={{marginTop: 16}} horizontal ref={scrollViewRef}>
              {data?.bestNewReleases ? (
                data?.bestNewReleases.map((newRelease, index) => (
                  <View
                    style={[
                      styles.singleCard,
                      {width: windowWidth / 2.34},
                      index !== data?.bestNewReleases?.length - 1 && {
                        marginRight: 20,
                      },
                    ]}
                    key={shortid.generate()}>
                    <Image
                      source={{
                        uri: newRelease.image,
                      }}
                      style={styles.cardImage}
                    />
                    <CustomText
                      type={1}
                      text={newRelease.title}
                      style={styles.cardText}
                    />
                    <CustomText
                      type={2}
                      text={newRelease.artiste}
                      style={styles.cardText2}
                    />
                  </View>
                ))
              ) : (
                <Text>None found</Text>
              )}
            </ScrollView>
          </View>
          <View style={styles.contentRow}>
            <View style={styles.rowTag}>
              <View style={styles.flexRow}>
                <View style={[styles.graphBg, styles.blueBg]}>
                  <MaterialIcons name="music-note" size={22} color="#fff" />
                </View>
                <Text style={styles.playlistsText}>Latest Music</Text>
              </View>
            </View>
            <View style={styles.topSongsContent}>
              {data?.topMusic?.length ? (
                <>
                  <View style={styles.topAlbumsWrapper}>
                    {data.topMusic.map((album, index) => (
                      <View key={index} style={styles.singleTopAlbum}>
                        <Image
                          source={{
                            uri: album.image,
                          }}
                          style={styles.topAlbumImage}
                        />
                        <Text
                          style={styles.musicTitleText}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {album.title}
                        </Text>
                        <Text
                          style={styles.musicArtisteText}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {album.artiste}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <Text style={styles.seeAllTopSongsText}>See All</Text>
                </>
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
