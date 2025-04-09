import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

type Store = { requestId: string };

@Injectable()
export class RequestContextService {
  private readonly asyncLocalStorage = new AsyncLocalStorage<Store>();

  run(requestId: string, callback: () => void) {
    this.asyncLocalStorage.run({ requestId }, callback);
  }

  getRequestId(): string | undefined {
    const store = this.asyncLocalStorage.getStore();
    return store?.requestId;
  }

  setRequestId(requestId: string): void {
    const store = this.asyncLocalStorage.getStore();
    if (store) {
      store.requestId = requestId;
    }
  }
}
