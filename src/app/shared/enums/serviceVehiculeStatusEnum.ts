
export enum ServiceVehiculeStatusEnum {
  IN_SERVICE = 'IN_SERVICE',
  OUT_OF_SERVICE = 'OUT_OF_SERVICE',
  FOR_REPAIR = 'FOR_REPAIR'
}

export const ServiceVehiculeStatusEnumTranslate: Record<ServiceVehiculeStatusEnum, string> = {
  [ServiceVehiculeStatusEnum.IN_SERVICE]: 'En service',
  [ServiceVehiculeStatusEnum.OUT_OF_SERVICE]: 'Hors service',
  [ServiceVehiculeStatusEnum.FOR_REPAIR]: 'En réparation',
}
