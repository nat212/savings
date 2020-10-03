import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './settings/entities/currency/currency.service';

@Component({
  selector: 'sv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private currencyService: CurrencyService) {}

  public ngOnInit(): void {
    this.currencyService.get().subscribe();
  }
}
