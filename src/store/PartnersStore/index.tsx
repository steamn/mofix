import {action, makeObservable, observable} from 'mobx';
import BaseStore from 'store/BaseStore';
import PartnersRepo from 'repositories/PartnersRepo';
import {IPartner} from 'src/models/partner';
import GeoPositionStore from 'store/GeoPositionStore';

export default class PartnersStore extends BaseStore {
  parnersList: IPartner[] = [];
  partner: IPartner | null = null;
  checkedCategories: number[] = [];
  Loading = false;
  constructor(
    private partnersRepo: PartnersRepo,
    private geopositionStore: GeoPositionStore,
  ) {
    super();
    makeObservable(this, {
      getPartnersList: action,
      getPartner: action,
      getCheckedPartnersList: action,
      createCheckedCategories: action,
      cleanPartner: action,
      parnersList: observable,
      partner: observable,
      checkedCategories: observable,
      Loading: observable,
    });
  }
  getPartnersList() {
    this.Loading = true;
    this.makeRequest({
      request: () => this.partnersRepo.getAllParners(),
      success: res => {
        if (
          !this.geopositionStore.city.length ||
          this.geopositionStore.city === 'Москва'
        ) {
          this.parnersList = res.data.filter(
            (item: IPartner) => item.city.name === 'Москва',
          );
        } else {
          this.parnersList = res.data.filter(
            (item: IPartner) => item.city.name === 'Санкт-Петербург',
          );
        }
      },
    });
    this.Loading = false;
  }

  getPartner(id: string) {
    this.makeRequest({
      request: () => this.partnersRepo.getSinglePartner(id),
      success: res => {
        this.partner = res;
      },
    });
  }
  createCheckedCategories(id: number) {
    if (this.checkedCategories.includes(id)) {
      this.checkedCategories = this.checkedCategories.filter(
        item => item !== id,
      );
    } else {
      this.checkedCategories.push(id);
    }
  }

  clearCheckedCategories() {
    this.checkedCategories = [];
  }

  getCheckedPartnersList(data?: string) {
    const arr = this.checkedCategories;
    const createString = () => {
      let newStr = '';
      for (let i = 0; i < arr.length; i++) {
        newStr = newStr + `id[${[i]}]=${arr[i]}&`;
      }
      return newStr;
    };
    const searchStr = createString();
    this.makeRequest({
      request: () => this.partnersRepo.getCheckedParners(searchStr),
      success: res => {
        this.parnersList = res;
      },
    });
  }

  cleanPartner() {
    this.partner = null;
  }
}
