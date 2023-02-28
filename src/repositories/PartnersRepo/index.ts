import {IPartner} from './../../models/partner';
import NetAPI from '../NetAPI';

import {RequestPromise} from 'src/models/main';

export default class PartnersRepo extends NetAPI {
  url = 'partner';
  url_2 = 'category?';

  async getAllParners(): RequestPromise<IPartner[]> {
    try {
      const response = await this.get(this.url);
      return response?.data;
    } catch (e: any) {
      return this.getFirstError(
        e.response.data.errors || e.response.data.error,
      );
    }
  }

  async getSinglePartner(id: string): RequestPromise<IPartner> {
    try {
      const response = await this.get(`${this.url}/${id}`);
      return response?.data;
    } catch (e: any) {
      return this.getFirstError(
        e.response.data.errors || e.response.data.error,
      );
    }
  }
  async getCheckedParners(data?: string): RequestPromise<IPartner[]> {
    try {
      const response = await this.get(`${this.url_2}${data}`);
      return response?.data;
    } catch (e: any) {
      return this.getFirstError(
        e.response.data.errors || e.response.data.error,
      );
    }
  }
}
