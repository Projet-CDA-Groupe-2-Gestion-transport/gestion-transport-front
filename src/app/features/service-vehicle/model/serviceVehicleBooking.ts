import { ServiceVehicle } from "./serviceVehicle";

export interface ServiceVehicleBooking {
    id: number;
    userId: number;
    dateTimeStart: String;
    dateTimeEnd: String;
    licensePlateNumber: string;
  }

  export function initServiceVehicleBooking(): ServiceVehicleBooking{
    return{
      id:0,
      userId:0,
      dateTimeStart: '',
      dateTimeEnd: '',
      licensePlateNumber: '',
    }
}