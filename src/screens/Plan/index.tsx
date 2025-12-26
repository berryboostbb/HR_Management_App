import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useBottomSheet } from '@utils';
import { AppText, CenteredModal, PrimaryButton } from '@components';
import CheckoutModalContent from '../Home/components/CheckoutModalContent';
import BreakModalContent from '../Home/components/BreakModalContent';
import ResponseModal from '../Home/components/ResponseModal';

const Plan = () => {
  const { showBottomSheet } = useBottomSheet();

  const handlePress = () => {
    // showBottomSheet(
    //   <CenteredModal renderContent={<CheckoutModalContent />} />,
    //   { centerLayout: true },
    // );


    // showBottomSheet(
    //   <CenteredModal
    //     button2_title={'Start'}
    //     renderContent={
    //       <BreakModalContent
    //         breakTime="Brake time 00h:00m"
    //         title={'Are you sure to take a \n brake?'}
    //       />
    //     }
    //   />,
    //   { centerLayout: true },
    // );


    // showBottomSheet(<ResponseModal checkInStatus={false} />, {
    //   centerLayout: true,
    // });

    
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <PrimaryButton onPress={handlePress} title="Check Modals" />
    </View>
  );
};

export default Plan;

const styles = StyleSheet.create({});
