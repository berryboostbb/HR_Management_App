import React from 'react';
import { StyleSheet, TextInput, View, ViewStyle, TextStyle, TextInputProps } from 'react-native';
import { rs } from '@utils';
import { useTheme } from '@react-navigation/native';
import { Search } from '@assets';

interface SearchInputProps extends TextInputProps {
  icon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  rowStyle?: ViewStyle;
  borderColor?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  icon,
  containerStyle,
  inputStyle,
  rowStyle,
  borderColor,
  ...props // all other TextInput props (value, onChangeText, keyboardType, etc.)
}) => {
  const theme: any = useTheme();
  const colors: any = theme.colors;
  const styles = useStyles(colors, borderColor);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.row, rowStyle]}>
        {icon ? icon : <Search color={colors.mediumGray} />}
        <TextInput
          placeholderTextColor={colors.mediumGray}
          style={[styles.input, inputStyle]}
          {...props} // pass all props from parent
        />
      </View>
    </View>
  );
};

export default SearchInput;

const useStyles = (colors: any, borderColor?: string) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      width: '100%',
      borderRadius: rs(24),
      borderColor: borderColor || colors.cloudWhite,
      padding: rs(12),
    },
    row: {
      flexDirection: 'row',
      gap: rs(6),
      alignItems: 'center',
    },
    input: {
      padding: 0,
      width: '90%',
      color: colors.black,
    },
  });
