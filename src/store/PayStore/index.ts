import {action, makeObservable, observable} from 'mobx';
import BaseStore from 'store/BaseStore';
import LocalClient from 'services/LocalClient';
import PayRepo from 'repositories/PayRepo';

export default class PayStore extends BaseStore {
  success = false;
  url = '';
  token = '';

  constructor(private payRepo: PayRepo, private $storage: LocalClient) {
    super();
    makeObservable(this, {
      sendTokenToPay: action,
      cleanSuccess: action,
      success: observable,
      url: observable,
      token: observable,
    });
  }

  sendTokenToPay() {
    this.makeRequest({
      request: () =>
        this.payRepo.getPayUrl().then(res => {
          if (res.data.success) {
            this.success = res.data.success;
            this.url = res.data.result.url;
          } else {
            this.success = false;
            console.log(Error);
          }
        }),
    });
  }

  cleanSuccess() {
    this.success = false;
  }
}
