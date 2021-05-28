import React, {useContext, useState, createRef} from 'react';
import {View, TouchableOpacity, Image, Text, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import shortid from 'shortid';
import styles from './navDrawerHeaderStyle';
import NavIcon from '../../assets/icons/menu-icon.png';
import Logo from '../../assets/images/logo-modified.png';
import {AuthContext} from '../../context';
import {getScreenParent} from '../../utils/navigationHelper';
import {navigateToNestedRoute} from '../../navigators/RootNavigation';
import {
  signOutOfFacebook,
  debounce,
  combineData,
  getFromOldUrl,
} from '../../utils/helpers';
import {getTopSongs} from '../../services/songService';
import {ISong, IAlbum} from '../../types/interfaces';

export default function NavDrawerHeader({navigation}: any) {
  const {state, dispatch}: any = useContext(AuthContext);
  const {user} = state;
  const [data, setData] = useState({
    isSearchVisible: false,
    searchText: '',
    searchResult: null as any,
  });
  const searchField = createRef<TextInput>();

  const handleToggleNavDrawer = () => {
    navigation?.openDrawer();
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      await dispatch({
        type: 'populateUser',
        payload: {user: {}, isLoggedIn: false},
      });
      signOutOfFacebook();
      handleNavigation('Discover');
    } catch (error) {
      console.error(error);
    }
  };

  const handleNavigation = (route: string) => {
    navigateToNestedRoute(getScreenParent(route), route);
  };

  const handleNavigateToSong = (route: string, params?: ISong) => {
    console.log('hey');
    setData(combineData(data, {moreView: null}));
    navigateToNestedRoute(getScreenParent(route), route, params);
  };

  const handleToggleSearch = () => {
    let {isSearchVisible} = data;
    isSearchVisible = !isSearchVisible;
    const searchResult = null;
    setData({...data, isSearchVisible, searchResult});
  };

  const handleSearchText = (searchText: string) => {
    if (searchText) {
      debounce(handleSearchRequest(searchText), 500);
    }
    setData({...data, searchText});
  };

  const handleClearSearch = () => {
    searchField.current?.clear();
    setData({...data, searchText: ''});
  };

  const handleSearchRequest = (searchText: string) => {
    try {
      getTopSongs().then((response: any) => {
        let searchResult = [];
        if (response && response?.success) {
          searchResult = response?.songs?.data;
        }
        console.log(searchResult);
        setData(combineData(data, {searchResult}));
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.navHeader}>
      <View style={styles.navSection}>
        <TouchableOpacity onPress={() => handleToggleNavDrawer()}>
          <Image source={NavIcon} style={styles.navIconImage} />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logoImage} />
        </View>
        <View style={styles.controlIcons}>
          <TouchableOpacity onPress={() => handleToggleSearch()}>
            <Ionicons name="search" size={23} color="#ebebeb" />
          </TouchableOpacity>
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
              {state?.isLoggedIn ? (
                <>
                  <MenuOption onSelect={() => handleNavigation('GetCredit')}>
                    <Text style={styles.menuOptionText}>Wallet</Text>
                  </MenuOption>
                  {user?.artist != 1 ? (
                    <>
                      <MenuOption
                        onSelect={() => handleNavigation('BecomeAnArtist')}>
                        <Text style={styles.menuOptionText}>
                          Become an artist
                        </Text>
                      </MenuOption>
                    </>
                  ) : user?.artist == 1 ? (
                    <>
                      <MenuOption
                        onSelect={() => handleNavigation('MyPlatform')}>
                        <Text style={styles.menuOptionText}>My Platform</Text>
                      </MenuOption>
                      <MenuOption onSelect={() => handleNavigation('Upload')}>
                        <Text style={styles.menuOptionText}>Upload</Text>
                      </MenuOption>
                      <MenuOption
                        onSelect={() => handleNavigation('Dashboard')}>
                        <Text style={styles.menuOptionText}>Dashboard</Text>
                      </MenuOption>
                    </>
                  ) : null}
                  {user?.is_subscribed !== '1' ? (
                    <MenuOption
                      onSelect={() => handleNavigation('SubscribeToPremium')}>
                      <Text style={styles.menuOptionText}>
                        Subscribe to Premium
                      </Text>
                    </MenuOption>
                  ) : null}
                  {/* <MenuOption onSelect={() => handleNavigation('Profile')}>
                  <Text style={styles.menuOptionText}>Profile</Text>
                </MenuOption> */}
                  <MenuOption onSelect={() => handleLogout()}>
                    <Text style={styles.menuOptionText}>Logout</Text>
                  </MenuOption>
                </>
              ) : (
                <>
                  <MenuOption onSelect={() => handleNavigation('Login')}>
                    <Text style={styles.menuOptionText}>Login</Text>
                  </MenuOption>
                  <MenuOption onSelect={() => handleNavigation('SignUp')}>
                    <Text style={styles.menuOptionText}>Register</Text>
                  </MenuOption>
                </>
              )}
            </MenuOptions>
          </Menu>
        </View>
      </View>
      {data?.isSearchVisible ? (
        <View style={styles.searchContainer}>
          <View style={styles.searchHeader}>
            <TouchableOpacity onPress={() => handleToggleSearch()}>
              <Ionicons
                name="arrow-back"
                size={25}
                color="#ccc"
                style={styles.searchBackIcon}
              />
            </TouchableOpacity>
            <View style={styles.searchInputWrapper}>
              <TextInput
                ref={searchField}
                placeholder="Search"
                style={styles.searchInput}
                placeholderTextColor="gray"
                onChangeText={(searchText) => handleSearchText(searchText)}
              />
              {data?.searchText ? (
                <TouchableOpacity
                  style={styles.clearSearchIcon}
                  onPress={() => handleClearSearch()}>
                  <AntDesign name="close" size={20} color="#222225" />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          <View style={styles.searchBody}>
            {data.searchResult?.length === 0 ? (
              <Text>None found</Text>
            ) : data.searchResult?.length ? (
              <View style={styles.topSongsWrapper}>
                {data.searchResult
                  .slice(0, 4)
                  .map((song: any, index: Number) => (
                    <TouchableOpacity
                      key={shortid.generate()}
                      style={styles.singleTopSong}
                      onPress={() => handleNavigateToSong('Track', song)}>
                      <Image
                        source={{
                          uri: getFromOldUrl(song?.thumbnail),
                        }}
                        style={styles.topMusicImage}
                      />
                      <View style={styles.musicTextWrapper}>
                        <Text
                          style={styles.musicTitleText}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {song?.title}
                        </Text>
                        <Text
                          style={styles.musicArtisteText}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {song?.artist_data?.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
              </View>
            ) : null}
          </View>
        </View>
      ) : null}
    </View>
  );
}
