import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Currency } from './currency.model';
import { CurrencyState, CurrencyStore } from './currency.store';

@Injectable({ providedIn: 'root' })
export class CurrencyQuery extends QueryEntity<CurrencyState> {
  public currencies$ = this.selectAll();

  constructor(protected store: CurrencyStore) {
    super(store);
  }

  public getCurrency(code: string): Observable<Currency> {
    return this.selectEntity(code);
  }
}
