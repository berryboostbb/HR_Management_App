import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { BottomSheetProvider, defaultTheme } from '@utils';
import { EventRegister } from 'react-native-event-listeners';
import {
  getDataFromUserDefaults,
  navigationRef,
  setIsDarkModeEnabled,
} from '@services';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';

const App = () => {
  const [isEnabledOne, setIsEnabledOne] = useState(false);

  const colorScheme = useColorScheme();
  const defaultT = defaultTheme;
  let appTheme = isEnabledOne ? defaultT : defaultT;

  useEffect(() => {
    let listener = EventRegister.addEventListener('appThemeChange', data => {
      setIsEnabledOne(data);
    });
    return () => {
      EventRegister.removeEventListener(listener as any);
    };
  }, []);

  useEffect(() => {
    (async () => {
      let isEnabled = await getDataFromUserDefaults('THEME_KEY');

      if (
        (isEnabled !== undefined && isEnabled === 'true') ||
        (isEnabled === undefined && colorScheme === 'dark')
      ) {
        setIsEnabledOne(true);
        setIsDarkModeEnabled(true);
      } else {
      }
    })();
  }, [colorScheme]);

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#0755E9',
    },
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer ref={navigationRef} theme={appTheme as any}>
            <StatusBar
              animated={true}
              backgroundColor="transparent"
              barStyle={'dark-content'}
              translucent={true}
            />
            <BottomSheetProvider>
              <Routes />
            </BottomSheetProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
