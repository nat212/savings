import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Goal, GoalQuery, GoalService } from '@goals/stores/goal/index';
import { AlertService } from '@services/alert.service';
import { Observable } from 'rxjs';
import { AuthQuery } from 'src/app/auth/stores/auth';
import { Currency } from 'src/app/settings/entities/currency/currency.model';
import { fabShowHide } from 'src/app/shared/animations/fab';
import { DepositWithdrawalComponent, DepositWithdrawalData } from '../../dialogs/deposit-withdrawal/deposit-withdrawal.component';

@Component({
  selector: 'sv-goals-home',
  templateUrl: './goals-home.component.html',
  styleUrls: ['./goals-home.component.scss'],
  animations: [fabShowHide],
})
export class GoalsHomeComponent implements OnInit {
  public goals$: Observable<Goal[]>;
  public currency$: Observable<Currency>;
  constructor(private goalQuery: GoalQuery, private user: AuthQuery, private alert: AlertService, private goalService: GoalService) {}

  public ngOnInit(): void {
    this.goals$ = this.goalQuery.goals$;
    this.currency$ = this.user.currency$;
  }

  public withdrawOrDeposit(id: string, mode: 'deposit' | 'withdrawal'): void {
    this.alert.openDialog(DepositWithdrawalComponent, { data: { mode } as DepositWithdrawalData }).subscribe((amount) => {
      if (amount) {
        if (mode === 'deposit') {
          this.goalService.deposit(id, amount);
        } else {
          this.goalService.withdraw(id, amount);
        }
      }
    });
  }

  public deleteGoal(goal: Goal): void {
    this.alert.confirmDialog(`Delete ${goal.name}`, `Are you sure you wish to delete the goal "${goal.name}"?`).subscribe((answer) => {
      if (answer) {
        this.goalService.remove(goal.id);
      }
    });
  }
}
