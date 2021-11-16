import { Pet } from './ipet';
import { Days, WalkPaths } from './iuser';

export interface Order {
    createdAt: Date;
    charge: number;
    startDateService?: Date;
    dayService?: Days;
    endDateService?: Date;
    userId: string;
    careTakerId: string;
    orderStatus: OrderStatus;
    pet: Pet;
    orderType: OrderType;
    shared?: boolean;
    walkPath?: WalkPaths;
    description?: string;
}

export enum OrderType {
    care = 'Cuidado',
    walk = 'Paseo',
}

export enum OrderStatus {
    pending = 'pendiente',
    finished = 'terminada',
    accepted = 'aceptada',
    cancelled = 'cancelada'
}

