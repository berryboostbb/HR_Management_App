import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { AppText, Card } from '@components';
import { rs } from '@utils';
import { useTheme } from '@react-navigation/native';

const LeaveSummary = () => {
  const { colors }: any = useTheme();
  const [select, setSelect] = useState('Annual');
  const DATA = [
    { key: 'Annual', value: '13', color: '#34C759', label: 'Available:10' },
    { key: 'Casual', value: '10', color: '#F0C000', label: 'Availed:1' },
    {
      key: 'Sick',
      value: '05',
      color: '#E90761',
      label: 'Pending:0',
      title: 'Sick Leave',
    },
  ];
  return (
    <Card title="Leave Summary">
      <View style={styles.row}>
        {DATA.map(item => {
          const isActive = select === item.key;
          const bg = isActive ? '#E5EBF7' : colors.white;

          return (
            <View key={item.key} style={styles.cardWidth}>
              <TouchableOpacity
                style={[styles.squareCard, { backgroundColor: bg }]}
                onPress={() => setSelect(item.key)}
              >
                {isActive && <View style={[styles.triangleDown, { borderTopColor: bg }]} />}
                <AppText size={16} medium>
                  {item.value}
                </AppText>
                <AppText size={12} color={colors.mediumGray}>
                  {item.title || item.key}
                </AppText>
              </TouchableOpacity>

              <SummaryItems color={item.color} title={item.label} />
            </View>
          );
        })}
      </View>
    </Card>
  );
};

export default LeaveSummary;

const styles = StyleSheet.create({
  cardWidth: { width: '32%' },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: rs(12),
  },

  squareCard: {
    height: rs(75),
    borderRadius: rs(12),
    backgroundColor: '#E5EBF7',
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangleDown: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: rs(6),
    borderRightWidth: rs(6),
    borderTopWidth: rs(10),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    position: 'absolute',
    bottom: -rs(10),
    alignSelf: 'center',
  },
  dot: {
    height: rs(4),
    width: rs(4),
    borderRadius: 100,
  },
});

const SummaryItems = ({ title, color }: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: rs(17.5),
        alignItems: 'center',
        gap: rs(12),
        alignSelf: 'center',
      }}
    >
      <View style={[styles.dot, { backgroundColor: color }]} />
      <AppText>{title}</AppText>
    </View>
  );
};
