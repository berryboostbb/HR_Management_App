import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { PermissionsAndroid, Platform } from 'react-native';
import { logout, setFCMToken, store } from '@redux';
import { authApi, useLogoutMutation } from '../../src/api/authApi';

export const setupNotifications = async () => {
  // Android 13+ permission
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
  }

  // iOS + Android permission
  await messaging().requestPermission();

  // Create channel (ONCE)
  await notifee.createChannel({
    id: 'default',
    name: 'Default Notifications',
    importance: AndroidImportance.HIGH,
  });

  // FCM token
  const token = await messaging().getToken();
  // console.log('FCM TOKEN:', token);
  store.dispatch(setFCMToken(token));
};


export const foregroundListener = () => {
  return messaging().onMessage(async remoteMessage => {
    const body = remoteMessage?.notification?.body;

    // console.log('📩 FOREGROUND message:', body);

    // 🔥 FORCE LOGOUT CONDITION
    if (body === 'You are now inactive. Please contact your admin.') {
      console.log('🚪 Force logout triggered');

      store.dispatch(
        authApi.endpoints.logout.initiate()
      );
       store.dispatch(logout());

      return; // notification show na karo
    }

    // Normal notification
    await notifee.displayNotification({
      title: remoteMessage.notification?.title,
      body,
      android: {
        channelId: 'default',
      },
    });
  });
};
