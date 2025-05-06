import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToString'
})
export class EnumToStringPipe implements PipeTransform {

  transform(value: String): string {
    if (!value) {
      return '';
    }
    return value.toString().replace(/_/g, ' ');
  }
}
