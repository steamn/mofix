import {IPushNotification} from './types';
import messaging from '@react-native-firebase/messaging';

export class PushNotification implements IPushNotification {
  async requestPermission(): Promise<boolean> {
    const authStatus = await messaging().requestPermission();
   
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  }
  getFcmToken(): Promise<string> {
    return messaging().getToken();
  }

  async saveFcmToken(): Promise<any> {
    const token = await this.getFcmToken();
    return token;
  }
}
