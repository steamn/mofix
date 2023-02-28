import {action, makeObservable, observable} from 'mobx';
import BaseStore from 'store/BaseStore';
import {ICategory} from 'src/models/category';
import FilterRepo from 'repositories/FilterRepo';

export default class FilterStore extends BaseStore {
  allCategoriesList: ICategory[] = [];

  constructor(private filterRepo: FilterRepo) {
    super();
    makeObservable(this, {
      getAllCategoriesList: action,
      clearAllCategoriesList: action,
      allCategoriesList: observable,
    });
  }
  getAllCategoriesList() {
    this.makeRequest({
      request: () => this.filterRepo.getAllCategories(),
      success: res => {
        this.allCategoriesList = res;
      },
    });
  }

  clearAllCategoriesList() {
    this.allCategoriesList = [];
  }
}
