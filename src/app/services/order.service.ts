import { Injectable } from '@angular/core';
import axios, { AxiosPromise } from 'axios';
import { User } from '../schemas/iuser';
import { JSONPatch } from '../types/json-patch.types';
import { Storage } from '@ionic/storage';
import { Order } from '../schemas/iorder';


const TOKEN = 'jwt-token';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  token = '';
  headers = {};

  orderSelected: Order;

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

  getUserOrders(userId: string) {
    return this.setAuthHeader().then(() => axios({
        method: 'get',
        url: 'https://pwf-api.herokuapp.com/api/orders/',

        // eslint-disable-next-line max-len
        headers: this.headers,
        params: { userId },
      }));
  }

  getCareTakerOrders(careTakerId: string) {
    return this.setAuthHeader().then(() => axios({
        method: 'get',
        url: 'https://pwf-api.herokuapp.com/api/orders/',

        // eslint-disable-next-line max-len
        headers: this.headers,
        params: { careTakerId },
      }));

  }

  getOrder(orderId: string): AxiosPromise<Order> {
    return this.setAuthHeader().then(() => axios({
        method: 'get',
        url: `https://pwf-api.herokuapp.com/api/orders/${orderId}`,
        // eslint-disable-next-line max-len
        headers: this.headers,
      }));
  }

  createOrder(data: Order){
    return this.setAuthHeader().then(() => axios({
        method: 'post',
        url: 'https://pwf-api.herokuapp.com/api/orders/',
        headers: this.headers,
        data,
      }));
  }

  patchOrder(orderId: string, patchOrder: JSONPatch) {
    return this.setAuthHeader().then(() => axios({
        method: 'patch',
        url: `https://pwf-api.herokuapp.com/api/orders/${orderId}`,
        headers: this.headers,
        data: patchOrder,
      }));
  }

  selectOrder(orderSelected: Order) {
    this.orderSelected = orderSelected;
  }
}
