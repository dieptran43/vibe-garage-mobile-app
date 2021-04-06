import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import styles from './profileStyle';
import {CustomText} from '../../../components/Global';
import {AuthContext} from '../../../context';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';
import {getScreenParent} from '../../../utils/navigationHelper';
import {combineData, getFromOldUrl} from '../../../utils/helpers';

export function Profile({navigation}: DrawerScreenProps<{}>) {
  return (
    <View style={styles.container}>
      <NavDrawerHeader navigation={navigation} />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          
        </ScrollView>
      </View>
    </View>
  );
}
