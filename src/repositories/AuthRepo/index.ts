import NetAPI from 'repositories/NetAPI';
import {IRegisterData} from 'src/models/auth';

export default class AuthRepo extends NetAPI {
  private send_phone = 'login';
  private get_token = 'login-two-step';

  public async sendPhoneNumber(phone: string) {
    try {
      const response = await this.post(this.send_phone, {phone});
      return response?.data;
    } catch (e) {
      return this.getFirstError(
        e.response.data.errors || e.response.data.error,
      );
    }
  }

  public async enterCodeNumber(data: IRegisterData) {
    try {
      const response = await this.post(this.get_token, data);
      return response?.data;
    } catch (e) {
      return this.getFirstError(
        e.response.data.errors || e.response.data.error,
      );
    }
  }
}
