import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstStartupGuard } from './guards/first-startup.guard';
import { FirstStartupComponent } from './pages/first-startup/first-startup.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [FirstStartupGuard] },
  { path: 'first-startup', component: FirstStartupComponent, canActivate: [FirstStartupGuard] },
  { path: 'goals', loadChildren: () => import('./goals/goals.module').then((m) => m.GoalsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
