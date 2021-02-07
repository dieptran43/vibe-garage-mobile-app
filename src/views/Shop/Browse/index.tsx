import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import shortid from 'shortid';
import Feather from 'react-native-vector-icons/Feather';
import GraphImage from '../../../assets/icons/graph-icon.png';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import styles from './browseStyle';
import {combineData, getImage} from '../../../utils/helpers';

export function Browse({navigation}: DrawerScreenProps<{}>) {
  const [data, setData] = useState({
    tab: 'Songs',
    songs: [
      {
        avatar:
          'upload/photos/2020/08/yNQ3m8obUoXmi7M4NONa_19_b3d46154a4dd0209624b466cf54b2294_image.jpg',
        title: 'Exhausted (I don tire).mp3',
        artist: 'Prince Amadi',
        duration: '3:32',
        releasedOn: '5 months ago',
        price: 200,
        isPurchased: true,
      },
      {
        avatar:
          'upload/photos/2020/06/RtyN25AvtFozMVwGmP66_25_bd9233a0e026b0e1a6f7f5e6fb579b00_image.jpg',
        title: 'MY MATTER ft KENNY ARA mp3',
        artist: 'Ebohon Tunde Tony',
        duration: '00:00:43',
        releasedOn: '7 months ago',
        price: 200,
        isPurchased: false,
      },
    ],
    albums: [
      {
        artistImage:
          'upload/photos/2020/06/eDbuX4CjczAZKYKB2wWf_27_dc2c86a1cbcb1e1b9a1f3fe6e6d7574f_image.jpg',
        artistName: 'Glory E Praise',
        albumName: 'Glory E Praise',
        albumImage:
          'upload/photos/2020/06/kiSQblDDKUNKENFrinIh_24_68fc9d8a7fd60a42552efa4c6c1a9215_image.jpg',
        releasedOn: '5 months ago',
        price: 3000,
        isPurchased: false,
      },
      {
        artistImage:
          'upload/photos/2020/06/eDbuX4CjczAZKYKB2wWf_27_dc2c86a1cbcb1e1b9a1f3fe6e6d7574f_image.jpg',
        artistName: 'Glory E Praise',
        albumName: 'Glory E Praise',
        albumImage:
          'upload/photos/2020/06/kiSQblDDKUNKENFrinIh_24_68fc9d8a7fd60a42552efa4c6c1a9215_image.jpg',
        releasedOn: '5 months ago',
        price: 3000,
        isPurchased: true,
      },
    ],
    topSeller: [],
  });

  const handleTab = (tab: String) => {
    setData(combineData(data, {tab}));
  };

  return (
    <View style={styles.browseContainer}>
      <NavDrawerHeader navigation={navigation} />
      <View style={styles.browseContent}>
        <View style={styles.tabHeader}>
          <TouchableWithoutFeedback onPress={() => handleTab('Songs')}>
            <View
              style={[
                styles.tabTextWrapper,
                data.tab === 'Songs' && styles.activeTabTextWrapper,
              ]}>
              <CustomText
                type={1}
                text="Songs"
                style={[
                  styles.tabText,
                  data.tab === 'Songs' && styles.activeTabText,
                ]}
              />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => handleTab('Albums')}>
            <View
              style={[
                styles.tabTextWrapper,
                data.tab === 'Albums' && styles.activeTabTextWrapper,
              ]}>
              <CustomText
                type={1}
                text="Albums"
                style={[
                  styles.tabText,
                  data.tab === 'Albums' && styles.activeTabText,
                ]}
              />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => handleTab('Top Seller')}>
            <View
              style={[
                styles.tabTextWrapper,
                data.tab === 'Top Seller' && styles.activeTabTextWrapper,
              ]}>
              <CustomText
                type={1}
                text="Top Seller"
                style={[
                  styles.tabText,
                  data.tab === 'Top Seller' && styles.activeTabText,
                ]}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <ScrollView style={styles.scrollViewContent}>
          {data.tab === 'Songs' ? (
            <View>
              {data?.songs?.map((song) => (
                <View style={styles.singleSongWrapper} key={shortid.generate()}>
                  <Image
                    source={{uri: getImage(song?.avatar)}}
                    style={styles.singleSongAvatar}
                  />
                  <View style={styles.sectionOne}>
                    <View style={styles.songOwner}>
                      <CustomText text={song?.title} type={1} />
                      <CustomText text={song?.artist} />
                    </View>
                    {song?.isPurchased ? (
                      <CustomText
                        size={12}
                        text="You have bought this track."
                        style={styles.boughtTrackText}
                      />
                    ) : (
                      <View style={styles.purchaseWrapper}>
                        <CustomText
                          type={1}
                          size={14}
                          text={`₦${song?.price}`}
                          style={styles.priceText}
                        />
                        <TouchableWithoutFeedback>
                          <Text style={styles.purchaseText}>Purchase</Text>
                        </TouchableWithoutFeedback>
                      </View>
                    )}
                    <View style={styles.songBottomRow}>
                      <CustomText type={1} text={song?.duration} />
                      <CustomText type={1} text={song?.releasedOn} />
                      <Feather name="more-horizontal" size={20} color="#fff" />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : data.tab === 'Albums' ? (
            <View>
              {data?.albums?.map((album) => (
                <View style={styles.singleSongWrapper} key={shortid.generate()}>
                  <Image
                    source={{uri: getImage(album?.albumImage)}}
                    style={styles.singleSongAvatar}
                  />
                  <View style={styles.sectionOne}>
                    <View style={styles.songOwner}>
                      <CustomText text={album?.albumName} type={1} />
                      <CustomText text={album?.artistName} />
                    </View>
                    {album?.isPurchased ? (
                      <CustomText
                        size={12}
                        text="You have bought this track."
                        style={styles.boughtTrackText}
                      />
                    ) : (
                      <View style={styles.purchaseWrapper}>
                        <CustomText
                          type={1}
                          size={14}
                          text={`₦${album?.price}`}
                          style={styles.priceText}
                        />
                        <TouchableWithoutFeedback>
                          <Text style={styles.purchaseText}>Purchase</Text>
                        </TouchableWithoutFeedback>
                      </View>
                    )}
                    <View style={styles.songBottomRow}>
                      <CustomText type={1} text={album?.releasedOn} />
                      <Feather name="more-horizontal" size={20} color="#fff" />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : data.tab === 'Top Seller' ? (
            <View>
              <View style={styles.flexHeader}>
                <View style={styles.graphBg}>
                  <Image source={GraphImage} style={styles.graphImage} />
                </View>
                <Text style={styles.topMusicText}>Top Songs</Text>
              </View>
            </View>
          ) : null}
        </ScrollView>
      </View>
    </View>
  );
}
