import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authenticated$: Observable<boolean>;
  public user$: Observable<firebase.User>;
  public userId$: Observable<string>;
  public userId: string;

  constructor(private fireAuth: AngularFireAuth) {
    this.user$ = this.fireAuth.user;
    this.authenticated$ = this.user$.pipe(map((user) => !!user));
    this.userId$ = this.user$.pipe(
      filter((user) => !!user),
      map((user) => user.uid),
    );
    this.userId$.subscribe((userId) => (this.userId = userId));
  }

  public registerWithEmail(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  public loginWithEmail(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  public loginWithGoogle(): Promise<firebase.auth.UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return this.fireAuth.signInWithPopup(provider);
  }
}
