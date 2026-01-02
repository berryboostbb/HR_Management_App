import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useMemo } from 'react';
import { AppText, Card, CenteredModal, PrimaryButton } from '@components';
import { useTheme } from '@react-navigation/native';
import { rs, useBottomSheet } from '@utils';
import { Break } from '@assets';
import { useSelector } from 'react-redux';
import TimerText from './TimerText';
import TakeBreak from './TakeBreak';
import BreakModalContent from './BreakModalContent';

interface Props {
  onPressCheckIn?: () => void;
  loading?: boolean;
  checkedInData?: any;
  isLoading?: boolean;
  onStartBreak?: () => void;
  breakLoading?: boolean;
}

const CheckInCard = ({
  onPressCheckIn,
  loading,
  checkedInData,
  isLoading,
  onStartBreak,
  breakLoading,
}: Props) => {
  const { colors }: any = useTheme();
  const styles = useStyles(colors);
  const { user } = useSelector((state: any) => state.user);
  const { showBottomSheet } = useBottomSheet();

  /* ----------------------------- Helpers ----------------------------- */

  const todayWithDay = useMemo(() => {
    const today = new Date();

    const date = today.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });

    const day = today.toLocaleDateString('en-US', { weekday: 'long' });

    return `${date} - ${day}`;
  }, []);

  const breakStatus = checkedInData?.breakStatus;
  const checkInStatus = checkedInData?.checkInStatus;

  const isCheckedIn = checkInStatus === 'CheckedIn';
  const isOnBreak = checkInStatus === 'OnBreak';

  const breakAvailed = Boolean(
    breakStatus?.startTime && breakStatus?.endTime,
  );

  const getTimeDiff = (start: string, end: string) => {
    const diff = new Date(end).getTime() - new Date(start).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(
      2,
      '0',
    )}m`;
  };

  const handleBreakPress = () => {
    showBottomSheet(
      <CenteredModal
        button2_title={isOnBreak ? 'End' : 'Start'}
        onPressBtn={onStartBreak}
        loading={breakLoading}
        renderContent={
          <BreakModalContent
            breakTime=""
            title={
              isCheckedIn
                ? 'Are you sure to take a \n break?'
                : 'Are you sure you want to end a \n break?'
            }
          />
        }
      />,
      { centerLayout: true },
    );
  };

  /* ----------------------------- UI ----------------------------- */

  return (
    <Card
      marginTop={0}
      title="Good Morning"
      title2={user?.employeeType}
      date={todayWithDay}
      breakTime={
        breakAvailed
          ? getTimeDiff(breakStatus?.startTime, breakStatus?.endTime)
          : ''
      }
    >
      {isOnBreak ? (
        <TakeBreak
          checkInTime={breakStatus?.startTime}
          isCheckedIn
          color={colors.white}
        />
      ) : (
        <View style={styles.circle}>
          {isLoading ? (
            <ActivityIndicator size={50} color={colors.white} />
          ) : (
            <TimerText
              checkInTime={checkedInData?.checkInTime}
              isCheckedIn={isCheckedIn}
              color={colors.white}
            />
          )}
        </View>
      )}

      <View style={styles.row}>
        {(isCheckedIn || isOnBreak) && (
          <TouchableOpacity
            disabled={breakAvailed}
            onPress={handleBreakPress}
            style={styles.breakButton}
          >
            {breakLoading ? (
              <ActivityIndicator color={colors.primary} />
            ) : (
              <>
                <Break height={rs(16)} width={rs(16)} />
                <AppText
                  size={10}
                  regular
                  color={
                    breakAvailed ? colors.mediumGray : colors.primary
                  }
                >
                  {isOnBreak
                    ? 'End'
                    : breakAvailed
                    ? 'Break Already Availed'
                    : 'Take A Break'}
                </AppText>
              </>
            )}
          </TouchableOpacity>
        )}

        <PrimaryButton
          loading={loading}
          disabled={isOnBreak || !checkedInData}
          onPress={onPressCheckIn}
          title={isCheckedIn || isOnBreak ? 'Check-out' : 'Check-in'}
          width={rs(120)}
          style={styles.button}
        />
      </View>
    </Card>
  );
};

export default CheckInCard;

/* ----------------------------- Styles ----------------------------- */

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
    row: {
      alignItems: 'center',
      marginTop: rs(30),
      width: '100%',
    },
    button: {
      alignSelf: 'flex-end',
    },
    breakButton: {
      position: 'absolute',
      left: 0,
      height: rs(40),
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
  });
