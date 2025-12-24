import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { rs } from '@utils';
import { useTheme } from '@react-navigation/native';
import { PlussIcon } from '@assets';

const AddButton = ({ onPress }: any) => {
  const theme: any = useTheme();
  const colors: any = theme.colors;
  return (
    <Pressable
      onPress={onPress}
      style={{
        position: 'absolute',
        bottom: rs(20),
        right: rs(20),
        height: rs(64),
        width: rs(64),
        borderRadius: rs(12),
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        zIndex: 1000,
      }}
    >
      <PlussIcon />
    </Pressable>
  );
};

export default AddButton;

const styles = StyleSheet.create({});
