import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveDataInUserDefaults({key, value}: any) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {}
}

export async function getDataFromUserDefaults(key: any) {
  try {
    let item = await AsyncStorage.getItem(key);
    if (item !== null) {
      return item;
    }
  } catch (error) {}

  return undefined;
}

let isDarkThemeEnabled = false;

export function setIsDarkModeEnabled(isEnabled: any) {
  isDarkThemeEnabled = isEnabled;
}

export function getIsDarkModeEnabled() {
  return isDarkThemeEnabled;
}
