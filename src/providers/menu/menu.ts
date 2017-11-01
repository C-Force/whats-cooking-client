import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';

type ServingType = 'slice' | 'tablespoon' | 'cup' | 'ounce' | '3oz' | 'each';
type MealTime = 'Breakfast' | 'Lunch' | 'Dinner' | 'Late Dinner';

interface NuritionAmount { weight?: number, daily_value?: number };

interface NuritionFacts {
  serving_size: { type: ServingType, weight: number },
  calories: number,
  calories_from_fat: number,
  total_fat: NuritionAmount,
  saturated_fat: NuritionAmount,
  cholesterol: NuritionAmount,
  sodium: NuritionAmount,
  dietary_fiber: NuritionAmount,
  sugars: NuritionAmount,
  total_carbohydrate: NuritionAmount,
  protein: NuritionAmount,
  vitamin_a: NuritionAmount,
  vitamin_c: NuritionAmount,
  calcium: NuritionAmount,
  iron: NuritionAmount,
  ingredients: string,
  contains: string,
}

export interface Dish {
  id: string,
  name: string,
  image: string,
  nurition_facts: NuritionFacts,
  vegetarian: boolean,
  vegan: boolean,
  cafe: string,
  location: string,
  mealtime: MealTime,
}

export interface Cafe {
  id: string,
  name: string,
  dishes: Array<Dish>,
}

export interface Facility {
  name: string,
  location: string,
  mealtime: {
    breakfast: Array<Cafe>,
    lunch: Array<Cafe>,
    dinner: Array<Cafe>,
    late_dinner: Array<Cafe>,
  }
}

export interface Menu {
  date: Date,
  dishes: Array<Dish>,
}

@Injectable()
export class MenuProvider {
  menus: Array<Dish>;
  constructor(public http: Http) {}

  load(): Subscription {
    return this.http.get('assets/data/data.json')
    .map(res => res.json())
    .subscribe(data => {
      this.menus = data.dishes;
    });
  }

  getTodayMenu(): Array<Dish> {
    return this.menus;
  }

}
