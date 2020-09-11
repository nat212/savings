import { Expose } from 'class-transformer';

export interface CurrencyData {
  code: string;
  name: string;
}
export class Currency {
  @Expose() public code: string;
  @Expose() public name: string;

  get display(): string {
    return `${this.name} (${this.code})`;
  }
}
