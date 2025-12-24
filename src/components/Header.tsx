import {
  Image,
  StyleSheet,
  View,
  Pressable,
  TextInput,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import AppText from './AppText';
import { useTheme } from '@react-navigation/native';
import { Avatar, CrossIcon, NotifyIcon, Search } from '@assets';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale as ms } from 'react-native-size-matters';
import { navigate } from '@services';
// import { useSelector } from 'react-redux';
import { useSearch } from '@utils';

const rs = ms;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Props {
  search?: boolean;
}

const Header = ({ search = true }: Props) => {
  const theme: any = useTheme();

  const colors = theme.colors;
  const styles = useStyles(colors);
  // const { user } = useSelector((state: any) => state.user);
  const { searchActive, setSearchActive,setSearchText } =
    useSearch();

  const animatedWidth = useRef(new Animated.Value(rs(48))).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const crossOpacity = useRef(new Animated.Value(0)).current;
  const inputOpacity = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);
  
  useEffect(() => {
    if (searchActive) {
      inputRef.current?.focus();
      // OPEN — first animate width + slide, then show input
      Animated.parallel([
        Animated.timing(animatedWidth, {
          toValue: SCREEN_WIDTH * 0.777,
          duration: 350,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(slideAnim, {
          toValue: -SCREEN_WIDTH * 0.77,
          duration: 350,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        Animated.parallel([
          Animated.timing(inputOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(crossOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      });
    } else {
      // CLOSE — first hide input
      inputRef.current?.blur();

      Animated.parallel([
        Animated.timing(inputOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(crossOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // then collapse
        Animated.parallel([
          Animated.timing(animatedWidth, {
            toValue: rs(48),
            duration: 350,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 350,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start();
      });
      inputRef.current?.clear();
    }
  }, [searchActive]);

  return (
    <View style={styles.header}>
      {/* Profile section slides smoothly */}
      <Animated.View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          transform: [{ translateX: slideAnim }],
        }}
      >
        <View style={styles.imgView}>
          <Image
            source={
              // user?.image ? { uri: user?.image } :
               Avatar}
            style={styles.image}
          />
        </View>
        <View>
          <AppText regular lineHeight={14}>
            {/* {user?.name || 'Paul Walker'} */}Paul Walker'
          </AppText>
          <AppText regular size={10} color={colors.primary} lineHeight={14}>
            {/* {user?.adminId || 'MR-007'} */}MR-007
          </AppText>
           <AppText regular size={10} color={colors.mediumGray} >
            {/* {user?.distributor?.name} */}
          </AppText>
        </View>
      </Animated.View>

      <View style={styles.absolutebtn}>
        {search && (
          <Animated.View
            style={[
              styles.searchView,
              {
                height: rs(48),
                width: animatedWidth,
                flexDirection: 'row',
                paddingHorizontal: rs(12),
                justifyContent: searchActive ? 'space-between' : 'center',
              },
            ]}
          >
            <Pressable
              hitSlop={10}
              onPress={() => setSearchActive(!searchActive)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                // backgroundColor:"red",
                justifyContent: 'center',
              }}
            >
              <Search />
              {/* Always mounted, just animated opacity */}
              <Animated.View
                style={{
                  flex: 1,
                  opacity: inputOpacity,
                }}
              >
                <TextInput
                  ref={inputRef}
                  editable={searchActive}
                  onChangeText={txt => setSearchText(txt)}
                  style={{
                    flex: 1,
                    color: colors.black,
                    // backgroundColor:"red"
                  }}
                  placeholder="Search"
                  placeholderTextColor={colors.mediumGray}
                />
              </Animated.View>

              {/* Cross icon fade */}
              <Animated.View
                style={{
                  position: 'absolute',
                  right: 0,
                  opacity: crossOpacity,
                }}
              >
                <CrossIcon />
              </Animated.View>
            </Pressable>
          </Animated.View>
        )}

        <Pressable onPress={() => navigate('Notification')}>
          <LinearGradient
            colors={['#1B67F8', '#043083']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 1.7, y: 0.5 }}
            style={styles.gradient}
          >
            <NotifyIcon />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
};
export default Header;

const useStyles = (colors: any) =>
  StyleSheet.create({
    header: {
      marginTop: rs(58),
      flexDirection: 'row',
      alignItems: 'center',
      padding: rs(1),
      backgroundColor: colors.white,
      borderRadius: rs(112),
      marginBottom: rs(16),
      height: rs(56),
      justifyContent: 'space-between',
      overflow: 'hidden',
    },
    imgView: {
      height: rs(54),
      width: rs(54),
      borderRadius: rs(100),
      overflow: 'hidden',
      marginRight: rs(8),
    },
    image: {
      height: '100%',
      width: '100%',
    },
    searchView: {
      borderWidth: rs(0.67),
      borderRadius: rs(100),
      borderColor: colors.primary,
      alignItems: 'center',
      overflow: 'hidden',
    },
    absolutebtn: {
      flexDirection: 'row',
      position: 'absolute',
      right: rs(2),
      gap: rs(8),
      width: '100%',
      overflow: 'hidden',
      justifyContent: 'flex-end',
    },
    gradient: {
      height: rs(48),
      width: rs(48),
      borderRadius: rs(100),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
