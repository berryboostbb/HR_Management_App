import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const SkeletonLoading = ({ style }: { style?: any }) => {
  return (
    <ShimmerPlaceholder duration={2000} LinearGradient={LinearGradient} shimmerStyle={style} />
  );
};

export default SkeletonLoading;

const styles = StyleSheet.create({});
