import {action, makeObservable, observable} from 'mobx';
import LocalClient from 'services/LocalClient';
import BaseStore from 'store/BaseStore';

type NewsOrPromo = 'news' | 'promo';

export default class HelperStore extends BaseStore {
  topTabBarHeight = 50;
  newsOrPromoType = 'promo';
  userStatus = '';
  preloaderStatus = true;
  Loading = false;
  constructor(private $storage: LocalClient) {
    super();
    makeObservable(this, {
      topTabBarHeight: observable,
      newsOrPromoType: observable,
      userStatus: observable,
      preloaderStatus: observable,
      Loading: observable,
      setTopTabBarHeight: action,
      setPromoOrNewsType: action,
      removeStatus: action,
    });
  }

  setTopTabBarHeight(item: number) {
    this.topTabBarHeight = item;
  }

  setPromoOrNewsType(type: NewsOrPromo) {
    this.newsOrPromoType = type;
  }

  setPreloaderFinish() {
    this.$storage.set('userStatus', 'true');
    this.preloaderStatus = false;
  }
  async checkPreloader() {
    this.Loading = true;
    const status = await this.$storage.get('userStatus');
    if (status) {
      this.userStatus = status;
    }
    this.Loading = false;
  }
  async removeStatus() {
    await this.$storage.remove('userStatus');
    this.userStatus = '';
  }
}
