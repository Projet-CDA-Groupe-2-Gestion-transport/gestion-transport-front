import { Pipe, PipeTransform } from '@angular/core';
import {MotorizationEnum} from '../enums/motorizationEnum';

@Pipe({
  name: 'motorization'
})
export class MotorizationPipe implements PipeTransform {

  transform(motorization: MotorizationEnum): string {
    switch (motorization) {
      case MotorizationEnum.ELECTRIC:
        return 'Électrique';
      case MotorizationEnum.HYBRID:
        return 'Hybride';
      case MotorizationEnum.PETROL:
        return 'Essence';
      case MotorizationEnum.DIESEL:
        return 'Diesel';
      case MotorizationEnum.HYDROGEN:
        return 'Hydrogène';
      default:
        return 'inconnu';
    }
  }
}
