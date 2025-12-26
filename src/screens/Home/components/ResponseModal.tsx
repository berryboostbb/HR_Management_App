import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { rs } from '@utils';
import { Caution, CharmTick } from '@assets';
import { AppText } from '@components';

const ResponseModal = ({checkInStatus}:any) => {
  const { colors } = useTheme();
  const styles = useStyles(colors);

  const bgColor = checkInStatus ? colors.lightGreen : colors.lightRed;
  const borderColor = checkInStatus ? colors.green : colors.red;
  const Icon: any = checkInStatus ? CharmTick : Caution;

  return (
    <View
      style={{
        backgroundColor: colors.white,
        marginHorizontal: rs(12),
        borderRadius: rs(16),
      }}
    >
      <View
        style={[
          styles.card,
          { backgroundColor: bgColor, borderColor: borderColor },
        ]}
      >
        <Icon />
        <AppText style={{ marginTop: rs(48) }} semiBold size={20}>
          {checkInStatus ? 'Check in Sucessfully' : "Oops You aren't at Office"}
        </AppText>
        {!checkInStatus && (
          <AppText medium color={colors.mediumGray}>
            Please reach office
          </AppText>
        )}
      </View>
    </View>
  );
};

export default ResponseModal;

const useStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      borderWidth: 1,
      borderRadius: rs(16),
      height: rs(300),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
