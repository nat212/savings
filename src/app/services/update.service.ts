import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { concat, interval, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  public updatesAvailable$: Observable<boolean>;

  constructor(private update: SwUpdate, appRef: ApplicationRef) {
    if (environment.production) {
      const appIsStable$ = appRef.isStable.pipe(first((isStable) => isStable === true));
      const every30Seconds$ = interval(30 * 60);
      const every30SecondsOnceAppIsStable$ = concat(appIsStable$, every30Seconds$);
      every30SecondsOnceAppIsStable$.subscribe(() => this.update.checkForUpdate());
    }
    this.updatesAvailable$ = this.update.available.pipe(map((u) => !!u));
  }

  public activateUpdate(): void {
    this.update.activateUpdate().then(() => document.location.reload());
  }
}
