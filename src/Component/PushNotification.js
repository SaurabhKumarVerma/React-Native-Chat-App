/* eslint-disable no-undef */
// /* eslint-disable no-alert */
// import messaging from '@react-native-firebase/messaging';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import _ from 'lodash';

// export async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//     getFcmToken();
//     notificationListner();
//   }
// }

// const getFcmToken = async () => {
//   const fcmToken = await messaging().getToken();

//   if (!_.isEmpty(fcmToken)) {
//     const fcmToken = await messaging().getToken();

//     console.log(fcmToken, 'New Toekn ');
//     await AsyncStorage.setItem('fcmToken', fcmToken);
//   }
//   console.log('FCM TOKEN', fcmToken);
// };

// export const notificationListner = async () => {
//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log(
//       'Notification caused app to open from background state:',
//       remoteMessage.notification,
//     );
//   });

//   messaging().onMessage(async remoteMessage => {
//     console.log('Foreground', remoteMessage);
//   });
//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log(
//           'Notification caused app to open from quit state:',
//           remoteMessage.notification,
//         );
//       }
//     });
// };
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/messaging';
import {Platform} from 'react-native';

const createNotificationChannel = () => {
  PushNotification.createChannel(
    {
      channelId: 'default',
      channelName: 'Chat',
      channelDescription: 'A Chat notification channel',
      soundName: 'default',
      importance: Importance.HIGH,
      vibrate: true,
    },
    isCreated => console.log('PushNotification channel created: ', isCreated),
  );
};

export const pushN = async () => {
  createNotificationChannel();
  PushNotification.configure({
    onRegister: function (token) {
      console.log(token);
    },

    onNotification: function (notification) {
      console.log('NOTIFICATION', notification);
      if (!notification?.data) {
        return;
      }
      notification.userInteraction == true;
      onOpenNotification(
        Platform.OS === 'ios' ? notification.data.item : notification.data,
      );
      if (Platform.OS === 'ios') {
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      }
    },
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);

      // process the action
      if (notification.action === 'Yes') {
        PushNotification.invokeApp(notification);
      }
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    senderID: '383548788849',
    popInitialNotification: true,
    requestPermissions: true,
  });
  firebase.messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!! ', remoteMessage);
  });
};
