import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Currency } from './currency.model';
import { CurrencyStore } from './currency.store';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  constructor(private currencyStore: CurrencyStore, private http: HttpClient) {}

  public get(): Observable<Currency[]> {
    return this.http.get<{ [code: string]: string }>(environment.currencyApiUrl).pipe(
      map((currencies) => Object.keys(currencies).map((code) => ({ code, name: currencies[code] }))),
      tap((entities) => {
        this.currencyStore.set(entities);
      }),
    );
  }
}
