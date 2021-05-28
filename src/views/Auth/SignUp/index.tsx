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
import Logo from '../../../assets/images/logo.jpg';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';
import {register} from '../../../services/authService';
import {getScreenParent} from '../../../utils/navigationHelper';

export function SignUp() {
  const initialFields = {
    username: '',
    email: '',
    password: '',
    name: '',
    confirm_password: '',
  };
  const [data, setData] = useState({
    hasFilledAllFields: false,
    isPasswordHidden: true,
    isSigningUp: false,
    fields: initialFields,
    messageText: '',
  });

  const handleNavigation = (route: string) => {
    navigateToNestedRoute(getScreenParent(route), route);
  };

  const handleSetValue = (field: any, value: any) => {
    let fields: any = data.fields;
    fields[field] = value;

    let isValid =
      fields['name'] &&
      fields['username'] &&
      fields['email'] &&
      fields['password'] &&
      fields['confirm_password'] &&
      fields['password'] === fields['confirm_password'];

    setData({
      ...data,
      fields,
      hasFilledAllFields: isValid,
      messageText: '',
    });
  };

  const handleSignUp = async () => {
    try {
      Keyboard.dismiss();

      setData({
        ...data,
        isSigningUp: true,
        messageText: '',
      });
      const {name, email, password, username} = data?.fields;
      let fields = data?.fields;
      let messageText: any = '';
      await register({name, email, password, username})
        .then(async (response: any) => {
          console.log(response);
          const success = response?.success;
          if (success) {
            fields = initialFields;
            messageText = 'Registration successful! Proceed to login';
          } else {
            const error = response?.error_messages;
            messageText = error[0];
          }
          setData({
            ...data,
            isSigningUp: false,
            fields,
            messageText,
          });
        })
        .catch((err: any) => {
          console.error(err);
          setData({
            ...data,
            isSigningUp: false,
            messageText: 'Sorry! A server error occured.',
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
          {data.messageText ? (
            <Text style={styles.messageField}>{data.messageText}</Text>
          ) : null}
          <TextInput
            style={[styles.textInput]}
            placeholder="Name"
            onChangeText={(value) => handleSetValue('name', value)}
            value={data.fields.name}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            onChangeText={(value) => handleSetValue('username', value)}
            value={data.fields.username}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={(value) => handleSetValue('email', value)}
            value={data.fields.email}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText={(value) => handleSetValue('password', value)}
            value={data.fields.password}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Confirm Password"
            onChangeText={(value) => handleSetValue('confirm_password', value)}
            value={data.fields.confirm_password}
            secureTextEntry={true}
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
