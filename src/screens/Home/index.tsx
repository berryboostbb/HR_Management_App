import { StyleSheet, Text, View, Alert as RNAlert } from 'react-native';
import React, { useState } from 'react';
import { Wrapper } from '@components';
import CheckInCard from './components/CheckInCard';
import AttendanceSummary from './components/AttendanceSummary';
import LeaveSummary from './components/LeaveSummary';
import { useCheckLocationMutation } from '../../../src/api/userApi';
import Geolocation from '@react-native-community/geolocation';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, requestLocationPermission } from '@utils';
import { setLocation } from '@redux';

const Home = () => {
  const dispatch = useDispatch();

  const [checkLocation] = useCheckLocationMutation();
  const [locationFetch, setFetchLocation] = useState(false);
  const { user } = useSelector((state: any) => state.user);

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

  const handleGetLocationUltraFast = async () => {
    try {
      setFetchLocation(true);

      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        RNAlert.alert('Permission Required', 'Enable location to continue.');
        return;
      }
      const freshLocation: any = await getFreshLocation();
      console.log(
        '🚀 ~ handleGetLocationUltraFast ~ freshLocation:',
        freshLocation,
      );

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
  };

  const navigateToReport = async (lat: number, lng: number) => {
    let checkInData = {
      employeeId: '',
      employeeRole: '',
      location: {
        lat: lat,
        lng: lng,
      },
    };
    // checkLocation({ body: checkInData })
    //   .unwrap()
    //   .then((res: any) => {
    //     if (res?.success === true) {
    //       Alert.showSuccess(res?.message);
    //     } else {
    //       Alert.showError(res?.message);
    //     }
    //   })
    //   .catch((err: any) => {
    //     console.log('🚀 ~ navigateToReport ~ err:', err);
    //   })
    //   .finally(() => setFetchLocation(false));
  };

  return (
    <Wrapper search={false}>
      <CheckInCard
        loading={locationFetch}
        onPressCheckIn={handleGetLocationUltraFast}
      />

      <AttendanceSummary />

      <LeaveSummary />
    </Wrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
