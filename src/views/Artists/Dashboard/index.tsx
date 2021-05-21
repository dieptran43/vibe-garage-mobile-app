import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import Toast from 'react-native-toast-message';
import shortid from 'shortid';
import DropDownPicker from 'react-native-dropdown-picker';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText, CustomModal} from '../../../components/Global';
import styles from './dashboardStyle';
import {AuthContext} from '../../../context';
import {combineData} from '../../../utils/helpers';
import {getDashboard, requestWithdrawal} from '../../../services/artistService';

export function Dashboard({navigation}: DrawerScreenProps<{}>) {
  const {state, dispatch}: any = useContext(AuthContext);
  const {user, token} = state || {};
  const [data, setData] = useState({
    dashboard: {} as any,
    isCashOutModalVisible: false,
    accountDetails: {currency: 'NGN'} as any,
    isRequesting: false,
  });

  useEffect(() => {
    handleDashboard();
  }, []);

  const handleDashboard = async () => {
    try {
      await getDashboard(token).then((response: any) => {
        if (response && response?.success) {
          const dashboard = response?.dashboard;
          setData(combineData(data, {dashboard}));
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const toggleCashoutModal = () => {
    let wallet = data?.dashboard?.wallet;
    wallet = Number(wallet);
    if (wallet > 0) {
      setData(combineData(data, {isCashOutModalVisible: true}));
    } else {
      Toast.show({
        type: 'info',
        position: 'bottom',
        text1: 'Insufficient funds!',
        visibilityTime: 1000,
      });
    }
  };

  const customContent = () => {
    return (
      <View style={styles.cashOutLayout}>
        <TextInput
          style={styles.titleInput}
          placeholder="Amount"
          placeholderTextColor="#c3c3c6"
          keyboardType="numeric"
          onChangeText={(title) => handleChangeValue('amount', title)}
        />
        <TextInput
          style={styles.titleInput}
          placeholder="Account Name"
          placeholderTextColor="#c3c3c6"
          onChangeText={(title) => handleChangeValue('account_name', title)}
        />
        <TextInput
          style={styles.titleInput}
          placeholder="Account Number"
          placeholderTextColor="#c3c3c6"
          keyboardType="numeric"
          onChangeText={(title) => handleChangeValue('account_number', title)}
        />
        <DropDownPicker
          placeholderStyle={{color: '#ccc'}}
          placeholder="Select a bank"
          items={data?.dashboard?.banks}
          containerStyle={{height: 40, marginBottom: 30, marginTop: 30}}
          style={{
            backgroundColor: '#000',
            borderColor: '#000',
          }}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{
            backgroundColor: '#000',
            borderColor: '#000',
          }}
          arrowColor="#fff"
          onChangeItem={(item: any) =>
            handleChangeValue('bank_name', item?.label)
          }
          selectedLabelStyle={{color: '#000'}}
          labelStyle={{
            color: '#ccc',
            fontSize: 16,
          }}
        />
        <TouchableOpacity
          style={[
            styles.btnSend,
            hasFilledAllFields()
              ? styles.btnSendEnabled
              : styles.btnSendDisabled,
          ]}
          disabled={hasFilledAllFields() ? false : true}
          onPress={() => handleSubmitRequest()}>
          {data?.isRequesting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.btnSendText}>Send</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const handleChangeValue = (field: any, value: any) => {
    let {accountDetails} = data;
    if (field === 'amount') {
      accountDetails.amount = value;
    } else if (field === 'account_name') {
      accountDetails.account_name = value;
    } else if (field === 'account_number') {
      accountDetails.account_number = value;
    } else if (field === 'bank_name') {
      accountDetails.bank_name = value;
    }

    setData(combineData(data, {accountDetails}));
  };

  const hasFilledAllFields = () => {
    let {accountDetails, dashboard} = data;
    let wallet = dashboard?.wallet;
    return (
      accountDetails.amount &&
      accountDetails.amount <= Number(wallet) &&
      accountDetails.account_name &&
      accountDetails.account_number &&
      accountDetails.bank_name !== 'Select a bank'
    );
  };

  const handleModalClose = () => {
    setData(combineData(data, {isCashOutModalVisible: false}));
  };

  const handleSubmitRequest = async () => {
    let {accountDetails} = data;
    try {
      const payload = accountDetails;
      await requestWithdrawal({token, payload}).then((response: any) => {
        if (response && response?.success) {
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1:
              'Your funds will be available in your account within 48 hours!',
            visibilityTime: 1000,
          });
        }
        setData(
          combineData(data, {
            isRequesting: false,
            isCashOutModalVisible: false,
          }),
        );
      });
    } catch (error) {
      console.error(error);
      setData(combineData(data, {isRequesting: false}));
    }
  };

  return (
    <View style={styles.dashboardContainer}>
      <NavDrawerHeader navigation={navigation} />
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.layoutContent}>
          <View style={styles.walletWrapper}>
            <View>
              <Text style={styles.titleText}>Wallet</Text>
              <Text style={styles.valueText}>{data?.dashboard?.wallet}</Text>
            </View>
            <TouchableOpacity
              style={styles.cashOutWrapper}
              onPress={() => toggleCashoutModal()}>
              <Text style={styles.cashOutText}>Request to Cashout</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.card1, {backgroundColor: '#8337d0'}]}>
            <Text style={styles.titleText}>Total Songs</Text>
            <Text style={styles.valueText}>{data?.dashboard?.total_songs}</Text>
          </View>
          <View style={[styles.card1, {backgroundColor: '#3e3ecc'}]}>
            <Text style={styles.titleText}>Total Plays</Text>
            <Text style={styles.valueText}>{data?.dashboard?.total_plays}</Text>
          </View>
          <View style={[styles.card1, {backgroundColor: '#ff6873'}]}>
            <Text style={styles.titleText}>Total Downloads</Text>
            <Text style={styles.valueText}>
              {data?.dashboard?.total_downloads}
            </Text>
          </View>
          <View style={[styles.card1, {backgroundColor: '#4CAF50'}]}>
            <Text style={styles.titleText}>Total Sales</Text>
            <Text style={styles.valueText}>{data?.dashboard?.total_sales}</Text>
          </View>
          <View style={[styles.card1, {backgroundColor: '#00bcd4'}]}>
            <Text style={styles.titleText}>Total Sales This Month</Text>
            <Text style={styles.valueText}>
              {data?.dashboard?.total_sales_this_month}
            </Text>
          </View>
          <View style={[styles.card1, {backgroundColor: '#137fd6'}]}>
            <Text style={styles.titleText}>Total Sales Today</Text>
            <Text style={styles.valueText}>
              {data?.dashboard?.total_sales_today}
            </Text>
          </View>
        </View>
      </ScrollView>
      {data?.isCashOutModalVisible ? (
        <CustomModal
          height="70%"
          width="100%"
          title="Fill Account Details"
          onModalClose={() => handleModalClose()}
          customContent={() => customContent()}
        />
      ) : null}
    </View>
  );
}
