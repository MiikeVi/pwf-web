import { Injectable } from '@angular/core';
import axios, { AxiosPromise } from 'axios';
import { Pet } from '../schemas/ipet';
import { JSONPatch } from '../types/json-patch.types';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  headers: {
    // eslint-disable-next-line max-len
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6dHJ1ZSwiaWF0IjoxNjMxODUzNTIzLCJleHAiOjE2MzE4NTM1ODN9.cntH-WtbDv3lYc8omhypymshYIz53rMPMwQYpM2LsMU';
  };

  constructor() { }

  getPetById(petId: string): AxiosPromise<Pet> {
    return axios({
      method: 'get',
      url: `https://pwf-api.herokuapp.com/api/pets/${petId}`,
      headers: {
        // eslint-disable-next-line max-len
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6dHJ1ZSwiaWF0IjoxNjMxODUzNTIzLCJleHAiOjE2MzE4NTM1ODN9.cntH-WtbDv3lYc8omhypymshYIz53rMPMwQYpM2LsMU',
      },
    });
  }

  createPet(petData: Pet) {
    return axios({
      method: 'post',
      url: 'https://pwf-api.herokuapp.com/api/pets/',
      headers: {
        // eslint-disable-next-line max-len
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6dHJ1ZSwiaWF0IjoxNjMxODUzNTIzLCJleHAiOjE2MzE4NTM1ODN9.cntH-WtbDv3lYc8omhypymshYIz53rMPMwQYpM2LsMU',
      },
      data: petData,
    });
  }

  deletePet(petId: string) {
    return axios({
      method: 'delete',
      url: `https://pwf-api.herokuapp.com/api/pets/${petId}`,
      headers: {
        // eslint-disable-next-line max-len
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6dHJ1ZSwiaWF0IjoxNjMxODUzNTIzLCJleHAiOjE2MzE4NTM1ODN9.cntH-WtbDv3lYc8omhypymshYIz53rMPMwQYpM2LsMU',
      },
    });
  }

  getOwnerPets(userId: string) {
    return axios({
      method: 'get',
      url: 'https://pwf-api.herokuapp.com/api/pets/',
      headers: {
        // eslint-disable-next-line max-len
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6dHJ1ZSwiaWF0IjoxNjMxODUzNTIzLCJleHAiOjE2MzE4NTM1ODN9.cntH-WtbDv3lYc8omhypymshYIz53rMPMwQYpM2LsMU',
      },
      params: { owner:  userId },
    });
  }

  patchPet(petId: string, patchPet: JSONPatch) {
    return axios({
      method: 'patch',
      url: `https://pwf-api.herokuapp.com/api/pets/${petId}`,
      headers: {
        // eslint-disable-next-line max-len
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6dHJ1ZSwiaWF0IjoxNjMxODUzNTIzLCJleHAiOjE2MzE4NTM1ODN9.cntH-WtbDv3lYc8omhypymshYIz53rMPMwQYpM2LsMU',
      },
      data: patchPet,
    });
  }
}
