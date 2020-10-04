import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

const redirectLoggedInToHome = () => redirectLoggedInTo(['/']);

const routes: Routes = [{ path: 'login', component: LoginComponent, ...canActivate(redirectLoggedInToHome) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
