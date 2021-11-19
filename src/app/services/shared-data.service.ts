import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Pet } from '../schemas/ipet';

export class SharedDataService {

  public subject = new Subject<any>();
  private petsData: Pet[] = [] as Pet[];
  private pets: BehaviorSubject<Pet[]> = new BehaviorSubject(this.petsData);
  private currentPets: Observable<Pet[]> = this.pets.asObservable();

  constructor() {}

  getCurrentPets() {
    return this.currentPets;
  }

  setPets(pets: Pet[]) {
    this.pets.next(pets);
  }
}
