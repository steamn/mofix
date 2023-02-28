import {ILocalClient} from 'services/LocalClient/LocalClient.interface';

export default class LocalAPI {
  constructor(private $storage: ILocalClient) {}

  protected async get(key: string) {
    try {
      const res = await this.$storage.get(key);
      return res ? JSON.parse(res) : undefined;
    } catch (e) {
      console.log('LOCAL GET Error', e);
    }
  }

  protected async set(key: string, data: any) {
    try {
      const serialized = JSON.stringify(data);
      await this.$storage.set(key, serialized);
    } catch (e) {
      console.log('LOCAL GET Error', e);
    }
  }
}
