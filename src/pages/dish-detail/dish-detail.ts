import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Loading, LoadingController } from 'ionic-angular';
import { MenuProvider } from '../../providers/menu/menu';
import { Dish } from '../../providers/models';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-dish-detail',
  templateUrl: 'dish-detail.html',
})
export class DishDetailPage {
  dish: Dish;
  favorited: boolean = false;
  loading: Loading = this.loadingCtrl.create();
  loaded: boolean = false;

  constructor(
    public navCtrl: NavController,
    public menu: MenuProvider,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private readonly auth: AuthProvider,
  ) {}

  ionViewDidLoad() {
    this.loading.present();
    this.menu.getDish(this.navParams.get('dishId'))
    .subscribe(dish => {
      this.dish = dish;
      this.loading.dismiss().then(() => {
        this.loaded = true;

      });
      
    });
  }

  likeDish() {
    this.auth.addFavorite(this.dish._id).add(() => this.favorited = true);
  }

  dislikeDish() {
    this.auth.delFavorite(this.dish._id).add(() => this.favorited = false);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
