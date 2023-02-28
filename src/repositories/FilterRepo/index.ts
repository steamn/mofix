import {ICategory} from './../../models/category';
import NetAPI from '../NetAPI';
import {RequestPromise} from 'src/models/main';

export default class FilterRepo extends NetAPI {
  url = 'categories';
  url_2 = 'categories?';

  async getAllCategories(): RequestPromise<ICategory[]> {
    try {
      const response = await this.get(this.url);
      return response?.data;
    } catch (e: any) {
      return this.getFirstError(
        e.response.data.errors || e.response.data.error,
      );
    }
  }
}
