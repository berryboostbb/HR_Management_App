import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useState, useSyncExternalStore } from 'react';
import { AppText, NoData, Wrapper } from '@components';
import { useTheme } from '@react-navigation/native';
import { Month, rs, Year } from '@utils';
import { DatePickerIcon } from '@assets';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { formatDate } from '@services';
import { useGetPayrollQuery } from '../../../src/api/userApi';
import { useSelector } from 'react-redux';
import WheelPicker from '@quidone/react-native-wheel-picker';

const Payroll = () => {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const { user } = useSelector((state: any) => state?.user);

  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear().toString();

  // ---------------- FINAL VALUES ----------------
  const [monthIndex, setMonthIndex] = useState(currentMonthIndex);
  const [monthName, setMonthName] = useState(Month[currentMonthIndex]);
  const [yearValue, setYearValue] = useState(currentYear);

  // ---------------- TEMP VALUES (MODAL) ----------------
  const [tempMonthIndex, setTempMonthIndex] = useState(currentMonthIndex);
  const [tempYear, setTempYear] = useState(currentYear);
  const [show, setShow] = useState(false);

  // ---------------- API ----------------
  const { data, isLoading,isFetching }: any = useGetPayrollQuery({
    id: user?.employeeId,
    month: monthName,
    year: yearValue,
  });

  const payrollData = data ? data[0] : [];
  const allowance =
    payrollData?.allowances?.medical +
    payrollData?.allowances?.others +
    payrollData?.allowances?.transport;

  const basic_Allowance = payrollData?.basicSalary + allowance
  const deduction =  payrollData?.deductions?.pf +payrollData?.deductions?.tax + payrollData?.deductions?.loan + payrollData?.deductions?.others

const totalSalary = basic_Allowance - deduction
    
  // ---------------- PICKER TOGGLE ----------------
  const showPicker = useCallback(
    (v: boolean) => {
      if (v) {
        setTempMonthIndex(monthIndex);
        setTempYear(yearValue);
      }
      setShow(v);
    },
    [monthIndex, yearValue],
  );

  // ---------------- DATA ----------------
  const monthData = Month.map((m, i) => ({
    value: i,
    label: m,
  }));

  const yearData = Year.map(y => ({
    value: y.toString(),
    label: y.toString(),
  }));
  if (isLoading || isFetching) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={colors.primary} />
      </View>
    );
  }

  return (
    <Wrapper search={false}>
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => showPicker(true)}
          style={styles.calenderIcon}
        >
          <DatePickerIcon />
        </TouchableOpacity>
        <AppText medium>Salary</AppText>
        <AppText regular color={colors.mediumGray}>
          Current net salary as of{' '}
          <AppText medium>
            {monthName} {yearValue}
          </AppText>
        </AppText>
       {data?.length > 0 ? <>
        <AppText size={16} bold style={styles.amountView}>
          Rs{' '}
          <AppText size={24} bold>
            {totalSalary?.toLocaleString()}
          </AppText>
          <AppText regular color={colors.mediumGray}>
            / Month
          </AppText>
        </AppText>
        <View style={styles.dashedLine} />
        <View style={styles.summaryView}>
          <AppText medium>Salary Summary</AppText>
          {[
            {
              title: 'Basic',
              value: payrollData?.basicSalary?.toLocaleString(),
            },
            { title: 'Allowance', value: allowance?.toLocaleString() },
            {
              title: 'Provident Fund',
              value: `-${payrollData?.deductions?.pf?.toLocaleString()}`,
            },
            {
              title: 'Professional Tax',
              value: `-${payrollData?.deductions?.tax?.toLocaleString()}`,
            },
            {
              title: 'Loan',
              value: `-${payrollData?.deductions?.loan?.toLocaleString()}`,
            },
            {
              title: 'Deduction',
              value: `-${payrollData?.deductions?.others?.toLocaleString()}`,
            },
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
            {totalSalary?.toLocaleString()}
          </AppText>
        </View>
       </> : <NoData bgColor={"transparent"} text={"No Payroll found"}/>}
      </View>
      <Modal
        onRequestClose={() => showPicker(false)}
        animationType="fade"
        visible={show}
        backdropColor={'transparent'}
      >
        <View style={styles.wheelContainer}>
          <View style={[styles.rowBetween, { backgroundColor: colors.white }]}>
            <View style={{ width: '45%' }}>
              <WheelPicker
                data={monthData}
                value={tempMonthIndex}
                onValueChanged={({ item }) => setTempMonthIndex(item.value)}
              />
            </View>

            <View style={{ width: '35%' }}>
              <WheelPicker
                data={yearData}
                value={tempYear}
                onValueChanged={({ item }) => setTempYear(item.value)}
              />
            </View>

            <Pressable
              onPress={() => {
                setMonthIndex(tempMonthIndex);
                setMonthName(Month[tempMonthIndex]); // ✅ STRING MONTH
                setYearValue(tempYear);
                showPicker(false);
              }}
              style={[styles.btn, { borderColor: colors.primary }]}
            >
              <AppText>OK</AppText>
            </Pressable>
          </View>
        </View>
      </Modal>
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

    wheelContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: rs(16),
    },
    rowBetween: {
      flexDirection: 'row',
      width: '100%',
      borderWidth: 1,
      justifyContent: 'space-between',
      borderRadius: rs(16),

      paddingHorizontal: rs(16),
      paddingBottom: rs(16),
    },

    btn: {
      borderWidth: 1,
      position: 'absolute',
      bottom: rs(12),
      right: rs(12),
      paddingHorizontal: rs(16),
      paddingVertical: rs(4),
      borderRadius: rs(4),
    },
  });
