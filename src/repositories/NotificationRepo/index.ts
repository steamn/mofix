import NetAPI from '../NetAPI';
import {RequestPromise} from 'src/models/main';
import {IPush} from 'src/models/push';

export default class NotificationRepo extends NetAPI {
  url = 'fcm-token';

  async sendFcmToken(data: IPush): RequestPromise<any> {
    try {
      const response = await this.post(`${this.url}`, data);
      return response.data;
    } catch (e: any) {
      return this.getFirstError(e.response.data.errors);
    }
  }
}
