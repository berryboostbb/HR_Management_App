import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { AppText, Card, PrimaryButton } from '@components';
import { useTheme } from '@react-navigation/native';
import { rs } from '@utils';
import { Break } from '@assets';

interface Props {
  onPressCheckIn?: any;
}

const CheckInCard = ({ onPressCheckIn }: Props) => {
  const { colors }: any = useTheme();
  const styles = useStyles(colors);
  return (
    <Card
      marginTop={0}
      title={'Good Morning'}
      title2="Office Staff"
      date="Dec 22,2025 - Monday"
    >
      <View style={styles.circle}>
        <AppText size={18} bold color={colors.white}>
          00:00:00
        </AppText>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.breakButton}>
        <Break height={rs(16)} width={rs(16)}/>

          <AppText size={10} regular color={colors.primary}>
            Take A Break
          </AppText>
        </TouchableOpacity>
        <PrimaryButton
          onPress={onPressCheckIn}
          title="Check-in"
          width={rs(120)}
          style={styles.button}
        />
      </View>
    </Card>
  );
};

export default CheckInCard;

const useStyles = (colors: any) =>
  StyleSheet.create({
    circle: {
      height: rs(116),
      width: rs(116),
      borderRadius: 100,
      backgroundColor: colors.primary,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      alignSelf: 'flex-end',
    },
    breakButton: {
      height: rs(40),
      position:"absolute",
      left:0,
      width: "60%",
      borderWidth: 1,
      borderColor: colors.primary,
      backgroundColor: colors.white,
      borderRadius: rs(6),
      alignItems:"center",
      justifyContent:"center",
      flexDirection:"row",
      gap:rs(8)
    },
    row:{
      alignItems:"center",
      marginTop: rs(30),
      width:"100%",

    }
  });
