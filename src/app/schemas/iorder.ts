import { Pet } from './ipet';
import { WalkPaths } from './iuser';

export interface Order {
    createdAt: Date;
    charge: number;
    startDateService: Date;
    dayService: Date;
    endDateService: Date;
    userId: string;
    caretakerId: string;
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

