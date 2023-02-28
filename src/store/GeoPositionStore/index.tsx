import {action, makeObservable, observable} from 'mobx';
import LocalClient from 'services/LocalClient';
import BaseStore from 'store/BaseStore';

export default class GeoPositionStore extends BaseStore {
  city = '';
  cityIsChanged = false;
  constructor(private $storage: LocalClient) {
    super();
    makeObservable(this, {
      city: observable,
      cityIsChanged: observable,
      setCity: action,
      checkCity: action,
    });
  }

  async setCity(city = '') {
    await this.$storage.set('city', city);
    this.cityIsChanged = !this.cityIsChanged;
  }

  async checkCity() {
    const data = await this.$storage.get('city');
    if (data) {
      this.city = data;
    }
  }
}
