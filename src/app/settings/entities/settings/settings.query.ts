import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Currency } from '../../models/currency';
import { SettingsState, SettingsStore } from './settings.store';

@Injectable({ providedIn: 'root' })
export class SettingsQuery extends Query<SettingsState> {
  public currency$ = this.select((state) => state.currency);
  public settings$ = this.select();
  constructor(protected store: SettingsStore) {
    super(store);
  }

  public getCurrency(): Currency {
    return this.getValue().currency;
  }
}
