import { StyleSheet, Text, View, Alert as RNAlert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CenteredModal, Wrapper } from '@components';
import CheckInCard from './components/CheckInCard';
import AttendanceSummary from './components/AttendanceSummary';
import LeaveSummary from './components/LeaveSummary';
import {
  useCheckLocationMutation,
  useEndBreakMutation,
  useGetAttendanceStatusQuery,
  useStartBreakMutation,
} from '../../../src/api/userApi';
import Geolocation from '@react-native-community/geolocation';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, requestLocationPermission, useBottomSheet } from '@utils';
import { setLocation } from '@redux';
import Geocoder from 'react-native-geocoding';
import CheckoutModalContent from './components/CheckoutModalContent';

// Geocoder.init('AIzaSyDJHbyzr2h98h5zx6R9AHY0NnYKAcGq184');

const Home = () => {
  const dispatch = useDispatch();
  const { data, refetch, isLoading }: any = useGetAttendanceStatusQuery();
  const [startBreak] = useStartBreakMutation();
  const [endBreak] = useEndBreakMutation();

  const [checkLocation] = useCheckLocationMutation();
  const [locationFetch, setFetchLocation] = useState(false);
  const { user, token } = useSelector((state: any) => state.user);
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();
  console.log('🚀 ~ navigateToReport ~ token:', data);

  useEffect(() => {
    refetch();
  }, []);

  const getFreshLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          // console.log('📍 FRESH Location:', { latitude, longitude });
          resolve({ latitude, longitude });
        },
        error => {
          console.log('❌ Fresh Location Error:', error);
          reject(error);
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 0,
        },
      );
    });
  };

  const handleChekout = () => {};

  const handleGetLocationUltraFast = async () => {
    if (
      data?.data?.checkInStatus === 'CheckedIn' ||
      data?.data?.checkInStatus === 'OnBreak'
    ) {
      showBottomSheet(
        <CenteredModal
          onPressBtn={handleChekout}
          renderContent={<CheckoutModalContent />}
        />,
        { centerLayout: true },
      );
    } else {
      try {
        setFetchLocation(true);

        const hasPermission = await requestLocationPermission();
        if (!hasPermission) {
          RNAlert.alert('Permission Required', 'Enable location to continue.');
          return;
        }
        const freshLocation: any = await getFreshLocation();

        dispatch(
          setLocation({
            latitude: Number(freshLocation.latitude.toFixed(4)),
            longitude: Number(freshLocation.longitude.toFixed(4)),
          }),
        );
        navigateToReport(
          Number(freshLocation.latitude.toFixed(4)),
          Number(freshLocation.longitude.toFixed(4)),
        );
      } catch (error: any) {
        console.log('❌ Location fetch failed:', error);
        RNAlert.alert('Location Error', 'Failed to get current location');
      } finally {
      }
    }
  };

  const navigateToReport = async (
    lat: number,
    lng: number,
    // address: string,
  ) => {
    setFetchLocation(false);

    let checkInData = {
      employeeId: '',
      employeeRole: '',
      location: {
        lat: lat,
        lng: lng,
        // address: formattedAddress,
      },
    };

    checkLocation({ body: checkInData })
      .unwrap()
      .then((res: any) => {
        Alert.showSuccess(res?.message);
      })
      .catch((err: any) => {
        console.log('🚀 ~ navigateToReport ~ err:', err);
      })
      .finally(() => setFetchLocation(false));
  };

  const handleBreak = () => {
    const Break =
      data?.data?.checkInStatus === 'OnBreak' ? endBreak : startBreak;
    Break({
      body: {
        employeeId: user?.employeeId,
      },
    })
      .unwrap()
      .then((res: any) => {
        Alert.showSuccess(res?.message);
        hideBottomSheet();
      })
      .catch((err: any) => {
        console.log('🚀 ~ navigateToReport ~ err:', err);
      })
      .finally(() => setFetchLocation(false));
  };

  return (
    <Wrapper search={false}>
      <CheckInCard
        loading={locationFetch}
        onPressCheckIn={handleGetLocationUltraFast}
        checkedInData={data?.data}
        isLoading={isLoading}
        onStartBreak={handleBreak}
      />

      <AttendanceSummary />

      <LeaveSummary />
    </Wrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
