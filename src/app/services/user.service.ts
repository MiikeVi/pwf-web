import { Injectable } from '@angular/core';
import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { User } from '../schemas/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getCaretakerUsers(): AxiosPromise<User[]> {
    return axios({
      method: 'get',
      url: 'https://pwf-api.herokuapp.com/api/user/',

      // eslint-disable-next-line max-len
      headers: { authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6dHJ1ZSwiaWF0IjoxNjMxODUzNTIzLCJleHAiOjE2MzE4NTM1ODN9.cntH-WtbDv3lYc8omhypymshYIz53rMPMwQYpM2LsMU'}
    });
  }
}
