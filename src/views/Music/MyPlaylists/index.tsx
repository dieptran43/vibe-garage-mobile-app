import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
// import Carousel from 'react-native-snap-carousel';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {useIsFocused} from '@react-navigation/native';
import shortid from 'shortid';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import styles from './myPlaylistsStyle';
import {AuthContext} from '../../../context';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';

export function MyPlaylists({navigation}: DrawerScreenProps<{}>) {
  const {state, dispatch}: any = useContext(AuthContext);
  const [data, setData] = useState({});
  const isFocused = useIsFocused();

  useEffect(() => {
    handleCheckLogin();
  }, [isFocused]);

  const handleCheckLogin = () => {
    if (!state?.isLoggedIn) {
      navigateToNestedRoute('SingleStack', 'Login', {
        screenFrom: 'MyPlaylists',
      });
    }
  };

  return (
    <View style={styles.myPlaylistsContainer}>
      <NavDrawerHeader navigation={navigation} />
      <ScrollView style={styles.scrollViewContent}>
        <Text>My Playlists</Text>
      </ScrollView>
    </View>
  );
}
