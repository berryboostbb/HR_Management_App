import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Break } from '@assets';
import { AppText } from '@components';
import { rs } from '@utils';
import { useTheme } from '@react-navigation/native';

const BreakModalContent = ({title,breakTime}:any) => {
  const { colors } = useTheme();

  return (
    <View style={styles.content}>
      <Break />
      <AppText size={20} semiBold center style={{ marginTop: rs(28) }}>
        {title}
      </AppText>
      <AppText regular center color={colors.mediumGray}>
        {breakTime}
      </AppText>
    </View>
  );
};

export default BreakModalContent;

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: rs(28),
  },
});
