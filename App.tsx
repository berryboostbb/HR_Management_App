import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Alert, BottomSheetProvider, defaultTheme } from '@utils';
import { EventRegister } from 'react-native-event-listeners';
import { store } from '@redux';
import { persistor } from './src/redux/store';

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
import DropdownAlert from 'react-native-dropdownalert';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Geocoder from 'react-native-geocoding';



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
      <Provider store={store}>
        <PersistGate persistor={persistor}>
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
                  <DropdownAlert
                    alert={func => (Alert.alertObj = func)}
                    dismissInterval={2000}
                    successColor={'green'}
                    errorColor={'red'}
                    animatedViewStyle={{ height: '13.3%' }}
                    safeViewStyle={{
                      height:
                        //  Platform.OS == 'ios' ? rv(80) :
                        '100%',
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                    }}
                    activeStatusBarStyle={'default'}
                    inactiveStatusBarStyle={'default'}
                    inactiveStatusBarBackgroundColor={'#fff'}
                    updateStatusBar={false}
                  />
                </BottomSheetProvider>
              </NavigationContainer>
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
