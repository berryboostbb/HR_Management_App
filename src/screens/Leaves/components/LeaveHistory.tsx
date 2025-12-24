import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Card } from '@components';
import ReasonCard from './ReasonCard';

interface Props {
  data?: any;
}

const LeaveHistory = ({ data }: Props) => {
  return (
    <Card title="Leave History">
      <FlatList
        data={data}
        keyExtractor={(_, index) => index?.toString()}
        renderItem={({ item }: any) => <ReasonCard item={item} />}
      />
    </Card>
  );
};

export default LeaveHistory;

const styles = StyleSheet.create({});
