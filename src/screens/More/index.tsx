import React from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { AppText, Wrapper } from '@components';
import { useTheme } from '@react-navigation/native';
import { rs } from '@utils';
import LinearGradient from 'react-native-linear-gradient';
import { Events, Payroll,Profile, Sync } from '@assets';
import { navigate } from '@services';

const data = [ 
  {
    img: Sync,
    title: 'Sync',
    desc: 'Last sync yesterday 10:45AM',
    screen: 'Reports',
  },
  {
    img: Payroll,
    title: 'Payroll',
    desc: 'View all employee payroll reports',
    screen: 'Payroll',
  },
  {
    img: Events,
    title: 'Events',
    desc: 'Get your all reports in excel and PDF',
    screen: 'Events',
  },
  {
    img: Profile,
    title: 'Profile',
    desc: 'Set up your profile, complete it',
    screen: 'Profile',
  },
];

const More = () => {
  const theme: any = useTheme();
  const colors: any = theme.colors;
  const styles = useStyles(colors);

  const onPress = (i: any) => {
    navigate(i?.screen);
  };

  return (
    <Wrapper search={false}>
      <AppText
        style={styles.marginH_12}
        regular
        size={16}
        color={colors.primary}
      >
        How may we assist you
      </AppText>

      <FlatList
        scrollEnabled={false}
        columnWrapperStyle={styles.wrapper}
        numColumns={2}
        data={data}
        renderItem={({ item, index }: any) => (
          <Pressable
            onPress={() => onPress(item)}
            key={index}
            style={styles.card}
          >
            <LinearGradient
              colors={['#1B67F8', '#043083']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 1.7, y: 0.5 }}
              style={styles.gradient}
            >
              <item.img />
            </LinearGradient>

            <AppText size={14} medium>
              {item.title}
            </AppText>

            <AppText regular style={styles.descWidth}>
              {item.desc}
            </AppText>
          </Pressable>
        )}
      />
    </Wrapper>
  );
};

export default More;

const useStyles = (colors: any) =>
  StyleSheet.create({
    marginH_12: {
      marginHorizontal: rs(12),
      marginBottom: rs(8),
    },
    card: {
      paddingLeft: rs(20),
      paddingVertical: rs(18),
      backgroundColor: colors.white,
      width: '49%',
      borderRadius: rs(16),
      gap: rs(16),
    },
    wrapper: {
      justifyContent: 'space-between',
      paddingHorizontal: rs(12),
      marginBottom: '2%',
    },
    gradient: {
      borderRadius: rs(6),
      height: rs(32),
      width: rs(32),
      justifyContent: 'center',
      alignItems: 'center',
    },
    descWidth: { width: rs(136) },
  });
