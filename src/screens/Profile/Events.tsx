import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { AppText, Wrapper } from '@components';
import { rs } from '@utils';
import { useTheme } from '@react-navigation/native';
import EventCard from './components/EventCard';

const Events = () => {
  const { colors } = useTheme();
  const [active, setActive] = useState('upcoming');
  return (
    <Wrapper
    >
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => setActive('upcoming')}
              activeOpacity={0.8}
              style={[
                styles.btn,
                {
                  backgroundColor:
                    active === 'upcoming' ? colors.primary : colors.mediumGray,
                },
              ]}
            >
              <AppText regular color={colors.white}>
                Upcoming Events
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setActive('all')}
              style={[
                styles.btn,
                {
                  backgroundColor:
                    active === 'all' ? colors.primary : colors.mediumGray,
                },
              ]}
            >
              <AppText regular color={colors.white}>
                All Events
              </AppText>
            </TouchableOpacity>
          </View>
      <EventCard />
    </Wrapper>
  );
};

export default Events;

const styles = StyleSheet.create({
  btn: {
    height: rs(44),
    width: '48%',
    borderRadius: rs(48),
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: rs(12),
  },
});
