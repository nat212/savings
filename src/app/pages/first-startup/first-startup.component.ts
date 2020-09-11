import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CurrencyService } from 'src/app/services/currency.service';
import { Currency } from 'src/app/settings/models/currency';

@Component({
  selector: 'sv-first-startup',
  templateUrl: './first-startup.component.html',
  styleUrls: ['./first-startup.component.scss'],
})
export class FirstStartupComponent implements OnInit {
  public currencies$: Observable<Currency[]>;
  public currencyControl = new FormControl(null, Validators.required);

  constructor(private currency: CurrencyService) {}

  public ngOnInit(): void {
    this.currencies$ = this.currency.getCurrencies();
  }
}
