import {
  ActivityIndicator,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { AppText } from '@components';
import { rs } from '@utils';
import { useTheme } from '@react-navigation/native';
import { BottomCard } from '@assets';

const ModalFooter = ({ onPress, title, loading }: any) => {
  const theme: any = useTheme();
  const colors: any = theme.colors;
  const styles = useStyles(colors);
  return (
    <View style={{ height: rs(70), width: '100%' }}>
      <ImageBackground
        style={{ height: '100%', width: '100%', justifyContent: 'center' }}
        source={BottomCard}
      >
        <Pressable
          onPress={onPress}
          disabled={loading}
          style={{
            alignSelf: 'center',
            position: 'absolute',
            bottom: '15%',
            height: rs(40),
            width: rs(136),
            backgroundColor: colors.primary,
            borderRadius: rs(6),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {loading ? (
            <ActivityIndicator color={'#fff'} animating={loading} />
          ) : (
            <AppText color={colors.white} regular size={10}>
              {title}
            </AppText>
          )}
        </Pressable>
      </ImageBackground>
    </View>
  );
};

export default ModalFooter;

const useStyles = (colors: any) => StyleSheet.create({});
