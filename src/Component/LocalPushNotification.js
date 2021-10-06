import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';

class LocalNotificationService {
  configure = onOpenNotification => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log(' Local Notification service onRegister', token);
      },
      onNotification: function (notification) {
        console.log('LocalNotification on Notification', notification);

        if (!notification?.data) {
          return;
        }
        notification.userInteraction = true;
        onOpenNotification(
          Platform.OS === 'ios' ? notification.data.item : notification.data,
        );

        if (Platform.OS === 'ios') {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },
      permissions: {
        alert: true,
        badge: true,
        sound: false,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  };
  // unregister = () => {
  //   PushNotification.unregister()
  // }
}
