import {action, makeObservable, observable} from 'mobx';
import LocalClient from 'services/LocalClient';
import BaseStore from 'store/BaseStore';
import {SECRET} from '@env';
import NotificationRepo from 'repositories/NotificationRepo';
import {PushNotification} from 'services/PushNotification';

type NewsOrPromo = 'news' | 'promo';

export default class NotificationStore extends BaseStore {
  token = '';
  secret = SECRET;
  constructor(
    private notificationRepo: NotificationRepo,
    private notificationService: PushNotification,
  ) {
    super();
    makeObservable(this, {
      token: observable,
      setFcmToken: action,
    });
  }

  async setFcmToken() {
    const fcmToken = await this.notificationService.saveFcmToken();
    if (fcmToken) {
      this.token = fcmToken;
      this.makeRequest({
        request: () =>
          this.notificationRepo.sendFcmToken({
            token: fcmToken,
            secret: this.secret,
          }),
        success: res => {
          // console.log(
          //   'Send FCM Token',
          //   res,
          //   'Token',
          //   fcmToken,
          //   'Secret',
          //   this.secret,
          // );
        },
      });
    }
  }
}
