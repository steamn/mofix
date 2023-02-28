import {AxiosInstance, AxiosRequestConfig} from 'axios';
import {string} from 'prop-types';

export default class NetAPI {
  /**
   * @constructor
   * @param $http - client to create http calls
   */
  constructor(public $http: AxiosInstance) {}

  /**
   *
   * GET method to call API
   * @param {string} url - url to call
   * @param {*} params
   * @returns response
   */
  protected async get(url: string, params?: AxiosRequestConfig) {
    // console.log({url, params});
    try {
      return await this.$http.get(url, params);
    } catch (e) {
      // console.log('HTTP GET Error', {url, e});
      return Promise.reject(e);
    }
  }

  /**
   * POST method to call API
   * @param {string} url - url to call
   * @param {object} body - request body
   * @param {*} params
   * @returns response
   */
  protected async post(
    url: string,
    body: {[key in string]: any},
    params?: AxiosRequestConfig,
  ) {
    try {
      return await this.$http.post(url, body, params && params);
    } catch (e) {
      // console.log('HTTP POST Error', {url, e});
      return Promise.reject(e);
    }
  }

  /**
   * PUT method to call API
   * @param {string} url - url to call
   * @param {object} body - request body
   * @param {*} params
   * @returns response
   */
  protected async put(
    url: string,
    body: {[key in string]: any},
    params?: AxiosRequestConfig,
  ) {
    try {
      return await this.$http.put(url, body, params);
    } catch (e) {
      // console.log('HTTP PUT Error', {url, e});
      return Promise.reject(e);
    }
  }

  /**
   * DELETE method to call API
   * @param {string} url - url to call
   * @param {*} params
   * @returns response
   */
  protected async delete(url: string, params?: AxiosRequestConfig) {
    try {
      return await this.$http.delete(url, params);
    } catch (e) {
      // console.log('HTTP DELETE Error', {url, e});
      return Promise.reject(e);
    }
  }

  /**
   * Generate formData from object,
   * group__name => group[name]
   * @param {object} data
   * @returns {formData}
   */
  public getFormData(data: {[key in string]: any}) {
    const formData = new FormData();

    for (const dataKey in data) {
      if (data.hasOwnProperty(dataKey)) {
        const keys = dataKey.split('__');
        const key = keys.length === 1 ? keys[0] : `${keys[0]}[${keys[1]}]`;
        const value = data[dataKey as keyof typeof data];

        formData.append(key, value);
      }
    }

    return formData;
  }

  /**
   * Return first error from response errors object
   * @param {object} errors - response errors object
   * @returns {error: string}
   */
  public getFirstError(
    errors: {[key in string]: string[]} | string,
  ): Promise<{error: firstError}> {
    if (typeof errors === 'string') {
      return Promise.reject({error: errors});
    }

    const errorsList = Object.values(errors || {});
    const firstErrorList = errorsList[0] || [];
    const firstError = firstErrorList.length
      ? firstErrorList[0]
      : 'Unknown error';

    return Promise.reject({error: firstError});
  }
}
