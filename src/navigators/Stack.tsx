import React from 'react';
import {Image, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Login, SignUp, Discover, LatestMusic, TopMusic} from '../views';
import GraphImage from '../assets/icons/graph-icon.png';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="TopMusic"
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
              size={size}
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
              size={size}
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
            <Image source={GraphImage} style={{height: 25, width: 25}} />
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
