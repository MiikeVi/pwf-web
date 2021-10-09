export interface Pet {
  name: string;
  age: number;
  sex: string;
  breed: Breed;
  photo?: string;
  weight: number;
  type: PetType;
  medication: boolean;
  behaviors: Behaviors[];
  owner: string;
}

export enum Breed {
  example = 'example',
  example2 = 'example2',
}

export enum PetType {
  perro = 'perro',
  gato = 'gato',
  conejo  = 'conejo',
  tortuga = 'tortuga',
  hamster = 'hamster',
}
export interface Behavior {
  behavior: Behaviors;
  selected: boolean;
}
export enum Behaviors {
  amigable = 'amigable',
  jugueton = 'jugueton',
  agresivo = 'agresivo',
  tranquilo = 'tranquilo',
  conflictivo = 'conflictivo',
  inquieto = 'inquieto',
  energetico = 'energetico',
}
