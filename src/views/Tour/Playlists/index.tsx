import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import shortid from 'shortid';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import styles from './playlistsStyle';

export function Playlists({navigation}: DrawerScreenProps<{}>) {
  const [data, setData] = useState({
    playlists: [
      {
        artistImage:
          'https://musicport.com.ng/upload/photos/2020/06/eDbuX4CjczAZKYKB2wWf_27_dc2c86a1cbcb1e1b9a1f3fe6e6d7574f_image.jpg',
        artistName: 'Glory E Praise',
        albumName: 'Glory E Praise',
        albumImage:
          'https://musicport.com.ng/upload/photos/2020/06/kiSQblDDKUNKENFrinIh_24_68fc9d8a7fd60a42552efa4c6c1a9215_image.jpg',
      },
      {
        artistImage:
          'https://musicport.com.ng/upload/photos/2020/06/eDbuX4CjczAZKYKB2wWf_27_dc2c86a1cbcb1e1b9a1f3fe6e6d7574f_image.jpg',
        artistName: 'Glory E Praise',
        albumName: 'Glory E Praise',
        albumImage:
          'https://musicport.com.ng/upload/photos/2020/06/kiSQblDDKUNKENFrinIh_24_68fc9d8a7fd60a42552efa4c6c1a9215_image.jpg',
      },
      {
        artistImage:
          'https://musicport.com.ng/upload/photos/2020/06/eDbuX4CjczAZKYKB2wWf_27_dc2c86a1cbcb1e1b9a1f3fe6e6d7574f_image.jpg',
        artistName: 'Glory E Praise',
        albumName: 'Glory E Praise',
        albumImage:
          'https://musicport.com.ng/upload/photos/2020/06/kiSQblDDKUNKENFrinIh_24_68fc9d8a7fd60a42552efa4c6c1a9215_image.jpg',
      },
      {
        artistImage:
          'https://musicport.com.ng/upload/photos/2020/06/eDbuX4CjczAZKYKB2wWf_27_dc2c86a1cbcb1e1b9a1f3fe6e6d7574f_image.jpg',
        artistName: 'Glory E Praise',
        albumName: 'Glory E Praise',
        albumImage:
          'https://musicport.com.ng/upload/photos/2020/06/kiSQblDDKUNKENFrinIh_24_68fc9d8a7fd60a42552efa4c6c1a9215_image.jpg',
      },
      {
        artistImage:
          'https://musicport.com.ng/upload/photos/2020/06/eDbuX4CjczAZKYKB2wWf_27_dc2c86a1cbcb1e1b9a1f3fe6e6d7574f_image.jpg',
        artistName: 'Glory E Praise',
        albumName: 'Glory E Praise',
        albumImage:
          'https://musicport.com.ng/upload/photos/2020/06/kiSQblDDKUNKENFrinIh_24_68fc9d8a7fd60a42552efa4c6c1a9215_image.jpg',
      },
      {
        artistImage:
          'https://musicport.com.ng/upload/photos/2020/06/eDbuX4CjczAZKYKB2wWf_27_dc2c86a1cbcb1e1b9a1f3fe6e6d7574f_image.jpg',
        artistName: 'Glory E Praise',
        albumName: 'Glory E Praise',
        albumImage:
          'https://musicport.com.ng/upload/photos/2020/06/kiSQblDDKUNKENFrinIh_24_68fc9d8a7fd60a42552efa4c6c1a9215_image.jpg',
      },
    ],
  });

  return (
    <View style={styles.playlistsContainer}>
      <NavDrawerHeader navigation={navigation} />
      <View style={styles.playlistsHeader}>
        <View style={styles.flexRow}>
          <View style={styles.graphBg}>
            <MaterialCommunityIcons
              name="playlist-play"
              size={25}
              color="#fff"
            />
          </View>
          <Text style={styles.playlistsText}>Playlists</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.playlistsItems}>
          {data.playlists?.length
            ? data.playlists.map((playlist) => (
                <TouchableWithoutFeedback key={shortid.generate()}>
                  <View style={styles.singlePlaylist}>
                    <View style={styles.singlePlaylistRowOne}>
                      <View style={styles.flexRow}>
                        <Image
                          source={{
                            uri:
                              'https://musicport.com.ng/upload/photos/2020/06/eDbuX4CjczAZKYKB2wWf_27_dc2c86a1cbcb1e1b9a1f3fe6e6d7574f_image.jpg',
                          }}
                          style={styles.playlistImage}
                        />
                        <CustomText
                          style={styles.playlistTitle1}
                          type={1}
                          text="Glory E Praise"
                        />
                      </View>
                      <CustomText
                        style={styles.playlistTitle2}
                        type={1}
                        text="Glory E Praise"
                      />
                      <View style={styles.albumNumberRow}>
                        <Fontisto name="music-note" color="#c3c3c6" size={15} />
                        <CustomText
                          style={styles.albumNumberText}
                          type={1}
                          text={0}
                        />
                      </View>
                    </View>
                    <View style={styles.imageBackgroundWrapper}>
                      <Image
                        source={{
                          uri:
                            'https://musicport.com.ng/upload/photos/2020/06/kiSQblDDKUNKENFrinIh_24_68fc9d8a7fd60a42552efa4c6c1a9215_image.jpg',
                        }}
                        style={styles.imageBackground}
                      />
                      <AntDesign
                        name="play"
                        color="#fff"
                        size={30}
                        style={styles.playButton}
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              ))
            : null}
        </View>
      </ScrollView>
    </View>
  );
}
