import { LatLng } from 'leaflet';
import { Pet } from './ipet';

export interface User {
  address: string;
  address2?: string;
  avatar?: string;
  birthdate: Date;
  careTakerEnabled: boolean;
  petCareData?: PetCareData;
  email: string;
  phoneNumber: string;
  phoneNumber2?: string;
  isActive: boolean;
  name: string;
  pet?: Pet[];
  password: string;
  permissions: string[];
  stars: number;
}

export interface PetCareData {
  bio: string;
  type: CareTakerType;
  walkerData?: WalkerData;
  careTakerData?: CareTakerData;
  reputation: number [];
  position?: Geolocation;
}

export interface Geolocation {
  lat: number;
  lon: number;
}

export interface CareTakerData {
  home: HomeType;
  availability: string;
  days: Day[];
  dogsType: string[];
};

export interface WalkerData {
  reviews?: string[]; //array of ids
  walkPaths: WalkPaths [];
}

export interface WalkPaths {
  location: string;
  schedule: Schedule;
  price: number;
  shared: boolean;
}

export enum CareTakerType {
  petCare = 'Cuidador',
  petWalker = 'Paseador',
  both = 'Ambos'
};

export enum HomeType {
  house = 'Casa',
  apartment = 'Departamento'
};

type Schedule = {
  startTime?: Date;
  endTime?: Date;
  day?: Day;
};

export enum Day{
  monday = 'Lunes',
  tuesday = 'Martes',
  wednesday = 'Miercoles',
  thursday = 'Jueves',
  friday = 'Viernes',
  saturday = 'Sábado',
  sunday = 'Domingo'
}

export enum DogSize {
  small = 'Perros pequeños (0-7kgs)',
  medium = 'Perros medianos (8kgs-20kgs)',
  large = 'Perros grandes (21kgs+)',
  cats = 'Puedo cuidar gatos'
}

export interface Address {
  city: string;
  street: string;
  numberD: string;
  postalCode: string;
}
