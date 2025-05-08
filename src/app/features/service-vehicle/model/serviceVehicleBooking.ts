import { ServiceVehicle } from "./serviceVehicle";

export interface ServiceVehicleBooking {
    id: number;
    userId: number;
    dateTimeStart: Date;
    dateTimeEnd: Date;
    serviceVehicle: ServiceVehicle;
  }

  export function initServiceVehicleBooking(): ServiceVehicleBooking{
    return{
      id:0,
      userId:0,
      dateTimeStart: new Date(),
      dateTimeEnd: new Date(),
      serviceVehicle: {
        licensePlateNumber: '',
        model: '',
        brand: '',
        category: '',
        motorization: ''
      } as unknown  as ServiceVehicle  // Utilisation du "type assertion" pour indiquer que c'est un ServiceVehicle
  };
}