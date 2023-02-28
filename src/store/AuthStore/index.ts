import {action, makeObservable, observable} from 'mobx';
import BaseStore from 'store/BaseStore';
import LocalClient from 'services/LocalClient';
import AuthRepo from 'repositories/AuthRepo';
import {IRegisterData} from 'src/models/auth';

export default class AuthStore extends BaseStore {
  phoneNumber = '';
  formattedPhone = '';
  code = '';
  checkCodeSuccess = false;
  sendPhoneSuccess = false;
  getTokenError = false;
  error = '';
  token = '';
  Loading = false;

  constructor(private authRepo: AuthRepo, private $storage: LocalClient) {
    super();
    makeObservable(this, {
      sendPhoneNumber: action,
      getToken: action,
      cancelError: action,
      clearTokenError: action,
      removeToken: action,
      checkToken: action,
      cancelCheckCodeSuccess: action,
      token: observable,
      checkCodeSuccess: observable,
      getTokenError: observable,
      phoneNumber: observable,
      formattedPhone: observable,
      code: observable,
      Loading: observable,
    });
  }
  async savePhoneNumber(data: string) {
    this.phoneNumber = data;
  }
  saveFormattedPhoneNumber(data: string) {
    this.formattedPhone = data;
  }
  async sendPhoneNumber(phone: string) {
    this.makeRequest({
      request: () =>
        this.authRepo.sendPhoneNumber(phone).then(res => {
          if (res.success) {
            this.sendPhoneSuccess = true;
          } else {
            this.sendPhoneSuccess = false;
            this.error = res.error;
          }
        }),
    });
  }

  getToken(data: IRegisterData) {
    this.makeRequest({
      request: () =>
        this.authRepo.enterCodeNumber(data).then(res => {
          if (res.success) {
            this.checkCodeSuccess = res.success;
            this.token = res.result;
            this.$storage.set('token', res.result);
          } else {
            this.getTokenError = true;
          }
        }),
    });
  }
  cancelError() {
    this.error = '';
  }
  clearTokenError() {
    this.getTokenError = false;
  }
  async checkToken() {
    this.Loading = true;
    const token = await this.$storage.get('token');
    if (token) {
      this.token = token;
    }
    this.Loading = false;
  }
  async removeToken() {
    await this.$storage.remove('token');
    this.token = '';
  }
  cancelCheckCodeSuccess() {
    this.checkCodeSuccess = false;
  }
}
