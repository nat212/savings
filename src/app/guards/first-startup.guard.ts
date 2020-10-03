import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SettingsQuery } from '../settings/entities/settings/settings.query';

@Injectable({
  providedIn: 'root',
})
export class FirstStartupGuard implements CanActivate, CanActivateChild {
  constructor(private settings: SettingsQuery, private router: Router) {}
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.settings.getCurrency() && !state.url.includes('first-startup')) {
      this.router.navigate(['/first-startup']);
      return false;
    } else if (this.settings.getCurrency() && state.url.includes('first-startup')) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
  public canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }
}
