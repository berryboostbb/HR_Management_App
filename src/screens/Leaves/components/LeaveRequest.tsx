import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Card } from '@components';
import ReasonCard from './ReasonCard';

const LeaveRequest = ({ data }: any) => {
  console.log("🚀 ~ LeaveRequest ~ data:", data)
  return (
    <Card title="Leave Request">
      {data?.map((item: any, index: any) => (
        <ReasonCard key={index} item={item} />
      ))}
    </Card>
  );
};

export default LeaveRequest;
