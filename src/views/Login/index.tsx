import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';
import styles from './loginStyle';
import Logo from '../../assets/images/logo.jpg';
import {navigateToNestedRoute} from '../../navigators/RootNavigation';
import {login} from '../../services/authService';

export function Login({navigation}: StackScreenProps<{}>) {
  const [data, setData] = useState({
    hasFilledAllFields: false,
  });

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

      return () =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          handleBackButtonClick,
        );
    }, []),
  );

  const handleBackButtonClick = () => {
    navigateToNestedRoute('Drawer', 'Discover');

    return true;
  };

  const handleStackNavigation = (route: String) => {
    navigateToNestedRoute('Auth', route);
  };

  const handleLogin = async () => {};

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
          <View style={styles.forgotPwdView}>
            <TouchableOpacity
              style={styles.alignLeft}
              onPress={() => handleStackNavigation('ForgotPassword')}>
              <Text style={styles.linkText}>Forgot Password ?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              styles.loginBtnWrapper,
              data.hasFilledAllFields
                ? styles.loginBtnWrapperEnabled
                : styles.loginBtnWrapperDisabled,
            ]}
            onPress={() => handleLogin()}>
            <Text style={styles.loginBtnText}>Login</Text>
          </TouchableOpacity>
          <View style={[styles.flexRow, styles.marginBottom20]}>
            <Text style={styles.grayText}>Already have an account ?</Text>
            <TouchableOpacity onPress={() => handleStackNavigation('SignUp')}>
              <Text style={styles.goldText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
