import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AddButton, Wrapper } from '@components';
import LeavesCard from './components/LeavesCard';
import LeaveRequest from './components/LeaveRequest';
import LeaveHistory from './components/LeaveHistory';
import { rs, useBottomSheet } from '@utils';
import ApplyLeave from './components/ApplyLeave';
import {
  useGetAllleavesQuery,
  useGetAllUsersQuery,
} from '../../../src/api/userApi';
import { useSelector } from 'react-redux';

const LeaveHistoryData = [
  { status: 'Pending', type: 'Casual' },
  { status: 'Pending', type: 'Casual' },
  { status: 'Approved', type: 'Sick Leave' },
];

const Leaves = () => {
  const { user } = useSelector((state: any) => state.user);

  const { data, isLoading, refetch, isFetching }: any = useGetAllleavesQuery({
    id: user?.employeeId,
  });

  const { data: LeaveData, isLoading: summaryLoading }: any =
    useGetAllUsersQuery({
      id: user?.employeeId,
    });
  const { showBottomSheet } = useBottomSheet();

  const onPressAdd = () => {
    showBottomSheet(<ApplyLeave />, { modalHeight: 'auto' });
  };

  return (
    <Wrapper
      refetch={refetch}
      paddingBottom={rs(100)}
      search={false}
      absoluteView={<AddButton onPress={onPressAdd} />}
    >
      <LeavesCard data={LeaveData[0]}/>
      <LeaveRequest data={data} isLoading={isLoading} />
      {/* <LeaveHistory data={LeaveHistoryData} /> */}
    </Wrapper>
  );
};

export default Leaves;

const styles = StyleSheet.create({});
