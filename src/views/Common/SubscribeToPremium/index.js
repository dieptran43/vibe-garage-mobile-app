import React, {useContext, useState, useRef} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import PaystackWebView from 'react-native-paystack-webview';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import styles from './subscribeToPremiumStyle';
import {CustomText} from '../../../components/Global';
import {AuthContext} from '../../../context';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';
import {getScreenParent} from '../../../utils/navigationHelper';
import {combineData, getFromOldUrl} from '../../../utils/helpers';
import {getSubscriptionPlans} from '../../../services/requestServices';

export function SubscribeToPremium({navigation}) {
  const {state, dispatch} = useContext(AuthContext);
  const {user, token} = state || {};
  const paystackWebViewRef = useRef();

  const [data, setData] = useState({
    subscriptions: [
      {
        id: 1,
        name: '1 Month',
        duration: '1',
        price: '5.00',
      },
      {
        id: 2,
        name: '3 Months',
        duration: '3',
        price: '12.00',
      },
      {
        id: 5,
        name: '4 Months',
        duration: '4',
        price: '24.00',
      },
      {
        id: 6,
        name: '1 Year',
        duration: '12',
        price: '50.00',
      },
    ],
    selectedPlan: {},
  });

  const handleSubscriptionPlans = async () => {
    try {
      await getSubscriptionPlans().then((response) => {
        let publicPlaylist = [];
        if (response && response?.success) {
          publicPlaylist = response?.playlists?.data;
        }
        setData(combineData(data, {publicPlaylist}));
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handlePaymentSuccess = (res) => {
    console.log(res);
  };

  return (
    <View style={styles.container}>
      <NavDrawerHeader navigation={navigation} />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.plansWrapper}>
            {data?.subscriptions?.map((subscription) => (
              <View style={styles.singlePlan}>
                <Text style={styles.priceText}>{subscription?.name}</Text>
                <Text style={styles.timeText}>{subscription?.price}</Text>
              </View>
            ))}
          </View>
          {/* <TouchableOpacity>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={[
              styles.btnPayWith,
              data.selectedPlan?.price > 0
                ? styles.btnPayWithEnabled
                : styles.btnPayWithDisabled,
            ]}
            disabled={data.selectedPlan?.price > 0 ? false : true}>
            <PaystackWebView
              buttonText="Pay With Paystack"
              showPayButton={true}
              paystackKey="pk_test_6cd877e43ae9e66ee03e9b2aefc19523324c23ea"
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
        </ScrollView>
      </View>
    </View>
  );
}
