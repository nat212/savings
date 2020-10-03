import { Injectable } from '@angular/core';
import { Currency } from '../../models/currency';
import { SettingsStore } from './settings.store';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private store: SettingsStore) {}

  public setCurrency(currency: Currency): void {
    this.store.update((state) => ({ ...state, currency }));
  }
}
