import React from 'react';
import {Image, Text} from 'react-native';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Login,
  SignUp,
  Discover,
  LatestMusic,
  TopMusic,
  Spotlight,
  Genres,
  Playlists,
} from '../views';
import GraphImage from '../assets/icons/graph-icon.png';
import GenresImage from '../assets/icons/genres-icon.png';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Spotlight"
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
        name="Latest Music"
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
    </Drawer.Navigator>
  );
};

const AuthStack = () => {
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
    </Stack.Navigator>
  );
};

function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Drawer">
      <Stack.Screen
        name="Auth"
        component={AuthStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Drawer"
        component={DrawerStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AppStack;
