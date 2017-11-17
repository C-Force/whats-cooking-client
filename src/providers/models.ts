// type ServingType = 'slice' | 'tablespoon' | 'cup' | 'ounce' | '3oz' | 'each';
export type MealTime = 'Breakfast' | 'Lunch' | 'Dinner' | 'Late Dinner';

// export interface NuritionAmount { weight?: number, daily_value?: number };

// export interface NuritionFacts {
//   serving_size: { type: ServingType, weight: number },
//   calories: number,
//   calories_from_fat: number,
//   total_fat: NuritionAmount,
//   saturated_fat: NuritionAmount,
//   cholesterol: NuritionAmount,
//   sodium: NuritionAmount,
//   dietary_fiber: NuritionAmount,
//   sugars: NuritionAmount,
//   total_carbohydrate: NuritionAmount,
//   protein: NuritionAmount,
//   vitamin_a: NuritionAmount,
//   vitamin_c: NuritionAmount,
//   calcium: NuritionAmount,
//   iron: NuritionAmount,
// }

export class Dish {
  _id: string;
  name: string;
  image: string;
  vegetarian: boolean;
  vegan: boolean;
  contains: string;
  favorited: boolean = false;
}

export class DishDetail extends Dish {
  //nurition_facts: NuritionFacts,
  //ingredients: string,
  contains: string;
  location: string;
  mealtime: MealTime;
}

export class Credentials {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
};

export class RegisterForm extends Credentials {
  firstname: string;
  lastname: string;
};

export interface LoginResult {
  status: string,
  success?: boolean,
  token?: string,
};

export class User {
  firstname: string;
  lastname: string;
  email: string;
  favorites: Dish[];
};