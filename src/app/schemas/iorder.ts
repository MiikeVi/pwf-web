import { DayEnable, WalkPaths } from './iuser';

export interface Order {
    createdAt: Date;
    charge: number;
    startDateService?: Date;
    dayService?: DayEnable;
    endDateService?: Date;
    userId: string;
    careTakerId: string;
    orderStatus: OrderStatus;
    pet: string;
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
    cancelled = 'cancelada',
    inProgress = 'en progreso',
}

