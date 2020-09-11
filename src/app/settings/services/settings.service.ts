import { Injectable } from '@angular/core';
import { classToPlain, plainToClass } from 'class-transformer';
import { Currency } from '../models/currency';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly keys = {
    currency: 'SETTINGS_CURRENCY',
  };
  private readonly storageClass: Storage = localStorage;
  private currency: Currency;

  constructor() {
    this.load();
  }

  private save(): void {
    this.storageClass.setItem(this.keys.currency, this.currency ? JSON.stringify(classToPlain(this.currency)) : null);
  }

  private load(): void {
    const currency = localStorage.getItem(this.keys.currency);
    this.currency = currency ? plainToClass(Currency, JSON.parse(currency)) : null;
  }

  public setCurrency(currency: Currency): void {
    this.currency = currency;
    this.save();
  }

  public getCurrency(): Currency {
    return this.currency;
  }
}
