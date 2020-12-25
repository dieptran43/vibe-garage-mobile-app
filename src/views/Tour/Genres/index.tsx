import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import shortid from 'shortid';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import styles from './genresStyle';

export function Genres({navigation}: DrawerScreenProps<{}>) {
  const [data, setData] = useState({
    activeGenre: 'Other',
    genres: [
      {
        title: 'Other',
        image:
          'https://musicport.com.ng/upload/photos/2019/04/FaS2oOegTOBm5OpFJiCK_17_6ad5d4edf1fb542961a2a64a8d0768e7_image.jpg',
      },
      {
        title: 'Afro',
        image:
          'https://musicport.com.ng/upload/photos/2019/07/68DkAlKr1GRtggiWRYhb_04_ad587e82bfc4592aaccbc3b2c4fe5b01_image.jpg',
      },
      {
        title: 'Gospel',
        image:
          'https://musicport.com.ng/upload/photos/2019/07/ZBpoVTDzliExTdYeZwrP_04_1408f1308928382c57cd20322e0ed78f_image.jpg',
      },
      {
        title: 'Reggae',
        image:
          'https://musicport.com.ng/upload/photos/2020/03/hDRq4v2VnWXFTNqaGF1c_16_e7dd0ef5c323dd9cb97c7066fa64f8d8_image.jpg',
      },
    ],
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

  const handleSetData = (params: any) => {
    const obj = {} as any;
    for (const property in params) {
      obj[property] = params[property];
    }
    setData({...data, ...obj});
  };

  return (
    <View style={styles.genresContainer}>
      <NavDrawerHeader navigation={navigation} />
      <View style={styles.genresHeader}>
        <CustomText style={styles.genresText} type={1} text="Genres" />
        <View style={styles.genreCards}>
          {data.genres?.length
            ? data.genres.map((genre) => (
                <TouchableWithoutFeedback
                  key={shortid.generate()}
                  onPress={() => handleSetData({activeGenre: genre.title})}>
                  <View style={styles.singleGenreCard}>
                    <Image
                      source={{
                        uri: genre.image,
                      }}
                      style={styles.genreCardImage}
                    />
                    <View style={styles.genreCardShadow}>
                      <CustomText
                        style={[
                          styles.genreCardText,
                          data.activeGenre === genre.title
                            ? {color: '#CCAB52'}
                            : null,
                        ]}
                        type={1}
                        text={genre.title}
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              ))
            : null}
        </View>
      </View>
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.topSongsContent}>
          {data?.topMusic?.length ? (
            <>
              <View style={styles.topSongsWrapper}>
                {data.topMusic.map((music, index) => (
                  <View key={shortid.generate()} style={styles.singleTopSong}>
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
