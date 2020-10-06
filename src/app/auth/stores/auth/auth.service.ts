import { Injectable } from '@angular/core';
import { GoalQuery, GoalService } from '@goals/stores/goal';
import { Currency } from '@settings/entities/currency/currency.model';
import { CollectionConfig, FireAuthService } from 'akita-ng-fire';
import { User } from 'firebase';
import { auth as firebaseAuth } from 'firebase/app';
import { AuthState, AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'users' })
export class AuthService extends FireAuthService<AuthState> {
  public oldUser: User;
  constructor(store: AuthStore, private goals: GoalQuery, private goalService: GoalService) {
    super(store);
  }

  public async loginWithGoogle(): Promise<firebaseAuth.UserCredential> {
    const provider = new firebaseAuth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return this.signin(provider);
  }

  public async transferGoals(cred: firebase.auth.UserCredential): Promise<void> {
    const goals = this.goals.getAll();
    const collection$ = this.goalService.syncCollection({ params: { id: cred.user.uid } });
    return await collection$.toPromise().then(() => {
      this.goalService.setGoals(goals);
    });
  }

  public async onSignup(cred: firebase.auth.UserCredential) {
    if (this.oldUser?.isAnonymous) {
      await this.transferGoals(cred);
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
