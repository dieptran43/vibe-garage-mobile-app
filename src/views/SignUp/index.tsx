import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './signUpStyle';
import Logo from '../../assets/images/logo.jpg';
import {navigateToNestedRoute} from '../../navigators/RootNavigation';

export function SignUp() {
  const handleStackNavigation = (route: String) => {
    navigateToNestedRoute('Auth', route);
  };

  return (
    <View style={styles.signUpContainer}>
      <KeyboardAvoidingView enabled>
        <View style={styles.signUpWrapper}>
          <Image style={styles.appLogo} source={Logo} />
          <TextInput style={[styles.textInput]} placeholder="Firstname" />
          <TextInput style={styles.textInput} placeholder="Lastname" />
          <TextInput style={styles.textInput} placeholder="Email" />
          <TextInput style={styles.textInput} placeholder="Password" />
          <TextInput style={styles.textInput} placeholder="Confirm Password" />
          <TouchableOpacity style={styles.signUpBtnWrapper}>
            <Text style={styles.signUpBtnText}>Signup</Text>
          </TouchableOpacity>
          <View style={[styles.flexRow, styles.marginBottom20]}>
            <Text style={styles.grayText}>Already have an account ?</Text>
            <TouchableOpacity onPress={() => handleStackNavigation('Login')}>
              <Text style={styles.goldText}>Login</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.grayText2}>By signing up, you agree to our</Text>
          <View style={[styles.flexRow]}>
            <Text style={[styles.goldText, styles.marginRight5]}>Terms</Text>
            <Text style={styles.grayText2}>and</Text>
            <Text style={[styles.goldText, styles.marginLeft5]}>
              Privacy Policy
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
