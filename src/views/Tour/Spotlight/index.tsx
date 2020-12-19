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
            <View style={styles.spotlightRowOne}></View>
            <View style={styles.spotlightRowTwo}></View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
