import { useTheme } from '@react-navigation/native';
import { rs } from '@utils';
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import AppText from './AppText';

interface Props {
  title: string;
  onPress?: () => void;
  height?: number;
  width?: number | `${number}%`; 
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const PrimaryButton: React.FC<Props> = ({
  title,
  onPress,
  height = 40,
  width = '100%',
  backgroundColor = '#0755E9',
  textColor = '#FFFFFF',
  borderRadius = 8,
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {

      const theme: any = useTheme();
  const colors = theme.colors;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          height:rs(height),
          width,
          backgroundColor: disabled ? '#B0B0B0' : backgroundColor,
          borderRadius,
          opacity: loading ? 0.8 : 1,
        },
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <AppText medium size={10} style={[{ color: textColor }, textStyle]}>
          {title}
        </AppText>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },

});
