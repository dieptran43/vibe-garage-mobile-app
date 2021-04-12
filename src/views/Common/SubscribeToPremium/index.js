import React, {useContext, useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import PaystackWebView from 'react-native-paystack-webview';
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

export function SubscribeToPremium({navigation}) {
  const {state, dispatch} = useContext(AuthContext);
  const {user, token} = state || {};
  const paystackWebViewRef = useRef();

  const [data, setData] = useState({
    subscriptions: [],
    selectedPlan: {},
    isLoading: true,
  });

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

  const handlePaymentSuccess = (res) => {
    console.log(res);
    const transactionRef = res?.data?.transactionRef;
    const {selectedPlan} = data;
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
                    {'$'}
                    {subscription?.price}
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
              disabled={data.selectedPlan?.price > 0 ? false : true}>
              <PaystackWebView
                buttonText="Pay Now"
                showPayButton={true}
                paystackKey={PAYSTACK_PUBLIC_KEY}
                refNumber={generateTransactionReference()}
                amount={data.selectedPlan?.price}
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
                      paystackWebViewRef?.current?.StartTransaction()
                    }
                    disabled={data.selectedPlan?.price > 0 ? false : true}>
                    <CustomText
                      type={1}
                      text="Pay Now"
                      style={styles.payWithText}
                    />
                  </TouchableOpacity>
                )}
              />
            </TouchableOpacity>
          </ScrollView>
        ) : null}
      </View>
    </View>
  );
}
