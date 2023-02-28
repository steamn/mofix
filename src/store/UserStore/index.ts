import {IUser} from 'src/models/user';
import {action, makeObservable, observable} from 'mobx';
import BaseStore from 'store/BaseStore';
import UserRepo from 'repositories/UserRepo';

export default class UserStore extends BaseStore {
  success = false;
  name = '';
  birthday: Date | null = null;
  paid = '';

  constructor(private userRepo: UserRepo) {
    super();
    makeObservable(this, {
      getData: action,
      setData: action,
      success: observable,
      name: observable,
      birthday: observable,
      paid: observable,
    });
  }

  setData(data: IUser) {
    this.makeRequest({
      request: () =>
        this.userRepo
          .setUserData(data)
          .then(res => {
            this.success = res.data.success;
          })
          .then(() => {
            this.getData();
          }),
    });
  }

  getData() {
    this.makeRequest({
      request: () => this.userRepo.getUserData(),
      success: res => {
        this.birthday = new Date(res.result.birthday);
        this.name = res.result.name;
        this.paid = res.result.card_status;
      },
    });
  }

  cleanSuccess() {
    this.success = false;
  }
}
