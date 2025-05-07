import {User} from './user';
import {Vehicle} from '../../vehicle/models/vehicle';

export interface Carpooling {
    id: number | null;
    distance: number;
    dateTimeStart: Date;
    departureAddress: string;
    arrivalAddress: string;
    duration: number;
    vehicle: Vehicle | null;
    organisator: User | null;
    nbSeats: number;
    users: User[];
}

export function initCarpooling(): Carpooling {
  return {
    id: null,
    distance: 0,
    dateTimeStart: new Date(),
    departureAddress: '',
    arrivalAddress: '',
    duration: 0,
    vehicle: null,
    organisator: null,
    nbSeats: 0,
    users: [],
  };
}
