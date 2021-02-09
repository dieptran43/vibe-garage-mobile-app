import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
// import Carousel from 'react-native-snap-carousel';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {useIsFocused} from '@react-navigation/native';
import shortid from 'shortid';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import styles from './getCreditStyle';
import {AuthContext} from '../../../context';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';

export function GetCredit({navigation}: DrawerScreenProps<{}>) {
  const {state, dispatch}: any = useContext(AuthContext);
  const [data, setData] = useState({wallet_amount: 2100});
  const isFocused = useIsFocused();

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
              text={`₦${data.wallet_amount}`}
              style={styles.walletText}
            />
          </View>
          <CustomText
            type={1}
            text="Amount(NGN) Minimum N100"
            style={styles.minAmountText}
          />
          <TextInput style={styles.amountInput} />
          <View style={styles.divider}></View>
          <TouchableOpacity style={styles.btnPayWith}>
            <CustomText type={1} text="Pay With Paystack"  style={styles.payWithText}/>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
