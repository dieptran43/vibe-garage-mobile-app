import React, {useState, useCallback, useContext, useEffect} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {LoginButton, LoginManager, AccessToken} from 'react-native-fbsdk-next';
import styles from './loginStyle';
import Logo from '../../assets/images/logo.jpg';
import {navigateToNestedRoute} from '../../navigators/RootNavigation';
import {login, socialLogin} from '../../services/authService';
import {AuthContext} from '../../context';
import {getScreenParent} from '../../utils/navigationHelper';

const initialFields = {email: '', password: ''};

export function Login({route, navigation}) {
  const {state, dispatch} = useContext(AuthContext);
  const screenParams = route?.params;
  const [data, setData] = useState({
    hasFilledAllFields: false,
    isPasswordHidden: true,
    isLoggingIn: false,
    accountLoginError: '',
    fields: initialFields,
    authKey: '',
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

  const handleNavigation = (route) => {
    navigateToNestedRoute(getScreenParent(route), route);
  };

  const handleAuthStateChanged = async (userInfo) => {
    try {
      if (userInfo && Object.entries(userInfo).length) {
        const {displayName, email} = userInfo;
        const fields = {
          social_email: email,
          social_name: displayName,
          social_provider: 'facebook',
        };
        await socialLogin(fields)
          .then((response) => {
            const user = response?.user;
            if (user) {
              handleUser(response);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    } catch (error) {
      console.error(error);
    }
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
        .then(async (response) => {
          const user = response?.user;
          if (user) {
            handleUser(response);
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

  const handleUser = async (response) => {
    const {user, token} = response;
    await dispatch({
      type: 'populateUser',
      payload: {user, token, isLoggedIn: true},
    });
    await AsyncStorage.setItem('userLogin', JSON.stringify(response));
    setData({...data, isLoggingIn: false, fields: initialFields});
    const screenFrom = screenParams?.screenFrom;
    if (screenFrom) {
      handleNavigation(screenFrom);
    } else {
      handleNavigation('Discover');
    }
  };

  const handleSetValue = (field, value) => {
    let fields = data.fields;
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
      auth().signInWithCredential(facebookCredential);

      auth()?.onAuthStateChanged((userInfo) =>
        handleAuthStateChanged(userInfo),
      );
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
