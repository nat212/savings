import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Fuse from 'fuse.js';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { CurrencyService } from 'src/app/services/currency.service';
import { Currency } from 'src/app/settings/models/currency';
import { SettingsService } from 'src/app/settings/services/settings.service';

@Component({
  selector: 'sv-first-startup',
  templateUrl: './first-startup.component.html',
  styleUrls: ['./first-startup.component.scss'],
})
export class FirstStartupComponent implements OnInit {
  public currencies$: Observable<Currency[]>;
  public filteredCurrencies$: Observable<Currency[]>;
  public startupGroup: FormGroup;

  constructor(
    private currency: CurrencyService,
    private formBuilder: FormBuilder,
    private settings: SettingsService,
    private router: Router,
  ) {}

  public static isCurrency(currency: Currency | string): currency is Currency {
    return currency instanceof Currency;
  }

  public static currencyValidator(control: AbstractControl): ValidationErrors {
    if (FirstStartupComponent.isCurrency(control.value) && control.hasError('currency')) {
      const errors = { ...control.errors };
      delete errors.currency;
      control.setErrors(Object.keys(errors).length ? errors : null);
      return null;
    } else if (control.value) {
      const errors = { ...control.errors, currency: true };
      control.setErrors(errors);
      return { currency: true };
    }
    return null;
  }

  public ngOnInit(): void {
    this.startupGroup = this.formBuilder.group({
      currency: ['', Validators.compose([Validators.required, FirstStartupComponent.currencyValidator])],
    });
    this.currencies$ = this.currency.getCurrencies();
    const currencyFuse$: Observable<Fuse<Currency>> = this.currencies$.pipe(
      map((currencies) => {
        const opts: Fuse.IFuseOptions<Currency> = { keys: ['code', 'name'], shouldSort: true };
        const index = Fuse.createIndex(opts.keys, currencies);
        return new Fuse<Currency>(currencies, opts, index);
      }),
    );
    this.filteredCurrencies$ = combineLatest([
      this.currencies$,
      currencyFuse$,
      this.startupGroup.get('currency').valueChanges.pipe(
        filter((val) => typeof val === 'string'),
        startWith(''),
      ),
    ]).pipe(
      map(([currencies, currencyFuse, filterTerm]) => (filterTerm ? currencyFuse.search(filterTerm).map((i) => i.item) : currencies)),
    );
  }

  public displayFn(currency: Currency | string): string {
    return currency instanceof Currency ? currency.display : currency;
  }

  public submit(): void {
    const { currency } = this.startupGroup.value;
    this.settings.setCurrency(currency);
    this.router.navigate(['/']);
  }
}
