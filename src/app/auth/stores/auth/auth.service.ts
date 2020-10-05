import { Injectable } from '@angular/core';
import { Currency } from '@settings/entities/currency/currency.model';
import { CollectionConfig, FireAuthService } from 'akita-ng-fire';
import { User } from 'firebase';
import { AuthState, AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'users' })
export class AuthService extends FireAuthService<AuthState> {
  constructor(store: AuthStore) {
    super(store);
  }

  public createProfile(user: User): AuthState['profile'] {
    return { currencyCode: null, anonymous: user.isAnonymous };
  }

  public setCurrency(currency: Currency): void {
    this.update({ currencyCode: currency.code });
  }
}
