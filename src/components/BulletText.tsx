import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { rs } from '@utils';
import AppText from './AppText';
import { useTheme } from '@react-navigation/native';

const BulletText = ({ size = 4, title, bulletColor, titleColor }: any) => {
  const { colors } = useTheme();

  const BULLET_COLOR =
    title === 'Casual Leave'
      ? colors.yellow
      : title === 'Sick Leave'
      ? colors.red
      : title === 'Annual Leave'
      ? colors.green
      : bulletColor;
  const TEXT_COLOR =
    title === 'Casual Leave'
      ? colors.yellow
      : title === 'Sick Leave'
      ? colors.red
      : title === 'Annual Leave'
      ? colors.green
      : titleColor;

  return (
    <View style={styles.row}>
      <View
        style={{
          height: rs(size),
          width: rs(size),
          borderRadius: rs(100),
          backgroundColor: BULLET_COLOR,
        }}
      />
      <AppText medium size={11} color={TEXT_COLOR}>
        {title}
      </AppText>
    </View>
  );
};

export default BulletText;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(12),
  },
});
