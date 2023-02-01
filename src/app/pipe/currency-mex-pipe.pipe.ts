import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'currencyMexPipe' })
export class CurrencyMexPipePipe implements PipeTransform {
  transform(value: number): string {
      return '$' + value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
}
