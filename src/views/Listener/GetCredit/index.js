import React, {useState, useContext, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Button,
} from 'react-native';
// import Carousel from 'react-native-snap-carousel';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {useIsFocused} from '@react-navigation/native';
import PaystackWebView from 'react-native-paystack-webview';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import styles from './getCreditStyle';
import {AuthContext} from '../../../context';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';

export function GetCredit({navigation}) {
  const {state, dispatch} = useContext(AuthContext);
  const [data, setData] = useState({wallet: 0, credit: 0});
  const isFocused = useIsFocused();
  const paystackWebViewRef = useRef();

  const handlePaymentSuccess = () => {
    let {wallet, credit} = data;
    wallet += credit;
    setData({...data, wallet});
  };

  return (
    <View style={styles.getCreditContainer}>
      <NavDrawerHeader navigation={navigation} />
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.layoutContent}>
          <CustomText type={1} text="Get Credit" style={styles.getCreditText} />
          <View style={styles.walletInfoRow}>
            <CustomText type={1} text="Wallet: " style={styles.walletText} />
            <CustomText
              type={1}
              text={`₦${data.wallet}`}
              style={styles.walletText}
            />
          </View>
          <CustomText
            type={1}
            text="Amount(NGN) Minimum N100"
            style={styles.minAmountText}
          />
          <TextInput
            style={styles.amountInput}
            onChangeText={(value) => setData({...data, credit: value})}
            keyboardType="numeric"
          />
          <View style={styles.divider}></View>
          <TouchableOpacity
            style={[
              styles.btnPayWith,
              data.credit > 0
                ? styles.btnPayWithEnabled
                : styles.btnPayWithDisabled,
            ]}
            disabled={data.credit > 0 ? false : true}>
            <PaystackWebView
              buttonText="Pay With Paystack"
              showPayButton={true}
              paystackKey="pk_test_6cd877e43ae9e66ee03e9b2aefc19523324c23ea"
              amount={120000}
              billingEmail="testuser@email.com"
              billingMobile="08012345678"
              billingName="Test User"
              ActivityIndicatorColor="green"
              SafeAreaViewContainer={{marginTop: 5}}
              SafeAreaViewContainerModal={{marginTop: 5}}
              onCancel={(e) => {
                // handle response here
              }}
              onSuccess={(res) => {
                handlePaymentSuccess();
              }}
              autoStart={false}
              ref={paystackWebViewRef}
              renderButton={() => (
                <TouchableOpacity
                  onPress={() => paystackWebViewRef.current.StartTransaction()}
                  disabled={data.credit > 0 ? false : true}>
                  <CustomText
                    type={1}
                    text="Pay With Paystack"
                    style={styles.payWithText}
                  />
                </TouchableOpacity>
              )}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
