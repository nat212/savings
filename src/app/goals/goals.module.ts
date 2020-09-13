import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { GoalsRoutingModule } from './goals-routing.module';
import { EditGoalComponent } from './pages/edit-goal/edit-goal.component';
import { GoalsHomeComponent } from './pages/goals-home/goals-home.component';

@NgModule({
  declarations: [GoalsHomeComponent, EditGoalComponent],
  imports: [CommonModule, GoalsRoutingModule, MatIconModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule],
})
export class GoalsModule {}
