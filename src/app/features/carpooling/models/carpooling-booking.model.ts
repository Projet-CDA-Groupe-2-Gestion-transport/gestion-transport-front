export interface CarpoolingBooking{
  id: number;
  distance: number;
  dateTimeStart: Date;
  departureAddress: string;
  arrivalAddress: string;
  duration: number;
  nbPlacesRemaining: number;
}
