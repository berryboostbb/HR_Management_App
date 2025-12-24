import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { CommonActions, useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { rs, rv, SearchProvider, useSearch } from '@utils';
import { AppText } from '@components';
import HomeStack from './stacks/HomeStack';
import PlanStack from './stacks/PlanStack';
import LeavesStack from './stacks/LeavesStack';
import { HomeIcon, LeavesIcon, MoreIcon, PlanIcon } from '@assets';
import MoreStack from './stacks/MoreStack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/* ---------------------------- Tab navigator ---------------------------- */
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        lazy: true,
      }}
      tabBar={(props: any) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Plan" component={PlanStack} />
      <Tab.Screen name="Leaves" component={LeavesStack} />
      <Tab.Screen name="More" component={MoreStack} />
    </Tab.Navigator>
  );
}

/* ---------------------------- Custom Tab Bar ---------------------------- */
interface CustomTabBarProps {
  state: any;
  navigation: any;
}

const CustomTabBar = React.memo(
  ({ state, navigation }: CustomTabBarProps) => {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const { searchActive } = useSearch();

    // hide tab bar when search is active
    if (searchActive) return null;

    const getIcon = (routeName: string, isFocused: boolean) => {
      const color = isFocused ? colors.primary : colors.mediumGray;
      switch (routeName) {
        case 'Home':
          return <HomeIcon color={color} />;
        case 'Plan':
          return <PlanIcon color={color} />;
        case 'Leaves':
          return <LeavesIcon color={color} />;
        case 'More':
          return <MoreIcon color={color} />;
        default:
          return <HomeIcon color={color} />;
      }
    };

    const onTabPress = (route: any, index: number) => {
      const isFocused = state.index === index;

      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        // use dispatch to avoid multiple pushes of same screen
        navigation.dispatch(
          CommonActions.navigate({ name: route.name, params: route.params }),
        );
      }
    };

    return (
      <View
        pointerEvents="box-none"
        style={[
          styles.tabContainer,
          {
            height: rv(60) + insets.bottom,
            backgroundColor: colors.card ?? '#fff',
          },
        ]}
      >
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;

          return (
            <Pressable
              key={route.key}
              onPress={() => onTabPress(route, index)}
              style={styles.tabButton}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={route.name}
            >
              {getIcon(route.name, isFocused)}
              <AppText
                size={10}
                color={isFocused ? colors.primary : colors.medGrey}
              >
                {route.name}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    );
  },
  (prev, next) =>
    prev.state.index === next.state.index &&
    prev.state.routes.length === next.state.routes.length,
);

/* ---------------------------- Main Stack (optimized) ---------------------------- */
const MainStack = () => {
  return (
    <SearchProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Wrap SEARCH provider only around tabs to avoid re-renders of modals */}
        <Stack.Screen name="MyTabs" component={MyTabs}/>
      </Stack.Navigator>
    </SearchProvider>
  );
};

export default MainStack;

/* ---------------------------- Styles ---------------------------- */
const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    borderTopWidth: 0,
    // shadow for iOS / elevation for Android
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: rv(6),
    paddingVertical: rv(8),
  },
  icon: {
    height: rv(24),
    width: rs(24),
    resizeMode: 'contain',
  },
});
