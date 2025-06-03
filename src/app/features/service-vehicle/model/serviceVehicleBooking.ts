
export interface ServiceVehicleBooking {
    id?: number;
    userId: number;
    dateTimeStart: string;
    dateTimeEnd: string;
    licensePlateNumber: string;
  }

  export function initServiceVehicleBooking(): ServiceVehicleBooking{
    return{
      id:0,
      userId:0,
      dateTimeStart: new Date().toISOString(), 
      dateTimeEnd: new Date().toISOString(),
      licensePlateNumber: '',
    }
}