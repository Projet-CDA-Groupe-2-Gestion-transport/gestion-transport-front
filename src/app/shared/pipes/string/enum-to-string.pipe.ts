import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToString'
})
export class EnumToStringPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }
    return value.toString().replace(/_/g, ' ');
  }
}
