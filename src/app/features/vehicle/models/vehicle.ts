import {BrandEnum} from '../../../core/enums/brandEnum';

export interface Vehicle {
    licensePlateNumber: string;
    model: string;
    nbSeats: number;
    brand: BrandEnum | null;
}

export function initVehicle(): Vehicle {
  return {
    licensePlateNumber: '',
    model: '',
    nbSeats: 0,
    brand: null,
  };
}
