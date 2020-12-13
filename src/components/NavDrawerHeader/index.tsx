import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './navDrawerHeaderStyle';
import NavIcon from '../../assets/icons/menu-icon.png';
import Logo from '../../assets/images/header-logo.png';

export default function NavDrawerHeader({navigation}: any) {
  const handleToggleNavDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.navHeader}>
      <TouchableOpacity onPress={() => handleToggleNavDrawer()}>
        <Image source={NavIcon} style={styles.navIconImage} />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logoImage} />
        <View style={styles.logoBackground}></View>
      </View>
      <View style={styles.controlIcons}>
        <Ionicons name="search" size={23} color="#ebebeb" />
        <MaterialCommunityIcons
          name="account-circle"
          size={23}
          color="#ebebeb"
          style={{marginLeft: 15}}
        />
      </View>
    </View>
  );
}
