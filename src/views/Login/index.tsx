import React, {useState} from 'react';
import {View, Text, TextInput, Pressable, Image, TouchableHighlight} from 'react-native';
import styles from './loginStyle';
import Logo from '../../assets/images/logo.jpg';

export const Login: React.FC<{}> = () => {
  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginWrapper}>
        <Image style={styles.appLogo} source={Logo} />
        <TextInput
          style={[styles.textInput, styles.marginBottom20]}
          placeholder="Username"
        />
        <TextInput style={styles.textInput} placeholder="Password" />
        <Pressable style={styles.forgotPasswordWrapper}>
          <Text style={styles.forgotPassword}>Forgot Password ?</Text>
        </Pressable>
        <TouchableHighlight style={styles.loginBtnWrapper}>
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
