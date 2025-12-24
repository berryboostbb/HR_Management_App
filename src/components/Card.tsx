import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { rs } from '@utils';
import AppText from './AppText';

interface Props {
  title?: any;
  padding?: any;
  children?: any;
  title2?: string;
  date?: string;
  marginTop?:number
}

const Card = ({
  children,
  title,
  padding = 12,
  title2 = '',
  date = '',
  marginTop=12
}: Props) => {
  const theme: any = useTheme();
  const colors: any = theme.colors;
  const styles = useStyles(colors);
  return (
    <View>
      <View style={[styles.card, { padding: rs(padding),marginTop:rs(marginTop) }]}>
        {title && <AppText medium>{title}</AppText>}
        {title2 && (
          <AppText regular size={10} color={colors.mediumGray}>
            {title2}
          </AppText>
        )}
        {date && (
          <AppText
            regular
            size={12}
            color={colors.mediumGray}
            style={styles.date}
          >
            {date}
          </AppText>
        )}

        {children}
      </View>
    </View>
  );
};

export default Card;

const useStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.white,
      marginHorizontal: rs(12),
      // elevation: 5,
      borderRadius: rs(16),
      overflow: 'hidden',
    },
    date: {
      position: 'absolute',
      right: rs(12),
      top: rs(12),
    },
  });
