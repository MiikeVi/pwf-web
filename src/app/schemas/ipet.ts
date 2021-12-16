export interface Pet {
  name: string;
  age: PetAge;
  sex: string;
  breed?: Breed;
  photo?: string;
  weight: number;
  type: PetType;
  medication: boolean;
  behaviors: Behaviors[];
  owner: string;
  isActive: boolean;
}

export enum Breed {
  none = 'No aplica',
  bulldog1 = 'Bulldog Inglés',
  bulldog2 = 'Bulldog Francés',
  borderCollie = 'Border Collie',
  pug = 'Pug',
  germanShepherd = 'Pastor Alemán',
  yorkshireTerrier = 'Yorkshire terrier',
  whiteSwissShepherd = 'White Swiss Shepherd ',
  chiguagua = 'Chiguagua',
}

export enum PetType {
  perro = 'Perro',
  gato = 'Gato',
}
export interface Behavior {
  behavior: Behaviors;
  selected: boolean;
}
export enum Behaviors {
  amigable = 'Amigable',
  jugueton = 'Jugueton',
  agresivo = 'Agresivo',
  tranquilo = 'Tranquilo',
  conflictivo = 'Conflictivo',
  inquieto = 'Inquieto',
  energetico = 'Energico',
}

export enum PetAge {
  '1 mes a 3 meses',
  '4 meses a 8 meses',
  '9 meses a 1 año',
  '1 año a 3 años',
  '4 años a 8 años',
  '8 años a 12 años',
  'más de 12 años',
}

