import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { rs } from '@utils';
import { AppText, ModalFooter } from '@components';
import { BottomCard } from '@assets';

const CheckoutModalContent = () => {
  const { colors } = useTheme();
  const styles = useStyles(colors);

    const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return (
    <View style={styles.content}>
      <AppText size={20} semiBold center>
        Ready to check out?
      </AppText>
      {/* <AppText medium center color={colors.mediumGray}> 
        You’ve completed 9hrs today
      </AppText> */}
      <AppText regular center color={colors.mediumGray}>
        Today time {currentTime}
      </AppText>
    </View>
  );
};

export default CheckoutModalContent;

const useStyles = (colors: any) =>
  StyleSheet.create({
    content: {
      marginVertical: rs(70),
    },
  });
