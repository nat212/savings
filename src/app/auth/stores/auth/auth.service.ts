import { Injectable } from '@angular/core';
import { FunctionsService } from '@services/functions.service';
import { Currency } from '@settings/entities/currency/currency.model';
import { CollectionConfig, FireAuthService } from 'akita-ng-fire';
import { User } from 'firebase';
import { auth as firebaseAuth } from 'firebase/app';
import { AuthState, AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'users' })
export class AuthService extends FireAuthService<AuthState> {
  public oldUser: User;
  constructor(store: AuthStore, private functions: FunctionsService) {
    super(store);
  }

  public async loginWithGoogle(): Promise<firebaseAuth.UserCredential> {
    const provider = new firebaseAuth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return this.signin(provider);
  }

  public async onSignup(cred: firebase.auth.UserCredential): Promise<void> {
    if (this.oldUser?.isAnonymous) {
      await this.functions.transferGoals(this.oldUser.uid).toPromise();
    }
  }

  public async onSignin(cred: firebaseAuth.UserCredential): Promise<void> {
    this.oldUser = cred.user;
  }

  public createProfile(user: User): AuthState['profile'] {
    return { currencyCode: null, anonymous: user.isAnonymous, email: user.email, photoURL: user.photoURL };
  }

  public setCurrency(currency: Currency): Promise<void | firebase.firestore.Transaction> {
    return this.update({ currencyCode: currency.code });
  }
}
