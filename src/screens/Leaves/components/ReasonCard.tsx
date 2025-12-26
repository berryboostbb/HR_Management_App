import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AppText, BulletText } from '@components';
import { useTheme } from '@react-navigation/native';
import { rs } from '@utils';
import { formatDate } from '@services';

const ReasonCard = ({ item }: any) => {
  console.log('🚀 ~ ReasonCard ~ item:..', item);
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const TEXT_COLOR =
    item?.status === 'Pending'
      ? colors.yellow
      : item?.status === 'Approved'
      ? colors.green
      : colors.green;
      const dateFormat=formatDate("2025-12-26T19:00:00.000Z")
      // console.log("🚀 ~ ReasonCard ~ dateFormat:", dateFormat)

  return (
    <View style={styles.borderView}>
      <View style={styles.row}>
        <AppText
          size={10}
          medium
          color={colors.white}
          style={[styles.status, { backgroundColor: TEXT_COLOR }]}
        >
          {item?.status}
        </AppText>

        <AppText size={11} medium style={{ marginLeft: rs(12) }}>
          Jan 03, 2026
          {/* {item?.startDate} */}
        </AppText>
        <AppText size={11} medium color={colors.mediumGray}>
          to
        </AppText>
        <AppText size={11} medium>
          Jan 03, 2026
        </AppText>
      </View>
      <View style={styles.reason}>
        <AppText size={11} medium>
          Reason
        </AppText>
        <AppText size={10} regular color={colors.mediumGray}>
          {item?.reason}
        </AppText>
      </View>
      <View
        style={[
          styles.bottomView,
          {
            backgroundColor:
              item?.leaveType === 'Casual Leave'
                ? '#FFCC001F'
                : item?.leaveType === 'Sick Leave'
                ? '#E907611F'
                : '#34C7591F',
          },
        ]}
      >
        <BulletText
          bulletColor={colors.yellow}
          size={8}
          title={item?.leaveType || 'Casual Leave'}
          titleColor={colors.yellow}
        />
      </View>
    </View>
  );
};

export default ReasonCard;

const useStyles = (colors: any) =>
  StyleSheet.create({
    borderView: {
      borderWidth: 0.5,
      borderColor: colors.primary,
      borderRadius: rs(12),
      paddingTop: rs(12),
      //   paddingHorizontal: rs(12),
      marginTop: rs(12),
      overflow: 'hidden',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: rs(6),
    },
    reason: {
      marginVertical: rs(12),
      marginHorizontal: rs(12),
    },
    bottomView: {
      paddingVertical: rs(8),
      paddingLeft: rs(16),
    },
    status: {
      position: 'absolute',
      borderRadius: rs(2),
      right: rs(12),
      paddingVertical: rs(2),
      paddingHorizontal: rs(4),
    },
  });
