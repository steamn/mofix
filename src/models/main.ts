export interface Response<D> {
  data: D;
}

export type RequestPromise<D> = Promise<Response<D>>;

export interface IAuthResponse {
  access_token: 'string';
  token_type: 'string';
}
