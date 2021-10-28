import { Injectable } from '@angular/core';
import axios, { AxiosPromise } from 'axios';
import { User } from '../schemas/iuser';
import { JSONPatch } from '../types/json-patch.types';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';


const TOKEN = 'jwt-token';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token = '';
  headers = {};

  caretakerSelected: User;

  constructor(private storage: Storage, private http: HttpClient) {
    this.setAuthHeader();
  }

  async setAuthHeader() {
    this.token = await this.storage.get(TOKEN);
    this.headers = {
      // eslint-disable-next-line max-len
      authorization: `Bearer ${this.token}`,
    };
  }

  getCaretakerUsers(): AxiosPromise<User[]> {
    return this.setAuthHeader().then(() => axios({
        method: 'get',
        url: 'https://pwf-api.herokuapp.com/api/user/',

        // eslint-disable-next-line max-len
        headers: this.headers,
        params: { careTakerEnabled: true },
      }));

  }

  getUser(userId: string): AxiosPromise<User> {
    return this.setAuthHeader().then(() => axios({
        method: 'get',
        url: `https://pwf-api.herokuapp.com/api/user/${userId}`,
        // eslint-disable-next-line max-len
        headers: this.headers,
      }));
  }

  async createUser(data: any){
    return this.setAuthHeader().then(() => axios({
        method: 'post',
        url: 'https://pwf-api.herokuapp.com/api/user/',
        data,
        headers: this.headers,
      }));
  }

  patchUser(userId: string, patchUser: JSONPatch) {
    return this.setAuthHeader().then(() => axios({
        method: 'patch',
        url: `https://pwf-api.herokuapp.com/api/user/${userId}`,
        headers: this.headers,
        data: patchUser,
      }));
  }

  async uploadImage(photo){
    return this.setAuthHeader().then(() => axios({
      method: 'post',
      url: 'https://pwf-api.herokuapp.com/api/user/upload',
      // eslint-disable-next-line no-underscore-dangle
      headers: this.headers,
      data: {base64: photo.base64String},
    }));
  }

  selectCaretaker(selected: User) {
    this.caretakerSelected = selected;
  }
}
