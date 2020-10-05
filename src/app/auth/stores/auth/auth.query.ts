import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { CurrencyQuery } from '@settings/entities/currency/currency.query';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthState, AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {
  public profile$ = this.select('profile');
  public userId$ = this.select('uid');
  public anonymous$ = this.profile$.pipe(map((profile) => profile.anonymous));
  public currency$ = this.profile$.pipe(
    switchMap((profile) => (profile?.currencyCode ? this.currencyQuery.selectEntity(profile.currencyCode) : of(null))),
  );
  public userId = this.getValue().uid;

  constructor(protected store: AuthStore, private currencyQuery: CurrencyQuery) {
    super(store);
  }
}
