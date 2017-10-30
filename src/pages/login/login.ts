import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  Loading,
  AlertController,
} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  creds = { email: '', password: '' };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
  ) {}

  public createAccount() {
    this.navCtrl.push('RegisterPage');
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true,
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();
    const alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK'],
    });
    alert.present();
  }

  public login() {
    this.showLoading();
    this.auth.login(this.creds).subscribe(allowed => {
      if (allowed) {
        this.navCtrl.setRoot('HomePage');
      } else {
        this.showError('Access Denied');
      }
    }, error => {
      this.showError(error);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
