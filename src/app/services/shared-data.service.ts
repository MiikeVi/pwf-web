import { BehaviorSubject, Subject } from 'rxjs';
import { Pet } from '../schemas/ipet';
import { User } from '../schemas/iuser';

export class SharedDataService {
  public userData: any = {};
  public subject = new Subject<any>();
  private user = new BehaviorSubject(this.userData);
  private currentUser = this.user.asObservable();

  private petsData: any = {};
  private pets = new BehaviorSubject(this.petsData);
  private currentPets = this.pets.asObservable();

  constructor() {}

  getCurrentUser() {
    return this.currentUser;
  }

  setUser(user: User) {
    this.user.next(user);
  }

  getCurrentPets() {
    return this.currentPets;
  }

  setPets(pets: Pet[]) {
    this.pets.next(pets);
  }
}
