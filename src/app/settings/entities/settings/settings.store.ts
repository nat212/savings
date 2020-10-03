import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Currency } from '../../models/currency';

export interface SettingsState {
  currency: Currency;
}

export function createInitialState(): SettingsState {
  return {
    currency: null,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'settings' })
export class SettingsStore extends Store<SettingsState> {
  constructor() {
    super(createInitialState());
  }
}
