import {BrandEnum} from '../../../core/enums/brandEnum';
import {VehicleCategoryEnum} from '../../../core/enums/vehicleCategoryEnum';
import {MotorizationEnum} from '../../../core/enums/motorizationEnum';
import {ServiceVehiculeStatusEnum} from '../../../core/enums/serviceVehiculeStatusEnum';

export interface ServiceVehicle {
  licensePlateNumber: string;
  model: string;
  nbSeats: number | null;
  brand: BrandEnum | null;
  co2Km: number | null;
  description: string;
  photoUrl: string;
  status: ServiceVehiculeStatusEnum | null;
  category: VehicleCategoryEnum | null;
  motorization: MotorizationEnum | null;
  hasBookings: boolean;
}

export function initServiceVehicle(): ServiceVehicle {
  return {
    licensePlateNumber: '',
    model: '',
    nbSeats: null,
    brand: null,
    co2Km: null,
    description: '',
    photoUrl: '',
    status: ServiceVehiculeStatusEnum.IN_SERVICE,
    category: null,
    motorization: null,
    hasBookings: false,
  };
}
