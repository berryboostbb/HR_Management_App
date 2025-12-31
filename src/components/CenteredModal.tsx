import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { rs, useBottomSheet } from '@utils';
import { ModalFooter, PrimaryButton } from '@components';
import { BottomCard } from '@assets';

const CenteredModal = ({
  button1_title = 'Cancel',
  button2_title = 'Yes',
  renderContent,
  onPressBtn,
  loading,
}: any) => {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const { hideBottomSheet } = useBottomSheet();

  return (
    <View style={styles.card}>
      {renderContent}
      <Footer
        styles={styles}
        btn1_Title={button1_title}
        btn2_Title={button2_title}
        onPressBtn={onPressBtn}
        onHide={hideBottomSheet}
        loading={loading}
      />
    </View>
  );
};

export default CenteredModal;

const useStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.white,
      marginHorizontal: rs(12),
      borderRadius: rs(16),
      overflow: 'hidden',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: rs(16),
    },
  });

const Footer = ({
  btn1_Title,
  btn2_Title,
  styles,
  onPressBtn,
  onHide,
  loading,
}: any) => {
  const { colors } = useTheme();

  return (
    <View style={{ height: rs(70), width: '100%' }}>
      <ImageBackground
        style={{ height: '100%', width: '100%', justifyContent: 'center' }}
        source={BottomCard}
      >
        <View style={styles.row}>
          <PrimaryButton
            onPress={onHide}
            title={btn1_Title}
            width={'48%'}
            backgroundColor="transparent"
            textColor={colors.primary}
            style={{ borderWidth: 1, borderColor: colors.primary }}
          />
          <PrimaryButton
            onPress={onPressBtn}
            title={btn2_Title}
            width={'48%'}
            loading={loading}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
