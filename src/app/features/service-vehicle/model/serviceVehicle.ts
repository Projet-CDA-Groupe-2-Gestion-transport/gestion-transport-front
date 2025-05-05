import {BrandEnum} from '../../../core/enums/brandEnum';
import {VehicleStatusEnum} from '../../../core/enums/vehicleStatusEnum';
import {VehicleCategoryEnum} from '../../../core/enums/vehicleCategoryEnum';
import {MotorizationEnum} from '../../../core/enums/motorizationEnum';

export interface ServiceVehicle {
  id: number;
  licensePlateNumber: string;
  model: string;
  nbSeats: number;
  brand: BrandEnum;
  co2Km: number;
  description: string;
  photoUrl: string;
  status: VehicleStatusEnum;
  category: VehicleCategoryEnum;
  motorization: MotorizationEnum;
}
