import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import moment from 'moment';
import { Subscription } from 'rxjs/Subscription';

import { DishDetail, Dish } from '../models';

@Injectable()
export class MenuProvider {
  menus: Array<Dish>;
  dailyMenu: Array<DishDetail>;
  token: string = '';

  constructor(public httpClient: HttpClient) {}

  setToken(token: string): void {
    this.token = token;
  }

  load(page: number = 0, number: number = 0, offset: number = 0): Observable<any> {
    return this.httpClient
    .get(`http://wc.cforce.me/dish?page=${page}&pagecount=${number}&offset=${offset}`, {
      headers: new HttpHeaders().set('x-access-token', this.token),
    });
  }

  getDish(dishId: string): Observable<any> {
    return this.httpClient.get(`http://wc.cforce.me/dish/${dishId}`, {
      headers: new HttpHeaders().set('x-access-token', this.token),
    });
  }

  loadDailyMenu(): Subscription {
    const date = moment().format('MM-DD-YYYY');
    return this.httpClient.get(`http://wc.cforce.me/menu/${date}`, {
      headers: new HttpHeaders().set('x-access-token', this.token),
    }).subscribe((menus: Array<DishDetail>) => { this.dailyMenu = menus; });
  }

  searchDish(dishName: string): Observable<any> {
    return this.httpClient.get(`http://wc.cforce.me/search/${dishName}`, {
      headers: new HttpHeaders().set('x-access-token', this.token),
    });
  }

  getTodayMenu(): Array<Dish> {
    return this.menus;
  }

}
