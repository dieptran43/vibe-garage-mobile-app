import React, {useContext, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import styles from './subscribeToPremiumStyle';
import {CustomText} from '../../../components/Global';
import {AuthContext} from '../../../context';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';
import {getScreenParent} from '../../../utils/navigationHelper';
import {combineData, getFromOldUrl} from '../../../utils/helpers';
import {TouchableOpacity} from 'react-native-gesture-handler';

export function SubscribeToPremium({navigation}: DrawerScreenProps<{}>) {
  const {state, dispatch}: any = useContext(AuthContext);
  const {user, token} = state || {};

  const [data, setData] = useState({
    subscription_plans: [
      {
        price: '$5',
        time: '1 month',
      },
      {
        price: '$12',
        time: '3 months',
      },
      {
        price: '$24',
        time: '4 months',
      },
      {
        price: '$50',
        time: '1 year',
      },
    ] as any,
  });

  return (
    <View style={styles.container}>
      <NavDrawerHeader navigation={navigation} />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.plansWrapper}>
            {data?.subscription_plans?.map((subscription_plan: any) => (
              <View style={styles.singlePlan}>
                <Text style={styles.priceText}>{subscription_plan?.price}</Text>
                <Text style={styles.timeText}>{subscription_plan?.time}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
