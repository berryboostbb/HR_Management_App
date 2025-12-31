import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { AppText, Card, CenteredModal, PrimaryButton } from '@components';
import { useTheme } from '@react-navigation/native';
import { rs, useBottomSheet } from '@utils';
import { Break } from '@assets';
import { useSelector } from 'react-redux';
import TimerText from './TimerText';
import TakeBreak from './TakeBreak';
import { useStartBreakMutation } from '../../../../src/api/userApi';
import BreakModalContent from './BreakModalContent';

interface Props {
  onPressCheckIn?: any;
  loading?: any;
  checkedInData?: any;
  isLoading?: any;
  onStartBreak?: any;
  breakLoading?: any;
}

const CheckInCard = ({
  onPressCheckIn,
  loading,
  checkedInData,
  isLoading,
  onStartBreak,
  breakLoading,
}: Props) => {
  console.log("🚀 ~ CheckInCard ~ breakLoading:", breakLoading)
  // console.log('🚀 ~ CheckInCard ~ checkedInData:', checkedInData);
  const { colors }: any = useTheme();
  const styles = useStyles(colors);
  const { user } = useSelector((state: any) => state.user);
  const { showBottomSheet } = useBottomSheet();

  const getTodayDateWithDay = () => {
    const today = new Date();

    const datePart = today.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });

    const dayPart = today.toLocaleDateString('en-US', {
      weekday: 'long',
    });

    return `${datePart} - ${dayPart}`;
  };

  const breakAvailed =
    checkedInData?.breakStatus?.endTime && checkedInData?.breakStatus?.startTime
      ? true
      : false;

  const getTimeDiff = (startTime: string, endTime: string) => {
    const diffMs = new Date(endTime).getTime() - new Date(startTime).getTime();

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(
      2,
      '0',
    )}m`;
  };

  return (
    <Card
      marginTop={0}
      title={'Good Morning'}
      title2={user.employeeType}
      date={getTodayDateWithDay()}
      breakTime={
        breakAvailed
          ? getTimeDiff(
              checkedInData?.breakStatus?.startTime,
              checkedInData?.breakStatus?.endTime,
            )
          : ''
      }
    >
      {checkedInData?.checkInStatus === 'OnBreak' ? (
        <TakeBreak
          checkInTime={checkedInData?.breakStatus?.startTime}
          isCheckedIn={checkedInData?.checkInStatus === 'OnBreak'}
          color={colors.white}
        />
      ) : (
        <View style={styles.circle}>
          {isLoading ? (
            <ActivityIndicator size={50} color={colors.white} />
          ) : (
            <TimerText
              checkInTime={checkedInData?.checkInTime}
              isCheckedIn={checkedInData?.checkInStatus === 'CheckedIn'}
              color={colors.white}
            />
          )}
        </View>
      )}

      <View style={styles.row}>
        {checkedInData?.checkInStatus === 'CheckedIn' ||
        checkedInData?.checkInStatus === 'OnBreak' ? (
          <TouchableOpacity
            disabled={breakAvailed}
            onPress={() =>
              showBottomSheet(
                <CenteredModal
                  button2_title={checkedInData?.checkInStatus === 'OnBreak' ? 'End' : 'Start'}
                  onPressBtn={onStartBreak}
                  loading={breakLoading}
                  renderContent={
                    <BreakModalContent
                      breakTime=""
                      title={
                        checkedInData?.checkInStatus === 'CheckedIn'
                          ? 'Are you sure to take a \n brake?'
                          : 'Are you sure you want to end a \n brake?'
                      }
                    />
                  }
                />,
                { centerLayout: true },
              )
            }
            style={styles.breakButton}
          >
           {breakLoading ? <ActivityIndicator color={colors.primary}/> : 
           <>
            <Break height={rs(16)} width={rs(16)} />

            <AppText
              size={10}
              regular
              color={breakAvailed ? colors.mediumGray : colors.primary}
            >
              {checkedInData?.checkInStatus === 'OnBreak'
                ? 'End'
                : breakAvailed
                ? 'Break Already Availed'
                : 'Take A Break'}
            </AppText>
           </>
           }
          </TouchableOpacity>
        ) : null}
        <PrimaryButton
          loading={loading}
          disabled={
            checkedInData?.checkInStatus === 'OnBreak'
              ? true
              : !checkedInData
              ? true
              : false
          }
          onPress={onPressCheckIn}
          title={
            checkedInData?.checkInStatus === 'CheckedIn' ||
            checkedInData?.checkInStatus === 'OnBreak'
              ? 'Check-out'
              : 'Check-in'
          }
          width={rs(120)}
          style={styles.button}
        />
      </View>
    </Card>
  );
};

export default CheckInCard;

const useStyles = (colors: any) =>
  StyleSheet.create({
    circle: {
      height: rs(120),
      width: rs(120),
      borderRadius: 100,
      backgroundColor: colors.primary,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      alignSelf: 'flex-end',
    },
    breakButton: {
      height: rs(40),
      position: 'absolute',
      left: 0,
      width: '60%',
      borderWidth: 1,
      borderColor: colors.primary,
      backgroundColor: colors.white,
      borderRadius: rs(6),
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: rs(8),
    },
    row: {
      alignItems: 'center',
      marginTop: rs(30),
      width: '100%',
    },
  });
