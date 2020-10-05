import { Injectable } from '@angular/core';
import { CollectionGuard } from 'akita-ng-fire';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AuthState } from './auth.store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends CollectionGuard<AuthState> {
  constructor(service: AuthService) {
    super(service);
  }

  public sync(): Observable<boolean> {
    return this.service.sync().pipe(
      switchMap((user) => (!user ? from(this.service.signin()) : of(user))),
      map(() => true),
    );
  }
}
