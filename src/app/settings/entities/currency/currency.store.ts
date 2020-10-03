import { Injectable } from '@angular/core';
import { Currency } from './currency.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface CurrencyState extends EntityState<Currency> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'currency' })
export class CurrencyStore extends EntityStore<CurrencyState> {

  constructor() {
    super();
  }

}

