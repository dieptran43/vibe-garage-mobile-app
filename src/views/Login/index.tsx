import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './loginStyle';
import Logo from '../../assets/images/logo.jpg';

export const Login: React.FC<{}> = () => {
  return (
    <View style={styles.loginContainer}>
      <KeyboardAvoidingView enabled>
        <View style={styles.loginWrapper}>
          <Image style={styles.appLogo} source={Logo} />
          <TextInput
            style={[styles.textInput, styles.marginBottom30]}
            placeholder="Username"
          />
          <TextInput style={styles.textInput} placeholder="Password" />
          <Pressable style={styles.forgotPasswordWrapper}>
            <Text style={styles.forgotPassword}>Forgot Password ?</Text>
          </Pressable>
          <TouchableOpacity style={styles.loginBtnWrapper}>
            <Text style={styles.loginBtnText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
