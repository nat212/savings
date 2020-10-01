import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditGoalComponent } from './pages/edit-goal/edit-goal.component';
import { GoalsHomeComponent } from './pages/goals-home/goals-home.component';

const routes: Routes = [
  {
    path: '',
    component: GoalsHomeComponent,
  },
  {
    path: 'edit',
    component: EditGoalComponent,
  },
  {
    path: 'edit/:goal_id',
    component: EditGoalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoalsRoutingModule {}
