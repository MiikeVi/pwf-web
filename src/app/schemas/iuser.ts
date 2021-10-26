import { Pet } from './ipet';

export interface User {
  address: string;
  address2?: string;
  avatar?: string;
  birthdate: Date;
  careTakerEnabled: boolean;
  careTakerData?: CareTakerData;
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

export interface CareTakerData {
  reputation?: number;
  bio: string;
  reviews?: string[]; //array of ids
  walkPaths: WalkPaths [];
  type: CareTakerType;
  petCareData: petCareData;
}

export interface WalkPaths {
  location: string;
  schedule: Schedule;
  price: number;
}

export enum CareTakerType {
  petCare = 'Cuidador',
  petWalker = 'Paseador',
  both = 'Ambos'
};

export interface petCareData {
  home: HomeType,
  availability: string,
  days: Day[],
  dogsType: string[]
};


export enum HomeType {
  house = 'Casa',
  apartment = 'Departamento'
};

type Schedule = {
  startTime: string;
  endTime: string;
  day?: Day;
};

export enum Day{
  monday = 'Lunes',
  tuesday = 'Martes',
  wednesday = "Miercoles",
  thursday = "Jueves",
  friday = 'Viernes',
  saturday = 'Sábado',
  sunday = 'Domingo'
}

export interface Address {
  city: string;
  street: string;
  numberD: string;
  postalCode: string;
}
