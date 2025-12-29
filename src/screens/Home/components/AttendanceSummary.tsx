import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { AppText, Card } from '@components';
import { rs } from '@utils';
import MonthPicker from 'react-native-month-year-picker';

const AttendanceSummary = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showPicker = useCallback(value => setShow(value), []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;

      showPicker(false);
      setDate(selectedDate);
    },
    [date, showPicker],
  );

  return (
    <Card title="Attendance Summary">
      <Pressable
        onPress={() => showPicker(true)}
        style={{
          backgroundColor: '#fff',
          elevation: 2,
          position: 'absolute',
          right: rs(12),
          top: rs(12),
          paddingHorizontal: rs(8),
          paddingVertical: rs(4),
          borderRadius: rs(4),
        }}
      >
        <AppText>Dec 2025</AppText>
      </Pressable>
      <View style={styles.row}>
        <View style={[styles.summaryCard, { backgroundColor: '#34C7591F' }]}>
          <AppText size={16} medium color={'#34C759'}>
            13
          </AppText>
          <AppText size={11} color={'#34C759'}>
            Present
          </AppText>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: '#FFCC001F' }]}>
          <AppText size={16} medium color={'#F0C000'}>
            04
          </AppText>
          <AppText size={11} color={'#F0C000'}>
            Short Duration
          </AppText>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: '#E907611F' }]}>
          <AppText size={16} medium color={'#E90761'}>
            13
          </AppText>
          <AppText size={12} color={'#E90761'}>
            Leave
          </AppText>
        </View>
      </View>
      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={date}
          minimumDate={new Date()}
          maximumDate={new Date(2025, 5)}
          locale="ko"
        />
      )}
    </Card>
  );
};

export default AttendanceSummary;

const styles = StyleSheet.create({
  summaryCard: {
    height: rs(100),
    width: '32%',
    borderRadius: rs(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: rs(20),
  },
});
