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
import { Credentials } from '../../providers/models';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  creds: Credentials = new Credentials('', '');

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
    this.auth.login(this.creds).subscribe(result => {
      if (!result.success) {
        this.showError(result.status);
      } else {
        this.navCtrl.setRoot('HomePage');
      }
    }, error => {
      console.log(error);
      this.showError(error);
    })
  }

  ngOnInit() {
  }

}
