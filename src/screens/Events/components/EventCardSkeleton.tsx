import React from 'react';
import { StyleSheet, View } from 'react-native';
import { rs } from '@utils';
import { SkeletonLoading } from '@components';

const EventCardSkeleton = () => {
  return (
    <View style={styles.card}>
      {/* Image Skeleton */}
      <SkeletonLoading style={styles.image} />

      {/* Date */}
      <SkeletonLoading style={styles.date} />

      {/* Heading */}
      <SkeletonLoading style={styles.heading} />
      <SkeletonLoading style={styles.headingSmall} />

      {/* Description */}
      <SkeletonLoading style={styles.desc} />
      <SkeletonLoading style={styles.desc} />
    </View>
  );
};

export default EventCardSkeleton;

const styles = StyleSheet.create({
  card: {
    borderRadius: rs(12),
    backgroundColor: '#fff',
    marginTop: rs(16),
    marginHorizontal: rs(12),
    paddingBottom: rs(12),
    overflow: 'hidden',
  },
  image: {
    height: rs(180),
    width: '100%',
  },
  date: {
    height: rs(12),
    width: rs(120),
    marginTop: rs(12),
    marginLeft: rs(12),
    borderRadius: rs(4),
  },
  heading: {
    height: rs(18),
    width: rs(220),
    marginTop: rs(12),
    marginLeft: rs(12),
    borderRadius: rs(4),
  },
  headingSmall: {
    height: rs(18),
    width: rs(160),
    marginTop: rs(8),
    marginLeft: rs(12),
    borderRadius: rs(4),
  },
  desc: {
    height: rs(10),
    width: rs(300),
    marginTop: rs(8),
    marginLeft: rs(12),
    borderRadius: rs(4),
  },
});
