import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Currency } from '@settings/entities/currency/currency.model';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthQuery } from '../auth/stores/auth';

@Injectable({
  providedIn: 'root',
})
export class FirstStartupGuard implements CanActivate, CanActivateChild {
  private getUrlTreeFromPath(path: string): UrlTree {
    return this.router.parseUrl(path);
  }
  private checkValidNavigation(state: RouterStateSnapshot, currency: Currency): boolean | UrlTree {
    if (state.url === '/first-startup') {
      return currency ? this.getUrlTreeFromPath('/') : true;
    } else {
      return currency ? true : this.getUrlTreeFromPath('/first-startup');
    }
  }
  constructor(private auth: AuthQuery, private router: Router) {}
  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.currency$.pipe(
      take(1),
      map((currency) => this.checkValidNavigation(state, currency)),
    );
  }
  public canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }
}
