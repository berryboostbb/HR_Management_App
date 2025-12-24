import { useTheme } from '@react-navigation/native';
import { rs } from '@utils';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextProps,
  StyleProp,
  TextStyle,
} from 'react-native';

interface Props extends TextProps {
  regular?: any;
  medium?: any;
  semiBold?: any;
  bold?: any;
  extraLight?:any;
  size?: any;
  numberOfLines?: any;
  lineHeight?: any;
  color?: any;
  center?: any;
   style?: StyleProp<TextStyle>;
}

const AppText = (props: Partial<Props>) => {
  const {
    regular,
    medium,
    semiBold,
    bold,
    extraLight,
    size = 12,
    numberOfLines,
    lineHeight,
    color,
    center,
    style,
  } = props;
  const theme: any = useTheme();
  const colors = theme?.colors;
  return (
    <Text
      {...props}
      numberOfLines={numberOfLines && numberOfLines}
      style={[
        regular && styles.regular,
        medium && styles.medium,
        semiBold && styles.semiBold,
        bold && styles.bold,
        extraLight && styles.extraLight,
        center && styles.center,
        size && { fontSize: rs(size) },
        {
          lineHeight: rs(lineHeight),
          color: color ? color : colors?.black,
        },
        style,
      ]}
    >
      {props.children}
    </Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
  regular: {
    fontFamily: 'Outfit-Regular',
  },
  medium: {
    fontFamily: 'Outfit-Medium',
  },
  semiBold: {
    fontFamily: 'Outfit-SemiBold',
  },
  bold: {
    fontFamily: 'Outfit-Bold',
  },
   extraLight: {
    fontFamily: 'Outfit-ExtraLight',
    fontWeight:"200"
  },
    center: {
    textAlign: 'center',
  },
});
