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
import styles from './forgotPasswordStyle';
import Logo from '../../../assets/images/logo.jpg';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';
import {
  sendPasswordResetCode,
  changePassword,
} from '../../../services/authService';
import {getScreenParent} from '../../../utils/navigationHelper';

export function ForgotPassword() {
  const initialFields = {
    code: '',
    email: '',
    new_password: '',
    confirm_password: '',
  };
  const [data, setData] = useState({
    hasFilledAllFields: false,
    isPasswordHidden: true,
    isSigningUp: false,
    fields: initialFields,
    messageText: '',
    step: 0,
  });

  const handleNavigation = (route: string) => {
    navigateToNestedRoute(getScreenParent(route), route);
  };

  const handleSetValue = (field: any, value: any) => {
    let fields: any = data.fields;
    fields[field] = value;

    let isValid =
      fields['email'] ||
      (fields['code'] &&
        fields['password'] &&
        fields['confirm_password'] &&
        fields['password'] === fields['confirm_password']);

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
      const {email} = data?.fields;
      let messageText: any = '';
      await sendPasswordResetCode({email})
        .then(async (response: any) => {})
        .catch((err: any) => {});
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
          {data?.step === 0 ? (
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              onChangeText={(value) => handleSetValue('email', value)}
              value={data.fields.email}
            />
          ) : data?.step === 1 ? (
            <>
              <TextInput
                style={styles.textInput}
                placeholder="Code"
                onChangeText={(value) => handleSetValue('code', value)}
                value={data.fields.code}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                onChangeText={(value) => handleSetValue('new_password', value)}
                value={data.fields.new_password}
                secureTextEntry={true}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Confirm Password"
                onChangeText={(value) =>
                  handleSetValue('confirm_password', value)
                }
                value={data.fields.confirm_password}
                secureTextEntry={true}
              />
            </>
          ) : null}
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
