import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CurrencySelectComponent } from '../../dialogs/currency-select/currency-select.component';
import { Currency } from '../../models/currency';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'sv-settings-home',
  templateUrl: './settings-home.component.html',
  styleUrls: ['./settings-home.component.scss'],
})
export class SettingsHomeComponent implements OnInit {
  public currency: Currency;

  constructor(private settings: SettingsService, private dialog: MatDialog) {}

  public ngOnInit(): void {
    this.currency = this.settings.getCurrency();
  }

  public selectCurrency(): void {
    const ref = this.dialog.open(CurrencySelectComponent, { data: { currency: this.currency } });
    ref.afterClosed().subscribe((result: Currency) => {
      if (result) {
        this.settings.setCurrency(result);
        this.currency = result;
      }
    });
  }
}
