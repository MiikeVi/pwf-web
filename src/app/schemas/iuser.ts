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
  reviews: string[]; //array of ids
}

export interface Address {
  city: string;
  street: string;
  numberD: string;
  postalCode: string;
}
