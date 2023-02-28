import NetAPI from '../NetAPI';
import {IPromo} from 'src/models/promo';
import {RequestPromise} from 'src/models/main';

export default class PromoRepo extends NetAPI {
  url = 'promo';

  async getAllPromo(): RequestPromise<IPromo[]> {
    try {
      const response = await this.get(this.url);
      return response?.data;
    } catch (e: any) {
      return this.getFirstError(
        e.response.data.errors || e.response.data.error,
      );
    }
  }

  async getSinglePromo(id: string): RequestPromise<IPromo> {
    try {
      const response = await this.get(`${this.url}/${id}`);
      return response?.data;
    } catch (e: any) {
      return this.getFirstError(
        e.response.data.errors || e.response.data.error,
      );
    }
  }
}
