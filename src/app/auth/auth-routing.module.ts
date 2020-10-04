import { NgModule } from '@angular/core';
import { canActivate, isNotAnonymous } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginComponent } from './pages/login/login.component';

const redirectLoggedInToHome = () =>
  pipe(
    isNotAnonymous,
    map((value) => !value || ['/']),
  );

const routes: Routes = [{ path: 'login', component: LoginComponent, ...canActivate(redirectLoggedInToHome) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
