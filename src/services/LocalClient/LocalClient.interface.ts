export interface ILocalClient {
  get(key: string): Promise<string | undefined>;
  getObject(key: string): Promise<number[] | undefined>;
  set(key: string, value: string): Promise<void | undefined>;
  setObject(key: string, value: number[]): Promise<void | undefined>;
}
