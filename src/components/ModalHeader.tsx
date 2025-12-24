import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { rs } from '@utils';
import { BackArrow } from '@assets';
import { AppText } from '@components';
import { useTheme } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

const ModalHeader = ({title,onPressBack,center}:any) => {
  const theme: any = useTheme();
  const colors: any = theme.colors;
  const styles = useStyles(colors);
  const Wrapper = center? Pressable : RectButton
  return (
    <View style={styles.header}>
      <Wrapper onPress={onPressBack} style={styles.back}>
        <BackArrow />
      </Wrapper>
      <AppText medium size={14}>
        {title}
      </AppText>
    </View>
  );
};

export default ModalHeader;

const useStyles = (colors: any) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: rs(6),
      paddingHorizontal: rs(16),
      // backgroundColor:"#fff",
    },
    back: {
      height: rs(44),
      width: rs(44),
      borderWidth: 1,
      borderRadius: rs(12),
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors.faded,
    },
  });
