import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/stores/auth';
import { FirstStartupGuard } from './guards/first-startup.guard';
import { FirstStartupComponent } from './pages/first-startup/first-startup.component';
import { HomeComponent } from './pages/home/home.component';
import { Crumb } from './shared/breadcrumbs/breadcrumbs.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/home/goals', pathMatch: 'full' },
      {
        path: 'first-startup',
        component: FirstStartupComponent,
        canActivate: [FirstStartupGuard],
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [FirstStartupGuard],
        children: [
          { path: '', redirectTo: 'goals', pathMatch: 'full' },
          {
            path: 'goals',
            loadChildren: () => import('./goals/goals.module').then((m) => m.GoalsModule),
          },
          {
            path: 'settings',
            loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule),
            data: { crumbs: [{ label: 'Settings' }] as Crumb[] },
          },
        ],
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
