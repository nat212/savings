import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../shared/shared.module';
import { DepositWithdrawalComponent } from './dialogs/deposit-withdrawal/deposit-withdrawal.component';
import { GoalsRoutingModule } from './goals-routing.module';
import { EditGoalComponent } from './pages/edit-goal/edit-goal.component';
import { GoalsHomeComponent } from './pages/goals-home/goals-home.component';

@NgModule({
  declarations: [GoalsHomeComponent, EditGoalComponent, DepositWithdrawalComponent],
  imports: [
    CommonModule,
    GoalsRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    SharedModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatDialogModule,
  ],
  entryComponents: [DepositWithdrawalComponent],
})
export class GoalsModule {}
