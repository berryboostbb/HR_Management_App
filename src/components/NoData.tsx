import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { rs } from '@utils';
import AppText from './AppText';
import { useTheme } from '@react-navigation/native';

interface Props {
  bgColor?: any;
  size?: any;
  text?: any;
  height?: any;
}

const NoData = ({
  bgColor = '#fff',
  size = 14,
  text = 'No data found',
  height = rs(100),
}: Props) => {
  const theme: any = useTheme();
  const colors: any = theme.colors;
  return (
    <View
      style={[styles.noDataStyle, { backgroundColor: bgColor, height: height,

    elevation: bgColor === "none" || bgColor === "transparent" ? 0: 5,

       }]}
    >
      <AppText regular color={colors.mediumGray} size={size}>
        {text}
      </AppText>
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  noDataStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: rs(16),
    padding: rs(12),
    marginHorizontal: rs(12),
    marginTop: rs(8),
  },
});
