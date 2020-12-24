import React from 'react';
import {Text, StyleSheet} from 'react-native';

export function CustomText({type, text, size}: any) {
  return (
    <Text
      style={[
        type === 1 ? styles.colorOne : styles.colorTwo,
        {fontSize: size ? size : 14},
      ]}
      numberOfLines={1}
      ellipsizeMode="tail">
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  colorOne: {
    color: '#c3c3c6',
  },
  colorTwo: {
    color: '#8d8d8d',
  },
});
