import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split',
})
export class SplitPipe implements PipeTransform {
  // uyguladigin metinde operatore gore split yap geriye array olarak elemanlari don.
  transform(value: string, operator: string): string[] {
    return value.split(operator);
  }
}
