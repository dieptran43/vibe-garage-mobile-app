import React, {useState} from 'react';
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
  FlatList
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DrawerScreenProps} from '@react-navigation/drawer';
import shortid from 'shortid';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import styles from './discoverStyle';

const windowWidth = Dimensions.get('window').width;

export function Discover({navigation}: DrawerScreenProps<{}>) {
  const [data, setData] = useState({
    carouselItems: [
      {
        title: 'October special',
        image:
          'https://musicport.com.ng/upload/photos/2019/10/NuJHxVutEiIgT86CcFqr_06_6dfa801e8668b414c32232e7c8b93426_image.jpg',
      },
      {
        title: 'LABIS BOY_MAN OF THE YEAR.mp3',
        image:
          'https://musicport.com.ng/upload/photos/2019/10/J7qytBWEsADF5zBsC6Os_17_98885479029d3e547509c8e8ea8d1e3b_image.jpg',
      },
      {
        title: 'November TOP 5',
        image:
          'https://musicport.com.ng/upload/photos/2019/11/wbWF1rYguTq8JtKZIaM6_22_a47c1c30c1e7318a49df8de5748a9ea7_image.jpeg',
      },
      {
        title: 'Exhausted (I don tire).mp3',
        image:
          'https://musicport.com.ng/upload/photos/2020/01/MUDLnD9cXKhvkVJuUGAK_29_0c0801563af4b03dea742996a6cde2e0_image.png',
      },
    ],
    recentlyPlayed:[]
  });

  const _renderItem = ({item}: any) => {
    return (
      <View style={styles.carouselContainer}>
        <Image source={{uri: item?.image}} style={styles.carouselImage} />
        <Text style={styles.carouselText}>{item.title}</Text>
      </View>
    );
  };

  const _renderColumn = () => {
    return (
      <View style={styles.singleCard}>
        <Image
          source={{
            uri:
              'https://musicport.com.ng/upload/photos/2020/01/BTCHNCgZsQdDhSc3q2Uo_20_166e4ab24c7f858195f3a0c3909f2fe3_image.jpg',
          }}
          style={styles.cardImage}
        />
        <CustomText
          type={1}
          text="LABIS BOY_ROCK THE PARTY.mp3"
          style={styles.cardText}
        />
        <CustomText type={2} text="Itz Labisboy" style={styles.cardText2} />
      </View>
    );
  };

  return (
    <View style={styles.discoverContainer}>
      <NavDrawerHeader navigation={navigation} />
      <ScrollView style={styles.scrollViewContent}>
        <Carousel
          layout={'default'}
          data={data.carouselItems}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
          renderItem={_renderItem}
          onSnapToItem={(index: any) => console.log(index)}
          style={styles.carouselContent}
        />
        <View style={styles.contentWrapper}>
          <View style={styles.rowTag}>
            <View style={styles.flexRow}>
              <View style={styles.graphBg}>
                <MaterialCommunityIcons name="history" size={25} color="#fff" />
              </View>
              <Text style={styles.playlistsText}>Recently Played</Text>
            </View>
            <View style={styles.flexRow}>
              <CustomText type={2} text="Show All" style={styles.showAllText} />
              <View style={[styles.arrowWrapper, styles.marginRight]}>
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={30}
                  color="#000"
                />
              </View>
              <View style={styles.arrowWrapper}>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={30}
                  color="#000"
                />
              </View>
            </View>
          </View>
          <View style={{marginTop: 16, width: '100%'}}>
            {/* <FlatList
              data={recentlyPlayed}
              keyExtractor={(item) => item.id}
              renderItem={this.renderGridItem}
              horizontal={false}
              numColumns={2}
              contentContainerStyle={[
                styles.sectionProducts,
                isSearchVisible ? styles.paddingTop : styles.paddingTop15,
              ]}
              onEndReached={() => this.scrolledToBottom()}
              onEndReachedThreshold={0.5}
            /> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
