import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-dish-detail',
  templateUrl: 'dish-detail.html',
})
export class DishDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishDetailPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
