import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CurrencySelectComponent } from '../../dialogs/currency-select/currency-select.component';
import { SettingsQuery } from '../../entities/settings/settings.query';
import { SettingsService } from '../../entities/settings/settings.service';
import { SettingsState } from '../../entities/settings/settings.store';
import { Currency } from '../../models/currency';

@Component({
  selector: 'sv-settings-home',
  templateUrl: './settings-home.component.html',
  styleUrls: ['./settings-home.component.scss'],
})
export class SettingsHomeComponent implements OnInit, OnDestroy {
  public settings$: Observable<SettingsState>;
  private unsubscribe$ = new Subject<void>();
  private currency: Currency;

  constructor(private settings: SettingsService, private dialog: MatDialog, private settingsQuery: SettingsQuery) {}

  public ngOnInit(): void {
    this.settings$ = this.settingsQuery.settings$;
    this.settings$.pipe(takeUntil(this.unsubscribe$)).subscribe(({ currency }) => (this.currency = currency));
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  public selectCurrency(): void {
    const ref = this.dialog.open(CurrencySelectComponent, { data: { currency: this.currency } });
    ref.afterClosed().subscribe((result: Currency) => {
      if (result) {
        this.settings.setCurrency(result);
      }
    });
  }
}
