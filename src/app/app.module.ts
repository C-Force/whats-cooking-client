import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {Storage, IonicStorageModule} from "@ionic/storage";
import { HttpClientModule } from "@angular/common/http";
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import {CustomFormsModule} from 'ng2-validation';

import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth/auth';
import { MenuProvider } from '../providers/menu/menu';

export function jwtOptionsFactory(storage: Storage) {
  return {
    tokenGetter: () => storage.get('token'),
    whitelistedDomains: ['localhost:8080']
  }
}

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage],
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    CustomFormsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    MenuProvider,
  ]
})
export class AppModule {}
