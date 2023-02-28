import {action, makeObservable, observable} from 'mobx';
import {RequestPromise, Response} from 'src/models/main';

interface MakeRequestData<D> {
  request: () => Promise<D>;
  success?: (response: any) => void;
  error?: (error: any) => void;
  onFinally?: () => void;
  loadingOff?: true;
  log?: boolean;
}

export default class BaseStore {
  loading = false;
  error = '';

  constructor() {
    makeObservable(this, {
      loading: observable,
      error: observable,
      clear: action,
    });
  }

  clear() {
    this.loading = false;
    this.error = '';
  }

  makeRequest<D>({
    request,
    success,
    error,
    onFinally,
    loadingOff,
  }: MakeRequestData<D>) {
    if (!loadingOff) {
      this.loading = true;
    }
    this.error = '';

    request()
      .then(res => {
        if (success && res) {
          success(res);
        }
      })
      .catch(err => {
        const errorMesssage = err?.error || err?.message || 'Undefined error';
        this.error = errorMesssage;
        if (error) {
          error(errorMesssage);
        }
      })
      .finally(() => {
        if (onFinally) {
          onFinally();
        }

        if (!loadingOff) {
          this.loading = false;
        }
      });
  }

  setError(err: string) {
    this.error = err;
  }
}
