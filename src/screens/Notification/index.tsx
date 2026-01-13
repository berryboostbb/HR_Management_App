import { Dimensions, FlatList, StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { AppText } from '@components';
import { useTheme } from '@react-navigation/native';
import { rs } from '@utils';
import { HorizontalDots, MailGradientIcon, ProfileGradientIcon } from '@assets';
import { navigationRef } from '@services';

const notificationData = [
  { title: 'Requisition Approved', desc: 'Dr. Umair Requisition Approved', type: 'approved' },
  { title: 'Password changed', desc: 'Recent password changed successfully', type: 'password' },
  { title: 'Requisition Approved', desc: 'Dr. Umair Requisition Approved', type: 'approved' },
  { title: 'Password changed', desc: 'Recent password changed successfully', type: 'password' },


];

const Notification = () => {
  const theme: any = useTheme();
  const colors: any = theme.colors;
  const styles = useStyles(colors);

  return (
    // 🟢 Make the main container Pressable
    <Pressable
      style={styles.container}
      onPress={() => navigationRef.current?.goBack()}
    >
      {/* Stop propagation so tapping card doesn't close modal */}
      <Pressable style={styles.card} onPress={e => e.stopPropagation()}>
        <View style={styles.head}>
          <View style={styles.notch} />
          <AppText size={14} semiBold lineHeight={14}>
            Notification
          </AppText>
        </View>

        <FlatList
          data={notificationData}
          contentContainerStyle={{paddingBottom:rs(16)}}
          renderItem={({ item }: any) => (
            <View style={styles.listCard}>
              <View style={styles.iconView}>
                {item?.type === 'password' ? (
                  <ProfileGradientIcon />
                ) : (
                  <MailGradientIcon />
                )}
              </View>
              <View>
                <AppText size={14} regular>
                  {item?.title}
                </AppText>
                <AppText size={10} regular style={{ opacity: 0.5 }}>
                  {item?.desc}
                </AppText>
              </View>
              <View style={styles.dotsView}>
                <HorizontalDots />
              </View>
            </View>
          )}
        />
      </Pressable>
    </Pressable>
  );
};

export default Notification;


const useStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'flex-end',
    },
    card: {
      backgroundColor: colors.white,
      maxHeight: Dimensions.get('window').height / 1.2,
      borderTopRightRadius: rs(16),
      borderTopLeftRadius: rs(16),
    },
    notch: {
      width: rs(68),
      backgroundColor: colors.primary,
      borderRadius: rs(4),
      height: rs(2),
      alignSelf: 'center',
      top: rs(8),
      position: 'absolute',
    },
    head: {
      borderBottomWidth: 1,
      borderColor: colors.cloudWhite,
      paddingLeft: rs(24),
      paddingVertical: rs(16),
      marginBottom:rs(16),
    },
    listCard: {
      borderWidth: 1,
      paddingHorizontal: rs(14),
      paddingVertical: rs(16),
      backgroundColor: colors.extraLightgrey,
      borderRadius: rs(6),
      marginHorizontal: rs(16),
      borderColor: '#E5EBF7',
      flexDirection: 'row',
      alignItems: 'center',
      gap: rs(12),
      marginBottom:rs(8)
    },
    iconView: {
      height: rs(40),
      width: rs(40),
      borderRadius: rs(100),
      borderWidth: 1,
      backgroundColor: colors.white,
      borderColor: '#EEEFFC',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dotsView: {
      borderWidth: 1,
      height: rs(32),
      width: rs(32),
      borderRadius: rs(8),
      position: 'absolute',
      right: rs(14),
      borderColor: colors.faded,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
