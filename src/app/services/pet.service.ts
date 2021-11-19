import { Injectable } from '@angular/core';
import axios, { AxiosPromise } from 'axios';
import { Pet } from '../schemas/ipet';
import { JSONPatch } from '../types/json-patch.types';
import { Storage } from '@ionic/storage';

const TOKEN = 'jwt-token';

@Injectable({
  providedIn: 'root'
})

export class PetService {
  token = '';
  headers = {};

  constructor(private storage: Storage) {
    this.setAuthHeader();
  }

  async setAuthHeader() {
    this.token = await this.storage.get(TOKEN);
    this.headers = {
      // eslint-disable-next-line max-len
      authorization: `Bearer ${this.token}`,
    };
  }

  getPetById(petId: string): AxiosPromise<Pet> {
    return this.setAuthHeader().then(() => axios({
        method: 'get',
        url: `https://pwf-api.herokuapp.com/api/pets/${petId}`,
        headers: this.headers,
      }));
  }

  createPet(petData: Pet) {
    return this.setAuthHeader().then(() => axios({
        method: 'post',
        url: 'https://pwf-api.herokuapp.com/api/pets/',
        headers: this.headers,
        data: petData,
      }));

  }

  deletePet(petId: string) {
    return this.setAuthHeader().then(() => axios({
        method: 'delete',
        url: `https://pwf-api.herokuapp.com/api/pets/${petId}`,
        headers: this.headers,
      }));

  }

  getOwnerPets(userId: string) {
    return this.setAuthHeader().then(() => axios({
        method: 'get',
        url: 'https://pwf-api.herokuapp.com/api/pets',
        headers: this.headers,
        params: { owner:  userId },
      }));

  }

  patchPet(petId: string, patchPet: JSONPatch) {
    return this.setAuthHeader().then(() => axios({
        method: 'patch',
        url: `https://pwf-api.herokuapp.com/api/pets/${petId}`,
        headers: this.headers,
        data: patchPet,
      }));

  }
}
