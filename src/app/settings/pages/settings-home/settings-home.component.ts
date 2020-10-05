import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { AuthQuery, AuthService } from 'src/app/auth/stores/auth';
import { CurrencySelectComponent } from '../../dialogs/currency-select/currency-select.component';
import { Currency } from '../../entities/currency/currency.model';

@Component({
  selector: 'sv-settings-home',
  templateUrl: './settings-home.component.html',
  styleUrls: ['./settings-home.component.scss'],
})
export class SettingsHomeComponent implements OnInit {
  public currency$: Observable<Currency>;
  private currency: Currency;

  constructor(private user: AuthService, private dialog: MatDialog, private query: AuthQuery) {}

  public ngOnInit(): void {
    this.currency$ = this.query.currency$.pipe(tap((currency) => (this.currency = currency)));
  }

  public selectCurrency(): void {
    const ref = this.dialog.open(CurrencySelectComponent, { data: { currency: this.currency } });
    ref.afterClosed().subscribe((result: Currency) => {
      if (result) {
        this.user.setCurrency(result);
      }
    });
  }
}
