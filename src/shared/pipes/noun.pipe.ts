import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'noun', standalone: true })
export class NounPipe implements PipeTransform {
  transform(value: number, one: string, two: string, five: string): string {
    let n = Math.abs(value);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }
    return five;
  }
}
