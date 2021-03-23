import React, {useState, useCallback, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  Keyboard,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import styles from './loginStyle';
import Logo from '../../assets/images/logo.jpg';
import {navigateToNestedRoute} from '../../navigators/RootNavigation';
import {login} from '../../services/authService';
import {AuthContext} from '../../context';
import {getScreenParent} from '../../utils/navigationHelper';

const initialFields = {email: '', password: ''};

export function Login({route, navigation}: StackScreenProps<{}>) {
  const {state, dispatch}: any = useContext(AuthContext);
  const screenParams: any = route?.params;
  const [data, setData] = useState({
    hasFilledAllFields: false,
    isPasswordHidden: true,
    isLoggingIn: false,
    accountLoginError: '',
    fields: initialFields,
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
    navigateToNestedRoute('DrawerStack', 'Discover');

    return true;
  };

  const handleNavigation = (route: String) => {
    navigateToNestedRoute(getScreenParent(route), route);
  };

  const handleLogin = async () => {
    try {
      Keyboard.dismiss();

      setData({
        ...data,
        isLoggingIn: true,
        accountLoginError: '',
      });
      const fields = data?.fields;
      await login(fields)
        .then(async (response: any) => {
          const user = response?.user;
          const token = response?.token;
          if (user) {
            await dispatch({
              type: 'populateUser',
              payload: {user, token, isLoggedIn: true},
            });
            const {email, password} = fields;
            const {id, username} = user;
            await Keychain.setGenericPassword(username, password);
            await AsyncStorage.setItem('userLogin', JSON.stringify(response));
            setData({...data, isLoggingIn: false, fields: initialFields});
            const screenFrom = screenParams?.screenFrom;
            if (screenFrom) {
              handleNavigation(screenFrom);
            } else {
              handleNavigation('Discover');
            }
          } else {
            const error = response?.error_messages;
            let errorMessage = 'Sorry! An error occured!';
            if (error) {
              errorMessage = error[0];
            }
            setData({
              ...data,
              isLoggingIn: false,
              accountLoginError: response.message,
            });
          }
        })
        .catch((err) => {
          console.error(err);
          setData({
            ...data,
            isLoggingIn: false,
            accountLoginError: 'Sorry! A server error occured.',
          });
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSetValue = (field: any, value: any) => {
    let fields: any = data.fields;
    fields[field] = value;

    let isValid = fields['email'] && fields['password'];

    setData({
      ...data,
      fields,
      hasFilledAllFields: isValid,
      accountLoginError: '',
    });
  };

  const handleLoginWithFb = async () => {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // Sign-in the user with the credential
      return auth().signInWithCredential(facebookCredential);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.loginContainer}>
      <KeyboardAvoidingView enabled>
        <View style={styles.loginWrapper}>
          <Image style={styles.appLogo} source={Logo} />
          <TextInput
            style={[styles.textInput, styles.marginBottom30]}
            placeholder="Email"
            onChangeText={(value) => handleSetValue('email', value)}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={data.isPasswordHidden}
            onChangeText={(value) => handleSetValue('password', value)}
            style={styles.textInput}
          />
          <View style={styles.forgotPwdView}>
            <TouchableOpacity
              style={styles.alignLeft}
              onPress={() => handleNavigation('ForgotPassword')}>
              <Text style={styles.linkText}>Forgot Password ?</Text>
            </TouchableOpacity>
          </View>
          {data.isLoggingIn ? (
            <View
              style={[styles.loginBtnWrapper, styles.loginBtnWrapperDisabled]}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          ) : (
            <TouchableOpacity
              disabled={data.hasFilledAllFields ? false : true}
              style={[
                styles.loginBtnWrapper,
                data.hasFilledAllFields
                  ? styles.loginBtnWrapperEnabled
                  : styles.loginBtnWrapperDisabled,
              ]}
              onPress={() => handleLogin()}>
              <Text style={styles.loginBtnText}>Login</Text>
            </TouchableOpacity>
          )}
          <View style={[styles.flexRow, styles.marginBottom20]}>
            <Text style={styles.grayText}>Already have an account ?</Text>
            <TouchableOpacity onPress={() => handleNavigation('SignUp')}>
              <Text style={styles.goldText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.facebookBtnWrapper}
            onPress={() => handleLoginWithFb()}>
            <Fontisto
              name="facebook"
              size={22}
              color="#fff"
              style={styles.fbIcon}
            />
            <Text style={styles.loginFbBtnText}>Login with Facebook</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
