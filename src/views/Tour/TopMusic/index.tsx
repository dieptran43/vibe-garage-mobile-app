import React, {useState} from 'react';
import {View, Text, Image, ScrollView, ImagePropTypes} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './topMusicStyle';
import GraphImage from '../../../assets/icons/graph-icon.png';
import NavDrawerHeader from '../../../components/NavDrawerHeader';

export function TopMusic({navigation}: DrawerScreenProps<{}>) {
  const [data, setData] = useState({
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
    topAlbums: [
      {
        image:
          'https://musicport.com.ng/upload/photos/2020/07/kHefVG1WBtABPvydNEeG_15_df4eb27ba05bda27a9ab7ca7daed9a3a_image.jpg',
        title: 'SLEEPING DEAD',
        artiste: 'Emmanuel Jackson',
      },
      {
        image:
          'https://musicport.com.ng/upload/photos/2020/07/kHefVG1WBtABPvydNEeG_15_df4eb27ba05bda27a9ab7ca7daed9a3a_image.jpg',
        title: 'SLEEPING DEAD',
        artiste: 'Emmanuel Jackson',
      },
      {
        image:
          'https://musicport.com.ng/upload/photos/2020/07/kHefVG1WBtABPvydNEeG_15_df4eb27ba05bda27a9ab7ca7daed9a3a_image.jpg',
        title: 'SLEEPING DEAD',
        artiste: 'Emmanuel Jackson',
      },
      {
        image:
          'https://musicport.com.ng/upload/photos/2020/07/kHefVG1WBtABPvydNEeG_15_df4eb27ba05bda27a9ab7ca7daed9a3a_image.jpg',
        title: 'SLEEPING DEAD',
        artiste: 'Emmanuel Jackson',
      },
    ],
  });

  return (
    <View style={styles.topMusicContainer}>
      <NavDrawerHeader navigation={navigation} />

      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.topMusicContent}>
          <View style={styles.topSongsHeader}>
            <View style={styles.flexRow}>
              <View style={styles.graphBg}>
                <Image source={GraphImage} style={styles.graphImage} />
              </View>
              <Text style={styles.topMusicText}>Top Music</Text>
            </View>
            <Text style={styles.showAllText}>SHOW ALL</Text>
          </View>
          <View style={styles.topSongsContent}>
            {data?.topMusic?.length ? (
              <>
                <View style={styles.topSongsWrapper}>
                  {data.topMusic.map((music, index) => (
                    <View key={index} style={styles.singleTopSong}>
                      <Image
                        source={{
                          uri: music.image,
                        }}
                        style={styles.topMusicImage}
                      />
                      <View style={styles.musicTextWrapper}>
                        <Text
                          style={styles.musicTitleText}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {music.title}
                        </Text>
                        <Text
                          style={styles.musicArtisteText}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {music.artiste}
                        </Text>
                      </View>
                      <MaterialIcons
                        name="more-horiz"
                        style={styles.musicMoreIcon}
                        color="#919191"
                        size={25}
                      />
                    </View>
                  ))}
                </View>
                <Text style={styles.seeAllTopSongsText}>See All</Text>
              </>
            ) : (
              <View style={styles.noneFoundWrapper}>
                <Text style={styles.noneFoundText}>None found</Text>
              </View>
            )}
          </View>
          <View style={styles.topSongsHeader}>
            <View style={styles.flexRow}>
              <View style={styles.graphBg}>
                <Image source={GraphImage} style={styles.graphImage} />
              </View>
              <Text style={styles.topMusicText}>Top Albums</Text>
            </View>
          </View>
          <View style={styles.topSongsContent}>
            {data?.topAlbums?.length ? (
              <>
                <View style={styles.topAlbumsWrapper}>
                  {data.topAlbums.map((album, index) => (
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
            ) : (
              <View style={styles.noneFoundWrapper}>
                <Text style={styles.noneFoundText}>None found</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
