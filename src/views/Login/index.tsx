import React, {useState} from 'react';
import {View, Text} from 'react-native';
import styles from './loginStyle';

export const Login: React.FC<{}> = () => {
  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginWrapper}>
        <Text>Login</Text>
      </View>
    </View>
  );
};
