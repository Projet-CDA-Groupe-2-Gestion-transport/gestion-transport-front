import { ServiceVehicle } from "./serviceVehicle";

export interface ServiceVehicleBooking {
    id: number;
    userId: number;
    dateTimeStart: Date;
    dateTimeEnd: Date;
    licensePlateNumber: string;
  }

  export function initServiceVehicleBooking(): ServiceVehicleBooking{
    return{
      id:0,
      userId:0,
      dateTimeStart: new Date(),
      dateTimeEnd: new Date(),
      licensePlateNumber: '',
    }
}