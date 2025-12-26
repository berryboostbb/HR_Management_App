import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AppText, BulletText, Card } from '@components';
import { useTheme } from '@react-navigation/native';
import { rs } from '@utils';
import ReasonCard from './ReasonCard';

const LeaveRequest = ({ data }: any) => {
  return (
    <Card title="Leave Request">
      {data?.map((item: any, index: any) => (
        <ReasonCard key={index} item={item} />
      ))}
    </Card>
  );
};

export default LeaveRequest;
