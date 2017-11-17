import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { RegisterForm } from '../../providers/models';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess: boolean = false;
  form: RegisterForm = new RegisterForm('', '');
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    private alertCtrl: AlertController,
  ) {}

  showPopup(title: string, text: string) {
    const alert = this.alertCtrl.create({
      title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.navCtrl.popToRoot();
            }
          },
        },
      ],
    });
    alert.present();
  }

  public register() {
    this.auth.register(this.form).subscribe(result => {
      if (result.success) {
        this.createSuccess = true;
        this.showPopup('Success', 'Account created.');
      } else {
        this.showPopup('Error', result.status);
      }
    }),
    error => {
      this.showPopup('Error', error);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
