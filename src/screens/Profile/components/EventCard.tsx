import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { rs } from '@utils';
import { useTheme } from '@react-navigation/native';
import { Event_Img } from '@assets';
import { AppText } from '@components';

const EventCard = () => {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  return (
    <View style={styles.card}>
      <View style={styles.imgView}>
        <Image source={Event_Img} style={styles.img} />
      </View>
      <AppText
        regular
        color={colors.mediumGray}
        style={{ marginLeft: rs(12), marginTop: rs(12) }}
      >
        Dec 28, 2025
      </AppText>

      <AppText
        semiBold
        size={18}
        style={{ marginLeft: rs(12), marginTop: rs(12), width: rs(250) }}
      >
        Himmel Pharmaceutical x foodpanda
      </AppText>

      <AppText
        regular
        size={11}
        style={{ marginLeft: rs(12), marginTop: rs(4), width: rs(310) }}
      >
        As December marks Lung Cancer Awareness Month, Himmel Pharmaceuticals
        joined hands with foodpanda to host an impactful awareness session for
        their delivery heroes who keep our cities moving.
      </AppText>
    </View>
  );
};

export default EventCard;

const useStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      borderRadius: rs(12),
      backgroundColor: colors.white,
      marginTop: rs(16),
      marginHorizontal: rs(12),
      paddingBottom: rs(12),
      overflow: 'hidden',
    },
    imgView: {
      height: rs(180),
      width: '100%',
    },
    img: {
      height: '100%',
      width: '100%',
    },
  });
