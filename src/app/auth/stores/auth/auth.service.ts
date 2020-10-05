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
    return { currencyCode: null, anonymous: user.isAnonymous, email: user.email, photoURL: user.photoURL };
  }

  public setCurrency(currency: Currency): Promise<void | firebase.firestore.Transaction> {
    return this.update({ currencyCode: currency.code });
  }
}
