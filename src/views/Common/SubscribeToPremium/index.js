import React, {useContext, useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import PaystackWebView from 'react-native-paystack-webview';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PAYSTACK_PUBLIC_KEY} from '@env';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import styles from './subscribeToPremiumStyle';
import {CustomText} from '../../../components/Global';
import {AuthContext} from '../../../context';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';
import {getScreenParent} from '../../../utils/navigationHelper';
import {
  combineData,
  getFromOldUrl,
  generateTransactionReference,
} from '../../../utils/helpers';
import {getSubscriptionPlans} from '../../../services/requestServices';
import {subscribe} from '../../../services/userService';
import {useNetwork} from '../../../hooks/useNetwork';

export function SubscribeToPremium({navigation}) {
  const {state, dispatch} = useContext(AuthContext);
  const {user, token} = state || {};
  const paystackWebViewRef = useRef();

  const [data, setData] = useState({
    subscriptions: [],
    selectedPlan: {},
    isLoading: true,
    isModalVisible: false,
    isRequesting: false,
  });
  const [isConnected, setIsConnected] = useNetwork();

  useEffect(() => {
    handleSubscriptionPlans();
  }, []);

  const handleSubscriptionPlans = async () => {
    try {
      await getSubscriptionPlans().then((response) => {
        let subscriptions = [];
        if (response && response?.success) {
          subscriptions = response?.subscriptions;
        }
        setData(combineData(data, {subscriptions, isLoading: false}));
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectPlan = (selectedPlan) => {
    setData(combineData(data, {selectedPlan}));
  };

  const handlePaymentSuccess = async (res) => {
    try {
      if (isConnected) {
        console.log(res);
        setData(combineData(data, {isModalVisible: true, isRequesting: true}));
        const transactionRef = res?.data?.transactionRef;
        if (transactionRef?.status === 'success') {
          const reference = transactionRef?.trxref;
          const {selectedPlan} = data;
          const duration_in_months = selectedPlan?.duration;
          const params = {
            duration_in_months,
            transactionReference: reference,
          };

          await subscribe({params, token}).then(async (response) => {
            let modalMessage;
            if (response?.success) {
              let localData = await AsyncStorage.getItem('userLogin');
              if (localData && Object.entries(localData)) {
                const is_subscribed = response?.user?.is_subscribed;

                localData = JSON.parse(localData);
                let user = localData?.user;
                const obj = {is_subscribed};
                user = {...user, ...obj};
                localData['user'] = user;
                await AsyncStorage.setItem(
                  'userLogin',
                  JSON.stringify(localData),
                );
                await dispatch({
                  type: 'updateUser',
                  payload: {obj},
                });
              }
              modalMessage = `You've subscribed for ${selectedPlan?.name} plan`;
            }
            if (modalMessage) {
              setData(
                combineData(data, {
                  selectedPlan: {},
                  isModalVisible: true,
                  isRequesting: false,
                  modalMessage,
                }),
              );
            }
          });
        }
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

  const getAmount = (price) => {
    return parseInt(price);
  };

  const resetFields = () => {
    setData(
      combineData(data, {
        isModalVisible: false,
        isRequesting: false,
        modalMessage: '',
      }),
    );
  };

  return (
    <View style={styles.container}>
      <NavDrawerHeader navigation={navigation} />
      <View style={styles.content}>
        {data?.isLoading ? (
          <View style={styles.emptyWrapper}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : data?.subscriptions?.length ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.plansWrapper}>
              {data?.subscriptions?.map((subscription, index) => (
                <TouchableOpacity
                  style={[
                    styles.singlePlan,
                    data?.selectedPlan?.id === subscription?.id
                      ? styles.activeSinglePlan
                      : styles.normalSinglePlan,
                  ]}
                  key={index}
                  onPress={() => handleSelectPlan(subscription)}>
                  <Text style={styles.nameText}>{subscription?.name}</Text>
                  <Text style={styles.timeText}>
                    {'₦'}
                    {getAmount(subscription?.price)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={[
                styles.btnPayWith,
                data.selectedPlan?.price > 0
                  ? styles.btnPayWithEnabled
                  : styles.btnPayWithDisabled,
              ]}
              disabled={data.selectedPlan?.price > 0 ? false : true}
              onPress={() => paystackWebViewRef?.current?.StartTransaction()}>
              <PaystackWebView
                buttonText="Pay Now"
                showPayButton={true}
                paystackKey={PAYSTACK_PUBLIC_KEY}
                refNumber={generateTransactionReference()}
                amount={getAmount(data?.selectedPlan?.price)}
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
                  <CustomText
                    type={1}
                    text="Pay Now"
                    style={styles.payWithText}
                  />
                )}
              />
            </TouchableOpacity>
          </ScrollView>
        ) : null}

        {data?.isModalVisible ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={data?.isModalVisible}
            onRequestClose={() => resetFields()}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {data?.isRequesting ? (
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
    </View>
  );
}
