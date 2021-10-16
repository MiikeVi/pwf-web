import { Pet } from "./ipet";

export interface Order {
    charge: number;
    startDateService: Date;
    dayService: Date;
    endDateService: Date;
    userId: string;
    caretakerId: string;
    orderStatus: OrderStatus;
    pet: Pet;
    orderType: OrderType;
    shared: Boolean;
}

export enum OrderType {
    Care = 'cuidado',
    Walk = 'paseo',
}

export enum OrderStatus {
    Pending = 'pendiente',
    Finished = 'terminada',
    Accepted = 'aceptada',
}

