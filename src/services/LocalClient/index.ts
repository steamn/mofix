// import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ILocalClient} from './LocalClient.interface';

export default class LocalClient implements ILocalClient {
  storage = AsyncStorage;

  async get(key: string): Promise<string | undefined> {
    try {
      const res = await this.storage.getItem(key);
      if (!res) {
        throw new Error(`There is no such key as ${key}`);
      }
      return res;
    } catch (e) {
      // console.log('LOCAL CLIENT ERROR', e);
    }
  }

  async getObject(key: string): Promise<number[] | undefined> {
    try {
      const res = await this.storage.getItem(key);
      if (!res) {
        throw new Error(`There is no such key as ${key}`);
      }
      return JSON.parse(res);
    } catch (e) {
      // console.log('LOCAL CLIENT ERROR', e);
    }
  }

  async set(key: string, value: string): Promise<void | undefined> {
    try {
      return await this.storage.setItem(key, value);
    } catch (e) {
      // console.log('LOCAL CLIENT ERROR', e);
    }
  }

  async setObject(key: string, value: number[]): Promise<void | undefined> {
    try {
      const jsonValue = JSON.stringify(value);
      return await this.storage.setItem(key, jsonValue);
    } catch (e) {
      // console.log('LOCAL CLIENT ERROR', e);
    }
  }

  async remove(key: string): Promise<void | undefined> {
    try {
      return await this.storage.removeItem(key);
    } catch (e) {
      // console.log('LOCAL CLIENT ERROR', e);
    }
  }
}
