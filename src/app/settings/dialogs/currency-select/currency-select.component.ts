import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Fuse from 'fuse.js';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CurrencyService } from 'src/app/services/currency.service';
import { Currency } from '../../models/currency';

export interface CurrencySelectData {
  currency: Currency;
}

@Component({
  selector: 'sv-currency-select',
  templateUrl: './currency-select.component.html',
  styleUrls: ['./currency-select.component.scss'],
})
export class CurrencySelectComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CurrencySelectData,
    public dialogRef: MatDialogRef<CurrencySelectComponent>,
    private currencies: CurrencyService,
  ) {}

  public currencyForm: FormControl;
  public filteredCurrencies$: Observable<Currency[]>;

  private static currencyValidator(control: AbstractControl): ValidationErrors {
    if (control.value && !(control.value instanceof Currency)) {
      const errors = { ...control.errors, currency: true };
      control.setErrors(errors);
      return errors;
    } else if (control.hasError('currency')) {
      let errors = { ...control.errors };
      delete errors.currency;
      errors = Object.keys(errors).length ? errors : null;
      control.setErrors(errors);
      return null;
    }
    return null;
  }

  public ngOnInit(): void {
    this.currencyForm = new FormControl('', Validators.compose([Validators.required, CurrencySelectComponent.currencyValidator]));

    const currencyFuse$ = this.currencies.currencies$.pipe(
      map((currencies) => {
        const options: Fuse.IFuseOptions<Currency> = { keys: ['code', 'name'], shouldSort: true };
        const index = Fuse.createIndex(options.keys, currencies);
        return new Fuse<Currency>(currencies, options, index);
      }),
    );
    this.filteredCurrencies$ = combineLatest([
      this.currencies.currencies$,
      currencyFuse$,
      this.currencyForm.valueChanges.pipe(
        map((val) => (val instanceof Currency ? val.display : val)),
        startWith(''),
      ),
    ]).pipe(
      map(([currencies, currencyFuse, filterTerm]) => (filterTerm ? currencyFuse.search(filterTerm).map((i) => i.item) : currencies)),
    );
  }

  public displayFn(currency: Currency | string): string {
    return typeof currency === 'string' ? currency : currency.display;
  }
}
