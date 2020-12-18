import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './spotLightStyle';

export const Spotlight: React.FC<{}> = () => {
  return (
    <View style={styles.spotlightContainer}>
      <View style={styles.spotlightContent}>
        <Text>Spotlight</Text>
      </View>
    </View>
  );
};
