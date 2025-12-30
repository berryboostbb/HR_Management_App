import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { Card, NoData } from '@components';
import ReasonCard from './ReasonCard';

const LeaveRequest = ({ data, isLoading }: any) => {
  return (
    <Card title="Leave Request">
      {isLoading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <FlatList
          scrollEnabled={false}
          data={data}
          renderItem={({ item, index }: any) => (
            <ReasonCard key={index} item={item} />
          )}
          ListEmptyComponent={<NoData bgColor={"none"} text={"No leave request found"}/>}
        />
      )}
    </Card>
  );
};

export default LeaveRequest;
