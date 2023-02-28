export interface IPushNotification {
  requestPermission(): Promise<boolean>;
  saveFcmToken(userId: number): Promise<void>;
}
