import {Pipe, PipeTransform} from '@angular/core';
import {VehicleCategoryEnum} from '../../core/enums/vehicleCategoryEnum';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(category: VehicleCategoryEnum): string {
    switch (category) {
      case VehicleCategoryEnum.MICRO_URBAINES:
        return 'Micro-urbaines';
      case VehicleCategoryEnum.MINI_CITADINES:
        return 'Mini-citadines';
      case VehicleCategoryEnum.CITADINES_POLYVALENTES:
        return 'Citadines polyvalentes';
      case VehicleCategoryEnum.COMPACTES:
        return 'Compactes';
      case VehicleCategoryEnum.BERLINES_TAILLE_S:
        return 'Berlines taille S';
      case VehicleCategoryEnum.BERLINES_TAILLE_M:
        return 'Berlines taille M';
      case VehicleCategoryEnum.BERLINES_TAILLE_L:
        return 'Berlines taille L';
      case VehicleCategoryEnum.SUV:
        return 'SUV';
      case VehicleCategoryEnum.TOUT_TERRAINS:
        return 'Tout-terrains';
      case VehicleCategoryEnum.PICK_UP:
        return 'Pick-up';
      default:
        return 'inconnu';
    }
  }
}
