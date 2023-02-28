import NetAPI from '../NetAPI';
import {RequestPromise} from 'src/models/main';
import {IUser} from 'src/models/user';

export default class UserRepo extends NetAPI {
  url = 'profile';

  async getUserData(): RequestPromise<IUser[]> {
    try {
      const response = await this.get(this.url);
      return response?.data;
    } catch (e: any) {
      return this.getFirstError(
        e.response.data.errors || e.response.data.error,
      );
    }
  }
  async setUserData(data: IUser): RequestPromise<any> {
    try {
      const response = await this.post(this.url, data);
      return response;
    } catch (e) {
      return this.getFirstError(
        e.response.data.errors || e.response.data.error,
      );
    }
  }
}
