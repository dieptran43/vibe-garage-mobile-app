import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login, SignUp} from '../views';

const Stack = createStackNavigator();

function AppStack() {
  return (
    // <Stack.Navigator initialRouteName="Auth">
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
}

export default AppStack;
