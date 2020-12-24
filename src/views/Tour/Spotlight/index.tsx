import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import styles from './spotLightStyle';
import SpotlightImage from '../../../assets/images/spotlight-image.png';
import NavDrawerHeader from '../../../components/NavDrawerHeader';

export function Spotlight({navigation}: DrawerScreenProps<{}>) {
  return (
    <View style={styles.spotlightContainer}>
      <NavDrawerHeader navigation={navigation} />
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.spotlightHeader}>
          <Image source={SpotlightImage} style={styles.spotlightImage} />
          <Text style={styles.spotlightText}>Spotlight</Text>
        </View>
        <View style={styles.spotlightContent}>
          <View style={styles.singleSpotlightWrapper}>
            <View style={styles.spotlightRowOne}>
              <Image
                source={{
                  uri:
                    'https://musicport.com.ng/upload/photos/2019/07/pAEpOEf9lXPKbGuSjbbL_16_ece36b8b4e4de9c559ea3afed74fd09f_image.jpg',
                }}
                style={styles.artistImage}
              />
              <View>
                <Text>Benson Ucheowaji</Text>
                <View style={styles.flexRow}>
                  <Text>Uploaded a new song, </Text>
                  <Text>about a year ago</Text>
                </View>
              </View>
            </View>
            <View style={styles.spotlightRowTwo}></View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
