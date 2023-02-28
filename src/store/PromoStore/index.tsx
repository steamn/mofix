import {action, makeObservable, observable} from 'mobx';
import BaseStore from 'store/BaseStore';
import {IPromo} from 'src/models/promo';
import PromoRepo from 'repositories/PromoRepo';

export default class PromoStore extends BaseStore {
  promoList: IPromo[] = [];
  promoItem: IPromo | null = null;

  constructor(private promoRepo: PromoRepo) {
    super();
    makeObservable(this, {
      getPromoList: action,
      getPromoItem: action,
      cleanPromoItem: action,
      promoList: observable,
      promoItem: observable,
    });
  }
  getPromoList() {
    this.makeRequest({
      request: () => this.promoRepo.getAllPromo(),
      success: res => {
        this.promoList = res;
      },
    });
  }

  getPromoItem(id: string) {
    this.makeRequest({
      request: () => this.promoRepo.getSinglePromo(id),
      success: res => {
        this.promoItem = res;
      },
    });
  }

  cleanPromoItem() {
    this.promoItem = null;
  }
}
