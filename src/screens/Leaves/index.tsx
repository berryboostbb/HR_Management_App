import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AddButton, Wrapper } from '@components';
import LeavesCard from './components/LeavesCard';
import LeaveRequest from './components/LeaveRequest';
import LeaveHistory from './components/LeaveHistory';
import { rs, useBottomSheet } from '@utils';
import ApplyLeave from './components/ApplyLeave';

const LeaveHistoryData = [
  { status: 'Pending', type: 'Casual' },
  { status: 'Pending', type: 'Casual' },
  { status: 'Approved', type: 'Sick Leave' },
];

const {showBottomSheet} = useBottomSheet()

const Leaves = () => {

const onPressAdd =()=>{
  showBottomSheet(
      <ApplyLeave/>,
      {modalHeight:"auto"}
    )
}

  return (
    <Wrapper absoluteView={<AddButton onPress={onPressAdd}/>}>
      <LeavesCard />
      <LeaveRequest item={{ status: 'Pending', type: 'Casual' }} />
      <LeaveHistory data={LeaveHistoryData} />
    </Wrapper>
  );
};

export default Leaves;

const styles = StyleSheet.create({});



