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

export const SignUp: React.FC<{}> = () => {
  return (
    <View style={styles.signUpContainer}>
      <ScrollView
        style={styles.signUpWrapper}
        showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView enabled>
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
            <Text style={styles.goldText}>Login</Text>
          </View>
          <Text style={styles.grayText2}>By signing up, you agree to our</Text>
          <View style={[styles.flexRow]}>
            <Text style={[styles.goldText, styles.marginRight5]}>Terms</Text>
            <Text style={styles.grayText2}>and</Text>
            <Text style={[styles.goldText, styles.marginLeft5]}>
              Privacy Policy
            </Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
