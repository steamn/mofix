import UserRepo from 'repositories/UserRepo';
import {PushNotification} from './../services/PushNotification/index';
import {NetAPI} from 'repositories/index';
import {HttpClient, LocalClient} from 'services/index';
import GeoPositionStore from 'store/GeoPositionStore';
import InformationStore from 'store/InformationStore';
import HelperStore from 'store/HelperStore';
import NewsStore from 'store/NewsStore';
import PromoRepo from 'repositories/PromoRepo';
import PromoStore from 'store/PromoStore';
import PartnersRepo from 'repositories/PartnersRepo';
import PartnersStore from 'store/PartnersStore';
import FilterRepo from 'repositories/FilterRepo';
import FilterStore from 'store/FilterStore';
import AuthStore from 'store/AuthStore';
import AuthRepo from 'repositories/AuthRepo';
import NotificationRepo from 'repositories/NotificationRepo';
import NotificationStore from 'store/NotificationStore';
import PayRepo from 'repositories/PayRepo';
import PayStore from 'store/PayStore';
import UserStore from 'store/UserStore';

const services = {
  httpClient: HttpClient,
  localClient: new LocalClient(),
  notificationService: new PushNotification(),
};

const repositories = {
  http: new NetAPI(services.httpClient),
  promoRepo: new PromoRepo(services.httpClient),
  partnersRepo: new PartnersRepo(services.httpClient),
  filterRepo: new FilterRepo(services.httpClient),
  authRepo: new AuthRepo(services.httpClient),
  notificationRepo: new NotificationRepo(services.httpClient),
  payRepo: new PayRepo(services.httpClient),
  userRepo: new UserRepo(services.httpClient),
};

const geoPositionStore = new GeoPositionStore(services.localClient);

const stores = {
  geoPositionStore,
  informationStore: new InformationStore(),
  helperStore: new HelperStore(services.localClient),
  promoStore: new PromoStore(repositories.promoRepo),
  newsStore: new NewsStore(),
  partnersStore: new PartnersStore(repositories.partnersRepo, geoPositionStore),
  filterStore: new FilterStore(repositories.filterRepo),
  authStore: new AuthStore(repositories.authRepo, services.localClient),
  pushStore: new NotificationStore(
    repositories.notificationRepo,
    services.notificationService,
  ),
  payStore: new PayStore(repositories.payRepo, services.localClient),
  userStore: new UserStore(repositories.userRepo),
};

export default {
  services,
  repositories,
  stores,
};
