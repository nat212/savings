import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Currency } from 'src/app/settings/entities/currency/currency.model';
import { SettingsQuery } from 'src/app/settings/entities/settings/settings.query';
import { fabShowHide } from 'src/app/shared/animations/fab';
import { DepositWithdrawalComponent, DepositWithdrawalData } from '../../dialogs/deposit-withdrawal/deposit-withdrawal.component';
import { Goal } from '../../stores/goal.model';
import { GoalQuery } from '../../stores/goal.query';
import { GoalService } from '../../stores/goal.service';

@Component({
  selector: 'sv-goals-home',
  templateUrl: './goals-home.component.html',
  styleUrls: ['./goals-home.component.scss'],
  animations: [fabShowHide],
})
export class GoalsHomeComponent implements OnInit {
  public goals$: Observable<Goal[]>;
  public currency$: Observable<Currency>;
  constructor(
    private goalQuery: GoalQuery,
    private settingsQuery: SettingsQuery,
    private dialog: MatDialog,
    private goalService: GoalService,
  ) {}

  public ngOnInit(): void {
    this.goals$ = this.goalQuery.goals$;
    this.currency$ = this.settingsQuery.currency$;
  }

  public withdrawOrDeposit(id: string, mode: 'deposit' | 'withdrawal'): void {
    this.dialog
      .open(DepositWithdrawalComponent, { data: { mode } as DepositWithdrawalData })
      .afterClosed()
      .subscribe((amount) => {
        if (amount) {
          if (mode === 'deposit') {
            this.goalService.deposit(id, amount);
          } else {
            this.goalService.withdraw(id, amount);
          }
        }
      });
  }
}
