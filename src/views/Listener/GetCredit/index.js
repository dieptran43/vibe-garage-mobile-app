import React, {useState, useContext, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import PaystackWebView from 'react-native-paystack-webview';
import {
  RewardedAd,
  TestIds,
  RewardedAdEventType,
} from '@react-native-firebase/admob';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NODE_ENV, PAYSTACK_PUBLIC_KEY, REWARDED_AD_ID} from '@env';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import {AuthContext} from '../../../context';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';
import styles from './getCreditStyle';
import {
  generateTransactionReference,
  combineData,
} from '../../../utils/helpers';
import {useNetwork} from '../../../hooks/useNetwork';
import {addCoins} from '../../../services/userService';

export function GetCredit({navigation}) {
  const {state, dispatch} = useContext(AuthContext);
  const {user, token} = state;
  let {wallet, coins} = user || {};
  const [data, setData] = useState({
    wallet,
    credit: 0,
    isModalVisible: false,
    isOnRewardedAds: false,
  });
  const isFocused = useIsFocused();
  const paystackWebViewRef = useRef();
  const [isConnected, setIsConnected] = useNetwork();
  const rewardedAdUnitId =
    NODE_ENV === 'production' ? REWARDED_AD_ID : TestIds.REWARDED;

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

  const handlePaymentSuccess = (res) => {
    console.log(res);
    const transactionRef = res?.data?.transactionRef;
    const {credit} = data;
    // let {wallet, credit} = data;
    // wallet += credit;
    // setData({...data, wallet});
  };

  const handleWatchAds = () => {
    try {
      if (isConnected) {
        setData(
          combineData(data, {isModalVisible: true, isOnRewardedAds: true}),
        );
        const rewarded = RewardedAd.createForAdRequest(rewardedAdUnitId);

        rewarded.onAdEvent((type, error, reward) => {
          if (type === RewardedAdEventType.LOADED) {
            setData(
              combineData(data, {
                isModalVisible: false,
                isOnRewardedAds: false,
              }),
            );
            rewarded.show();
          }

          if (type === RewardedAdEventType.EARNED_REWARD) {
            if (reward && Object.entries(reward).length) {
              const {amount, type} = reward;
              if (type === 'coins') {
                coins = amount;
                handleUpdateCoins({coins});
              }
            }
          }
        });
        rewarded.load();
      } else {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Please, check your internet connection!',
          visibilityTime: 500,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateCoins = async (params) => {
    try {
      await addCoins({params, token}).then(async (response) => {
        let modalMessage;
        if (response && response?.success) {
          const updatedCoins = response?.coins;

          let localData = await AsyncStorage.getItem('userLogin');
          if (localData && Object.entries(localData)) {
            localData = JSON.parse(localData);
            let user = localData?.user;
            const obj = {coins: updatedCoins};
            user = {...user, ...obj};
            localData['user'] = user;
            await AsyncStorage.setItem('userLogin', JSON.stringify(localData));
            await dispatch({
              type: 'updateUser',
              payload: {obj},
            });
          }
          modalMessage = `You've earned ${params?.coins} coins. Your total coins is now ${updatedCoins}`;
        }
        if (modalMessage) {
          setData(
            combineData(data, {
              isModalVisible: true,
              isOnRewardedAds: false,
              modalMessage,
            }),
          );
        }
      });
    } catch (error) {
      setData(
        combineData(data, {isModalVisible: false, isOnRewardedAds: false}),
      );
      console.error(error);
    }
  };

  const resetFields = () => {
    setData(
      combineData(data, {
        isModalVisible: false,
        isOnRewardedAds: false,
        modalMessage: '',
      }),
    );
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
                buttonText="Pay Now"
                showPayButton={true}
                paystackKey={PAYSTACK_PUBLIC_KEY}
                refNumber={generateTransactionReference()}
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
                  handlePaymentSuccess(res);
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
                      text="Pay Now"
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

          {data?.isModalVisible ? (
            <Modal
              animationType="slide"
              transparent={true}
              visible={data?.isModalVisible}
              onRequestClose={() => resetFields()}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  {data?.isOnRewardedAds ? (
                    <>
                      <ActivityIndicator
                        size="large"
                        color="rgb(216, 71, 39)"
                        style={styles.isRequestingLoader}
                      />
                      <Text style={styles.loaderTextField}>Please wait...</Text>
                    </>
                  ) : data?.modalMessage ? (
                    <View style={{display: 'flex', alignItems: 'center'}}>
                      <Text style={styles.exitText}>{data?.modalMessage}</Text>
                      <View style={styles.viewSpaceBetween}>
                        <TouchableOpacity onPress={() => resetFields()}>
                          <Text style={[styles.commonBtn, styles.yesBtn]}>
                            Close
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : null}
                </View>
              </View>
            </Modal>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}
