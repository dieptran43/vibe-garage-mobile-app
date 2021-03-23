import React, {useState, useContext, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import PaystackWebView from 'react-native-paystack-webview';
import {
  RewardedAd,
  TestIds,
  RewardedAdEventType,
} from '@react-native-firebase/admob';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import {AuthContext} from '../../../context';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';
import styles from './getCreditStyle';

export function GetCredit({navigation}) {
  const {state, dispatch} = useContext(AuthContext);
  const user = state?.user;
  const wallet = user?.wallet || 0;
  const [data, setData] = useState({wallet, credit: 0, loaded: false});
  const isFocused = useIsFocused();
  const paystackWebViewRef = useRef();

  useEffect(() => {
    handleCheckLogin();
  }, [isFocused]);

  const handleCheckLogin = () => {
    if (!state?.isLoggedIn) {
      navigateToNestedRoute('SingleStack', 'Login', {
        screenFrom: 'GetCredit',
      });
    }
  };

  const handlePaymentSuccess = () => {
    let {wallet, credit} = data;
    wallet += credit;
    setData({...data, wallet});
  };

  const handleWatchAds = () => {
    const rewarded = RewardedAd.createForAdRequest(TestIds.REWARDED);

    rewarded.onAdEvent((type, error, reward) => {
      if (type === RewardedAdEventType.LOADED) {
        setData({...data, loaded: true});
        rewarded.show();
      }

      if (type === RewardedAdEventType.EARNED_REWARD) {
        console.log('User earned reward of ', reward);
      }
    });
    rewarded.load();
  };

  return (
    <View style={styles.getCreditContainer}>
      <NavDrawerHeader navigation={navigation} />
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.layoutContent}>
          <View style={styles.layoutWrapper}>
            <CustomText
              type={1}
              text="Buy Credit"
              style={styles.getCreditText}
            />
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
              text="Enter amount below (Minimum $10):"
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
                amount={data.credit}
                billingEmail={user?.email}
                billingMobile=""
                billingName={user?.name}
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
                    onPress={() =>
                      paystackWebViewRef.current.StartTransaction()
                    }
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
          <View>
            <CustomText type={1} text="OR" style={styles.orText} />
          </View>
          <View style={styles.layoutWrapper}>
            <CustomText
              type={1}
              text="Watch Ads to Earn Coins"
              style={styles.getCreditText}
            />
            <TouchableOpacity
              style={styles.btnStart}
              onPress={() => handleWatchAds()}>
              <CustomText type={1} text="Start" style={styles.startText} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
