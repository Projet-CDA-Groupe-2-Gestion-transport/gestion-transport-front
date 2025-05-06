export enum MotorizationEnum {
  ELECTRIC = 'ELECTRIC',
  HYBRID = 'HYBRID',
  PETROL = 'PETROL',
  DIESEL = 'DIESEL',
  HYDROGEN = 'HYDROGEN'
}

export const MotorizationEnumTranslate: Record<MotorizationEnum, string> = {
  [MotorizationEnum.ELECTRIC]: 'Électrique',
  [MotorizationEnum.HYBRID]: 'Hybride',
  [MotorizationEnum.PETROL]: 'Essence',
  [MotorizationEnum.DIESEL]: 'Diesel',
  [MotorizationEnum.HYDROGEN]: 'Hydrogène',
}

