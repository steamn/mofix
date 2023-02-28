import {action, makeObservable, observable} from 'mobx';
import BaseStore from 'store/BaseStore';

export default class InformationStore extends BaseStore {
  title = '';
  constructor() {
    super();
    makeObservable(this, {
      title: observable,
      setTitle: action,
    });
  }

  setTitle(item: string) {
    this.title = item;
  }
}
