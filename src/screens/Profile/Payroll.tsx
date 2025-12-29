import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useSyncExternalStore } from 'react';
import { AppText, Wrapper } from '@components';
import { useTheme } from '@react-navigation/native';
import { rs } from '@utils';
import { DatePickerIcon } from '@assets';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { formatDate } from '@services';
import { useGetPayrollQuery } from '../../../src/api/userApi';
import { useSelector } from 'react-redux';

const Payroll = () => {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const { user } = useSelector((state: any) => state?.user);

  const { data, isLoading }: any = useGetPayrollQuery({ id: user?._id });
  console.log('🚀 ~ Payroll ~ data:', data);

  const onChange = (event: any, selectedDate: any) => {
    if (event.type === 'set' && selectedDate) {
      const formatted = formatDate(selectedDate);
      // formik?.setFieldValue('date', formatted);
    }
  };

  const showMode = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: onChange,
      mode: 'date',
      is24Hour: true,
      minimumDate: new Date(),
    });
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={colors.primary} />
      </View>
    );
  }

  return (
    <Wrapper search={false}>
      <View style={styles.card}>
        <TouchableOpacity onPress={showMode} style={styles.calenderIcon}>
          <DatePickerIcon />
        </TouchableOpacity>
        <AppText medium>Salary</AppText>
        <AppText regular color={colors.mediumGray}>
          Current net salary as of <AppText medium>{data?.month} {data?.year}</AppText>
        </AppText>
        <AppText size={16} bold style={styles.amountView}>
          Rs{' '}
          <AppText size={24} bold>
            150,000{' '}
          </AppText>
          <AppText regular color={colors.mediumGray}>
            / Month
          </AppText>
        </AppText>
        <View style={styles.dashedLine} />
        <View style={styles.summaryView}>
          <AppText medium>Salary Summary</AppText>
          {[
            { title: 'Basic', value: '105,000' },
            { title: 'Allowance', value: '56,000' },
            { title: 'Medical', value: '15,000' },
            { title: 'Provident Fund', value: '-5,000' },
            { title: 'Professional Tax', value: '-6,000' },
            { title: 'Loan', value: '-25,000' },
            { title: 'Deduction', value: '-10,000' },
          ]?.map((item: any, index: any) => (
            <View key={index} style={styles.row}>
              <AppText lineHeight={rs(12)} regular color={colors.mediumGray}>
                {item?.title}
              </AppText>
              <AppText size={14} regular lineHeight={rs(12)}>
                {item?.value}
              </AppText>
            </View>
          ))}
        </View>
        <View style={styles.dashedLine} />
        <View style={[styles.row, { marginTop: rs(24) }]}>
          <AppText size={14} regular>
            Total
          </AppText>
          <AppText size={14} regular>
            150,000
          </AppText>
        </View>
      </View>
    </Wrapper>
  );
};

export default Payroll;

const useStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.white,
      borderRadius: rs(12),
      padding: rs(12),
      marginHorizontal: rs(12),
    },
    calenderIcon: {
      height: rs(36),
      width: rs(36),
      borderRadius: rs(6),
      backgroundColor: colors.cloudWhite,
      position: 'absolute',
      zIndex: 1,
      right: rs(12),
      top: rs(12),
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 2,
    },
    dashedLine: {
      width: '100%',
      borderBottomWidth: 1,
      borderStyle: 'dashed',
      borderColor: colors.primary,
    },
    amountView: {
      marginTop: rs(34),
      alignSelf: 'center',
      marginBottom: rs(18),
    },
    summaryView: {
      paddingTop: rs(12),
      marginBottom: rs(18),
      gap: rs(18),
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
