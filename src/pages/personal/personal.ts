import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { Dish } from '../../providers/models';

/**
 * Generated class for the PersonalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})
export class PersonalPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private readonly auth: AuthProvider,
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritePage');
  }

  dislikeDish(dish: Dish) {
    this.auth.delFavorite(dish._id);
  }

}
