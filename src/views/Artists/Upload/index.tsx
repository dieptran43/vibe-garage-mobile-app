import React, {useState} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText, CustomModal} from '../../../components/Global';
import SingleSongModal from './SingleSongModal';
import SingleAlbumModal from './SingleAlbumModal';
import styles from './uploadStyle';
import {combineData} from '../../../utils/helpers';

export function Upload({navigation}: DrawerScreenProps<{}>) {
  const [data, setData] = useState({
    uploadType: '',
    album_id: 0,
  });

  const handleModal = (value: any) => {
    setData(combineData(data, {uploadType: value}));
  };

  const handleAddSongToAlbum = (album: any) => {
    const album_id = album?.album_id;
    setData(combineData(data, {uploadType: 'song', album_id}));
  };

  return (
    <View style={styles.uploadContainer}>
      <NavDrawerHeader navigation={navigation} />
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.layoutContent}>
          <TouchableOpacity
            style={styles.singleCard}
            onPress={() => handleModal('song')}>
            <View style={styles.iconWrapper}>
              <MaterialIcons name="music-note" color="#fff" size={30} />
            </View>
            <CustomText
              type={1}
              text="Upload single song"
              style={styles.uploadSingleSongText}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.singleCard}
            onPress={() => handleModal('album')}>
            <View style={styles.iconWrapper}>
              <MaterialIcons name="library-music" color="#fff" size={30} />
            </View>
            <CustomText
              type={1}
              text="Upload an album"
              style={styles.uploadSingleSongText}
            />
          </TouchableOpacity>
          {data?.uploadType === 'song' ? (
            <CustomModal
              height="80%"
              width="100%"
              title="Upload Song"
              onModalClose={() => handleModal(null)}
              customContent={() => (
                <SingleSongModal
                  onClose={() => handleModal(null)}
                  album_id={data?.album_id}
                />
              )}></CustomModal>
          ) : data?.uploadType === 'album' ? (
            <CustomModal
              height="80%"
              width="100%"
              title="Upload Album"
              onModalClose={() => handleModal(null)}
              customContent={() => (
                <SingleAlbumModal
                  onClose={() => handleModal(null)}
                  onAddSong={(album: any) => handleAddSongToAlbum(album)}
                />
              )}></CustomModal>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}
