import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import styles from './signUpStyle';
import Logo from '../../assets/images/logo.jpg';
import {navigateToNestedRoute} from '../../navigators/RootNavigation';
import {register} from '../../services/authService';
import {getScreenParent} from '../../utils/navigationHelper';

export function SignUp() {
  const initialFields = {username: '', email: '', password: '', name: ''};
  const [data, setData] = useState({
    hasFilledAllFields: false,
    isPasswordHidden: true,
    isSigningUp: false,
    accountSignUpError: '',
    fields: initialFields,
  });

  const handleNavigation = (route: String) => {
    navigateToNestedRoute(getScreenParent(route), route);
  };

  const handleSetValue = (field: any, value: any) => {
    let fields: any = data.fields;
    fields[field] = value;

    fields['name'] = `${fields['firstname']} ${fields['lastname']}`;

    let isValid =
      fields['firstname'] &&
      fields['lastname'] &&
      fields['email'] &&
      fields['password'] &&
      fields['confirm_password'] &&
      fields['password'] === fields['confirm_password'];

    setData({
      ...data,
      fields,
      hasFilledAllFields: isValid,
      accountSignUpError: '',
    });
  };

  const handleSignUp = async () => {
    try {
      Keyboard.dismiss();

      setData({
        ...data,
        isSigningUp: true,
        accountSignUpError: '',
      });
      const {name, email, password, username} = data?.fields;
      await register({name, email, password, username})
        .then(async (response: any) => {
          const user = response?.user;
          if (user) {
            setData({...data, isSigningUp: false, fields: initialFields});
          } else {
            const error = response?.error_messages;
            let errorMessage = 'Sorry! An error occured!';
            if (error) {
              errorMessage = error[0];
            }
            setData({
              ...data,
              isSigningUp: false,
              accountSignUpError: response.message,
            });
          }
        })
        .catch((err) => {
          console.error(err);
          setData({
            ...data,
            isSigningUp: false,
            accountSignUpError: 'Sorry! A server error occured.',
          });
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.signUpContainer}>
      <KeyboardAvoidingView enabled>
        <View style={styles.signUpWrapper}>
          <Image style={styles.appLogo} source={Logo} />
          <TextInput
            style={[styles.textInput]}
            placeholder="Firstname"
            onChangeText={(value) => handleSetValue('firstname', value)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Lastname"
            onChangeText={(value) => handleSetValue('lastname', value)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={(value) => handleSetValue('email', value)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText={(value) => handleSetValue('password', value)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Confirm Password"
            onChangeText={(value) => handleSetValue('confirm_password', value)}
          />
          {data.isSigningUp ? (
            <View
              style={[
                styles.signUpBtnWrapper,
                styles.signUpBtnWrapperDisabled,
              ]}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          ) : (
            <TouchableOpacity
              disabled={data.hasFilledAllFields ? false : true}
              style={[
                styles.signUpBtnWrapper,
                data.hasFilledAllFields
                  ? styles.signUpBtnWrapperEnabled
                  : styles.signUpBtnWrapperDisabled,
              ]}
              onPress={() => handleSignUp()}>
              <Text style={styles.signUpBtnText}>Signup</Text>
            </TouchableOpacity>
          )}
          <View style={[styles.flexRow, styles.marginBottom20]}>
            <Text style={styles.grayText}>Already have an account ?</Text>
            <TouchableOpacity onPress={() => handleNavigation('Login')}>
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
