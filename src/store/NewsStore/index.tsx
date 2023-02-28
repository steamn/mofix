import {action, makeObservable, observable} from 'mobx';
import BaseStore from 'store/BaseStore';
import {INews} from 'src/models/news';

export default class NewsStore extends BaseStore {
  newsList: INews[] = [];
  newsItem: INews | undefined = undefined;
  Loading = false;
  total: number | null = null;
  lastPage: number | null = null;

  constructor() {
    super();
    makeObservable(this, {
      getNewsItem: action,
      cleanNewsItem: action,
      cleanNewsList: action,
      setNewsList: action,
      newsList: observable,
      newsItem: observable,
      Loading: observable,
      total: observable,
      lastPage: observable,
    });
  }

  setNewsList(data: INews[]) {
    this.newsList = data;
  }

  getNewsItem(id: number) {
    this.Loading = true;
    this.newsItem = this.newsList.find(item => item.id === id);
    this.Loading = false;
  }

  cleanNewsItem() {
    this.newsItem = undefined;
  }

  cleanNewsList() {
    this.newsList = [];
  }
}
