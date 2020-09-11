import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Currency, CurrencyData } from '../settings/models/currency';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  public getCurrencies(): Observable<Currency[]> {
    return this.http.get<{ [code: string]: string }>(environment.currencyApiUrl).pipe(
      map((currencies) => Object.keys(currencies).map((code) => ({ code, name: currencies[code] } as CurrencyData))),
      map((currencies) => currencies.map((c) => plainToClass(Currency, c))),
    );
  }
}
