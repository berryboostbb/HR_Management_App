import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AppText, BulletText, Card } from '@components';
import { useTheme } from '@react-navigation/native';
import { rs } from '@utils';
import ReasonCard from './ReasonCard';

const LeaveRequest = ({item}:any) => {
  return (
    <Card title="Leave Request" >
      <ReasonCard item={item}/>
    </Card>
  );
};

export default LeaveRequest;
