import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class AuthProvider {
  user: User;
  constructor(public http: Http) {
    console.log('Hello AuthProvider Provider');
  }

  public login(creds : { email: string, password: string }): Observable<boolean> {
    if (creds.email === null || creds.password === null) {
      return Observable.throw('Please insert credentials');
    } else {
      return Observable.create(observer => {
        const access = (creds.password === 'pass' && creds.email === 'email');
        observer.next(access);
        observer.complete();
      })
    }
  }

  public getUserInfo(): User {
    return this.user;
  }

  public logout(): Observable<boolean> {
    return Observable.create(observer => {
      this.user = null;
      observer.next(true);
      observer.complete();
    })
  }
}
