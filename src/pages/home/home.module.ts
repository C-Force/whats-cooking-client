import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SwingModule } from 'angular2-swing';

import { HomePage } from './home';

@NgModule({
  declarations: [HomePage],
  imports: [
    SwingModule,
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule { }