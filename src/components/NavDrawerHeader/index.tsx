import React, {useContext} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './navDrawerHeaderStyle';
import NavIcon from '../../assets/icons/menu-icon.png';
import Logo from '../../assets/images/logo-modified.png';
import {AuthContext} from '../../context';

export default function NavDrawerHeader({navigation}: any) {
  const {state, dispatch}: any = useContext(AuthContext);

  const handleToggleNavDrawer = () => {
    navigation.openDrawer();
  };

  const handleLogout = async () => {
    await dispatch({
      type: 'populateUser',
      payload: {user: {}, isLoggedIn: false},
    });
    await AsyncStorage.clear();
    await Keychain.resetGenericPassword();
  };

  return (
    <View style={styles.navHeader}>
      <TouchableOpacity onPress={() => handleToggleNavDrawer()}>
        <Image source={NavIcon} style={styles.navIconImage} />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logoImage} />
      </View>
      <View style={styles.controlIcons}>
        <Ionicons name="search" size={23} color="#ebebeb" />
        <Menu>
          <MenuTrigger>
            <MaterialCommunityIcons
              name="account-circle"
              size={23}
              color="#ebebeb"
              style={{marginLeft: 15}}
            />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => handleLogout()}>
              <Text style={styles.menuOptionText}>Logout</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
}
