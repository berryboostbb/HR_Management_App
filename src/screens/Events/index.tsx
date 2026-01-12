import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { AppText, NoData, Wrapper } from '@components';
import { rs } from '@utils';
import { useTheme } from '@react-navigation/native';
import EventCard from './components/EventCard';
import { useGetAllEventsQuery } from '../../../src/api/userApi';
import EventCardSkeleton from './components/EventCardSkeleton';

const Events = () => {
  const { colors } = useTheme();
  const [active, setActive] = useState('upcoming');
  const { data, isLoading, isFetching, refetch } = useGetAllEventsQuery();

  const isUpcomingEvent = (eventDate: string) => {
    const now = new Date();
    const event = new Date(eventDate);

    return event.getTime() >= now.getTime();
  };

  const isPastEvent = (eventDate: string) => {
  const now = new Date();
  const event = new Date(eventDate);
  return event.getTime() < now.getTime();
};

const filteredEvents = React.useMemo(() => {
  if (!data) return [];

  if (active === 'upcoming') {
    // Sirf upcoming events
    return data.filter((item: any) => isUpcomingEvent(item.date));
  }

  // "all" tab → sirf past events
  return data.filter((item: any) => isPastEvent(item.date));
}, [data, active]);
  return (
    <Wrapper search={false} refetch={refetch}>
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
      {isLoading || isFetching ? (
        <EventCardSkeleton />
      ) : (
        <FlatList
          data={filteredEvents}
          renderItem={({ item }: any) => <EventCard item={item} />}
          ListEmptyComponent={<NoData height={rs(450)} text={"No events found"}/>}
        />
      )}
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
