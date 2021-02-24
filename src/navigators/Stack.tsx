import React from 'react';
import {Image, Text} from 'react-native';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Login,
  SignUp,
  Discover,
  LatestMusic,
  TopMusic,
  Spotlight,
  Genres,
  Playlists,
  Browse,
  Purchased,
  RecentlyPlayed,
  MyPlaylists,
  Favourites,
  Upload,
  GetCredit,
  BecomeAnArtist,
  MyPlatform,
  Track,
} from '../views';
import GraphImage from '../assets/icons/graph-icon.png';
import GenresImage from '../assets/icons/genres-icon.png';
import BrowseImage from '../assets/icons/house-icon.png';
import PurchaseImage from '../assets/icons/purchased-icon.png';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Discover"
      drawerStyle={{backgroundColor: '#222225'}}
      drawerContentOptions={{
        activeTintColor: '#e91e63',
      }}>
      <Drawer.Screen
        name="Discover"
        component={Discover}
        options={{
          drawerLabel: ({focused, color}) => (
            <Text style={{color: '#fff'}}>Discover</Text>
          ),
          drawerIcon: ({focused, size}) => (
            <Fontisto
              name="music-note"
              size={20}
              color={focused ? '#fff' : '#ccc'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="LatestMusic"
        component={LatestMusic}
        options={{
          drawerLabel: ({focused, color}) => (
            <Text style={{color: '#fff'}}>Latest Music</Text>
          ),
          drawerIcon: ({focused, size}) => (
            <MaterialIcons
              name="music-note"
              size={22}
              color={focused ? '#fff' : '#ccc'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="TopMusic"
        component={TopMusic}
        options={{
          drawerLabel: ({focused, color}) => (
            <Text style={{color: '#fff'}}>Top Music</Text>
          ),
          drawerIcon: ({focused, size}) => (
            <Image source={GraphImage} style={{height: 20, width: 20}} />
          ),
        }}
      />
      <Drawer.Screen
        name="Spotlight"
        component={Spotlight}
        options={{
          drawerLabel: ({focused, color}) => (
            <Text style={{color: '#fff'}}>Spotlight</Text>
          ),
          drawerIcon: ({focused, size}) => (
            <MaterialCommunityIcons
              name="water"
              size={size}
              color={focused ? '#fff' : '#ccc'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Genres"
        component={Genres}
        options={{
          drawerLabel: ({focused, color}) => (
            <Text style={{color: '#fff'}}>Genres</Text>
          ),
          drawerIcon: ({focused, size}) => (
            <Image source={GenresImage} style={{height: 25, width: 25}} />
          ),
        }}
      />
      <Drawer.Screen
        name="Playlists"
        component={Playlists}
        options={{
          drawerLabel: ({focused, color}) => (
            <Text style={{color: '#fff'}}>Playlists</Text>
          ),
          drawerIcon: ({focused, size}) => (
            <MaterialIcons
              name="playlist-play"
              size={25}
              color={focused ? '#fff' : '#ccc'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Browse"
        component={Browse}
        options={{
          drawerLabel: ({focused, color}) => (
            <Text style={{color: '#fff'}}>Browse</Text>
          ),
          drawerIcon: ({focused, size}) => (
            <Image source={BrowseImage} style={{height: 23, width: 23}} />
          ),
        }}
      />
      <Drawer.Screen
        name="Purchased"
        component={Purchased}
        options={{
          drawerLabel: ({focused, color}) => (
            <Text style={{color: '#fff'}}>Purchased</Text>
          ),
          drawerIcon: ({focused, size}) => (
            <Image source={PurchaseImage} style={{height: 20, width: 20}} />
          ),
        }}
      />
      <Drawer.Screen
        name="RecentlyPlayed"
        component={RecentlyPlayed}
        options={{
          drawerLabel: ({focused, color}) => (
            <Text style={{color: '#fff'}}>Recently Played</Text>
          ),
          drawerIcon: ({focused, size}) => (
            <MaterialCommunityIcons
              name="history"
              size={25}
              color={focused ? '#fff' : '#ccc'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="MyPlaylists"
        component={MyPlaylists}
        options={{
          drawerLabel: ({focused, color}) => (
            <Text style={{color: '#fff'}}>My Playlists</Text>
          ),
          drawerIcon: ({focused, size}) => (
            <MaterialIcons
              name="queue-music"
              size={25}
              color={focused ? '#fff' : '#ccc'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Favourites"
        component={Favourites}
        options={{
          drawerLabel: ({focused, color}) => (
            <Text style={{color: '#fff'}}>Favourites</Text>
          ),
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name="star-outline"
              size={25}
              color={focused ? '#fff' : '#ccc'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="GetCredit"
        component={GetCredit}
        options={{
          drawerLabel: ({focused, color}) => null,
          drawerIcon: ({focused, size}) => null,
        }}
      />
      <Drawer.Screen
        name="BecomeAnArtist"
        component={BecomeAnArtist}
        options={{
          drawerLabel: ({focused, color}) => null,
          drawerIcon: ({focused, size}) => null,
        }}
      />
      <Drawer.Screen
        name="Upload"
        component={Upload}
        options={{
          drawerLabel: ({focused, color}) => null,
          drawerIcon: ({focused, size}) => null,
        }}
      />
    </Drawer.Navigator>
  );
};

const SingleStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyPlatform"
        component={MyPlatform}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Track"
        component={Track}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

function AppStack() {
  return (
    <Stack.Navigator initialRouteName="DrawerStack">
      <Stack.Screen
        name="SingleStack"
        component={SingleStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DrawerStack"
        component={DrawerStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AppStack;
