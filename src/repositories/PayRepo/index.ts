import NetAPI from '../NetAPI';
import {RequestPromise} from 'src/models/main';
import {IPay} from 'src/models/pay';

export default class PayRepo extends NetAPI {
  url = 'transaction';

  public async getPayUrl(): RequestPromise<IPay> {
    try {
      const response = await this.post(this.url, {});
      return response;
    } catch (e) {
      return this.getFirstError(
        e.response.data.errors || e.response.data.error,
      );
    }
  }
}
