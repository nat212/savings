import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { FirebaseError } from 'firebase';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class FunctionsService {
  constructor(private functions: AngularFireFunctions, private alert: AlertService) {}

  public transferGoals(oldUid: string): Observable<boolean> {
    const func = this.functions.httpsCallable<{ oldUid: string }>('transferGoals');
    return func({ oldUid }).pipe(
      catchError((err: FirebaseError) => {
        this.alert.messageDialog('Error transferring data', err.message, 'error');
        return of({ success: false });
      }),
      map(({ success }) => success),
    );
  }
}
