import { StyleSheet, Alert as RNAlert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CenteredModal, Wrapper } from '@components';
import CheckInCard from './components/CheckInCard';
import AttendanceSummary from './components/AttendanceSummary';
import LeaveSummary from './components/LeaveSummary';
import {
  useCheckLocationMutation,
  useCheckOutMutation,
  useEndBreakMutation,
  useGetAllUsersQuery,
  useGetAttendanceStatusQuery,
  useStartBreakMutation,
} from '../../../src/api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  getFreshLocation,
  requestLocationPermission,
  useBottomSheet,
} from '@utils';
import CheckoutModalContent from './components/CheckoutModalContent';
import ResponseModal from './components/ResponseModal';

const Home = () => {
  
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: any) => state.user);
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();
  const { data, refetch, isLoading }: any = useGetAttendanceStatusQuery();
  const [startBreak, { isLoading: breakLoading }] = useStartBreakMutation();
  const [endBreak, { isLoading: endBreakLoading }] = useEndBreakMutation();
  const { data: LeaveData, isLoading: summaryLoading }: any =
    useGetAllUsersQuery({
      id: user?.employeeId,
    });
  const [checkLocation] = useCheckLocationMutation();
  const [checkOut] = useCheckOutMutation();

  console.log('🚀 ~ Home ~ user:...', data);

  const [locationFetch, setFetchLocation] = useState(false);
  const status = data?.data?.checkInStatus;

  useEffect(() => {
    refetch();
  }, []);

  const handleCheckout = async () => {
    hideBottomSheet();
    try {
      setFetchLocation(true);

      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        RNAlert.alert('Permission Required', 'Enable location to continue.');
        return;
      }

      const { latitude, longitude }: any = await getFreshLocation();

      await checkOut({
        body: {
          employeeId: user?.employeeId,
          location: {
            lat: +latitude.toFixed(4),
            lng: +longitude.toFixed(4),
          },
        },
      }).unwrap();

      Alert.showSuccess('Successfully checked out');
    } catch {
      RNAlert.alert('Location Error', 'Failed to get current location');
    } finally {
      setFetchLocation(false);
    }
  };

  const CheckIn = async () => {
    try {
      setFetchLocation(true);

      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        RNAlert.alert('Permission Required', 'Enable location to continue.');
        return;
      }

      const { latitude, longitude }: any = await getFreshLocation();

      await checkLocation({
        body: {
          location: {
            lat: +latitude.toFixed(4),
            lng: +longitude.toFixed(4),
          },
        },
      }).unwrap();
      showBottomSheet(<ResponseModal checkInStatus={true} />, {
        centerLayout: true,
      });
      const timer = setTimeout(() => {
        hideBottomSheet();
      }, 2000);
      return () => clearTimeout(timer);
    } catch {
      RNAlert.alert('Location Error', 'Failed to get current location');
    } finally {
      setFetchLocation(false);
    }
  };

  const GetLocation = async () => {
    if (['CheckedIn'].includes(status)) {
      return showBottomSheet(
        <CenteredModal
          onPressBtn={handleCheckout}
          renderContent={<CheckoutModalContent />}
        />,
        { centerLayout: true },
      );
    } else {
      CheckIn();
    }
  };

  const handleBreak = () => {
    const action = status === 'OnBreak' ? endBreak : startBreak;
    hideBottomSheet();

    action({ body: { employeeId: user?.employeeId } })
      .unwrap()
      .then((res: any) => {
        Alert.showSuccess(res?.message);
      })
      .catch(console.log);
  };

  return (
    <Wrapper search={false} refetch={refetch}>
      <CheckInCard
        loading={locationFetch}
        onPressCheckIn={GetLocation}
        checkedInData={data?.data}
        isLoading={isLoading}
        onStartBreak={handleBreak}
        breakLoading={status === 'OnBreak' ? endBreakLoading : breakLoading}
      />
      <AttendanceSummary />
      <LeaveSummary
        data={LeaveData?.length > 0 ? LeaveData[0] : {}}
        loading={summaryLoading}
      />
    </Wrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
