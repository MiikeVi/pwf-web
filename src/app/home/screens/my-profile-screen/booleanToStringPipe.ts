import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'boolToString'})
export class BooleanToStringPipe implements PipeTransform {
  transform(value: string): string {
    if (value === 'true') {
        return 'Si';
  }
  return 'No';
}
}
