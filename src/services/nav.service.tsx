import {DrawerActions, useRoute} from '@react-navigation/native';
import * as React from 'react';

export const navigationRef: any = React.createRef();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export const getCurrentRoute = () => {
  // const route = navigationRef.getCurrentRoute();
  // const route = navigationRef.current.getCurrentRoute().name;
  const route = useRoute();
  return route.name;
};

export function openDrawer() {
  navigationRef.current?.dispatch(DrawerActions.openDrawer());
}
