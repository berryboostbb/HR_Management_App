import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AppText, Card } from '@components';
import { rs } from '@utils';

const AttendanceSummary = () => {
  return (
    <Card title="Attendance Summary">
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
